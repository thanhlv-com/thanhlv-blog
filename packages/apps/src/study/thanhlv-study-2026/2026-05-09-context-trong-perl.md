---
footer: true
title: Context trong Perl
description: Context là khái niệm cốt lõi trong Perl, ảnh hưởng tới cách biểu thức được đánh giá và trả về kết quả khác nhau tùy vào ngữ cảnh sử dụng.
authors: ["lethanh"]
date: 2026-05-09
outline: deep
image: https://static-cdn.thanhlv.com/study/thanhlv-study-2026/perl.jpg
draft: false
group: 1. Perl
---

[[TOC]]

# Context trong Perl

`Context` là một khái niệm cốt lõi trong Perl: cùng một biểu thức có thể cho kết quả khác nhau tùy vào ngữ cảnh nơi nó được dùng.

Ba loại context phổ biến là:
- `scalar context`
- `list context`
- `void context`

## 1. Scalar context

Trong `scalar context`, biểu thức được kỳ vọng trả về một giá trị đơn.

```perl
my @array = (1, 2, 3);
my $count = @array;     # @array ở scalar context -> số phần tử
print "$count\n";      # 3
```

Một ví dụ khác rất hay gây nhầm:

```perl
my $x = (10, 20, 30);   # Toán tử comma trong scalar context -> phần tử cuối
print "$x\n";          # 30
```

Lưu ý: không phải "nhiều giá trị thì lấy phần tử đầu tiên"; trong ví dụ comma operator ở scalar context, Perl lấy **giá trị cuối**.

## 2. List context

Trong `list context`, biểu thức được kỳ vọng trả về danh sách giá trị.

```perl
my @array = (1, 2, 3);
my @copy = @array;      # @array ở list context -> toàn bộ phần tử
print join(", ", @copy), "\n";  # 1, 2, 3
```

List context thường xuất hiện khi gán cho mảng, truyền danh sách đối số, hoặc khi dùng các hàm kỳ vọng danh sách.

## 3. Void context

`Void context` là khi kết quả biểu thức bị bỏ qua.

```perl
sub compute {
    return 99;
}

compute();  # gọi hàm nhưng bỏ qua giá trị trả về -> void context
```

`Void context` hữu ích khi bạn chỉ cần side effect (ví dụ: ghi log, cập nhật state), không cần dùng kết quả trả về.

## `wantarray` để nhận biết context

`wantarray` giúp hàm biết nó đang được gọi trong context nào:
- `undef`: void context
- `true`: list context
- `false` (defined nhưng falsy): scalar context

```perl
sub example {
    if (!defined wantarray) {
        print "Void context\n";
        return;
    }

    if (wantarray) {
        return (1, 2, 3);   # list context
    }

    return 42;              # scalar context
}

my @list = example();       # (1, 2, 3)
my $scalar = example();     # 42
example();                  # in "Void context"
```

## Kết luận

Hiểu đúng context giúp bạn:
- dự đoán chính xác giá trị trả về
- tránh bug do dùng sai kiểu ngữ cảnh
- viết hàm linh hoạt hơn với `wantarray`

Khi đọc hoặc viết Perl, luôn tự hỏi: "Biểu thức này đang ở scalar, list hay void context?".
