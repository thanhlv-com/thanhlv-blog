---
footer: true
title: Safety Net trong Perl. Viết script an toàn trước khi chạy production.
Description: .
authors: [ "lethanh" ]
date: 2026-05-07
outline: deep
image: https://static-cdn.thanhlv.com/study/thanhlv-study-2026/perl.jpg
draft: false
group: 1. Perl
---

[[TOC]]

# Safety Net trong Perl là gì?

"Safety net" là tập các lớp bảo vệ giúp script Perl **fail sớm, dễ debug, ít phá dữ liệu** khi gặp lỗi.

Khi viết script cho cron job, ETL, hoặc xử lý log, sai sót nhỏ có thể gây hậu quả lớn. Safety net giúp giảm rủi ro đó.

## 1. Lớp bảo vệ cơ bản: `strict` và `warnings`

Đây là cặp bắt buộc ở hầu hết script Perl hiện đại.

```perl
#!/usr/bin/perl
use strict;
use warnings;

my $name = "Thanh";
print "$nmae\n"; # typo biến
```

- `use strict;` bắt lỗi khai báo biến không hợp lệ.
- `use warnings;` cảnh báo hành vi đáng ngờ (uninitialized value, numeric/string mismatch...).

Không có 2 dòng này, script có thể chạy "im lặng" nhưng cho kết quả sai.

## 2. Validate input càng sớm càng tốt

Dữ liệu vào từ CLI, file, API đều cần kiểm tra.

```perl
use strict;
use warnings;

my $age = shift @ARGV;
die "Usage: perl app.pl <age>\n" unless defined $age;
die "Age must be a positive integer\n" unless $age =~ /^\d+$/ && $age > 0;

print "Valid age: $age\n";
```

Nguyên tắc: **không hợp lệ thì dừng ngay**, đừng cố chạy tiếp.

## 3. Xử lý lỗi rõ ràng với `die`, `warn`, `eval`

- `die`: lỗi nghiêm trọng, dừng chương trình.
- `warn`: cảnh báo, vẫn chạy tiếp.
- `eval`: bắt exception để xử lý theo ngữ cảnh.

```perl
use strict;
use warnings;

sub read_file {
    my ($path) = @_;
    open my $fh, '<', $path or die "Cannot open $path: $!";
    my @lines = <$fh>;
    close $fh;
    return \@lines;
}

my $lines;
eval {
    $lines = read_file('input.txt');
};

if ($@) {
    warn "Read file failed: $@";
    # fallback logic ở đây
}
```

## 4. Viết test tự động với `Test::More`

Test là safety net mạnh nhất khi refactor.

```perl
use strict;
use warnings;
use Test::More tests => 3;

sub add {
    my ($a, $b) = @_;
    return $a + $b;
}

is(add(1, 2), 3, '1 + 2 = 3');
is(add(-1, 1), 0, '-1 + 1 = 0');
isnt(add(2, 2), 5, '2 + 2 != 5');
```

Chạy:

```bash
perl test_add.pl
```

## 5. Bảo vệ dữ liệu khi ghi file

Không ghi đè trực tiếp nếu thao tác quan trọng.

Chiến lược an toàn:
- Ghi ra file tạm (`output.tmp`).
- Verify nội dung.
- Đổi tên file tạm thành file chính (`rename`) để thay thế atomic.

Cách này giúp tránh file hỏng dở dang khi script bị kill giữa chừng.

## 6. Logging đủ dùng để debug

Tối thiểu cần log:
- thời gian bắt đầu/kết thúc job,
- input chính,
- số bản ghi xử lý,
- lỗi theo ngữ cảnh.

Với script nhỏ, `warn` + redirect log đã đủ. Với hệ thống lớn hơn, dùng module logging để chuẩn hóa format.

## Checklist Safety Net cho script Perl

Trước khi đưa script vào cron hoặc production, tự check:

- Đã có `use strict;` và `use warnings;`.
- Input đã được validate.
- Mọi thao tác I/O có xử lý lỗi (`or die ...`).
- Có test cho logic quan trọng.
- Có logging để trace khi fail.
- Có kế hoạch rollback nếu script cập nhật dữ liệu.

## Kết luận

Perl rất mạnh cho automation và xử lý text, nhưng càng linh hoạt càng cần kỷ luật. Safety net chính là lớp kỷ luật đó.

Nếu làm đều 6 điểm trên, script Perl của bạn sẽ ổn định hơn rất nhiều: dễ bảo trì, dễ debug, và an toàn hơn khi chạy thật.
