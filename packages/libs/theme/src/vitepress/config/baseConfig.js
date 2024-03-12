// @ts-check

/**
 * This file is intended to be required from VitePress
 * consuming project's config file.
 *
 * It runs in Node.js.
 */

// for local-linked development
const deps = ['@vue/theme', '@vueuse/core', 'body-scroll-lock']

/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  scrollOffset: ['header', '.VPLocalNav'],

  vite: {
    ssr: {
      noExternal: deps
    },
    optimizeDeps: {
      exclude: deps
    }
  },

  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/logo.svg'
      }
    ]
  ],

  markdown: {
    headers: {
      level: [2, 3]
    }
  },

  // @ts-ignore
  transformHead({ assets, pageData }) {
    const font = assets.find((file) =>
      /inter-roman-latin\.\w+\.woff2/.test(file)
    )
    const head = []

    head.push(['meta', { property: 'og:description', content: pageData.frontmatter.description || pageData.frontmatter.title }])
    head.push(['meta', { name: 'description', content: pageData.frontmatter.description || pageData.frontmatter.title }])

    if (font) {
      head.push(
        [
          'link',
          {
            rel: 'preload',
            href: font,
            as: 'font',
            type: 'font/woff2',
            crossorigin: ''
          }
        ]
      )
    }
    return head;
  },

  shouldPreload(link) {
    // make algolia chunk prefetch instead of preload
    return !link.includes('Algolia')
  }
}

module.exports = config
