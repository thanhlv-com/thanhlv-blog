---
footer: true
title: Cài đặt Kafka với Zookeeper và Kraft
authors: ["lethanh"]
date: 2024-05-16
outline: deep
#image: /assets/event-and-message.UHUxhQ9h.jpeg
draft: true
group: 2.1 Kafka
---

# Cài đặt Kafka với Zookeeper và Kraft

Trong bài viết này, chúng ta sẽ cùng nhau bước vào hành trình khám phá Kafka đầu tiên khám phá Kafka bằng việc tìm hiểu các thành phần cần thiết để cài đặt kafka cũng như cách cài đặt kafka.
[[TOC]]

## Tại sao Kafka cần Zookeeper hoặc Kraft ?
**Đây là ý kiến cá nhân, là sự cảm nhận của mình nên có thể đúng hoặc sai.**
Một lưu ý trước tiên đó là Zookeeper là một component riêng và độc lập, còn Kraft là một thành phần nằm sẵn trong kafka từ phiên bản 2.8.0

Zookeeper hoặc Kraft đóng vai trò giúp quản lý, đồng bộ trạng thái, cấu hình của Kafka Cluster, một số khía cạnh chính khi sử dụng trong Kafka là:
- Quản lý metadata: Lưu trữ và quản lý các metadata liên quan đến Kafka Cluster bao gồm thông tin về Brokers, topic, partitions và replicas.
- Đồng bộ há và điều phối : Đóng vai trò là người điều phối, giúp đảm bảo các Brokers trong Cluster có trạng thái nhất quán, cũng cung cấp tính năng đồng bộ hóa các cấu hình và gửi các thay đổi đến các nodes trong cluster.
- Bầu Leader Partition: Bầu chọn Leader cho các Partition đảm bảo mỗi Partition có một Leader để xử lý yêu cầu ghi và đọc.
- Quản lý trạng thái của Brokers: Zookeeper theo dõi trạng thái hoạt động của các Broker trong Cluster thông qua cơ chế chế [heartbeat](https://demanejar.github.io/posts/hdfs-introduction/#:~:text=C%C6%A1%20ch%E1%BA%BF%20heartbeat,datanode%20%C4%91%C3%B3%20c%C3%B2n%20ho%E1%BA%A1t%20%C4%91%E1%BB%99ng.)
  - Khi một brokers định kỳ không gửi trạng thái báo cáo đang hoạt động đến Zookeeper, Zookeeper coi broker đó là đã chết và thông báo cho các Brokers khác trong Cluster để cho các brokers khác biết và thực hiện các thao tác phục hồi cần thiết.
- Rebalancing: Khi có sự thêm hoặc loại bỏ một brokers trong cluster, Zookeeper giúp điều phối quá trình rebalancing, đảm bảo dữ liệu được phân phối trên các Broker và các partition được sao chép.
## Zookeeper là gì ?
![Zookeeper-Architecture](2024-05-16-cai-dat-kafka-voi-zookeeper-hoac-KRaft/Zookeeper-Architecture.png)
Zookeeper là một open source cho centralized service để duy trì thông tin cấu hình, đặt tên và cung cấp đồng bộ hóa cho các ứng dụng phân tán.

Zookeeper Cho phép các process phân tán phối hợp với nhau thông qua một Share hierarchical namespace(Chia sẽ hệ thống tệp phân cấp), nó giống như một [File system](https://vi.wikipedia.org/wiki/H%E1%BB%87_th%E1%BB%91ng_t%E1%BA%ADp_tin)
![what-is-file-system-1.png](2024-05-16-cai-dat-kafka-voi-zookeeper-hoac-KRaft/what-is-file-system-1.png)
Trong đó mỗi một folder trong Share hierarchical namespace được gọi là Znodes. Mỗi Znodes trong Zookeeper name space được xác định bởi một path. Và mọi Znodes đều có cha mẹ có đường dẫn là prefix của Znodes hiện tại. Ngoại lệ duy nhaast là Root("/") sẽ không có cha mẹ.

::: details Ví dụ về Znodes
```
/opt/containerd/lib/
```

Nhìn vào đường dẫn ở trên chúng ta có thể nhận thấy là đang có 4 Znodes.
1. Znode Root chính là "/" đầu tiên từ trái qua phải, Znodes đầu tiên chứa các con là "opt"
 và có thể có nhiều con khác nữa.
2. Znode thứ 2 trong phân cấp có cha là **Root** là **Opt**
3. Znode thứ 3 trong phân cấp có cha là **opt** là **containerd**
4. Znode thứ 4 trong phân cấp có cha là **containerd** là **lib**
:::

Và giống như các [File system](https://vi.wikipedia.org/wiki/H%E1%BB%87_th%E1%BB%91ng_t%E1%BA%ADp_tin) khác,Znode cha không thể bị xóa nếu có các Znode con. Vì vậy muốn xóa Znode cha thì tất cả các Znode con cũng sẽ bị xóa.

Và Zookeeper để duy trì thông tin cấu hình, vì vậy các data trong Znode thường đo bằng kilobyte, thậm chí là byte.

::: details REF
https://cwiki.apache.org/confluence/display/ZOOKEEPER/ProjectDescription
:::

### Các tính năng chính của ZooKeeper bao gồm.
- **Đồng bộ hóa**: Zookeeper giúp đồng bộ hóa trạng thái giữa các node trong hệ thống phân tán, đảm bảo tất cả các node đều có dữ liệu nhất quán.
- **Đặt tên và cấu hình service**: ZooKeeper cung cấp một không gian tên phân cấp (giống như cấu trúc thư mục trong hệ thống tập tin) để lưu trữ và quản lý thông tin cấu hình, giúp các ứng dụng truy cập và quản lý cấu hình một cách dễ dàng.
- **Service discovery**:  Zookeeper có thể đụược sử dụng để theo dõi các node trong một cụm và quản lý thông tin về các service đang chạy trên các node đó, giúp các ứng dụng khác tìm và sử dụng các service này một cách hiệu quả.
- **Session Management**: Zookeeper quản lý các session cho các client kết nối đến nó. Mỗi client sẽ có một session làm việc riêng với Zookeeper và Zookeeper đảm bảo rằng trạng thái được duy trì liên tục vào Session đó.
  - Nếu một client mất kết nối, Zookeeper có thể phát hiện và xử lý tình huống đó và đồng thời thông báo cho các client khác về sự thay đổi trạng thái.
- **Nhất quán dữ liệu giữa các node**:
  - Zookeeper đảm bảo tính nhất quán của dữ liệu thông qua một thuật toán tên là : Zab (ZooKeeper Atomic Broadcast) thuật toán này đảm bảo rằng tất cả các thay đổi đối với cấu trúc dữ liệu của Zookeeper được áp dụng một cách đồng bộ trên tất cả các Node trong cụm.
- **Cơ chế Watchers**: Cơ chế này cho phép các client đăng ký nhận thông báo khi có sự thay đổi đối với dữ liệu mà họ quan tâm. Khi có dữ liệu tại một znode thay đổi, các client đăng ký watcher sẽ nhận đưược thông báo, điều này giúp các ứng dụng phản ứng nhanh chóng với các thay đổi trong cấu hình hoặc trạng thái của hệ thống

![Zookeeper-Architecture](2024-05-16-cai-dat-kafka-voi-zookeeper-hoac-KRaft/Zookeeper-Architecture.png)
Zookeeper duy trì một cấu chúc dữ liệu phân cấp và lưu trữ các dữ liệu trong các Node gọi là Znodes. Mỗi Znodes có thể chứa dữ liệu và có thể có các Znode con. Zookeeper đảm bảo rằng tất cả các bản sao của cơ sở dữ liệu các nó trên các node(Node zookeeper) khác nhau đều được cập nhật với trạng thái nhất quán.

### Setup Kafka với Zookeeper.
#### Docker
