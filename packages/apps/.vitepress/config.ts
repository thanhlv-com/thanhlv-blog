import fs from 'fs'
import path from 'path'
import { defineConfigWithTheme } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'
import { textAdPlugin } from './textAdMdPlugin'
// import { textAdPlugin } from './textAdMdPlugin'

const nav: ThemeConfig['nav'] = [
  {
    text: 'Blog',
    activeMatch: `^/blog/`,
    link: '/blog/gioi-thieu'
  }
]

const postBlogs = [
  {
    text: 'Thread ứng dụng phần mềm và Thread hardware CPU khác gì nhau',
    link: '/blog/2024-01-26-thread-ung-dung-phan-mem-va-thread-hardware-cpu-khac-gi-nhau'
  },
  {
    text: 'Thread safe, Lock object là gì ?',
    link: '/blog/2024-01-18-thread-safe-va-lock-object-la-gi'
  },
  {
    text: 'Sửa lỗi 404 khi deploy một số ứng dụng web Single Page Application với Nginx',
    link: '/blog/2024-01-17-sua-loi-404-khi-deploy-mot-so-ung-dung-web-single-page-application-voi-nginx'
  },
  {
    text: 'Sự khác biệt giữa import wildcard và import một class trong java',
    link: '/blog/2024-01-16-su-khac-biet-giua-import-wildcard-va-import-mot-class-trong-java'
  },
  {
    text: 'Thêm 10 triệu data vào cuối list với ArrayList và LinkedList trong java thì dùng cái nào nhanh hơn',
    link: '/blog/2024-01-11-them-10-trieu-data-vao-cuoi-list-voi-array-list-va-linked-list-trong-java-thi-dung-cai-nao-nhanh-hon'
  },
  {
    text: 'Concurrency và parallelism. Giải thích Concurrency và parallelism của OS và business khác gì nhau ?.',
    link: '/blog/2024-01-10-concurrency-va-parallelism-giai-thich-concurrency-va-parallelism-cua-os-va-business-khac-gi-nhau'
  },
  {
    text: 'CPU, CORE và Thread khác gì nhau ?',
    link: '/blog/2024-01-09-cpu-core-and-thread-khac-gi-nhau'
  }
]

export const sidebar: ThemeConfig['sidebar'] = {
  '/blog/': [
    {
      text: '',
      items: [
        { text: 'Giới thiệu', link: '/blog/gioi-thieu' },
        ...postBlogs
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

  head: [
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['meta', { property: 'og:url', content: 'https://thanhlv.com/' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'thanhlv.com' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Thanhlv - Yêu công nghệ'
      }
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: 'images/logo_thanhlv.png'
      }
    ],
    ['meta', { name: 'twitter:site', content: '@vuejs' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://sponsors.vuejs.org'
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
        src: 'https://vueschool.io/banner.js?affiliate=vuejs&type=top',
        async: 'true'
      }
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