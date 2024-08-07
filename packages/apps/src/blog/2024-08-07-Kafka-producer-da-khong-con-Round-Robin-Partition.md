---
footer: true
title: Kafka producer đã không còn Round Robin Partition.
description: Kafka producer đã không còn Round Robin Partition.
authors: [ lethanh ]
date: 2024-07-16
outline: deep
draft: true
---

# Kafka producer đã không còn Round Robin Partition.
Chào mọi người,

Sau nhiều ngày được anh Lâm (Leader tại LINE) khuyến khích và động viên viết blog về công nghệ và mình nhận thấy có khá nhiều bạn đã hiểu sai về Kafka trên phiên bản mới nhất. Điều này dẫn đến việc cấu hình partition và consumer bị sai khi sử dụng Kafka.

Vì vậy, bài viết này mình sẽ thực hiện để đạt được hai mục tiêu:
1. Viết một bài chia sẻ về công nghệ trên blog của LINE (Tuy nhiên, do thói quen viết blog, mình vẫn sẽ đăng trên blog cá nhân trước).
2. Giải thích rõ ràng về tiêu đề bài viết `Kafka producer đã không còn Round Robin Partition` và cách Kafka hiện tại đang hoạt động.
[[TOC]]

## Kafka producer đã không còn Round Robin Partition.

Trong nhiều cuộc phỏng vấn và các bài thảo luận mới trên mạng mọi người vẫn nói best nên thiếp lập số lượng partition của topic bằng với số lượng consumer bởi vì nếu Record không có Key thì Kafka sẽ `Round Robin` để phân phối các Record vào các partition.

Đúng, điều này là đúng đối với phiên bản Kafka < v2.4 tức phiên bản 2.3 và các phiên bản nhỏ hơn.

