---
footer: true
title: Các syntax cơ bản của Perl.
Description: .
authors: [ "lethanh" ]
date: 2026-04-14
outline: deep
image: https://static-cdn.thanhlv.com/study/thanhlv-study-2025/2025-03-26-what-is-apache-cassandra/cassandra-la-gi-1.webp
draft: false
group: 1. Perl
---

[[TOC]]

# Các Syntax cơ bản của perl
## Hello :V
Code demo hiển thị "Hello Thanh" trên terminal bằng Perl.

```perl 
# demo.pl
#!/usr/bin/perl
use strict;
use warnings;
print "Hello Thanh\n";
```
Running:
```bash
perl demo.pl
Hello Thanh
```
## Biến trong Perl
###  Biến đơn Scalar $;

Biến đơn Scalar lưu trữ một giá trị đơn, có thể là số, chuỗi hoặc tham chiếu. Biến scalar bắt đầu bằng dấu `$`.

```perl
# demo.pl
#!/usr/bin/perl
use strict;
use warnings;
my $name = "Thanh";
my $age = 25;
# Biến đơn bắt đầu bằng $
print "$name is $age years old\n";
```
Running:
```bash
perl demo.pl
Thanh is 25 years old
```

### Biến mảng Array @;
Biến mảng Array lưu trữ một danh sách các giá trị. Biến mảng bắt đầu bằng dấu `@`.

```perl
# demo.pl
#!/usr/bin/perl
use strict;
use warnings;
my @numbers = (1, 2, 3, 4, 5, 1);
print "Array: $numbers\n";
print "First element: $numbers[0]\n"; # Truy cập phần tử đầu tiên
```
Running:
```bash
perl demo.pl
Array: 1 2 3 4 5 1
First element: 1
```

### Biến hash %;
Biến hash lưu trữ các cặp key-value. Biến hash bắt đầu bằng dấu `%`.

```perl
# demo.pl
#!/usr/bin/perl
use strict;
use warnings;

my %user =(
    name => "Thanh",
    age => 25
);
print "Hash: $user\n";
print "Name: $user{name}\n"; # Truy cập phần tử theo key
print "Age: $user{age}\n"; # Truy cập phần tử theo key
```
Running:
```bash
perl demo.pl
Hash: name => Thanh age => 25
Name: Thanh
Age: 25
```

## Cấu trúc điều khiển
### If-else

if-else là cấu trúc điều khiển cơ bản để thực hiện các hành động khác nhau dựa trên điều kiện.
Ví dụ: Nếu tuổi lớn hơn hoặc bằng 18 thì in "Bạn đủ tuổi", ngược lại in "Bạn chưa đủ tuổi".

```perl
# demo.pl
