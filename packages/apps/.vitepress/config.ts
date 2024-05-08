import fs from 'fs'
import path from 'path'
import { defineConfigWithTheme, HeadConfig } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'
import blogsSidebar from './cache/sidebar/blogs-sidebar.json'
import thanhlvStudy2024Sidebar from './cache/sidebar/study/thanhlv-study-2024-sidebar.json'

const nav: ThemeConfig['nav'] = [
  {
    text: 'Blog',
    activeMatch: `^/blog/`,
    link: '/blog/gioi-thieu'
  },
  {
    text: 'Study',
    activeMatch: `^/study/`,
    items: [
      { text: 'Học tập BE Thanhlv 2024', link: '/study/thanhlv-study-2024/gioi-thieu-ve-muc-tieu-hoc-tap-be-nam-2024-cua-thanh-lv' },
    ]
  },
  {
    text: 'About',
    activeMatch: `^/about/`,
    items: [
      { text: 'Thanhlv', link: '/about/author/thanhlv-vi' },
    ]
  },
]

export const sidebar: ThemeConfig['sidebar'] = {
  '/blog/': [
    {
      text: '',
      items: [
        { text: 'Giới thiệu', link: '/blog/gioi-thieu' },
        ...blogsSidebar
      ]
    }
  ],
  '/study/thanhlv-study-2024': [
    ...thanhlvStudy2024Sidebar
  ],
  '/about/author/thanhlv': [
    {
      "text": "Thông tin",
      "items": [
        {
          "text": "Cv Vietnames",
          "link": "/about/author/thanhlv-vi",
        }
      ]
    },
    {
      "text": "Note",
      "items": [
        {
          "text": "My note",
          "link": "/about/author/thanhlv/my-note.html",
        }
      ]
    }
  ]
}

// Placeholder of the i18n config for @vuejs-translations.
// const i18n: ThemeConfig['i18n'] = {
// }

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,
  lastUpdated: true,
  lang: 'en-US',
  title: 'Thanhlv',
  description: 'Thanhlv - Yêu công nghệ',
  srcDir: 'src',
  srcExclude: ['tutorial/**/description.md'],
  sitemap: {
    hostname: 'https://thanhlv.com/',
    lastmodDateOnly: false
  },
  head: [
    ['meta', { name: 'viewport', content: 'viewport-fit=contain, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=10.0, user-scalable=yes' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['meta', { property: 'og:url', content: 'https://thanhlv.com/' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Thanhlv - Yêu công nghệ' }],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://thanhlv.com/images/logo.png'
      }
    ],
    ['meta', { name: 'twitter:site', content: '@thanhlv' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        href: 'https://thanhlv.com/images/logo.png'
      }
    ],
    [
      'script',
      {},
      fs.readFileSync(
        path.resolve(__dirname, './inlined-scripts/restorePreference.js'),
        'utf-8'
      )
    ],
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'XNOLWPLB',
        'data-spa': 'auto',
        defer: ''
      }
    ],
    [
      'script',
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=G-DHC69X8F8N',
        async: ''
      }
    ],
    [
      'script',
      {},
      "  window.dataLayer = window.dataLayer || [];\n" +
      "  function gtag(){dataLayer.push(arguments);}\n" +
      "  gtag('js', new Date());\n" +
      "\n" +
      "  gtag('config', 'G-DHC69X8F8N');"
    ]
  ],

  themeConfig: {
    nav,
    sidebar,
    algolia: {
      indexName: 'thanhlv',
      appId: 'O2PN3Z02M2',
      apiKey: 'b8303151f5f69276a688c1531f5cc803',
      placeholder:"Tìm kiếm",
      translations : {
      button:{
        buttonText:"Tìm kiếm",
        buttonAriaLabel:"Tìm kiếm"
      },
      modal:{
          searchBox:{
              resetButtonTitle:"Xóa tìm kiếm",
              resetButtonAriaLabel:"Xóa tìm kiếm",
              cancelButtonText:"Hủy tìm kiếm",
              cancelButtonAriaLabel:"Hủy tìm kiếm",
          },
          startScreen: {
              recentSearchesTitle: 'Gần đây',
              noRecentSearchesText: 'Không có tìm kiếm gần đây',
              saveRecentSearchButtonTitle: 'Lưu kết quả tìm kiếm này',
              removeRecentSearchButtonTitle: 'Xóa tìm kiếm này khỏi lịch sử',
              favoriteSearchesTitle: 'Yêu thích',
              removeFavoriteSearchButtonTitle: 'Xóa tìm kiếm này khỏi mục yêu thích',
          },
          errorScreen: {
              titleText: 'Không tìm thấy kết quả',
              helpText: 'Dữ liệu không tồn tại hoặc kết nối mạng của bạn có vấn đề, vui lòng kiểm tra',
          },
          footer:{
              selectText:"Chọn để đọc",
              navigateText:"Điều hướng",
              closeText:"Đóng",
              searchByText:"Tìm kiểm bởi",
          },
          noResultsScreen: {
              noResultsText: 'Không có kết quả cho',
              suggestedQueryText: 'Hãy thử tìm kiếm',
              reportMissingResultsText: 'Bạn tin rằng truy vấn này sẽ trả về kết quả?',
              reportMissingResultsLinkText: 'Hãy cho tôi biết.',
          },
      }
      }
    },

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/' },
    //   { icon: 'twitter', link: 'https://twitter.com/vuejs' },
    //   { icon: 'discord', link: 'https://discord.com/invite/HBherRA' }
    // ],

    i18n: {
      toc:"Trên trang này",
      previous:"Bài trước",
      next:"Bài tiếp theo",
      search:"Tìm kiếm",
      returnToTop:"Cuộn lên đầu trang"
    },

    editLink: {
      repo: 'thanhlv-it/thanhlv-blog',
      appFolder: 'packages/apps',
      text: 'Chỉnh sửa trang này trên GitHub'
    },
    footer: {
      license: {
        text: 'MIT License',
        link: 'https://opensource.org/licenses/MIT'
      },
      copyright: `Copyright © 2022-${new Date().getFullYear()} ThanhLv`
    }
  },

  markdown: {
    config(md) {
      md.use(headerPlugin)
      // .use(textAdPlugin)
    },
    toc: {
      level: [2, 3, 4, 5, 6, 7, 8, 9]
    },
    anchor: {
      level: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    headers:{
      level: [2, 3, 4, 5, 6, 7, 8, 9]
    }
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    optimizeDeps: {
      include: ['gsap', 'dynamics.js'],
      exclude: ['@vue/repl']
    },
    // @ts-ignore
    ssr: {
      external: ['@vue/repl']
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ['../..']
      }
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    }
  }
})
