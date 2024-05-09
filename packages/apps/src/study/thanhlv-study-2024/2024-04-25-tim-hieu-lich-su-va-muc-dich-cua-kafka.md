---
footer: true
title: Tìm hiểu lịch sử và mục đích của kafka
authors: ["lethanh"]
date: 2024-04-24
outline: deep
#image: /assets/event-and-message.UHUxhQ9h.jpeg
draft: false
group: 2.1 Kafka
---

# Tìm hiểu lịch sử và mục đích của kafka

Trong bài viết này, chúng ta sẽ cùng nhau bước vào hành trình khám phá Kafka, một công nghệ đã và đang làm thay đổi cách thức xử lý dữ liệu trong thế giới số. 

Từ những đặc điểm đến những mục tiêu chiến lược mà Kafka hướng đến, chúng ta sẽ cùng nhau tìm hiểu sâu hơn về công nghệ này, làm sáng tỏ những ưu điểm và lý do tại sao Kafka lại trở thành một phần không thể thiếu trong hệ sinh thái dữ liệu hiện đại.

[[TOC]]

## Kafka là gì ?
- Apache Kafka là một [Event stream platform](2024-04-21-event-stream-va-event-stream-platform-la-gi) được phát triển bởi [LinkedIn](https://www.linkedin.com/) và quyên góp cho apache và phát hành thành mã nguồn mở (Open-source) vào năm 2011.
- Apache Kafka được viết bằng `Scala` và `Java`. Dự án này nhằm mục đích cung cấp một nền tảng có khả năng xử lý dữ liệu với lượng thông tin lớn, độ trễ thấp, phù hợp cho việc xử lý dữ liệu `real-time`

## Đặc điểm của Apache kafka:
  - **Distributed System(Hệ thống phân tán)**: Apache Kafka là một hệ thống phân tán được thiết kế chạy trên nhiều máy chủ, đảm bảo tính sẵn sàng cao và khả năng chịu lỗi.
  
  - **Publish-Subscribe Model(Mô hình Publish-Subscribe)**: Kafka flow theo mô hình Publish-Subscribe, nơi các publish phát các messages đến topics và consumers subscribe các topics để đọc messages.

  - **High Throughput**: Có thể hiểu đơn giản là Kafka có khả năng xử lý một lượng lớn dữ liệu, làm cho nó phù hợp với big data.

  - **Scalability(Khả năng mở rộng)** : Kafka có thể mở rộng dễ dàng mà không cần ngừng hoạt động, Cụm Kafka có thể tăng một node hoặc giảm một Node theo nhu cầu một cách dễ dàng.

  - **Durability and Reliability(Độ bền và tin cậy cao), PERMANENT STORAGE**: Kafka chạy hệ thống phân tán, dữ liệu được lưu trữ an toàn trong một cụm phân tán, đảm bảo sẽ lưu sẽ an toàn và không bị lỗi.

