---
footer: true
title: Materialized Views vs Denormalization
description: Materialized Views và Denormalization là hai khái niệm quan trọng trong Apache Cassandra, giúp tối ưu hóa truy vấn dữ liệu. Bài viết này sẽ giải thích chi tiết về chúng, cùng với ưu điểm và nhược điểm của từng phương pháp.
authors: [ "lethanh" ]
date: 2025-05-31
outline: deep
image: https://static-cdn.thanhlv.com/study/thanhlv-study-2025/2025-03-26-what-is-apache-cassandra/cassandra-la-gi-1.webp
draft: false
group: 1. Cassandra
---

[[TOC]]

Trong bài viết trước, chúng ta đã tìm hiểu về Secondary Indexes trong Apache Cassandra. Một cách giúp để tìm kiếm nhanh dữ liệu nhưng mang lại một số vấn đề về hiệu suất và khả năng mở rộng. 

Để giải quyết những vấn đề này, Cassandra cung cấp hai khái niệm khác là Materialized Views và Denormalization.

Trong bài viết này, chúng ta sẽ tìm hiểu về hai khái niệm Materialized Views và Denormalization, cùng với những ưu điểm và nhược điểm của chúng.

# Materialized Views

Thực tế, Materialized Views là một kỹ thuật chung, nó không chỉ tồn tại trong Cassandra mà còn trong nhiều hệ quản trị cơ sở dữ liệu khác.

Hoặc bạn cũng có thể tự triển khai Materialized Views bằng cách tạo một bảng mới với dữ liệu được lấy từ bảng gốc và cập nhật nó theo thời gian thực.

Như câu nói trên đã nói, chắc bạn cũng đã hiểu được 1 phần. Materialized Views là một bảng được tạo ra từ một bảng gốc, nó sẽ tự động cập nhật khi có thay đổi trong bảng gốc.

Khi chúng ta thực hiện truy vấn trên Materialized Views, nó sẽ trả về dữ liệu đã được tính toán sẵn từ bảng gốc, giúp tăng tốc độ truy vấn.

Với các query phức tạp, Materialized Views có thể giúp giảm thiểu thời gian truy vấn bằng cách lưu trữ dữ liệu đã được tính toán sẵn.

### Lợi ích chính của Materialized Views
- **Tăng tốc độ truy vấn**: Materialized Views giúp giảm thời gian truy vấn bằng cách lưu trữ dữ liệu đã được tính toán sẵn, giúp tránh việc tính toán lại dữ liệu mỗi khi truy vấn.
- **Giảm tải cho hệ thống**: Bằng cách sử dụng Materialized Views, chúng ta có thể giảm tải cho hệ thống khi thực hiện các truy vấn phức tạp, vì dữ liệu đã được tính toán sẵn.
- *Đơn giản hóa truy vấn**: Materialized Views giúp đơn giản hóa các truy vấn phức tạp bằng cách lưu trữ dữ liệu đã được tính toán sẵn, giúp giảm thiểu việc phải viết các truy vấn phức tạp.
- **Tự động cập nhật**: Materialized Views sẽ tự động cập nhật khi có thay đổi trong bảng gốc, giúp đảm bảo dữ liệu luôn được cập nhật mới nhất.(Cũng do triển khai nữa, nếu không triển khai thì sẽ không tự động cập nhật)

### Khi nào nên sử dụng Materialized Views
- **Truy vấn phức tạp**: Khi bạn cần thực hiện các truy vấn phức tạp và muốn giảm thiểu thời gian truy vấn.
- **Dữ liệu không thay đổi thường xuyên**: Khi dữ liệu trong bảng gốc không thay đổi thường xuyên, Materialized Views có thể giúp tăng tốc độ truy vấn mà không cần phải lo lắng về việc cập nhật dữ liệu.
- **Tăng tốc độ truy vấn**: Khi bạn cần tăng tốc độ truy vấn cho các truy vấn phức tạp, Materialized Views có thể giúp giảm thời gian truy vấn bằng cách lưu trữ dữ liệu đã được tính toán sẵn.
- **Các truy vấn chạy thường xuyên**: Khi bạn có các truy vấn phức tạp cần chạy thường xuyên và muốn giảm thiểu thời gian truy vấn, Materialized Views có thể giúp tăng tốc độ truy vấn bằng cách lưu trữ dữ liệu đã được tính toán sẵn.

### Những điều cần cần nhắc trước khi sử dụng Materialized Views
- **Tăng chi phí lưu trữ**: Materialized Views sẽ tạo ra một bảng mới, do đó sẽ tốn thêm chi phí lưu trữ.
- **Cập nhật dữ liệu**: Khi có thay đổi trong bảng gốc, Materialized Views sẽ tự động cập nhật, nhưng nếu không triển khai đúng cách, có thể dẫn đến việc dữ liệu không được cập nhật đúng cách.
- **Đỗ chễ cập nhật dữ liệu**: Dữ liệu trong không được cập nhật ngay khi có thay đổi trong bảng gốc, mà sẽ được cập nhật sau một khoảng thời gian nhất định(Tùy triển khai). Điều này có thể dẫn đến việc dữ liệu trong Materialized Views không được cập nhật ngay lập tức.
  - Có nhiều chiến lược cập nhật dữ liệu khác nhau, ví dụ như cập nhật theo thời gian thực hoặc theo lịch trình, theo yêu cầu. Bạn cần cân nhắc kỹ lưỡng trước khi triển khai Materialized Views để đảm bảo rằng dữ liệu trong Materialized Views luôn được cập nhật đúng cách.
- **Khó khăn trong việc quản lý**: Khi có nhiều Materialized Views, việc quản lý và bảo trì chúng có thể trở nên khó khăn, đặc biệt là khi có nhiều bảng gốc và các truy vấn phức tạp.


## Materialized Views trong Cassandra

Tính năng Materialized Views được hỗ trợ trong Cassandra, cho phép bạn tạo các bảng Materialized Views từ các bảng gốc. Khi bạn tạo một Materialized View, Cassandra sẽ tự động cập nhật nó khi có thay đổi trong bảng gốc.

Materialized Views trong Cassandra sẽ tạo ra các bảng phụ (view) dựa trên bảng gốc, giúp truy vấn theo các cột khác nhau mà không cần thiết kế bảng riêng biệt.

**Ưu điểm**: Giảm bớt công sức duy trì dữ liệu song song vì Cassandra sẽ tự động đồng bộ.
**Nhược điểm**: Có thể gặp vấn đề về hiệu năng và tính nhất quán trong một số phiên bản; một số trường hợp báo cáo các bug hoặc giới hạn trong việc cập nhật dữ liệu. Điều này xảy ra là do Cassandra sẽ tự đồng làm toàn bộ, chúng ta không biết liệu có chính xác không.

#### Ví dụ:
Giả sử bạn có bảng gốc users chứa thông tin người dùng:

```sql
CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    name TEXT,
    email TEXT,
    age INT
);
```
Nếu bạn muốn tìm kiếm người dùng theo email thay vì theo `user_id`, bạn có thể tạo một Materialized View như sau:

```sql
CREATE MATERIALIZED VIEW users_by_email AS
  SELECT user_id, name, email, age
  FROM users
  WHERE email IS NOT NULL AND user_id IS NOT NULL
  PRIMARY KEY (email, user_id);
```
**Giải thích:**
- **Tạo một bảng mới**: Tạo một bảng mới có các trường `user_id`, `name`, `email`, `age` được Cassandra tự động đồng bộ dựa theo dữ liệu select trả về.
- **Điều kiện WHERE** : Các cột được sử dụng trong khóa chính của Materialized View (ở đây là email và user_id) phải có giá trị khác NULL.
- **Khóa chính của view**: Định nghĩa `PRIMARY KEY (email, user_id)` giúp tổ chức dữ liệu theo thứ tự của email. Nhờ đó, bạn có thể truy vấn dữ liệu dựa trên cột email một cách nhanh chóng sử dụng Partition Key, Clustering Key.
- **Cập nhật tự động**: Khi bạn thêm, sửa hoặc xóa dữ liệu trong bảng users, Cassandra sẽ tự động cập nhật Materialized View users_by_email.

**Truy vấn:**

**Thêm data ví dụ:**

```sql
INSERT INTO users (user_id, name , email , age) 
    VALUES  (uuid(), 'le thanh','lethanh@thanhlv.com',10);
 
INSERT INTO users (user_id, name , email , age) 
    VALUES (uuid(), 'le thanh2','lethanh2@thanhlv.com',22);
```
**Query:**
```sql
SELECT * FROM users_by_email WHERE email = 'lethanh@thanhlv.com';
```
![Image](https://static-cdn.thanhlv.com/study/thanhlv-study-2025/2025-05-31-materialized-view-vs-denormalization/image-2025-3-14_9-34-37.png)
Truy vấn này sẽ nhanh chóng trả về thông tin người dùng với email là `le.van.thanh@linecrop.com` mà không cần quét toàn bộ bảng users.
Bởi vì khi đó, chúng ta đã tạo ra 1 bảng phụ có email là Partition Key, do đó khi truy vấn theo email sẽ nhanh hơn rất nhiều so với việc quét toàn bộ bảng users.

### Lưu ý khi sử dụng Materialized Views trong Cassandra
- **Hiệu suất ghi**: Mỗi khi có thay đổi trong bảng gốc, hệ thống sẽ thực hiện cập nhật cho tất cả các `Materialized View` liên quan, điều này có thể làm tăng độ trễ ghi.
- **Thiết kế schema**: Cần cân nhắc kỹ lưỡng khi thiết kế `Materialized Views` để tránh việc tạo ra quá nhiều view không cần thiết, ảnh hưởng đến hiệu năng tổng thể của hệ thống.

### Một số hạn chế khi sử dụng Materialized View:trong Cassandra

- **Bắt buộc**: Khóa chính của **Materialized View** phải bao gồm tất cả các cột của khóa chính bảng gốc.
- **Chỉ thêm cột phụ**: Bạn chỉ có thể thêm một cột phụ hoặc tổ hợp cột phụ (không thuộc khóa chính của bảng gốc) vào khóa chính của Materialized View.
  - Ví dụ: `PRIMARY KEY (email, user_id)` hoặc `PRIMARY KEY ((email, age), user_id) `
  
Như vậy, về cơ bản `Materialized View` giống như một bảng thông thường và có cấu trúc (có Partition Key và Clustering Key), nhưng nó được tự động cập nhật dựa trên bảng gốc và không cho phép thao tác ghi trực tiếp.

# Denormalization
Trong `Cassandra`, do đặc điểm không hỗ trợ JOIN, denormalization là cách phổ biến để tối ưu query. Điều này có nghĩa là dữ liệu có thể được lặp lại trong nhiều bảng hoặc tạo 1 bảng mới chuyên dụng để phục vụ các truy vấn cụ thể.

Ví dụ về denormalization trong Cassandra

Giả sử ta có một hệ thống lưu trữ thông tin đơn hàng, với yêu cầu:

- Truy vấn đơn hàng theo ID đơn hàng.
- Truy vấn đơn hàng theo ID khách hàng.
- Truy vấn đơn hàng theo ngày đặt hàng.

###### Nếu sử dụng SQL thông thường chúng ta có thể có các table như sau:
```sql
CREATE TABLE Customers (
    customer_id UUID PRIMARY KEY,
    name TEXT
);
 
CREATE TABLE Orders (
    order_id UUID PRIMARY KEY,
    customer_id UUID,
    order_date TIMESTAMP,
    total_amount DECIMAL,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);
```
Thêm một dữ liệu với thông tin order mới:

```sql
INSERT INTO Customers (customer_id, name) VALUES
    ('1111-aaaa', 'Alice'),
    ('2222-bbbb', 'Bob');
 
INSERT INTO Orders (order_id, customer_id, order_date, total_amount) VALUES
    ('o-001', '1111-aaaa', '2025-03-10', 500),
    ('o-002', '1111-aaaa', '2025-03-11', 1000),
    ('o-003', '2222-bbbb', '2025-03-12', 750);
```
Ví dụ về câu query SQL sử dụng join
```sql
SELECT o.order_id, o.order_date, o.total_amount, c.name AS customer_name
FROM Orders o
JOIN Customers c ON o.customer_id = c.customer_id
WHERE o.customer_id = '1111-aaaa';
```
Kết quả
```code
order_id | order_date | total_amount | customer_name
---------|-----------|--------------|--------------
o-001    | 2025-03-10 | 500          | Alice
o-002    | 2025-03-11 | 1000         | Alice
```

Tuy nhiên Cassandra không hỗ trợ Join, vì vậy chúng ta cần sử dụng Denormalization trong Cassandra.

Chúng ta sẽ tạo nhiều table khác nhau để phục vụ cho từng câu truy vấn cụ thể, ví dụ:

```sql
# Customer info
CREATE TABLE Customers (
    customer_id UUID PRIMARY KEY,
    name TEXT
);
 
# find order by id
CREATE TABLE orders_by_id (
    order_id UUID PRIMARY KEY,
    customer_id UUID,
    customer_name TEXT,
    order_date TIMESTAMP,
    total_amount DECIMAL
);
 
# find order by customer id
CREATE TABLE orders_by_customer (
    customer_id UUID,
    order_id UUID,
    order_date TIMESTAMP,
    total_amount DECIMAL,
    PRIMARY KEY (customer_id, order_date)
) WITH CLUSTERING ORDER BY (order_date DESC);
 
# find order by date
CREATE TABLE orders_by_date (
    order_date TIMESTAMP,
    order_id UUID,
    customer_id UUID,
    customer_name TEXT,
    total_amount DECIMAL,
    PRIMARY KEY (order_date, order_id)
);
```

Chèn dữ liệu.
```sql
INSERT INTO orders_by_customer (customer_id, order_id, customer_name, order_date, total_amount)
VALUES ('1111-aaaa', 'o-001', 'Alice', '2025-03-10', 500);
 
INSERT INTO orders_by_customer (customer_id, order_id, customer_name, order_date, total_amount)
VALUES ('1111-aaaa', 'o-002', 'Alice', '2025-03-11', 1000);

```

Tìm các order bởi customer id không cần sử dụng join

```sql
SELECT order_id, customer_name, order_date, total_amount
FROM orders_by_customer
WHERE customer_id = '1111-aaaa';
```

Kết quả:

```code

order_id | customer_name | order_date | total_amount
---------|--------------|-----------|--------------
o-002    | Alice        | 2025-03-11 | 1000
o-001    | Alice        | 2025-03-10 | 500
```


### Sử dụng TTL khi Insert dữ liệu
Sử dụng TTL khi Insert dữ liệu sẽ giúp hệ thống Casandra biết thời gian tồn tại của dữ liệu này.

Ví dụ:

```sql
CREATE TABLE Customers (
      customer_id UUID PRIMARY KEY,
       name TEXT
);
 
INSERT INTO Customers (customer_id, name) VALUES
                                              (uuid(), 'Alice');
 
INSERT INTO Customers (customer_id, name) VALUES
                                              (uuid(), 'Bob') USING TTL 60;
```

USING TTL 60 đặt thời gian sống cho bản ghi là 1 phút (60 giây). Sau thời gian này, bản ghi 'Bob' sẽ tự động bị xoá.
