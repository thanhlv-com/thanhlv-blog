# Blog Cá Nhân của Thành LV

## 📖 Giới Thiệu
Blog cá nhân của Lê Văn Thành - nơi chia sẻ những kiến thức, kinh nghiệm và học hỏi trong hành trình phát triển phần mềm. Đây là kho tàng lưu trữ các bài viết về:

- **Kiến trúc phần mềm và Design Patterns**
- **Công nghệ Backend**: Java, Spring Boot, Kafka, Cassandra, Kubernetes
- **Hệ thống phân tán và Performance**
- **Kinh nghiệm thực tế từ dự án**
- **Tài liệu học tập và ghi chú cá nhân**

## 🚀 Công Nghệ Sử Dụng

### Framework & Build Tools
- **[VitePress](https://vitepress.vuejs.org/)** - Static Site Generator dựa trên Vue 3
- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript Framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Development & Deployment
- **[Node.js](https://nodejs.org/)** (≥14.0.0) - JavaScript Runtime
- **[PNPM](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[GitHub Actions](https://docs.github.com/en/actions)** - CI/CD Pipeline
- **[GitHub Pages](https://docs.github.com/en/pages)** - Static Hosting
- **[Docker](https://www.docker.com/)** - Containerization

### Content & Documentation
- **[Markdown](https://www.markdownguide.org/)** - Content Writing
- **[Puppeteer](https://pptr.dev/)** - PDF Export cho CV
- **[Gray Matter](https://github.com/jonschlinkert/gray-matter)** - Front Matter Parser

## 🛠️ Cài Đặt và Chạy Local

### Yêu Cầu Hệ Thống
- Node.js ≥ 14.0.0
- PNPM (được cài đặt tự động)
- Git

### Cài Đặt
```bash
# Clone repository
git clone git@github.com:thanhlv-com/thanhlv-blog.git
cd thanhlv-blog

# Cài đặt dependencies
make ci
# hoặc
yarn run ci
```

### Chạy Development Server
```bash
# Khởi động server development
make dev
# hoặc
yarn run dev

# Server sẽ chạy tại http://localhost:5173
```

### Build Production
```bash
# Build cho GitHub Pages
make build-app
# hoặc
yarn run build_github
```

### Chạy với Docker
```bash
# Khởi động container local
make docker-local
# hoặc
docker compose up -d
```

## 📁 Cấu Trúc Dự Án

```
thanhlv-blog/
├── packages/
│   ├── apps/                    # Ứng dụng chính
│   │   ├── src/
│   │   │   ├── blog/           # Bài viết blog chính
│   │   │   ├── short-blog/     # Bài viết ngắn
│   │   │   ├── study/          # Bài viết học tập
│   │   │   ├── about/          # Thông tin cá nhân
│   │   │   └── public/         # Static assets
│   │   ├── script/             # Build scripts
│   │   └── .vitepress/         # VitePress config
│   └── libs/
│       └── theme/              # Custom theme
├── Makefile                    # Build commands
├── docker-compose.yml          # Docker configuration
└── pnpm-workspace.yaml         # PNPM workspace config
```

## ✍️ Viết Bài Mới

### Blog Posts
Tạo file markdown trong thư mục tương ứng:
- **Blog chính**: `packages/apps/src/blog/YYYY-MM-DD-ten-bai-viet.md`
- **Short blog**: `packages/apps/src/short-blog/YYYY-MM-DD-ten-bai-viet.md`
- **Study notes**: `packages/apps/src/study/[category]/ten-bai-viet.md`

### Front Matter Format
```yaml
---
title: "Tiêu đề bài viết"
date: "2025-01-01"
description: "Mô tả ngắn gọn"
authors: [ "lethanh" ]
---
```

## 🌐 Live 

Trang web được deploy tự động tại: [https://thanhlv.com](https://thanhlv.com)

## 📧 Liên Hệ

- **Website**: [thanhlv.com](https://thanhlv.com)
- **Email**: lethanh9398@gmail.com
- **LinkedIn**: [Lê Văn Thành](https://linkedin.com/in/thanhlv)

