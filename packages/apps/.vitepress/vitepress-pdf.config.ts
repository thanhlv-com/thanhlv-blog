import { defineUserConfig } from 'vitepress-export-pdf'

export default defineUserConfig({
  pdfOptions: {
    displayHeaderFooter: false
  },
  urlOrigin: 'https://thanhlv.com/ '
})
