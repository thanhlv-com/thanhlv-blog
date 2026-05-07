---
footer: true
title: Context trong Perl
Description: .
authors: [ "lethanh" ]
date: 2026-05-09
outline: deep
image: https://static-cdn.thanhlv.com/study/thanhlv-study-2026/perl.jpg
draft: false
group: 1. Perl
---

[[TOC]]

# Context trong Perl
Trong perl context là một khái niệm rất quan trọng để hiểu cách một biểu thức được đánh giá và trả về kết quả. Perl có ba loại context chính: scalar context, list context, và void context.

Mỗi loại context sẽ ảnh hưởng đến cách một biểu thức được xử lý và kết quả mà nó trả về.

## 1. Scalar context
Khi một biểu thức được đánh giá trong scalar context và nó trả về một giá trị duy nhất, giá trị đó sẽ được trả về. Nếu biểu thức trả về nhiều giá trị, chỉ giá trị đầu tiên sẽ được trả về.
Ví dụ:
```perl
my @array = (1, 2, 3);
my $scalar = @array;  # Scalar context, trả về số lượng phần tử trong
print $scalar;  # Output: 3
```
### Tại sao lại trả về 3?
Trong ví dụ trên, khi chúng ta đánh giá `@array` trong scalar context, Perl trả về số lượng phần tử trong mảng, đó là 3. Đây là một đặc điểm của scalar context khi áp dụng cho một mảng.

## 2. List context
Khi một biểu thức được đánh giá trong list context, nó sẽ trả về tất cả các giá trị mà nó có thể trả về. Nếu biểu thức chỉ trả về một giá trị, nó sẽ được trả về dưới dạng một danh sách có một phần tử.
Ví dụ:
```perl
my @array = (1, 2, 3);
my @list = @array;  # List context, trả về tất cả phần tử trong
print join(", ", @list);  # Output: 1, 2, 3
```
### Tại sao lại trả về 1, 2, 3?
Trong ví dụ trên, khi chúng ta đánh giá `@array` trong list context, Perl trả về tất cả các phần tử trong mảng dưới dạng một danh sách. Do đó, kết quả là 1, 2, 3.

## 3. Void context
Khi một biểu thức được đánh giá trong void context, nó sẽ không trả về bất kỳ giá trị nào. Void context thường được sử dụng khi bạn muốn thực hiện một hành động mà không cần quan tâm đến kết quả trả về.
Ví dụ:
```perl
my @array = (1, 2, 3);
print @array;  # Void context, không trả về giá trị nào
```
### Tại sao lại không trả về giá trị nào?
Trong ví dụ trên, khi chúng ta đánh giá `@array` trong void context, Perl không trả về bất kỳ giá trị nào. Thay vào đó, nó chỉ thực hiện hành động in ra các phần tử của mảng mà không trả về một giá trị cụ thể nào.

Đây là đặc điểm của void context, nơi kết quả của biểu thức không được sử dụng hoặc lưu trữ.



## Ví dụ wantarray
Hàm `wantarray` trong Perl được sử dụng để xác định loại context mà một biểu thức đang được đánh giá. Nó trả về: 
- `undef` nếu đang ở void context
- `true` nếu đang ở list context
- `false` nếu đang ở scalar context
- Ví dụ:
```perl
sub example {
    if (wantarray) {
        return (1, 2, 3);  # List context
    } elsif (defined wantarray) {
        return 42;  # Scalar context
    } else {
        print "Void context\n";  # Void context
    }
```
### Gọi hàm trong các context khác nhau:
```perl
my @list = example();  # List context, trả về (1, 2, 3)
my $scalar = example();  # Scalar context, trả về 42
example();  # Void context, in ra "Void context"
```
Trong ví dụ trên, hàm `example` trả về các giá trị khác nhau tùy thuộc vào context mà nó được gọi.

## Kết luận
Hiểu về context trong Perl là rất quan trọng để viết code hiệu quả và tránh những lỗi không mong muốn. 

Việc biết khi nào một biểu thức được đánh giá trong scalar, list, hoặc void context sẽ giúp bạn kiểm soát tốt hơn cách dữ liệu được xử lý và trả về trong chương trình của bạn. 

Hãy luôn nhớ kiểm tra context khi viết các hàm hoặc biểu thức phức tạp để đảm bảo rằng chúng hoạt động như mong đợi trong mọi tình huống.
