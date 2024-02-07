import { defineUserConfig } from 'vitepress-export-pdf'

export default defineUserConfig({
  pdfOptions: {
    displayHeaderFooter: false
  },
  routePatterns: ['/about/author/thanhlv-vi.html'],
  urlOrigin: 'https://thanhlv.com/ ',
  outDir:'./src/public',
  outFile:"thanhlv-vi-cv.pdf"
})
