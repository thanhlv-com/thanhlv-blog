---
footer: true
title: Kafka producer đã không còn Round Robin Partition với key null 
description: Kafka producer đã không còn Round Robin Partition với key null.
authors: [ lethanh ]
date: 2024-07-16
outline: deep
draft: true
---

# Kafka producer đã không còn Round Robin Partition với key null.
Chào mọi người,

Sau nhiều ngày được anh Lâm (Leader tại LINE) khuyến khích và động viên viết blog về công nghệ và mình nhận thấy có khá nhiều bạn đã hiểu sai về Kafka trên phiên bản mới nhất. Điều này dẫn đến việc cấu hình partition và consumer bị sai khi sử dụng Kafka.

Vì vậy, bài viết này mình sẽ thực hiện để đạt được hai mục tiêu:
1. Viết một bài chia sẻ về công nghệ trên blog của LINE (Tuy nhiên, do thói quen viết blog, mình vẫn sẽ đăng trên blog cá nhân trước).
2. Giải thích rõ ràng về tiêu đề bài viết `Kafka producer đã không còn Round Robin Partition` và cách Kafka hiện tại đang hoạt động.
[[TOC]]

## Kafka producer Round Robin Partition từ phiên bản <=2.3.1
Từ những phiên bản đầu tiên khi Kafka được Open Source đến phiên bản 2.3.1, mặc định Kafka producer khi gửi các Record có key là null sẽ thực hiện Round Robin Partition

Dưới đây là đoạn code ở phiên bản 2.3.1 trên java, phiên bản cuối cùng Kafka Producer mặc định Round Robin Partition

```java
package org.apache.kafka.clients.producer.internals;
.....

public class DefaultPartitioner implements Partitioner {
    // Map ConcurrentMap để lưu trữ bộ đếm count cho từng topic 
    private final ConcurrentMap<String, AtomicInteger> topicCounterMap = new ConcurrentHashMap();

    // Constructor mặc định
    public DefaultPartitioner() {
    }

    // Phương thức cấu hình, hiện tại không làm gì
    public void configure(Map<String, ?> configs) {
    }

    // Phương thức xác định phân vùng cho một bản ghi
    public int partition(String topic, Object key, byte[] keyBytes, Object value, byte[] valueBytes, Cluster cluster) {
        // Lấy danh sách các phân vùng cho chủ đề
        List<PartitionInfo> partitions = cluster.partitionsForTopic(topic);
        int numPartitions = partitions.size();
        
        // Nếu không có khóa, sử dụng bộ đếm tuần tự để chọn phân vùng
        if (keyBytes == null) {
            int nextValue = this.nextValue(topic);
            // lấy về danh sách partition khả dụng để ghi. (Không bao gồm các partition off)
            List<PartitionInfo> availablePartitions = cluster.availablePartitionsForTopic(topic);
            
            // Nếu có phân vùng khả dụng, chọn một trong số chúng
            if (availablePartitions.size() > 0) {
                // Chuyển giá trị bộ đếm thành số dương và lấy phần dư khi chia cho số phân vùng khả dụng
                // Ví dụ topic có 5 partition.
                // part = 2107121300 % 5 ==> 0
                // part = 2107121301 % 5 ==> 1
                // part = 2107121302 % 5 ==> 2
                // part = 2107121303 % 5 ==> 3
                // part = 2107121304 % 5 ==> 4
                int part = Utils.toPositive(nextValue) % availablePartitions.size();
                return ((PartitionInfo)availablePartitions.get(part)).partition();
            } else {
                // Nếu không có phân vùng khả dụng, chọn ngẫu nhiên trong tất cả các phân vùng
                return Utils.toPositive(nextValue) % numPartitions;
            }
        } else {
            // Nếu có khóa, sử dụng hàm băm Murmur2 để chọn phân vùng
            return Utils.toPositive(Utils.murmur2(keyBytes)) % numPartitions;
        }
    }

    // Phương thức lấy giá trị tiếp theo của bộ đếm cho một chủ đề
    private int nextValue(String topic) {
        // Lấy bộ đếm cho chủ đề từ bản đồ
        AtomicInteger counter = (AtomicInteger)this.topicCounterMap.get(topic);
        
        // Nếu bộ đếm chưa tồn tại, khởi tạo nó với giá trị ngẫu nhiên
        if (null == counter) {
            counter = new AtomicInteger(ThreadLocalRandom.current().nextInt());
            AtomicInteger currentCounter = (AtomicInteger)this.topicCounterMap.putIfAbsent(topic, counter);
            if (currentCounter != null) {
                counter = currentCounter;
            }
        }

        // Tăng giá trị bộ đếm và trả về giá trị trước khi tăng
        return counter.getAndIncrement();
    }

    // Phương thức đóng, hiện tại không làm gì
    public void close() {
    }
}

```
Và tất nhiên danh sách ở trong `availablePartitions` không được sort từ 0-N vì vậy đôi khi bạn thấy Record 1 đến Partition 1 nhưng Record 2 đến partition 3, nhưng yên tâm nó vẫn là `Round Robin Partition`
![img](images/2024-08-07-Kafka-producer-da-khong-con-Round-Robin-Partition-voi-key-null/list-availablePartitions.png)





##
Trong nhiều cuộc phỏng vấn và các bài thảo luận mới trên mạng mọi người vẫn nói best nên thiếp lập số lượng partition của topic bằng với số lượng consumer bởi vì nếu Record không có Key thì Kafka sẽ `Round Robin` để phân phối các Record vào các partition.

Đúng, điều này là đúng đối với phiên bản Kafka < v2.4 tức phiên bản 2.3 và các phiên bản nhỏ hơn.

