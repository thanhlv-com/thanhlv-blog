---
footer: true
title: Cách Save batch dữ liệu trên mysql database
description: Làm cách nào để nhiều container dùng chung một network K8s? Trong bài viết này mình sẽ giải thích và làm cách ví dụ để cho các bạn hiểu.
authors: [ lethanh ]
date: 2025-07-08
outline: deep
image: https://static-cdn.thanhlv.com/blog/images/2025-07-08-lam-cach-nao-de-nhieu-container-dung-chung-mot-network-k8s/img.png
draft: false
---

Xin chào mọi người!

Mình gần đây gặp phải 1 bài toán khá hay. Hệ thống của mình cần migration dữ liệu từ hệ thống cũ đến hệ thống mới.

Do việc migartion chứa rất nhiều logic encode..etc.. vì vậy không thể dùng các tool ETL có sẵn để làm việc này hoặc viết 1 script đơn giản để chạy 1 lần.

Vì vậy, team đã thảo luận và quyết định hệ thống cũ sẽ đọc dữ liệu trong database sau đó push lên Kafka, sau đó hệ thống mới sẽ đọc dữ liệu từ Kafka về và xử lý logic rồi lưu vào database mới.

Tuy nhiên, chúng mình có 11 tỉ bản ghi.

## Vấn đề gặp phải
Lúc đầu chúng mình dự định mỗi message trong Kafka sẽ là i batch bản ghi. Ví dụ 1 batch là 1000 bản ghi, vậy mỗi message sẽ chứa 1000 bản ghi.

Tuy nhiên, kích thước mặc định của một message trong Kafka là 1MB. Và đây là Kafka của cả tập đoàn dùng chung, nên không thể thay đổi cấu hình này được.

Vì vậy, dể đơn giản hóa bài toán, chúng mình quyết định mỗi message trong Kafka sẽ là 1 bản ghi sau đó hệ thống mới sẽ đọc từng bản ghi một và lưu vào database mới.

### Cách thức đọc dữ liệu tại consumer hiện tại
Hiện tại phía consumer mình sử dụng Kafka batch, tức thay vì mỗi lần chỉ xử lý 1 msg duy nhất, mình sẽ xử lý 1 batch msg trong 1 lần poll từ Kafka.
Hiện tại, một batch sẽ có tôi đa 500 msg.

## Vấn đề gặp phải
Lúc đầu mình sử dụng JPA với method saveAll() để lưu batch dữ liệu vào database.

Mọi thứ hoạt động rất tốt, dữ liệu đầy đủ và không bị thiếu, mình nghĩ là task xong rồi.

Tuy nhiên, khi thử trên môi trường loadtest với 30 triệu dữ liệu, có 2 vấn đề vô cùng nghiêm trọng xảy ra:
1. File Bin Log của mysql tăng rất nhanh, trung bình 1 triệu bản ghi sẽ tăng khoảng 1GB file bin log.
   - Hãy nghĩ với 11 tỉ dữ liệu thì file Bin LOG sẽ là 11TB, điều này là không thể chấp nhận được.
2. Replica mysql bị lag rất nặng, khi loadtest hết 30 triệu dữ liệu, Replica bị lag tới 4 giờ đồng hồ.
   - Điều này ảnh hưởng nghiêm trọng đến hệ thống vì hệ thống đọc dữ liệu từ Replica.
   - 30triệu dữ liệu chỉ là test, với 11 tỉ dữ liệu thật thì Replica sẽ lag cả năm.
   - Đã tăng lên 10 Thread cho Replica vẫn không giải quyết được vấn đề này.

## Nguyên nhân
Nguyên nhân chính của vấn đề này là do JPA với method saveAll() sẽ thực hiện từng câu lệnh insert một cho mỗi bản ghi trong batch.

Ví dụ với batch 500 bản ghi, JPA sẽ thực hiện 500 câu lệnh insert riêng biệt.

Điều này dẫn đến File Big log tăng rất nhanh, vì mỗi câu lệnh insert sẽ được ghi vào bin log.

Chính vì quá nhiều câu lệng insert đơn lẻ trong Bin Log nên replica cũng sẽ cần đồng bộ cho từng câu lệnh insert này, dẫn đến việc replica bị lag nghiêm trọng.

## Giải pháp
Để giải quyết vấn đề này, mình quyết định sử dụng batch insert thay vì insert từng bản ghi một.
Batch insert sẽ gom nhiều bản ghi lại thành một câu lệnh insert duy nhất.

Ví dụ:
```sql
insert into table_name (col1, col2) values (val1a, val2a), (val1b, val2b), (val1c, val2c);
```

Điều này sẽ giúp giảm đáng kể số lượng câu lệnh insert được ghi vào bin log, từ đó giảm kích thước file bin log và giảm tải cho replica.

### Cách thực hiện batch insert với jdbcTeamplate.batchUpdate và JPA.

#### Sử dụng jdbcTemplate.batchUpdate
Với jdbcTemplate, mình có thể sử dụng method batchUpdate để thực hiện batch insert.
Với cách này chúng ta sẽ sử dụng tính năng Batch processing của JDBC với luồng như sau
1. Tạo connection
2. Tạo PreparedStatement được biên dịch trên Mysql server trước.
3. Toàn bộ batch dữ liệu được gửi đến Database thông qua việc gọi ps.executeBatch()
4. Mysql thực hiện nó là 1 câu lênnh batch insert duy nhất.
```java
public static final String INSERT_ON_DUPLICATE_SQL = """
  INSERT INTO tableMock (
      service_id, created_at, deleted_at
  )
  VALUES (:serviceId, :createdAt, :deletedAt)
  ON DUPLICATE KEY UPDATE tableMock.service_id = VALUES(service_id)
  """;
       List<Map<String, Object>> batchValues = new ArrayList<>();
            for (MockEntity record : batchs) {
                Map<String, Object> paramMap = new HashMap<>();
                paramMap.put("serviceId", record.getServiceId());
                paramMap.put("createdAt", record.getCreatedAt());
                paramMap.put("deletedAt", record.getDeletedAt());
                batchValues.add(paramMap);
            }

            int[] result = jdbcTemplate.batchUpdate(INSERT_ON_DUPLICATE_SQL,
                                                    batchValues.toArray(new Map[0]));
```

Tuy nhiên, do 1 số đặc thù của dự án và giới hạn của jdbcTemplate, việc sử dụng jdbcTemplate sẽ khó có thể xem metrics..etc.. nên mình quyết định sử dụng JPA để thực hiện batch insert.

#### Sử dụng JPA để thực hiện batch insert

Với JPA chúng ta sẽ đơn giản hơn rất nhiều, chỉ cần cấu hình 1 số thuộc tính trong file cấu hình JPA sau đó khi gọi SaveAll() thì JPA sẽ tự động gom các bản ghi lại và thực hiện batch insert.

Với JPA, chúng ta có thể cấu hình để JPA sử dụng batch insert thông qua các bước sau:
1. Cấu hình thuộc tính hibernate.jdbc.batch_size trong file cấu hình JPA.
```properties
spring.jpa.properties.hibernate.jdbc.batch_size=500
spring.jpa.properties.hibernate.order_inserts=true
spring.jpa.properties.hibernate.order_updates=true
```
2. Cấu hình Mysql JDBC driver để hỗ trợ batch insert.
```properties
spring.datasource.hikari.data-source-properties.rewriteBatchedStatements=true
```
Hoặc trực tiếp trên URL kết nối:
```
jdbc:mysql://localhost:3306/dbname?rewriteBatchedStatements=true
```

Sau khi cấu hình xong, khi gọi method saveAll() của JPA, JPA sẽ tự động gom các bản ghi lại và thực hiện batch insert.
```java
List<MockTable> savedRecords = mockTableepository.saveAll(batch);
```

Một số lưu ý khi sử dụng batch insert với JPA:
1. Kích thước batch: Chúng ta cần cấu hình kích thước batch phù hợp với hệ thống của mình. Nếu batch quá lớn, vượt quá cấu hình `max_allowed_packet` của Mysql thì có thể sẽ bị Mysql từ chối yêu cầu.
   - Sử dụng `SHOW VARIABLES LIKE 'max_allowed_packet';` để kiểm tra giá trị hiện tại của `max_allowed_packet`.
2. Kiểm tra lại các trigger: Nếu bảng có sử dụng trigger, chúng ta cần kiểm tra lại xem trigger có hoạt động đúng với batch insert hay không.
3. Batch insert chỉ hỗ trợ trong cùng một transaction, nếu khác transaction thì sẽ không được gom lại.
4. Nên sử dụng method saveAll()

## Kết quả đạt được
Sau khi áp dụng batch insert, mình đã tiến hành loadtest lại với 30 triệu bản ghi và đạt được các kết quả sau:
1. Kích thước file bin log giảm đáng kể, từ 30GB xuống còn khoảng 200Mb.
2. Replica không còn bị lag
