---
footer: true
title: What is Apache Cassandra?
authors: [ "lethanh" ]
date: 2025-03-26
outline: deep
image: https://static-cdn.thanhlv.com/study/thanhlv-study-2025/2025-03-26-what-is-apache-cassandra/cassandra-la-gi-1.webp
draft: false
group: 1. Cassandra
---

[[TOC]]

# What is Apache Cassandra?

Apache Cassandra là một Open source NoSQl Distributed database được nhiều công ty tin tưởng về khả năng mở rộng
và tính khả dụng mà không ảnh hưởng đến hiệu suất.

Cassandra được phát triển ban đầu bởi Facebook [1], sau đó trở thành một mã nguồn mở và được Apache Software
Foundation quản lý[1].
![Image](https://static-cdn.thanhlv.com/study/thanhlv-study-2025/2025-03-26-what-is-apache-cassandra/cassandra-la-gi-1.webp)
## Các đặc điểm chính của Apache Cassandra

1. **Kiển trúc phân tán**

Không giống như một số loại database có kiến trúc master-slave, Cassandra có kiến trúc phân tán, mỗi node trong
Cassandra có thể ghi và đọc dữ liệu. Không có máy chủ trung tâm nào quản lý tất cả các node và dữ liệu.

Tất cả các node trong cluster đều bình đẳng và chia sẻ dữ liệu với nhau.

2. **Khả năng mở rộng tuyến tính(Linear Scalability)**

Khi cần mở rộng, chúng ta có thể tạo mới node và join vào cluster mà không ảnh hưởng đến hiệu suất của hệ thống.
Hiệu suất của hệ thống tăng tuyến tính với số lượng node.

3. **Mô hình dữ liệu Key-Value/Column Family**

   Đây là một mô hình dữ liệu của Google BigTable, một cách lưu trữ dữ liệu phân cấp, mỗi key có thể chứa nhiều
   cột và mỗi cột có thể chứa nhiều giá trị.

4. **Replication và Fault Tolerance**

Cassandra sử dụng Replication để đảm bảo dữ liệu không bị mất khi một node bị lỗi. Số lượng replica có thể được
cấu hình bởi config Replication Factor và Cassandra sẽ tự động đồng bộ dữ liệu giữa các node.

5. **Ngôn ngữ truy vấn CQL(Cassandra Query Language)**

Casandra sử dụng CQL để truy vấn dữ liệu, CQL cực giống với SQL nên việc học và sử dụng Cassandra khá dễ dàng.

6. **Khả năng chịu lỗi và khả dụng cao**

   Nhờ cơ chế Replication và kiến trúc phân tán, Cassandra có khả năng chịu lỗi và khả dụng cao. Đảm bảo dữ liệu
   không bị mất và hệ thống luôn hoạt động khi có một số node bị lỗi.

7. **Hỗ trợ cho các loại dữ liệu lớn(Big data)**

Casandra được thiết kế để xử lý lượng dữ liệu lớn, phân tán trên nhiều node. Cassandra thường được sử dụng cùng
với các hệ thống Big Data như Hadoop, Spark, Kafka, ... để phân tích dữ liệu lớn.

## Cảm hứng của Cassandra

Thực tế Cassandra được lấy cảm hứng từ 2 hệ thống lớn là Google BigTable và Amazon Dynamo.

### **Google BigTable**

Cassandra lấy cảm hứng từ Google BigTable về mô hình dữ liệu Key-Value/Column Family, một cách lưu trữ dữ liệu
phân cấp, mỗi key có thể chứa nhiều cột và mỗi cột có thể chứa nhiều giá trị.

Cassandra sử dụng cơ chế tối ưu hóa cho query theo Primary Key. Cassandra sử dụng một số cơ chế như Partition
Key, Clustering Key, Composite Key để tối ưu hóa query.

### **Amazon Dynamo**

Cassandra lấy cảm hứng từ Amazon Dynamo về kiến trúc phân tán, mỗi node trong Cassandra có thể ghi và đọc dữ
liệu.

1. Kiến trúc phi tập trung (Decentralized Architecture):

- Không có máy chủ trung tâm nào quản lý tất cả các node và dữ liệu. Cassandra sử dụng mô hình Peer-to-Peer
  để giao tiếp giữa các node. Mọi node đều bình đẳng và chia sẻ dữ liệu với nhau.
- Điều này giúp loại bỏ điểm lỗi duy nhất (Single Point of Failure) và tăng khả năng khả dụng của hệ thống.

2. Khả năng mở rộng tuyến tính (Linear Scalability):

- Khi cần mở rộng, chúng ta có thể tạo mới node và join vào cluster mà không ảnh hưởng đến hiệu suất của hệ
  thống.

3. Consistent Hashing:

- Cassandra sử dụng Consistent Hashing để phân chia dữ liệu giữa các node. Consistent Hashing giúp tối ưu hóa
  việc phân chia dữ liệu giữa các node và giảm số lượng dữ liệu cần phải di chuyển khi thêm hoặc xóa node.
- Mỗi node trong Cassandra sẽ chịu trách nghiệm lưu trữ một phần của dữ liệu trong không gian Hash Ring.

4. Replication và Quorum:

- Cassandra hỗ trợ cơ chế sao chép dữ liệu (Replication) để đảm bảo dữ liệu không bị mất khi một node bị lỗi
  tương tự như Dynamo..
  - Số lượng bản sao của dữ liệu được cấu hình bởi Replication Factor và Consistency Level.
- Cassandra sử dụng cơ chế Quorum để đảm bảo đồng nhất dữ liệu giữa các node. Đảm bảo tính cân bằng giữa tính
  sẵn sàng (availability) và tính nhất quán (consistency).

## Kết hợp sức mạnh của BigTable và Dynamo

Cassandra tận dụng:

- Mô hình dữ liệu mạnh mẽ của Bigtable, giúp tổ chức dữ liệu hiệu quả và dễ truy vấn.
- Kiến trúc phân tán của Dynamo, giúp đạt được tính khả dụng cao, khả năng mở rộng vượt trội và độ bền bỉ với
  lỗi hệ thống.
- Nhờ sự kết hợp này, Cassandra trở thành một hệ quản trị cơ sở dữ liệu lý tưởng cho các ứng dụng đòi hỏi khả
  năng lưu trữ dữ liệu lớn, truy cập nhanh, và luôn sẵn sàng.

## Kiến trúc NoSQL: So sánh với cơ sở dữ liệu quan hệ

| Đặc điểm          | Cassandra(NoSQL)                                        | Cơ sở dữ liệu quan hệ (RDBMS)                             |
|-------------------|---------------------------------------------------------|-----------------------------------------------------------|
| Cách lưu dữ liệu  | Theo mô hình Key Value hoặc Column Family               | Mô hình bảng (Table base)                                 |
| Khả năgng mở rộng | Mở rộng ngang(horizontal scaling), thêm node để mở rộng | Mở rộng dọc (vertical scaling), cần tăng cấu hình máy chủ |
| Kiểu dữ liệu      | Không có schema cố định (Schema-less)                   | Schema cố định với table, column và row                   |

## Điểm hạn chế của Cassandra

Apache Cassandra là một hệ thống quản lý cơ sở dữ liệu phân tán được thiết kế để xử lý lượng lớn dữ liệu trên nhiều máy chủ, đảm bảo không có điểm lỗi đơn và cung cấp khả năng mở rộng cao. 

Tuy nhiên, như mọi công nghệ, Cassandra cũng có những hạn chế nhất định mà bạn cần lưu ý khi đánh giá việc sử dụng nó cho các dự án của mình:

- **Độ chễ ghi cao:** Cassandra sử dụng mô hình ghi cuối cùng (last write wins) để giải quyết xung đột dữ liệu. Điều này có thể dẫn đến việc mất dữ liệu nếu xung đột xảy ra. Khi cả 2 cùng khi.
Để đảm bảo tính nhất quán, Cassandra cần phải ghi vào nhiều nde trước khi hoàn thành một transaction. Điều này có thể tạo ra độ chễ ghi cao trong một số trường hợp. (Đọc phần tính nhất quán sẽ hiểu lý do)
- **Tính nhất quán:** Consistency trong Cassandra có thể được cấu hình theo mức độ từ `ONE` đến `ALL`. Tuy nhiên, việc cấu hình Consistency Level cao có thể ảnh hưởng đến hiệu suất của hệ thống.
  - ONE: Đảm bảo dữ liệu được ghi vào ít nhất một node.(Tốc độ nhanh nhất. 1)
  - QUORUM: Đảm bảo dữ liệu được ghi vào hơn nửa số node. Tức là 51% số node(Tổng các Node của tất cả datacenter). (Tốc độ chậm)
  - Local_QUORUM: Đảm bảo dữ liệu được ghi vào hơn nửa số node trong một datacenter. (Tốc độ trung bình)
  - ALL: Mức độ cao nhất, đảm bảo dữ liệu được ghi vào tất cả các node trên toàn hệ thống thì transaction đó mới được coi là hoàn thành. (Tốc độ rất chậm)
- **Không hỗ trợ các truy vấn phức tạp**: Cassandra không hỗ trợ các truy vấn phức tạp như các hệ thống quan hệ(Join, subquery, having group). Nếu ứng dụng của bạn đòi hỏi các truy vấn phức tạp, Cassandra có thể không phải là lựa chọn tốt nhất.
- **Quản lý schema**: Cassandra hỗ trợ cơ chế Schema-on-Read, điều này có nghĩa là bạn có thể lưu trữ dữ liệu mà không cần định nghĩa schema trước. Tuy nhiên, việc quản lý schema có thể trở nên phức tạp khi dữ liệu phát triển và thay đổi.
  - Nhất là thay đổi, việc thêm hoặc sửa một cloumn có thể yêu cầu cập nhât lớn đến tất cả các node vì vậy ảnh hưởng đến hiệu suất.
- Độ phức tạp trng quản lý và bảo trì: Cassandra là một hệ thống phân tán, việc quản lý và bảo trì Cassandra có thể phức tạp hơn so với các hệ thống cơ sở dữ liệu quan hệ truyền thống.
  - Việc cân bằng tải, đảm bảo tính sẵn sàng cao đòi hỏi hiểu biết đủ sâu về Cassandra và kiến thức về hệ thống phân tán.

## Kết luận
- Apache Cassandra là một hệ quản trị cơ sở dữ liệu phân tán, mở rộng ngang, và khả dụng cao.
- Cassandra lấy cảm hứng từ Google BigTable và Amazon Dynamo, kết hợp mô hình dữ liệu mạnh mẽ của BigTable và
  kiến trúc phân tán của Dynamo.
- Cassandra hỗ trợ mô hình dữ liệu Key-Value/Column Family, khả năng mở rộng tuyến tính, và khả năng chịu lỗi
  cao.
- Cassandra sử dụng ngôn ngữ truy vấn CQL (Cassandra Query Language) giống với SQL, dễ học và sử dụng.
- Cassandra thường được sử dụng trong các ứng dụng đòi hỏi khả năng lưu trữ dữ liệu lớn, truy cập nhanh, và luôn
  sẵn sàng.
- Cassandra là một lựa chọn lý tưởng cho các ứng dụng Big Data, IoT, và các ứng dụng đòi hỏi khả năng mở rộng và
  khả dụng cao.
- Lưu ý: Cassandra ưu tiên tính khả dụng (availability) hơn tính nhất quán (consistency), bạn cần cân nhắc khi
  cấu hình Consistency Level cho ứng dụng của mình. Nếu cấu hình Consistency Level cao, hiệu suất của hệ thống sẽ giảm, nếu cấu hình Consistency Level thấp, có thể dẫn đến mất tính nhất quán.

## Tài liệu tham khảo

1. https://en.wikipedia.org/wiki/Apache_Cassandra
