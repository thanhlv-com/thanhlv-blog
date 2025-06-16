---
footer: true
title: Chạy Cassandra bằng docker
description: Hướng dẫn cách chạy Apache Cassandra bằng Docker, bao gồm các bước cài đặt, cấu hình và khởi động Cassandra trong môi trường Docker.
authors: [ "lethanh" ]
date: 2025-05-25
outline: deep
image: https://static-cdn.thanhlv.com/study/thanhlv-study-2025/2025-05-25-chay-cassandra-bang-docker/image-2025-2-21_14-59-17.png
draft: false
group: 1. Cassandra
---

[[TOC]]

# Chạy Cassandra bằng docker.

Cassandra là một ứng dụng, vì vậy trước tiên chúng ta cần khởi động nó trước khi bắt đầu hành trình học tập của mình 🚀.

Hiện tại, tôi chưa đi sâu vào chi tiết về cách triển khai và cấu hình Cassandra; những thông tin này sẽ được trình bày trong một bài viết riêng biệt 📚. Để đơn giản hóa quá trình, tôi sẽ sử dụng Docker để chạy ứng dụng, phục vụ cho mục đích học tập của chúng ta 🐳.

# 1. Chạy một node đơn với docker compose
## 1.1 Tạo mới 1 file docker-compose.yaml với chèn nội dung như sau
```yaml
version: '3.9'
services:
  thanhlv_cassandra_1_service:
    image: cassandra:4.0
    container_name: thanhlv_cassandra_1_container
    ports:
      - 10111:9042
    volumes:
      - ./data/apps/cassandra1:/var/lib/cassandra
    environment:
      - CASSANDRA_CLUSTER_NAME=thanhlv_cassandra
      - CASSANDRA_DC=thanhlv_cassandra_1_dc
      - CASSANDRA_NUM_TOKENS=128
```
Trong ví dụ này, tôi sẽ khởi chạy một node Cassandra mà không thiết lập cấu hình xác thực nào 🔓. Điều này có nghĩa là bất kỳ ai có kết nối đều có thể truy cập vào nó 🌐.

## 1.2 chạy docker compose
```yaml
docker compose up -d
```

## 1.3 Thử kết nối

![Image](https://static-cdn.thanhlv.com/study/thanhlv-study-2025/2025-05-25-chay-cassandra-bang-docker/image-2025-2-21_14-59-17.png)
