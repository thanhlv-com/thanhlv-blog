import fs from 'fs'
import path from 'path'
import MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token.mjs'

export const CDN_ALIAS_PREFIX = '@cdn'
export const CDN_ORIGIN = 'https://static-cdn.thanhlv.com'
const STATIC_CDN_ROOT = path.resolve(__dirname, '../../libs/static-cdn')

interface CdnAliasOptions {
  isBuild: boolean
}

interface ResolveAliasOptions extends CdnAliasOptions {
  markdownRelativePath?: string
  validateLocalFile?: boolean
}

interface ParsedAlias {
  relativePath: string
  suffix: string
}

function safeDecode(input: string): string {
  try {
    return decodeURIComponent(input)
  } catch {
    return input
  }
}

function toSafeRelativePath(rawPath: string): string {
  const decoded = safeDecode(rawPath).replaceAll('\\', '/')
  const normalized = path.posix
    .normalize(`/${decoded}`)
    .replace(/^\/+/, '')

  if (!normalized || normalized.startsWith('..') || normalized.includes('/../')) {
    throw new Error(`[@cdn] Invalid path "${rawPath}"`)
  }

  return normalized
}

function toEncodedPath(relativePath: string): string {
  return relativePath
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')
}

function parseCdnAlias(url: string): ParsedAlias | null {
  if (!url.startsWith(CDN_ALIAS_PREFIX)) {
    return null
  }

  const remainder = url.slice(CDN_ALIAS_PREFIX.length)
  const boundary = remainder.search(/[?#]/)
  const pathPart = boundary === -1 ? remainder : remainder.slice(0, boundary)
  const suffix = boundary === -1 ? '' : remainder.slice(boundary)

  const relativePath = toSafeRelativePath(pathPart)

  return {
    relativePath,
    suffix
  }
}

function resolveLocalPath(relativePath: string, markdownRelativePath?: string): string {
  const absolutePath = path.resolve(STATIC_CDN_ROOT, relativePath)
  const outOfRoot = path
    .relative(STATIC_CDN_ROOT, absolutePath)
    .startsWith('..')

  if (outOfRoot) {
    throw new Error(`[@cdn] Invalid path "${relativePath}"`)
  }

  if (!fs.existsSync(absolutePath)) {
    const location = markdownRelativePath ? ` in "${markdownRelativePath}"` : ''
    throw new Error(
      `[@cdn] Missing asset "${relativePath}"${location}. Expected file at "${absolutePath}"`
    )
  }

  return absolutePath
}

export function resolveCdnAlias(
  url: string,
  {isBuild, markdownRelativePath, validateLocalFile = true}: ResolveAliasOptions
): string {
  const parsed = parseCdnAlias(url)
  if (!parsed) {
    return url
  }

  const absolutePath = resolveLocalPath(parsed.relativePath, markdownRelativePath)

  if (isBuild) {
    const encodedPath = toEncodedPath(parsed.relativePath)
    return `${CDN_ORIGIN}/${encodedPath}${parsed.suffix}`
  }

  if (!validateLocalFile) {
    return url
  }

  const normalizedAbsolutePath = absolutePath.replaceAll(path.sep, '/')
  return `/@fs${encodeURI(normalizedAbsolutePath)}${parsed.suffix}`
}

function rewriteAttr(
  token: Token,
  attrName: string,
  options: ResolveAliasOptions
) {
  const attrIndex = token.attrIndex(attrName)
  if (attrIndex < 0 || !token.attrs) {
    return
  }

  const current = token.attrs[attrIndex]?.[1]
  if (!current) {
    return
  }

  token.attrs[attrIndex][1] = resolveCdnAlias(current, options)
}

function rewriteHtmlContent(content: string, options: ResolveAliasOptions): string {
  return content.replace(
    /\b(src|href|poster)\s*=\s*(["'])(@cdn[^"']*)\2/gi,
    (_full, attrName, quote, rawValue) => {
      const resolved = resolveCdnAlias(rawValue, options)
      return `${attrName}=${quote}${resolved}${quote}`
    }
  )
}

function rewriteToken(token: Token, options: ResolveAliasOptions) {
  rewriteAttr(token, 'src', options)
  rewriteAttr(token, 'href', options)
  rewriteAttr(token, 'poster', options)

  if (token.type === 'html_block' || token.type === 'html_inline') {
    token.content = rewriteHtmlContent(token.content, options)
  }
}

export const cdnAliasPlugin = (md: MarkdownIt, {isBuild}: CdnAliasOptions) => {
  md.core.ruler.push('cdn_alias_rewriter', (state) => {
    const markdownRelativePath = state.env?.relativePath
    const options: ResolveAliasOptions = {
      isBuild,
      markdownRelativePath,
      validateLocalFile: true
    }

    for (const token of state.tokens) {
      rewriteToken(token, options)
      if (token.children) {
        for (const child of token.children) {
          rewriteToken(child, options)
        }
      }
    }
  })
}
