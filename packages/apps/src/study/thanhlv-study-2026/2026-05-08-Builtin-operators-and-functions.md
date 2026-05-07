---
footer: true
title: Builtin operators and functions trong Perl. Dùng đúng toán tử để tránh bug ngầm.
Description: .
authors: [ "lethanh" ]
date: 2026-05-08
outline: deep
image: https://static-cdn.thanhlv.com/study/thanhlv-study-2026/perl.jpg
draft: false
group: 1. Perl
---

[[TOC]]

# Builtin operators and functions trong Perl

Đây là phần ghi chú kiến thức mình học được khi làm việc với Perl: ngôn ngữ có sẵn rất nhiều hàm/toán tử, nhưng cần dùng **đúng loại theo ngữ cảnh** (số hay chuỗi) để không tạo bug khó thấy.

Bài này tóm tắt đúng nhóm toán tử phổ biến từ tài liệu và thêm ví dụ thực tế để bạn dùng an toàn hơn.

## 1. Builtin functions: bắt đầu từ `perldoc -f`

Perl có sẵn nhiều hàm như `print`, `sort`, `reverse`...

Khi quên cách dùng một hàm, tra cứu nhanh:

```bash
perldoc -f print
perldoc -f sort
perldoc -f reverse
```

Thói quen này giúp bạn đọc đúng behavior chuẩn thay vì đoán theo ngôn ngữ khác.

## 2. Toán học (Arithmetic)

Các toán tử cơ bản:

- `+` cộng
- `-` trừ
- `*` nhân
- `/` chia

Ví dụ:

```perl
use strict;
use warnings;

my $a = 10;
my $b = 3;

print $a + $b, "\n";  # 13
print $a - $b, "\n";  # 7
print $a * $b, "\n";  # 30
print $a / $b, "\n";  # 3.3333...
```

## 3. So sánh số (Numeric comparison)

Nhóm cho kiểu số:

- `==` bằng
- `!=` khác
- `<` nhỏ hơn
- `>` lớn hơn
- `<=` nhỏ hơn hoặc bằng
- `>=` lớn hơn hoặc bằng

Ví dụ:

```perl
my $x = 100;
my $y = 99;

print "equal\n" if $x == $y;
print "x lớn hơn y\n" if $x > $y;
```

## 4. So sánh chuỗi (String comparison)

Nhóm cho chuỗi:

- `eq` bằng
- `ne` khác
- `lt` nhỏ hơn
- `gt` lớn hơn
- `le` nhỏ hơn hoặc bằng
- `ge` lớn hơn hoặc bằng

Ví dụ:

```perl
my $s1 = "9";
my $s2 = "10";

print "string: s1 > s2\n" if $s1 gt $s2; # đúng theo thứ tự từ điển
print "number: s1 < s2\n" if $s1 < $s2;  # đúng theo số học
```

### Vì sao Perl tách riêng số và chuỗi?

Kinh nghiệm thực tế: Perl cần biết bạn muốn so sánh kiểu nào:

- **numeric**: `99 < 100` là đúng.
- **alphabetic/string**: `"100"` có thể đứng trước `"99"` theo thứ tự từ điển.

Đây là nguồn bug rất phổ biến khi xử lý input từ file/API vì nhiều giá trị đến dưới dạng chuỗi.

## 5. Logic boolean

Nhóm C-style:

- `&&` and
- `||` or
- `!` not

Perl cũng có dạng chữ:

- `and`
- `or`
- `not`

Lưu ý quan trọng: `and/or/not` có **precedence khác** `&&/||/!`.

Ví dụ dễ dính bug:

```perl
my $ok = 0;
$ok = 1 || 0;   # $ok = 1
$ok = 1 or 0;   # vẫn 1, nhưng cách parse expression khác
```

Khi viết biểu thức phức tạp, ưu tiên thêm ngoặc để rõ ý định.

## 6. Nhóm miscellaneous dùng hàng ngày

- `=` gán
- `.` nối chuỗi
- `x` lặp chuỗi
- `..` tạo range

Ví dụ:

```perl
my $name = "Thanh";
my $line = "=" x 20;

print "Hello, " . $name . "\n";
print $line, "\n";

my @nums = (1 .. 5);      # (1,2,3,4,5)
my @chars = ('a' .. 'e'); # (a,b,c,d,e)
```

## 7. Toán tử kết hợp với `=` (compound assignment)

Perl cho phép viết ngắn:

- `$x += 1` thay cho `$x = $x + 1`
- `$x -= 1` thay cho `$x = $x - 1`
- `$s .= "\n"` thay cho `$s = $s . "\n"`

Ví dụ:

```perl
my $count = 0;
$count += 2;  # 2
$count -= 1;  # 1

my $msg = "hello";
$msg .= " perl";
print "$msg\n"; # hello perl
```

## Checklist dùng operator an toàn

- So sánh số: dùng `==`, `!=`, `<`, `>`...
- So sánh chuỗi: dùng `eq`, `ne`, `lt`, `gt`...
- Biểu thức boolean dài: thêm ngoặc để tránh lỗi precedence.
- Khi không chắc hàm builtin: tra `perldoc -f <function>`.

## Kết luận

Nắm chắc nhóm operator builtin là nền tảng để đọc/viết Perl nhanh và ít lỗi.

Nếu phải nhớ một điều duy nhất: **đừng trộn so sánh số và so sánh chuỗi**. Chỉ riêng việc này đã giúp bạn tránh được nhiều bug ngầm trong script production.
