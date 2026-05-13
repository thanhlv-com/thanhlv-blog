---
footer: true
title: OOP trong Perl
description: Cách scalar, list và void context ảnh hưởng tới biểu thức trong Perl.
authors: [ "lethanh" ]
date: 2026-05-09
outline: deep
image: https://static-cdn.thanhlv.com/study/thanhlv-study-2026/perl.jpg
draft: false
group: 1. Perl
---

[[TOC]]

# OOP trong Perl

Perl hỗ trợ OOP nhưng theo kiểu rất linh hoạt chứ không cứng nhắc như java hay c++.

Chúng ta có thể tạo class thuần bằng cách dùng bless để biến một reference thành object, và định nghĩa method bằng cách
tạo sub trong package.

Hoặc dùng các framework OOP như Moose để có syntax đẹp hơn, hỗ trợ tính năng OOP hiện đại như inheritance, roles, type
constraints.

## Các cách tạo OOP trong Perl

| Cách        | Mức Độ                     |
|-------------|----------------------------|
| Bless       | Cần hiệu gốc rễ            |
| Moo         | Gọn, nhanh, phổ biến       |
| Moose       | Enterprise/full-feature    |
| Object::Pad | Perl OOP hiện đại kiểu mới |

## OOP trong Perl hoạt động như thế nào?

Trong perl, một object thực chất là một reference (thường là hashref) được "bless" vào một package.

Package đó định nghĩa các method mà object có thể gọi.

Method = subroutine trong package và sẽ được gọi bằng cú pháp `$object->method()`.

|        |                      |
|--------|----------------------|
| Object | reference được bless |
| Class  | package              |
| Method | subroutine           |

Ví dụ đơn giản nhất:

```perl
package Animal;

sub new {
    my ($class, $name) = @_;

    my $self = {
        name => $name
    };

    bless $self, $class;

    return $self;
}

sub speak {
    my ($self) = @_;

    print $self->{name} . " makes a sound\n";
}

1;
```

Sử dụng:

```perl
use JSON;
use FindBin qw($Bin);
use lib "$Bin/";
use Animal::Animal;

my $dog = Animal->new("Dog");
$dog->speak();
```

Chạy kết quả:

``` perl
perl Demo1.pl 
Dog makes a sound
```

## bless là gì?
Đây là cốt lõi OOP của Perl.

Khác với nhiều ngôn ngữ như Java hay C++, Perl không có từ khóa class.
Perl dùng:
package → đóng vai trò class
bless → biến một reference thành object

`bless` là một function nội tại của Perl dùng để biến một reference thành một object thuộc một class (package) nào đó.
`bless $ref, $class;`
- Ý nghĩa:
  - $ref trở thành object
  - $class là tên package/class

Ví dụ:
```perl
my $hash_ref = {};
bless $hash_ref, "Person";
```
Ý nghĩa:
`{}` tạo hash reference
`bless` gắn `reference` đó vào `package Person`
Từ đó `$obj` trở thành `object của class Person`

###  Bless thực sự làm gì?
Perl object thực chất chỉ là:
- hash reference
- array reference
- scalar reference
- hoặc bất kỳ reference nào

`bless chỉ đơn giản là: gắn "nhãn class" vào reference`
 
#### Ví dụ:
```perl
my $data = {
    name => "Thanh",
    age  => 25
};

bless $data, "Person";
```
Sau khi bless:
```
ref($data)
```
trả về `Person` thay vì `HASH`.

## Constructor
Perl không có constructor đặc biệt.

Thường convention dùng `new`.

```perl
package Person;
sub new {
    my ($class, %args) = @_;

    my $self = {
        name => $args{name},
        age  => $args{age},
    };

    bless $self, $class;

    return $self;
}
sub introduce {
    my $self = shift;

    print "Tên: $self->{name}\n";
    print "Tuổi: $self->{age}\n";
}

1; 
```
```perl

use Person;

my $p = Person->new("Thanh", 25);

$p->introduce();
```
bản chất new cũng là 1 method bình thường không phải đặc biệt gì như Java, chỉ là convention thôi.
### $class
`my ($class, $name, $age) = @_;` khi gọi `Person->new(...)` thì `$class` sẽ nhận giá trị `Person`.

### Tạo object data
```perl
my $self = {
    name => $name,
    age  => $age
};
```
Object ở đây bản chất là một hash reference chứa dữ liệu.
### Bless object
```perl
bless $self, $class;
```
Biến `$self` thành một object thuộc class `$class` (ở đây là `Person`).
### Trả về object
```perl
return $self;
``` 

### Method call
`$p->introduce();` gọi method `introduce` trên object `$p`. Perl sẽ tìm: Person::introduce

## Bless với array reference
Có thể dùng array reference thay vì hash reference:

```perl
package Point;

sub new {
    my ($class, $x, $y) = @_;

    my $self = [$x, $y];

    bless $self, $class;

    return $self;
}

sub x {
    $_[0]->[0];
}

sub y {
    $_[0]->[1];
}
```
Dùng
```perl
my $p = Point->new(10, 20);

print $p->x();
```

## Bless với scalar reference
```perl
package Counter;

sub new {
    my ($class) = @_;

    my $value = 0;

    bless \$value, $class;
}

sub increment {
    my $self = shift;

    $$self++;
}

sub get {
    my $self = shift;

    return $$self;
}
```

## bless mặc định class hiện tại
Nếu bỏ class:
```perl
bless $self;  # tương đương bless $self, __PACKAGE__
```
Nghĩa là sẽ bless vào package hiện tại đang định nghĩa, rất tiện khi viết class trong một file riêng.

## Kiểm tra object
Dùng ref để kiểm tra class của object:
```perl
my $obj = Person->new("Thanh", 25);
if (ref($obj) eq "Person") {
    print "Đây là object Person\n";
}
```

## Accessor / Getter / Setter
```perl
sub name {
    my ($self, $value) = @_;

    $self->{name} = $value if defined $value;

    return $self->{name};
}
```
DÙng
```perl5
$p->name("Alice");

print $p->name();
```

## Encapsulation trong Perl
Perl không có cơ chế private/protected như Java/C++.
Thông thường, convention là:
- Dùng dấu gạch dưới để đánh dấu method/attribute là "private" (ví dụ: `_secret`).
- Không có ràng buộc thực sự ==> public

### Ví dụ về private method
```perl
sub _private_method {
    print "Đây là method private\n";
}
```
Dù có thể gọi từ bên ngoài, nhưng convention là không nên.


## Inheritance (Kế thừa)
Perl hỗ trợ kế thừa bằng cách sử dụng `@ISA` hoặc `use parent`.
@ISA là 1 cách cũ
```perl
our @ISA = ('Animal');
```
Hiện đại hơn là dùng `use parent`:
```perl
package Dog;
use parent 'Animal';
```
Điều này cho phép `Dog` kế thừa tất cả method của `Animal`.

Khi thực hiện call `$obj->method()` nếu method không tồn tại, perl sẽ tìm kiếm trong @ISA hoặc parent để tìm method đó.

Bản chất khi sử dụng use parent, Perl sẽ tự động thêm package cha vào @ISA của package con.

## Method Resolution Order (Thứ tự tìm method)
Khi gọi `$obj->method()`, Perl sẽ tìm method theo thứ tự:
1. Package của object (Class hiện tại)
2. Các package trong @ISA (theo thứ tự khai báo)
3. Các parent của parent (nếu có)
4. Nếu không tìm thấy, sẽ trả về lỗi `Undefined subroutine`.
