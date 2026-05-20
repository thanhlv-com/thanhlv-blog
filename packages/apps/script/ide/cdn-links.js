import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC_ROOT = path.resolve(__dirname, '../../src')
const STATIC_CDN_ROOT = path.resolve(__dirname, '../../../libs/static-cdn')
const ALIAS_DIR_NAME = '@cdn'

function walkDir(dirPath, result = []) {
  const entries = fs.readdirSync(dirPath, {withFileTypes: true})
  let hasMarkdown = false

  for (const entry of entries) {
    if (entry.name === ALIAS_DIR_NAME || entry.name.startsWith('.')) {
      continue
    }

    const fullPath = path.join(dirPath, entry.name)
    if (entry.isFile() && entry.name.endsWith('.md')) {
      hasMarkdown = true
      continue
    }

    if (entry.isDirectory()) {
      walkDir(fullPath, result)
    }
  }

  if (hasMarkdown) {
    result.push(dirPath)
  }

  return result
}

function ensureAliasLink(markdownDirPath) {
  const aliasPath = path.join(markdownDirPath, ALIAS_DIR_NAME)
  const relativeTarget = path.relative(markdownDirPath, STATIC_CDN_ROOT)

  if (!fs.existsSync(aliasPath)) {
    const symlinkType = process.platform === 'win32' ? 'junction' : 'dir'
    const symlinkTarget = process.platform === 'win32' ? STATIC_CDN_ROOT : relativeTarget
    fs.symlinkSync(symlinkTarget, aliasPath, symlinkType)
    return {status: 'created', path: aliasPath}
  }

  const stat = fs.lstatSync(aliasPath)
  if (!stat.isSymbolicLink()) {
    return {status: 'skipped', path: aliasPath, reason: 'exists but is not a symlink'}
  }

  const currentTarget = fs.readlinkSync(aliasPath)
  const resolvedCurrentTarget = path.resolve(markdownDirPath, currentTarget)
  const isCorrectTarget = path.resolve(STATIC_CDN_ROOT) === resolvedCurrentTarget

  if (isCorrectTarget) {
    return {status: 'ok', path: aliasPath}
  }

  fs.unlinkSync(aliasPath)
  const symlinkType = process.platform === 'win32' ? 'junction' : 'dir'
  const symlinkTarget = process.platform === 'win32' ? STATIC_CDN_ROOT : relativeTarget
  fs.symlinkSync(symlinkTarget, aliasPath, symlinkType)
  return {status: 'updated', path: aliasPath}
}

function main() {
  const markdownDirs = walkDir(SRC_ROOT)
  const results = markdownDirs.map(ensureAliasLink)

  const created = results.filter((item) => item.status === 'created').length
  const updated = results.filter((item) => item.status === 'updated').length
  const ok = results.filter((item) => item.status === 'ok').length
  const skipped = results.filter((item) => item.status === 'skipped')

  console.log(`[cdn-links] markdown dirs: ${markdownDirs.length}`)
  console.log(`[cdn-links] created: ${created}, updated: ${updated}, ok: ${ok}`)

  if (skipped.length) {
    console.log('[cdn-links] skipped entries:')
    for (const item of skipped) {
      console.log(`- ${item.path} (${item.reason})`)
    }
  }
}

main()
