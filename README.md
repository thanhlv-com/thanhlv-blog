# 📚 Blog Cá Nhân của Thành LV

## 📖 Giới Thiệu

Blog cá nhân của **Lê Văn Thành** - một Software Engineer với niềm đam mê công nghệ và chia sẻ kiến thức. Đây là nơi tôi ghi chép, chia sẻ những kiến thức, kinh nghiệm và học hỏi trong hành trình phát triển phần mềm.

### 🎯 Mục tiêu của Blog
- **Chia sẻ kiến thức**: Từ những khái niệm cơ bản đến các kỹ thuật nâng cao
- **Ghi chép học tập**: Lưu trữ quá trình học hỏi và nghiên cứu
- **Kinh nghiệm thực tế**: Những bài học từ các dự án thực tế
- **Xây dựng cộng đồng**: Kết nối với những người có cùng đam mê

### 📚 Nội dung chính
- **🏗️ Kiến trúc phần mềm & Design Patterns**: Các mô hình thiết kế, kiến trúc hệ thống
- **⚙️ Backend Technologies**: Java, Spring Boot, Apache Kafka, Apache Cassandra
- **☸️ DevOps & Infrastructure**: Docker, Kubernetes, CI/CD
- **🚀 Distributed Systems**: Hệ thống phân tán, microservices, performance
- **📊 Database & Data**: NoSQL, SQL, data modeling, optimization
- **🔒 Security**: Best practices, authentication, authorization
- **💡 Problem Solving**: Troubleshooting, debugging, optimization
- **📖 Learning Notes**: Ghi chú từ sách, khóa học, conference

## 🛠️ Công Nghệ Sử Dụng

### 🎨 Frontend Framework
- **[VitePress](https://vitepress.vuejs.org/)** `v1.6.3` - Modern static site generator
- **[Vue 3](https://vuejs.org/)** `v3.5.17` - Progressive JavaScript framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development

### 🏗️ Development Stack
- **[Node.js](https://nodejs.org/)** `≥14.0.0` - JavaScript runtime environment
- **[PNPM](https://pnpm.io/)** - Efficient package manager
- **PNPM Workspace** - Monorepo management

### 🚀 DevOps & Deployment
- **[Docker](https://www.docker.com/)** & **Docker Compose** - Containerization
- **[GitHub Actions](https://docs.github.com/en/actions)** - Automated CI/CD pipeline
- **[GitHub Pages](https://docs.github.com/en/pages)** - Static site hosting
- **[Netlify](https://www.netlify.com/)** - Alternative deployment platform

### 📝 Content Management
- **[Markdown](https://www.markdownguide.org/)** - Content authoring
- **[Gray Matter](https://github.com/jonschlinkert/gray-matter)** - Front matter parsing
- **[Markdown-it](https://markdown-it.github.io/)** - Markdown processing
- **[UML Support](https://github.com/manastalukdar/markdown-it-textual-uml)** - Diagram rendering

### 🎭 Additional Features  
- **[Puppeteer](https://pptr.dev/)** `v24.14.0` - PDF generation for CV
- **[@vue/repl](https://github.com/vuejs/repl)** - Interactive code playground
- **[GSAP](https://gsap.com/)** - Advanced animations
- **Custom Vue Theme** - Tailored design system

## 🚀 Hướng Dẫn Cài Đặt & Phát Triển

### 📋 Yêu Cầu Hệ Thống
- **Node.js** `≥ 14.0.0` ([Tải về](https://nodejs.org/))
- **Git** ([Cài đặt Git](https://git-scm.com/downloads))
- **PNPM** (sẽ được cài đặt tự động)

### 🔧 Cài Đặt Dự Án

#### 1. Clone Repository
```bash
# Clone dự án về máy local
git clone https://github.com/thanhlv-com/thanhlv-blog.git
cd thanhlv-blog
```

#### 2. Cài Đặt Dependencies
```bash
# Sử dụng Makefile (khuyến nghị)
make ci

# Hoặc sử dụng trực tiếp yarn
yarn run ci

# Hoặc cài đặt thủ công
npm install -g pnpm
pnpm install
```

### 💻 Development Workflow

#### 🏃‍♂️ Khởi động Development Server
```bash
# Sử dụng Makefile
make dev

# Hoặc sử dụng yarn
yarn run dev

# Server sẽ khởi chạy tại: http://localhost:5173
```

#### 🏗️ Build Production
```bash
# Build cho deployment (GitHub Pages)
make build-app

# Hoặc sử dụng yarn
yarn run build_github

# Output: ./build/ directory
```

#### 🐳 Chạy với Docker
```bash
# Khởi động môi trường Docker
make docker-local

# Hoặc sử dụng Docker Compose trực tiếp
docker compose up -d

# Dừng container
docker compose down
```

#### 🔍 Preview Build
```bash
# Xem trước bản build production
cd packages/apps
pnpm run preview
```

## 📁 Kiến Trúc Dự Án

### 🗂️ Tổng Quan Cấu Trúc
```
thanhlv-blog/                           # Root directory
├── 📦 packages/                        # PNPM Workspace
│   ├── 🚀 apps/                       # Main application
│   │   ├── 📝 src/                    # Source content
│   │   │   ├── 📖 blog/              # Main blog posts
│   │   │   ├── ⚡ short-blog/         # Short articles
│   │   │   ├── 📚 study/             # Learning materials
│   │   │   │   ├── thanhlv-study-2024/
│   │   │   │   ├── thanhlv-study-2025/
│   │   │   │   ├── thanhlv-ptit-hoc-online/
│   │   │   │   └── tieng-anh/
│   │   │   ├── 👤 about/             # Personal info & CV
│   │   │   ├── 🌐 public/            # Static assets
│   │   │   └── 📄 index.md           # Homepage
│   │   ├── ⚙️ .vitepress/            # VitePress configuration
│   │   │   ├── config.ts             # Main config
│   │   │   ├── cache/                # Generated sidebars
│   │   │   └── theme/                # Custom theme extensions
│   │   ├── 🔧 script/                # Build & generation scripts
│   │   │   ├── index.js              # Main build script
│   │   │   ├── blogs.js              # Blog processing
│   │   │   ├── short-blog.js         # Short blog processing
│   │   │   ├── study/                # Study content processing
│   │   │   └── about/                # About page processing
│   │   ├── 📄 package.json           # App dependencies
│   │   └── 🐳 netlify.toml          # Netlify config
│   └── 🎨 libs/
│       └── theme/                     # Custom Vue theme
│           ├── src/                   # Theme components
│           ├── demo/                  # Theme demo
│           └── package.json           # Theme dependencies
├── 🔨 Makefile                        # Build automation
├── 🐳 docker-compose.yml              # Container orchestration
├── 📦 package.json                    # Root dependencies
├── 📝 pnpm-workspace.yaml             # Workspace configuration
└── 🗒️ README.md                      # Documentation
```

### 🎯 Các Module Chính

#### 📖 Blog Content Structure
- **`/blog/`** - Bài viết dài, chi tiết về kỹ thuật
- **`/short-blog/`** - Bài viết ngắn, chia sẻ nhanh
- **`/study/`** - Tài liệu học tập có cấu trúc
- **`/about/`** - Thông tin cá nhân, CV, portfolio

#### 🛠️ Build System
- **`script/`** - Auto-generation cho sidebar, content processing
- **`.vitepress/`** - Configuration, theme customization
- **`cache/`** - Generated metadata và navigation

## ✍️ Hướng Dẫn Viết Bài

### 📝 Content Guidelines

#### 🗂️ File Organization
```bash
# Blog posts (chi tiết, kỹ thuật)
packages/apps/src/blog/YYYY-MM-DD-tieu-de-bai-viet.md

# Short blog posts (chia sẻ nhanh)
packages/apps/src/short-blog/YYYY-MM-DD-tieu-de-ngan.md

# Study materials (có cấu trúc)
packages/apps/src/study/[category]/ten-bai-hoc.md
```

#### 📋 Front Matter Template
```yaml
---
title: "Tiêu đề bài viết"               # Bắt buộc
date: "2025-01-01"                      # Format: YYYY-MM-DD
description: "Mô tả ngắn gọn cho SEO"   # Tối đa 160 ký tự
authors: ["lethanh"]                    # Array of authors
tags: ["java", "spring", "backend"]     # Optional tags
categories: ["tutorial", "guide"]       # Optional categories
draft: false                            # true để ẩn bài viết
featured: false                         # true để highlight
---
```

#### 🎨 Markdown Features
- ✅ **Standard Markdown** - Headers, lists, links, images
- ✅ **Code Syntax Highlighting** - Multiple language support
- ✅ **UML Diagrams** - PlantUML, Mermaid support
- ✅ **Math Expressions** - KaTeX for mathematical formulas
- ✅ **Custom Containers** - Tips, warnings, info boxes
- ✅ **Vue Components** - Interactive elements

#### 🖼️ Asset Management
```bash
# Images cho blog posts
packages/apps/src/blog/images/YYYY-MM-DD-ten-bai/image.png

# Images cho short blog
packages/apps/src/short-blog/images/YYYY-MM-DD-ten-bai/image.png

# Shared assets
packages/apps/src/public/images/shared/
```

```md
# CDN alias cho markdown trong packages/apps/src
![ảnh](@cdn/blog/images/2025-07-08-lam-cach-nao-de-nhieu-container-dung-chung-mot-network-k8s/img.png)

# Frontmatter phải bọc nháy vì YAML không cho giá trị bắt đầu bằng @
image: "@cdn/study/thanhlv-study-2026/perl.jpg"
```

- `@cdn/...` sẽ được kiểm tra file thực tế trong `packages/libs/static-cdn`.
- Khi chạy local (`vitepress dev`) link được trỏ về file local qua `@fs`.
- Khi build (`vitepress build`) link tự động đổi thành `https://static-cdn.thanhlv.com/...`.

## 🚀 Deployment & Production

### 🌐 Live Website
Blog được deploy tự động tại: **[https://thanhlv.com](https://thanhlv.com)**

### 🔄 CI/CD Pipeline
- **Automatic Deployment**: GitHub Actions + GitHub Pages
- **Build Triggers**: Push to `main` branch
- **Performance Optimization**: Static site generation với Vite
- **CDN**: GitHub Pages CDN cho tốc độ tải nhanh

### 📊 Features & Capabilities
- 🔍 **SEO Optimized** - Meta tags, structured data, sitemap
- 📱 **Responsive Design** - Mobile-first approach
- ⚡ **Performance** - Lazy loading, code splitting, optimized assets  
- 🌙 **Dark/Light Mode** - User preference support
- 🔎 **Search Functionality** - Full-text search across all content
- 📖 **Reading Experience** - Clean typography, progress indicators
- 💾 **PDF Export** - CV và document export capability
- 🏷️ **Content Organization** - Tags, categories, series
- 📝 **Commenting System** - GitHub-based discussions
- 📈 **Analytics Ready** - Google Analytics integration

## 🤝 Contribution & Development

## Repository Guidelines

### Cấu Trúc Dự Án & Tổ Chức Module
Repository này dùng PNPM workspace với 2 package chính:
- `packages/apps`: website VitePress (nội dung, cấu hình site, script build).
- `packages/libs/theme`: component và style theme Vue dùng chung/tùy biến.

Nội dung chính nằm trong `packages/apps/src`: `blog/`, `short-blog/`,
`study/`, `about/`, và tài nguyên `public/`.
Script tự động hóa nằm ở `packages/apps/script`, cấu hình VitePress ở
`packages/apps/.vitepress`.
`packages/apps/.vitepress/cache` là thư mục sinh tự động; ưu tiên sửa nội
dung nguồn và script.

### Lệnh Build, Test, và Phát Triển
- `make ci` hoặc `yarn run ci`: cài PNPM và toàn bộ dependency của workspace.
- `make dev` hoặc `yarn run dev`: chạy prebuild script và khởi động VitePress local (`http://localhost:5173`).
- `make build-app` hoặc `yarn run build_github`: build production ra `./build`.
- `cd packages/apps && pnpm run preview`: xem trước bản build local.
- `cd packages/libs/theme && pnpm run test`: chạy kiểm tra theme (`prettier` + `tsc --noEmit`).

### Quy Ước Code & Đặt Tên
Dùng mặc định trong `.editorconfig`: UTF-8, LF, indent 2 spaces, xóa khoảng
trắng cuối dòng (trừ Markdown).
Quy tắc Prettier ở cả hai package: `semi: false`, `singleQuote: true`,
`trailingComma: none` (`printWidth` 75 cho app, 80 cho theme).

Mẫu đặt tên:
- File nội dung: `YYYY-MM-DD-slug.md` (ví dụ: `2026-04-14-cac-syntax-co-ban-cua-perl.md`).
- Vue component: PascalCase (ví dụ: `VPNavBar.vue`).
- Script: tên chữ thường, rõ nghĩa trong `packages/apps/script`.

### Hướng Dẫn Testing
`packages/apps` chưa có bộ unit test tổng quát; kiểm tra chủ yếu dựa trên
build.
Trước khi mở PR, chạy:
1. `yarn run build_github`
2. `cd packages/libs/theme && pnpm run test` (khi có thay đổi ở theme)

Nếu chỉnh logic tạo navigation hoặc nội dung tự sinh, cần kiểm tra hiển thị
bằng `make dev`.

### Quy Ước Commit & Pull Request
Lịch sử gần đây ưu tiên commit ngắn, dạng mệnh lệnh, có thể có scope, ví dụ:
- `docs(study): expand Perl basics guide...`
- `update my note`
- `Add privacy policy and improve sidebar control (#98)`

PR nên theo template `packages/apps/.github/pull_request_template.md`:
- `Description of Problem`
- `Proposed Solution`
- `Additional Information`

Giữ PR tập trung vào một mục tiêu, đính kèm issue liên quan, và thêm
screenshot nếu thay đổi giao diện/theme.

### 📚 Learning Resources
- **VitePress Documentation**: [vitepress.dev](https://vitepress.dev)
- **Vue 3 Guide**: [vuejs.org/guide/](https://vuejs.org/guide/)
- **Markdown Guide**: [markdownguide.org](https://www.markdownguide.org/)

### 🐛 Issue Reporting
Nếu bạn phát hiện lỗi hoặc có đề xuất cải thiện:
1. Mở [GitHub Issues](https://github.com/thanhlv-com/thanhlv-blog/issues)
2. Mô tả chi tiết vấn đề
3. Cung cấp steps to reproduce
4. Attach screenshots nếu cần thiết

## 📞 Liên Hệ & Kết Nối

### 👤 Thông Tin Cá Nhân
- **Tác giả**: Lê Văn Thành
- **Vai trò**: Software Engineer, Backend Developer
- **Chuyên môn**: Java, Spring Boot, Distributed Systems, DevOps

### 🌐 Kênh Liên Lạc
- **🌐 Website**: [thanhlv.com](https://thanhlv.com)
- **📧 Email**: [lethanh9398@gmail.com](mailto:lethanh9398@gmail.com)
- **💼 LinkedIn**: [Lê Văn Thành](https://linkedin.com/in/thanhlv)
- **🐙 GitHub**: [@thanhlv-com](https://github.com/thanhlv-com)


## 📄 License & Attribution

### 📜 License Information
- **Content License**: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) - Chia sẻ với ghi nguồn
- **Code License**: [MIT License](https://opensource.org/licenses/MIT) - Open source
- **Theme**: Custom theme dựa trên [@vue/theme](https://github.com/vuejs/vue-theme)

### 🙏 Acknowledgments
- **VitePress Team** - Framework tuyệt vời cho static site generation
- **Vue.js Community** - Ecosystem và documentation xuất sắc  
- **Open Source Contributors** - Tất cả các thư viện và tools được sử dụng
- **Tech Community Vietnam** - Inspiration và support

---

<div align="center">

**📚 Happy Learning & Sharing Knowledge! 🚀**

*Được xây dựng với ❤️ bởi [Thành LV](https://thanhlv.com) | Powered by [VitePress](https://vitepress.dev)*

</div>
