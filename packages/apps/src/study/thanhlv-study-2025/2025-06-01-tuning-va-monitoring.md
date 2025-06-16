---
footer: true
title: Tuning và Monitoring trong Cassandra
description: Tuning và Monitoring là hai khía cạnh quan trọng trong việc quản lý hiệu suất và độ tin cậy của hệ thống Cassandra. Bài viết này sẽ cung cấp cái nhìn tổng quan về cách tối ưu hóa hiệu suất và giám sát hệ thống Cassandra.
authors: [ "lethanh" ]
date: 2025-05-31
outline: deep
image: https://static-cdn.thanhlv.com/study/thanhlv-study-2025/2025-06-01-tuning-va-monitoring/image-2025-3-20_11-9-55.png
draft: false
group: 1. Cassandra
---

[[TOC]]

## Các Cấu Hình Cassandra cho Hiệu Suất Tối Ưu

### 1.1 Cấu hình phần cứng
Cấu hình phần cứng cho một node Cassandra phụ thuộc vào yêu cầu về hiệu suất, khả năng chịu lỗi, và mục đích sử dụng của cluster. Dưới đây là các khía cạnh chính cần xem xét khi chọn phần cứng:

##### 1.1.1 CPU
**Yếu tố cân nhắc**: Cassandra sử dụng CPU chủ yếu cho việc compaction và thực thi query. Nhiều core sẽ hỗ trợ tốt xử lý đồng thời nhiều query và compaction

Nếu hệ thống của bạn lớn, nên có số lượng CPU trên 8 core để đảm bảo hiệu suất tốt.

##### 1.1.2 RAM
Bạn biết mà, Cassandra được viết bằng Java, vì vậy RAM sẽ ảnh hưởng đến kích thước của Heap JVm cũng như khả năng cache dữ liệu. Nhiều ram sẽ giúp giảm độ trễ.

Khuyến nghị tốt nhất hệ thống nên có trên 16GB RAM ở môi trường prod.

##### 1.1.3 Ổ cứng
Cassandra là một database, vì vậy sẽ cần thực hiện đọc và ghi đĩa nhiều.

SSD có tốc độ đọc ghi cao hơn nhiều so với HDD, đặc biệt quan trọng cho việc giảm độ trễ và tăng hiệu suất I/O.

Khuyến nghị tốt nhất là sử dụng SSD để lưu trữ.

Nếu chi phí là một vấn đề lớn. Có thể sử dụng song song và SSD và HHD.

SSD sẽ lưu trữ các data hot có lượng yêu cầu sử dụng lớn và HDD sẽ lưu trữ các data có mức sử dụng thấp.

Ví dụ history 1 năm gần nhất sẽ lưu ở SSD còn từ 2 năm ở trên sẽ lưu ở HDD.

##### 1.1.4 Mạng
Cassandra là một hệ thống phân tán, do đó băng thông mạng và độ trễ là rất quan trọng.

Sử dụng mạng Gigabit Ethernet hoặc tốt hơn. Đảm bảo rằng mạng có độ trễ thấp và băng thông cao để hỗ trợ giao tiếp giữa các node.

Nếu các node Cassandra và ứng dụng kết nối với nhau trên cùng một data center vấn đề sẽ dễ giải quyết. Tuy nhiên nếu có nhiều data center thì cần lưu ý đến mạng.

### 1.2 Đánh Giá và Xác Định Node và Cluster
#### 1.2.1 Đánh giá nhu cầu.
- **Dung lượng dữ liệu**: Ước tính tổng dung lượng dữ liệu và tốc độ tăng trường hằng tháng, năm. Điều này sẽ ảnh hưởng đến số lượng và loại ổ cứng cần thiết.
- **Query**: Xác định loại query và tần suất. các query đọc nhiều sẽ cần nhiều Ram hơn để hiệu suất cache tốt hơn.
- **Service Level Agreement**: Các yêu cầu về tính bền vững, tốc độ.

#### 1.2.2 Xác định cấu hình
- **Số lượng node**: Dựa trên dung lượng dữ liệu và yêu cầu về khả năng chịu lỗi. Nhiều node hơn có thể cung cấp khả năng chịu lỗi tốt hơn để phân phối tải.
- **Phân bổ địa lý**: Đối với các ứng dụng yêu cầu độ trễ thấp trên diện rộng, cần cân nhắc sử dụng nhiều data center.

#### 1.2.3 Use case cụ thể
##### High-Performance Applications
- **Cấu hình**: High-end CPUs, 32GB(Ram tối thiểu)+ RAM, all-SSD storage.
- **Cluster**: Nhiều node với replication để đảm bảo độ sẵn sàng cao và khả năng chịu lỗi.

##### Large Data Warehouses
- **Cấu hình**: Kết hợp SSD cho hot data và HDD cho cold data. Ram lớn để hỗ trợ các truy vấn lớn.
- **Cluster**: Lớn với nhiều node, có thể phân bố trên nhiều data center để cải thiện độ tin cậy và khả năng chịu lỗi.

### 2.1 cấu hình phần mềm

Cấu hình phần mềm cho Cassandra cũng rất quan trọng để đảm bảo hiệu suất tối ưu và độ tin cậy cao. Một phần cứng tốt nhưng chung ta chỉ sử dụng 1% hiệu suất của phần cứng thì vẫn có thể rẩt chậm hoặc không tối ưu tài nguyên.

các cấu hình của Cassandra chủ  yếu được quản lý thông qua file `cassandra.yaml`, đây là tệp cấu hình chính của Cassandra. Tuy nhiên cũng sẽ có 1 số cấu hình khác không ở trong `cassandra.yaml`

Dưới đây là 1 số cấu hình quan trọng:

#### 2.1.1 Cấu hình bộ nhớ và JVM
- **heap_size**: Đây là kích thước của heap cho JVM, bởi vì Cassandra được code bằng java.
  - **Xms và Xmx**: Giới hạn tối đa và thấp nhất của kích thước heap. Thông thường 2 giá trị này sẽ bằng nhau để trách sự giao động của heap size.
  - **Trường hợp sử dụng**: Tăng giá trị này nếu bạn nhận thấy rằng Garbage Collection đang xảy ra quá thường xuyên hoặc Cassandra đang chạy chậm do thiếu bộ nhớ heap.
    Khi hết bộ nhớ GC sẽ được chạy để giải phóng heap.
#### 2.1.2 Cấu hình trong cassandra.yaml

- **num_tokens**: Có thể nói đây là 1 cấu hình đặc biệt quan trọng. Cấu hình này giúp xác định có bao nhiêu dải token ngẫu nhiên được gán cho node này.
  - Càng nhiều token so với các node khác thì tỉ lệ dữ liệu mà node này lưu trữ sẽ càng lớn.
  - Nếu tất cả các node có phần cứng giống nhau, chúng ta có thể để cấu hình này giống trên tất cả các node. Tuy nhiên nếu cấu hình phần cứng có sự khác nhau, cần được đánh giá để xác định giá trị cho cấu hình này.
    - Ví dụ Node có phần cứng mạnh hơn có thể có nhiều token hơn so với các node khác.
  - Nếu không cấu hình, default giá trị là 16(tùy phiên bản, có thể đã khác).
  - Mỗi một token sẽ quản lý một khoảng không gian token, chứ không chỉ là một giá trị token duy nhất
    ![Image](https://static-cdn.thanhlv.com/study/thanhlv-study-2025/2025-06-01-tuning-va-monitoring/image-2025-3-20_11-9-55.png)
  - **Token Ring** là gì ?
    -  Cassandra sử dụng mô hình token ring, nơi mà không gian token được hình dung như một vòng tròn liên tục. Mỗi node quản lý một phân đoạn của vòng tròn này. Token được sắp xếp theo thứ tự số, và mỗi node sẽ quản lý một khoảng từ token thấp nhất đến token cao nhất mà nó được gán.
    - **Lưu ý: Cài đặt num_tokens không nên thay đổi khi đã tham gia cluster.**
- **allocate_tokens_for_local_replication_factor**: Khi thêm 1 node mới, cấu hình này sẽ giúp phân bổ token trong cluster để giúp replication data một cách cân bằng dựa trên số node hiện có và replication factor.
- **hinted_handoff_enabled(default true)**:  Cơ chế giúp xử lý tình huống khi việc đồng bộ bảng ghi đến node khác nhưng node đó không hoạt động, hệ thống sẽ hint lại, hint là một bản ghi tạm thời của thao tác ghi. Khi node khả hoạt động lại thì sẽ gửi lại.
- và 1 số cấu hình hinted khác....
- **authenticator**: Cấu hình authen cho cassandra
  - **AllowAllAuthenticator**: Cho phép tất cả truy cập.
  - **PasswordAuthenticator**: Cấu hình một username/password
- **authorizer**: Cấu hình role
- ... 1 số cấu hình authen và author khác.
- **data_file_directories**: Đường dẫn đến thư mục lưu trữ dữ liệu của Cassandra. Nên sử dụng SSD để cải thiện hiệu suất đọc/ghi. Default là $CASSANDRA_HOME/data/data
- **commitlog_directory**: Đường dẫn đến thư mục lưu trữ commit log. Commit log là nơi ghi lại tất cả các thay đổi dữ liệu để đảm bảo tính nhất quán. Nên sử dụng SSD cho commit log để cải thiện hiệu suất ghi. Default là $CASSANDRA_HOME/data/commitlog
- **cdc_enabled**: Cấu hình này cho phép hoặc tắt tính năng Change Data Capture (CDC) trong Cassandra. Khi bật, Cassandra sẽ ghi lại các thay đổi dữ liệu để có thể theo dõi và xử lý sau này. Mặc định là false.
- **commitlog_sync**: Cách đồng bộ hóa commit log
  - **Periodic**: Đồng bộ hóa commit định kỳ dựa trên **commitlog_sync_period_in_ms**
  - **batch**: Khi đến 1 lượng dữ liệu nhất định sẽ thực hiện đồng bộ hóa.
- **Compaction**: Cấu hình chiến lược compact dữ liệu để quản lý và tối ưu hóa việc lưu trữ dữ liệu
- **concurrent_reads**, **concurrent_writes** : Cấu hình số lượng concurrent cho việc đọc và ghi dữ liệu
- **enable_materialized_views**: Có hỗ trợ **materialized_views** không.
- **read_request_timeout_in_ms** và **write_request_timeout_in_ms**: Thời gian chờ tối đa cho yêu cầu đọc và ghi
- và nhiều cấu hình khác nữa

## Giám Sát và Điều Chỉnh Hiệu Suất của Cluster
### 3.1 Monitoring Tools
- **JMX (Java Management Extensions)**: Cassandra cung cấp nhiều MBeans để giám sát hiệu suất và trạng thái của cluster. Bạn có thể sử dụng JConsole hoặc VisualVM để kết nối và theo dõi các MBeans này.
- **Prometheus và Grafana**: Sử dụng Prometheus để thu thập số liệu từ Cassandra và Grafana để trực quan hóa chúng. Cassandra có thể được cấu hình để xuất số liệu Prometheus thông qua JMX Exporter.
- **OpsCenter**: Đây là một công cụ giám sát và quản lý cluster Cassandra, cung cấp giao diện người dùng đồ họa để theo dõi hiệu suất, trạng thái và các vấn đề của cluster.
- **Cassandra Reaper**: Công cụ này giúp quản lý và giám sát quá trình compaction trong Cassandra, cung cấp thông tin về tình trạng compaction và hiệu suất của cluster.
- **Nodetool**:  là một công cụ cli cho phép quản lý cluster cassandra và thu thập các thông số.
  - `nodetool status`: Hiển thị trạng thái các node trong cluster
    ![Image](https://static-cdn.thanhlv.com/study/thanhlv-study-2025/2025-06-01-tuning-va-monitoring/image-2025-3-20_11-36-42.png)
  - **nodetool cfstats**: Cung cấp chi tiết về các table theo từng keyspace
  - **nodetool tpstats**: Các thông kê về thread ...etc.. giúp phát hiện tắc nghẽn
  - ... https://docs.datastax.com/en/cassandra-oss/3.x/cassandra/tools/toolsNodetool.html
### 3.2 Performance Tuning:
- **Garbage Collection Tuning**: Tối ưu hóa thời gian và hiệu suất của GC để giảm độ trễ và tăng throughput.
- **Data Model Optimization**: Thiết kế lại mô hình dữ liệu để giảm độ phức tạp và số lượng vòng lặp trong các truy vấn.
- **Query Performance**: Phân tích và tối ưu hóa các truy vấn, sử dụng các chỉ mục phù hợp để cải thiện hiệu suất truy vấn.
  - Sử dụng công cụ cqlsh và TRACING On để thực hiện điều này
    ![Image](https://static-cdn.thanhlv.com/study/thanhlv-study-2025/2025-06-01-tuning-va-monitoring/image-2025-3-20_11-42-42.png)

# REF:
- https://thelastpickle.com/blog/2021/01/29/impacts-of-changing-the-number-of-vnodes.html
