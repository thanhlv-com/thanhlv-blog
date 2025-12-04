---
footer: true
title: Sharding nên chọn database như nào?
description:  Sharding là kỹ thuật phân chia dữ liệu thành các phần nhỏ hơn (gọi là shards) và lưu trữ chúng trên nhiều máy chủ khác nhau.
authors: [ lethanh ]
date: 2025-12-04
outline: deep
image: https://static-cdn.thanhlv.com/short-blog/images/2025-12-04-sharding-nen-chon-database-nhu-nao/sharding.jpg
draft: false
---

Xin chào, hôm nay trong lúc ngồi chém gió và thảo luận về sharding database với dự án của mình, mình nhận ra có khá nhiều bạn vẫn còn mơ hồ về việc lựa chọn database phù hợp để triển khai sharding. Vậy nên mình quyết định viết bài này để chia sẻ một số kinh nghiệm và gợi ý về việc chọn database khi triển khai sharding.

![Image](https://static-cdn.thanhlv.com/short-blog/images/2025-12-04-sharding-nen-chon-database-nhu-nao/sharding.jpg)
## Hiểu về Sharding
Trước tiên, chúng ta cần hiểu rõ sharding là gì.? 

Sharding là kỹ thuật phân chia dữ liệu thành các phần nhỏ hơn (gọi là shards) và lưu trữ chúng trên nhiều máy chủ khác nhau.

Mục tiêu của sharding là cải thiện hiệu suất, khả năng mở rộng và độ tin cậy của hệ thống.

### Ví dụ về Sharding
Dữ liệu của bạn có 100 tỉ bản ghi, việc lưu tất cả trên 1 máy chủ gần như là bất khả thi và rủi do rất cao. Thay vào đó, bạn có thể chia nhỏ dữ liệu này thành 10 shards, mỗi shard chứa 10 tỉ bản ghi và lưu trữ trên 10 máy chủ khác nhau.

## Tiêu chí lựa chọn Database cho Sharding
Mình cần lưu ý trước, tất cả các tiêu chí phía dưới đều mang tính chất tham khảo và không phải tuyệt đối. Tùy vào từng dự án, từng yêu cầu cụ thể mà bạn có thể điều chỉnh sao cho phù hợp nhất.
Dưới đây là một số tiêu chí quan trọng khi lựa chọn database để triển khai sharding:
### 1. Hỗ trợ Sharding Tự Nhiên hoặc cần tự Triển Khai
#### Hỗ trợ Sharding Tự Nhiên
Đúng. Chính là tự nhiên, bản thân database bạn sử dụng đã có sẵn cơ chế sharding mà bạn không cần phải tự tay triển khai từ đầu.
Một số database như MongoDB, Cassandra, và CockroachDB có hỗ trợ sharding tự nhiên, giúp bạn dễ dàng triển khai và quản lý sharding hơn.

Tuy nhiên, nhược điểm của các database này thường là tính phức tạp trong việc cấu hình và quản lý, cũng như có thể không phù hợp với tất cả các loại ứng dụng.

Ví dụ, đối với tìm kiếm dữ liệu dạng `like` thì các loại database này có thể không tối ưu bằng các database chuyên dụng khác.

#### Tự Triển Khai Sharding
Nếu bạn chọn một database không hỗ trợ sharding tự nhiên và bạn vẫn mong muốn triển khai sharding trên database đó thì bạn vẫn có thể tự triển khai sharding.
Ví dụ, bạn có thể sử dụng PostgreSQL hoặc MySQL và tự xây dựng cơ chế sharding dựa trên ứng dụng của mình. Tuy nhiên, việc này đòi hỏi bạn phải có kiến thức sâu rộng về database và sharding.

Có 2 cách để tự triển khai sharding là dùng thư viện bên thứ 3 là một proxy trung gian để xử lý sharding hoặc tự xây dựng logic sharding trong ứng dụng của bạn.

### 2. Khả Năng Mở Rộng
Khi lựa chọn database, bạn cần xem xét khả năng mở rộng của nó. Database nên hỗ trợ việc thêm hoặc bớt các shard một cách dễ dàng mà không ảnh hưởng đến hiệu suất của hệ thống.
Các database như cassandra cho phép bạn thêm node mới vào cluster một cách dễ dàng mà không cần phải tắt hệ thống, hệ thống sẽ tự động tính toán để rebalance dữ liệu trên các node hiện có.

### 3. Hiệu Suất
Hiệu suất là một yếu tố quan trọng khi lựa chọn database cho sharding. Bạn cần đảm bảo rằng database có khả năng xử lý các truy vấn nhanh chóng và hiệu quả trên các shard.
Các database như MongoDB và Cassandra, Mysql được thiết kế để xử lý các truy vấn phân tán một cách hiệu quả, giúp cải thiện hiệu suất tổng thể của hệ thống.

### 4. Tính nhất quán
Đây là một tiêu chí quan trọng khác khi lựa chọn database cho sharding. Bạn cần xem xét cách database xử lý tính nhất quán dữ liệu như nào.
Thông thường, các database distributed sẽ tuân theo mô hình CAP theorem, bạn cần xác định xem ứng dụng của bạn ưu tiên tính nhất quán (Consistency), sẵn sàng (Availability) hay phân vùng (Partition tolerance) để lựa chọn database phù hợp.

Ví dụ như Cassandra ưu tiên Availability và Partition tolerance, trong khi MongoDB có thể cấu hình để ưu tiên Consistency hoặc Availability tùy theo nhu cầu.

Nếu bạn cần đảm bảo dữ liệu nhất quán thì bạn không thể chọn các database như Cassandra.

### 5. Hỗ trợ truy vấn phức tạp
Nếu ứng dụng của bạn yêu cầu các truy vấn phức tạp như join, aggregate thì bạn cần chọn database hỗ trợ tốt các loại truy vấn này trên các shard.
Ví dụ, PostgreSQL hỗ trợ các truy vấn phức tạp rất tốt, trong khi MongoDB, Cassandra có thể gặp khó khăn với các truy vấn join phức tạp.(Hiệu suất rất chậm)

### 6. Phù hợp với mô hình dữ liệu
Bạn cần chọn database phù hợp với mô hình dữ liệu của bạn. Ví dụ, nếu bạn có dữ liệu quan hệ phức tạp thì bạn nên chọn các database quan hệ như PostgreSQL hoặc MySQL. Nếu bạn có dữ liệu phi cấu trúc thì các database NoSQL như MongoDB hoặc Cassandra có thể là lựa chọn tốt hơn.

### 8. Cộng đồng và Hỗ trợ
Bạn nên xem xét cộng đồng và hỗ trợ của database. Một cộng đồng lớn và hoạt động sẽ giúp bạn dễ dàng tìm kiếm tài liệu, giải pháp cho các vấn đề gặp phải khi triển khai sharding.
Các database phổ biến như PostgreSQL, MySQL, MongoDB có cộng đồng lớn và nhiều tài liệu hỗ trợ, giúp bạn dễ dàng triển khai và quản lý sharding.

### 9. Phù hợp với dự án và quyết định bởi nhóm của bạn.

Cuối cùng, bạn cần xem xét dự án của bạn và quyết định bởi nhóm của bạn. Mỗi dự án có những yêu cầu và đặc điểm riêng, do đó bạn cần lựa chọn database phù hợp với nhu cầu cụ thể của dự án.
Hãy thảo luận với nhóm của bạn để đưa ra quyết định cuối cùng về việc lựa chọn database cho sharding.

## Dự án của mình đang làm
Hiện tại dự án của mình đang sử dụng Mysql để triển khai sharding.

Theo tính toán, mỗi Node sharidng có tổng dung lượng tối đa là 5TB, với dự liệu ước tính trong 5 năm tới sẽ lên tới 40TB, nên mình sẽ cần triển khai ít nhất 8 nodes sharding để lưu trữ dữ liệu.

### Lựa chọn Mysql
Thực tế, lúc đầu chúng mình lựa chọn Cassandra để triển khai sharding, tuy nhiên Cassandra không hỗ trợ tốt các truy vấn dạng `like` và các truy vấn phức tạp, điều này ảnh hưởng lớn đến hiệu suất của ứng dụng.

Vì vậy, chúng mình sẽ cần triển khai thêm một ES hoặc Mysql để hỗ trợ các truy vấn phức tạp này, điều này làm tăng độ phức tạp của hệ thống và chi phí vận hành.

Sau khi cân nhắc kỹ lưỡng, chúng mình quyết định sử dụng Mysql để triển khai sharding. Mặc dù việc tự triển khai sharding trên Mysql đòi hỏi nhiều công sức và kiến thức, nhưng nó giúp chúng mình kiểm soát tốt hơn về mặt hiệu suất và tính nhất quán của dữ liệu.

### Cách triển khai sharding trên Mysql
Lúc đầu, chúng mình cũng có tìm kiếm một số giải pháp proxy trung gian để hỗ trợ sharding trên Mysql như Vitess...etc.... Tuy nhiên, việc triển khai thêm 1 proxy trung gian làm tăng độ phức tạp của hệ thống và có thể ảnh hưởng đến hiệu suất.

Cuối cùng, chúng mình quyết định tự xây dựng logic sharding trong ứng dụng của mình. Chúng mình sử dụng một hàm băm (hash function) để xác định shard nào sẽ lưu trữ dữ liệu dựa trên một số cặp trường nhất định (ví dụ: user_id, order_id...etc...).

Điều này giúp chúng mình kiểm soát tốt hơn về cách dữ liệu được phân phối trên các shard và tối ưu hóa hiệu suất truy vấn.

Tuy nhiên, do mình sử dng Hash function để phân phối dữ liệu nên việc mở rộng thêm sharding là rất phức tạp, cần phải rebalance lại toàn bộ dữ liệu trên các shard hiện có. Đây là một điểm hạn chế lớn của việc tự triển khai sharding trên Mysql.

Chúng mình cũng đã đánh giá sử dụng `Consistent Hashing`, tuy nhiên nó sẽ tăng độ phức tạp, vì nếu sử dụng Consistent Hashing thì sẽ cần xây dựng lại toàn bộ cơ chế phân phối dữ liệu và quản lý shard, điều này không phải là main business của chúng mình nên chúng mình quyết định không sử dụng Consistent Hashing.

## Kết luận
Việc lựa chọn database để triển khai sharding là một quyết định quan trọng và cần được xem xét kỹ lưỡng dựa trên nhiều tiêu chí khác nhau.

Có lẽ nhiều bạn bảo dự án của mình chọn Mysql là không tốt, không tối ưu và chưa tính đến tương lai. Mình hoàn toàn đồng ý với bạn, tuy nhiên trong thực tế, việc lựa chọn database không chỉ dựa trên các tiêu chí kỹ thuật mà còn phụ thuộc vào nhiều yếu tố khác như kinh nghiệm của đội ngũ phát triển, chi phí vận hành, và yêu cầu cụ thể của dự án.

Hiện tại, chúng mình vẫn hài lòng với Mysql ^^.

Hy vọng bài viết này sẽ giúp bạn có cái nhìn rõ ràng hơn về việc lựa chọn database khi triển khai sharding. Nếu bạn có bất kỳ câu hỏi hoặc muốn chia sẻ kinh nghiệm của mình, hãy để lại bình luận bên dưới nhé!
