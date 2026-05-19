#!/usr/bin/env bash
set -euo pipefail

BASE_URL="https://static-cdn.thanhlv.com"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_FILE="$ROOT_DIR/README.md"

cd "$ROOT_DIR"

tmp_file="$(mktemp)"

{
  cat <<'HEADER'
# Static CDN Image Index

Repository này lưu trữ asset tĩnh cho domain `https://static-cdn.thanhlv.com`.

## Cách cập nhật (dành cho AI/contributor)
1. Thêm hoặc xóa file ảnh trong repo.
2. Chạy lệnh: `bash scripts/generate-image-readme.sh`.
3. Commit thay đổi của `README.md` cùng asset mới.

Quy ước URL:
- File: `study/thanhlv-study-2026/perl.jpg`
- URL: `https://static-cdn.thanhlv.com/study/thanhlv-study-2026/perl.jpg`

## All Image Links (Grouped by Folder)
<!-- AUTO-GENERATED:START -->
HEADER

  find blog short-blog study -type f \
    \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.webp' -o -iname '*.svg' -o -iname '*.gif' \) \
    | LC_ALL=C sort \
    | awk -v base="$BASE_URL" '
      {
        file=$0;
        dir=file;
        sub(/\/[^\/]+$/, "", dir);
        if (dir != current_dir) {
          if (current_dir != "") print "";
          print "### " dir;
          current_dir=dir;
        }
        split(file, parts, "/");
        name=parts[length(parts)];
        url=base "/" file;
        print "- [" name "](" url ")";
      }
    '

  cat <<'FOOTER'
<!-- AUTO-GENERATED:END -->
FOOTER
} > "$tmp_file"

mv "$tmp_file" "$OUTPUT_FILE"
echo "Updated $OUTPUT_FILE"
