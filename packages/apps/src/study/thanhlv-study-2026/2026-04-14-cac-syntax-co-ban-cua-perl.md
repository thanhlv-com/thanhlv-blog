---
footer: true
title: Các syntax cơ bản của Perl.
Description: .
authors: [ "lethanh" ]
date: 2026-04-14
outline: deep
image: https://static-cdn.thanhlv.com/study/thanhlv-study-2026/perl.jpg
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
use strict;
use warnings;

print("Enter your age: ");
my $age = <STDIN>;
chomp($age); # Remove newline character from input

if ($age == 0) {
    print("You are a newborn.\n");
}
elsif ($age < 18) {
    print("You are a minor.\n");
}
elsif ($age >= 18 && $age < 65) {
    print("You are an adult.\n");
}
else {
    print("You are a senior citizen.\n");
}
```
Running:
```bash
perl demo.pl
Enter your age: 16
You are a minor.

perl demo.pl
Enter your age: 20
You are an adult.
```

### If-else với String

If-else với String cũng được sử dụng rất phổ biến để kiểm tra giá trị của chuỗi và thực hiện các hành động tương ứng.
Ví dụ: Nếu tên là "thanh" thì in "Hello Thanh dep zai!", nếu tên là "tuan" thì in "Hello Tuan xau zai!", nếu tên là "nam" (không phân biệt hoa thường) thì in "Hello Nam xau zai!", ngược lại in "Hello <tên>!".

```perl
# demo.pl
use strict;
use warnings;

print("Enter your name: ");
my $name = <STDIN>;
chomp($name); # Remove newline character from input

if ($name eq "thanh") {
    print("Hello Thanh dep zai!\n");
}
elsif ($name eq "tuan") {
    print("Hello Tuan xau zai!\n");
}
elsif (lc($name) eq "nam") { ## Lc() để chuyển chuỗi về chữ thường trước khi so sánh
    print("Hello Nam xau zai!\n");
}
else {
    print("Hello $name!\n");
}

```

Running:
```bash
perl demo.pl
Enter your name: thanh
Hello Thanh dep zai!

perl demo.pl
Enter your name: tuan
Hello Tuan xau zai!
```

### Vòng lặp
Vòng lặp được sử dụng để thực hiện một khối mã nhiều lần. Perl hỗ trợ nhiều loại vòng lặp như `for`, `foreach`, `while`, và `until`.
Ví dụ: In ra các số từ 1 đến 5 bằng vòng lặp for.

```perl
# demo.pl
use strict;
use warnings;

for (my $i = 1; $i <= 5; $i++) {
    print("Iteration: $i\n");
}
```
Running:
```bash
perl demo.pl
Iteration: 1
Iteration: 2
Iteration: 3
Iteration: 4
Iteration: 5
```

Ví dụ có 1 danh sách tên là chúng ta hiển thị từng tên trong danh sách bằng vòng lặp foreach.

```perl
# demo.pl
use strict;
use warnings;

my @names = ("thanh", "tuan", "nam");
foreach my $name (@names) {
    print("Hello $name!\n");
}
```

Running:
```bash
perl demo.pl
Hello thanh!
Hello tuan!
Hello nam!
```
::: details Nhiều ví dụ
```perl
use strict;
use warnings;

my @names = ("thanh", "tuan", "nam");
foreach my $name (@names) {
    print("Hello $name!\n");
}

foreach(@names) {
    print("Hello $_!\n");
}
s
print("\n");

for (my $i = 0; $i < @names; $i++) {
    print("Hello $names[$i]!\n");
}

print("\n");

my $i = 0;
while ($i < @names) {
    print("Hello $names[$i]!\n");
    $i++;
}
```
:::

## Thao tác với File
Thao tác với file là một phần quan trọng trong lập trình Perl. Bạn có thể đọc và ghi file bằng cách sử dụng các hàm tích hợp sẵn của Perl.

### Đọc file và in ra
Ví dụ: Đọc nội dung của file `data/intro.txt` và in ra.

```perl
# demo.pl
use strict;
use warnings;

# Read from a file. Param < là đọc file, > là ghi file, >> là ghi file nhưng không xóa nội dung cũ
open(my $readFile, "<", "data/intro.txt") or die "Could not open file: $!";

while (my $line = <$readFile>) {
  print($line);
}

close($readFile);
```

Running:
```bash
perl demo.pl
Hello!. My name is Thành.
I am a software developer at LTV.
```

### Viết file
Ví dụ: Ghi một chuỗi vào file `data/write.txt`.
```perl
# demo.pl
use strict;
use warnings FATAL => 'all';

# Read from a file. Param < là đọc file, > là ghi file, >> là ghi file nhưng không xóa nội dung cũ
open(my $writeFile, ">", "data/write.txt") or die "Could not open file: $!";

print($writeFile "Hello world!\n");
print($writeFile "This is a file write example.\n");

close($writeFile);

## Append to file without deleting old content
open(my $writeFileThemKhongXoaNoiDungCu, ">>", "data/write.txt") or die "Could not open file: $!";

print($writeFileThemKhongXoaNoiDungCu "This line is added without deleting old content.\n");

close($writeFileThemKhongXoaNoiDungCu);


open(my $readFile, "<", "data/write.txt") or die "Could not open file: $!";

while (my $line = <$readFile>) {
    print($line);
}

close($readFile);
```

Running:
```bash
perl demo.pl
Hello world!
This is a file write example.
This line is added without deleting old content.
```

## Regular Expression
Regular expression (regex) là một công cụ mạnh mẽ để tìm kiếm và thao tác với chuỗi. Perl có hỗ trợ regex rất tốt, cho phép bạn thực hiện các thao tác phức tạp trên chuỗi một cách dễ dàng.
Ví dụ: Kiểm tra xem một chuỗi có chứa từ "world" hay không

```perl
# demo.pl
#!/usr/bin/perl
use strict;
use warnings FATAL => 'all';

## Kiểm tra chứa từ
my $string = "Hello world!";
if ($string =~ /world/) {
    print("String contains 'world'\n");
}
```

Running:
```bash
perl demo.pl
String contains 'world'
```

Kiểm tra chữ bắt đầu bằng "Hello".
```perl
# demo.pl
#!/usr/bin/perl
use strict;
use warnings FATAL => 'all';

## Kiểm tra bắt đầu bằng
my $string = "Hello world!";
if ($string =~ /^Hello/) {
    print("String starts with 'Hello'\n");
}
```
Running:
```bash
perl demo.pl
String starts with 'Hello'
```


Kiểm tra chữ kết thúc bằng "!".
```perl
# demo.pl
#!/usr/bin/perl
use strict;
use warnings FATAL => 'all';

## Kiểm tra kết thúc bằng !
my $string = "Hello world!";
if ($string =~ /!$/) {
    print("String ends with '!'\n");
}
```

Running:
```bash
perl demo.pl
String ends with '!'
```


## Chạy lệnh hệ thống
Bạn có thể chạy lệnh hệ thống từ Perl bằng cách sử dụng backticks hoặc hàm `system()`. Ví dụ: Chạy lệnh `ls -l` để liệt kê các file trong thư mục hiện tại.
```perl
# demo.pl
#!/usr/bin/perl
use strict;
use warnings FATAL => 'all';
my $output = `ls -l`;
print("Output of 'ls -l':\n$output");
```

Running:
```bash
perl demo.pl
Output of ls -l:
total 232
-rw-r--r--@ 1 le.van.thanh  staff    22 Apr  8 15:22 01.hello.pl
-rw-r--r--@ 1 le.van.thanh  staff   105 May  5 08:35 02.Scalar.pl
-rw-r--r--@ 1 le.van.thanh  staff   137 Apr  8 15:26 03.Array.pl
....
```

## Thời gian hiện tại Bạn có thể lấy thời gian hiện tại bằng cách sử dụng hàm `localtime()`. Ví dụ: In ra thời gian hiện tại.
```perl
# demo.pl
#!/usr/bin/perl
use strict;
use warnings FATAL => 'all';
my $current_time = localtime();
print("Current time: $current_time\n");
```
Running:
```bash
perl demo.pl
Current time: Wed Apr 14 10:30:00 2026
```

## Tạo method và hàm
Bạn có thể tạo method và hàm trong Perl để tái sử dụng mã. Ví dụ: Tạo một hàm nhân hai số và trả về kết quả.
```perl
# demo.pl
#!/usr/bin/perl
use strict;
use warnings FATAL => 'all';

sub multiply {
    my ($a, $b) = @_;
    return $a * $b;
}

my $result = multiply(5, 10);
print("Result of multiplication: $result\n");
```

Running:
```bash
perl demo.pl
Result of multiplication: 50
```

## Xử lý lỗi
Bạn có thể xử lý lỗi trong Perl bằng cách sử dụng `eval` để bắt lỗi và `die` để ném lỗi. Ví dụ: Thử mở một file không tồn tại và xử lý lỗi nếu file không thể mở được.
```perl
# demo.pl
#!/usr/bin/perl
use strict;
use warnings FATAL => 'all';

eval {
    open(my $fh, "<", "non_existent_file.txt") or die "Could not open file: $!";
};  
if ($@) {
    print("An error occurred: $@\n");
}
```
Running:
```bashperl demo.pl
n error occurred: Could not open file: No such file or directory at demo.pl line 13.
```

## Thao tác với list, map, grep
Bạn có thể thao tác với list trong Perl bằng cách sử dụng các hàm như `push`, `pop`, `shift`, `unshift`, `map`, và `grep`.

### List push và pop
```perl
# demo.pl
#!/usr/bin/perl
use strict;
use warnings FATAL => 'all';

my @arr = ("element1");
push @arr, "element2";

print("Array after push: @arr\n");
my $popped_element = pop @arr;
print("Popped element: $popped_element\n");
print("Array after pop: @arr\n");
```
Running:
```bash
perl demo.pl
Array after push: element1 element2
Popped element: element2
Array after pop: element1
```

### List shift và unshift
List shift và unshift được sử dụng để thêm hoặc loại bỏ phần tử ở đầu của mảng.
```perl
# demo.pl
#!/usr/bin/perl
use strict;
use warnings FATAL => 'all';

my @arr = ("element1", "element2", "element3");
push @arr, "element4";
print("Array after push: @arr\n");


shift @arr;
print("Array after shift: @arr\n");

unshift @arr, "renew_element1";

print("Array after unshift: @arr\n");
```

Running:
```bash
perl demo.pl
Array after push: element1 element2 element3 element4
Array after shift: element2 element3 element4
Array after unshift: renew_element1 element2 element3 element4
```

### List map
List map được sử dụng để áp dụng một hàm cho mỗi phần tử của một list và trả về một list mới với kết quả của hàm đó.
```perl
# demo.pl
#!/usr/bin/perl
use strict;

my @numbers = (1, 2, 3, 4, 5);

## Map de nhan 2 gia trị cac phần tử trong mảng
my @newNumbers = map {$_ * 2} @numbers;

print "Original numbers: @numbers\n";
print "New numbers: @newNumbers\n";
```
Running:
```bash
perl demo.pl
Original numbers: 1 2 3 4 5
New numbers: 2 4 6 8 10
```

### List grep
List grep được sử dụng để lọc các phần tử của một list dựa trên một điều kiện nhất định và trả về một list mới chỉ chứa các phần tử thỏa mãn điều kiện đó.

Ví dụ: Lọc ra các số chẵn từ một mảng số nguyên.
```perl
# demo.pl
#!/usr/bin/perl
use strict;
use warnings FATAL => 'all';

my @numbers = (1, 2, 3, 4, 5);

my @grep = grep {$_ % 2 == 0} @numbers;

print "Original numbers: @numbers\n";
print "Grep(filter) numbers (even): @grep\n";
```
Running:
```bash
perl demo.pl
Original numbers: 1 2 3 4 5
Grep(filter) numbers (even): 2 4
```

## Hash keys, values, exists, delete
Bạn có thể thao tác với hash trong Perl bằng cách sử dụng các hàm như `keys`, `values`, `exists`, và `delete`.
```perl
# demo.pl
use strict;
use warnings;

my %hash = (
    "key1" => "value1",
    "key2" => "value2",
    "key3" => "value3"
);
print("All keys in the hash: ", join(", ", keys %hash), "\n");
print("All values in the hash: ", join(", ", values %hash), "\n");

if (exists $hash{'key3'}) {
    print("Key 'key3' exists in the hash.\n");
}
else {
    print("Key 'key3' does not exist in the hash.\n");
}

delete $hash{'key2'};
print("After deleting key2, all keys in the hash: ", join(", ", keys %hash), "\n");
```
Running:
```bash
perl demo.pl
All keys in the hash: key1, key2, key3
All values in the hash: value1, value2, value3
Key 'key3' exists in the hash.
After deleting key2, all keys in the hash: key1, key3
```

## Modules use và function
Bạn có thể sử dụng module trong Perl để tái sử dụng mã và tổ chức code tốt hơn. Ví dụ: Sử dụng module `JSON` để mã hóa và giải mã dữ liệu JSON.
```perl
# demo.pl
use strict;
use warnings FATAL => 'all';
use JSON;
my %data = (
    name => "Thanh",
    age => 25,
    city => "Hanoi"
);
my $json_string = encode_json(\%data);
print("JSON string: $json_string\n");
my $decoded_data = decode_json($json_string);
print("Decoded data:\n");
print("Name: $decoded_data->{name}\n");
print("Age: $decoded_data->{age}\n");
print("City: $decoded_data->{city}\n");
```
Running:
```bash
perl demo.pl
JSON string: {"name":"Thanh","age":25,"city":"Hanoi"}
Decoded data:
Name: Thanh
Age: 25
City: Hanoi
```
Bạn cũng có thể tạo module của riêng mình để tổ chức mã tốt hơn. Ví dụ: Tạo một module `ModuleDemo.pm` trong thư mục `common/` và sử dụng nó trong file chính.

```perl
# common/ModuleDemo.pm
package common::ModuleDemo;
use strict;
use warnings FATAL => 'all';

sub sub_function {
    my ($param) = @_;
    print("This is a sub function from common::ModuleDemo::sub_function with param $param\n");
}
sub method_call_function {
    my ($name, $param) = @_;
    print("This is a method call function from common::ModuleDemo::method_call_function with name $name and param $param\n");
}

1; # 1 để đảm bảo module trả về true khi được sử dụng, nếu không sẽ gây lỗi khi sử dụng module này trong các file khác.
```


```perl
# demo.pl
use strict;
use warnings FATAL => 'all';

use lib '.'; # Thêm thư mục hiện tại vào @INC để tìm module
use common::ModuleDemo;

common::ModuleDemo::sub_function(" Value param"); # Gọi hàm sub_function từ module common::ModuleDemo với tham số " Value param"
common::ModuleDemo->method_call_function(" Value param"); # Gọi hàm method_call_function từ module common::ModuleDemo với tham số " Value param". Cách gọi này sử dụng cú pháp gọi method, nhưng vì method_call_function không phải là một method thực sự (không có tham số $self), nên nó sẽ hoạt động giống như một hàm thông thường.
```

Running:
```bash
perl demo.pl
This is a sub function from common::ModuleDemo::sub_function with param  Value param
This is a method call function from common::ModuleDemo::method_call_function with name common::ModuleDemo and param  Value param
```

### Module sử dụng FindBin để tìm kiếm
FindBin là một module trong Perl được sử dụng để xác định vị trí của script hiện tại đang chạy. Điều này rất hữu ích khi bạn muốn tìm kiếm các file hoặc module liên quan đến script đó, đặc biệt khi bạn có cấu trúc thư mục phức tạp.
```perl
# demo.pl
#!/usr/bin/perl
use strict;
use warnings FATAL => 'all';

use FindBin qw($Bin);
use lib "$Bin/";
use common::ModuleDemo;

common::ModuleDemo::sub_function(" Value param"); # Gọi hàm sub_function từ module common::ModuleDemo với tham số " Value param"
common::ModuleDemo->method_call_function(" Value param"); # Gọi hàm method_call_function từ module common::ModuleDemo với tham số " Value param". Cách gọi này sử dụng cú pháp gọi method, nhưng vì method_call_function không phải là một method thực sự (không có tham số $self), nên nó sẽ hoạt động giống như một hàm thông thường.
```
Running:
```bash
perl demo.pl
This is a sub function from common::ModuleDemo::sub_function with param  Value param
This is a method call function from common::ModuleDemo::method_call_function with name common::ModuleDemo and param  Value param
```

## Hash iterate
Bạn có thể duyệt qua các phần tử của một hash bằng cách sử dụng vòng lặp `foreach` kết hợp với hàm `keys` hoặc `values`. Ví dụ: Duyệt qua một hash và in ra các cặp key-value.
```perl
# demo.pl
#!/usr/bin/perl
use strict;

my $users = {
    1 => { name => 'Alice', age => 30 },
    2 => { name => 'Bob', age => 25 },
    3 => { name => 'Charlie', age => 35 },
};

print("User ID: $_, Name: $users->{$_}->{name}, Age: $users->{$_}->{age}\n")
for keys %$users;
```

Running:
```bash
perl demo.pl
User ID: 1, Name: Alice, Age: 30
User ID: 2, Name: Bob, Age: 25
User ID: 3, Name: Charlie, Age: 35
```
