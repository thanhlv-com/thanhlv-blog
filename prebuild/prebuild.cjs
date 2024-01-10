const fs = require('fs')

function overwritingFile(fileAPath, fileBPath) {
  try {
    // Read the content of file A synchronously
    const data = fs.readFileSync(fileAPath, 'utf-8')

    // Write the content of file A to file B, overwriting its content
    fs.writeFileSync(fileBPath, data, 'utf-8')

    console.log(`Content from file A successfully overwritten to file B.`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
  }
}

function main() {
  overwritingFile('./prebuild/VPNavBarTitle.vue', './node_modules/@vue/theme/src/vitepress/components/VPNavBarTitle.vue')
 overwritingFile('./prebuild/variables.css', './node_modules/@vue/theme/src/core/styles/variables.css')
}

main()
