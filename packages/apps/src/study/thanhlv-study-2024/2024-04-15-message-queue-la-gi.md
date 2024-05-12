---
footer: true
title: Message queue là gì ?
authors: ["lethanh"]
date: 2024-04-15
# image: /assets/1.1Jqj7e7N.jpg
outline: deep
draft: true
group: 2. Message and event stream
---
# Message queue là gì ?

Kiến thức đầu tiên chúng ta đã cùng học với nhau là [**Message**](2024-04-15-message-la-gi.md), trong bài viết này chúng ta sẽ cùng nhau tìm hiểu về [**Message queue**](2024-04-15-message-queue-la-gi.md), một khái niệm quan trọng mà các hệ thống lớn thường sử dụng để gửi và nhận các tin nhắn giữa các thành phần của chúng.

[[TOC]]

## Vậy Message queue là gì ?

[**Message queue (Hàng đợi tin nhấn)**](2024-04-15-message-queue-la-gi.md) là một cơ chế lưu trữ các tin nhắn ([**Message**](2024-04-15-message-la-gi.md)) trong một hàng đợi(Queue) theo thứ tự tuần tự hoặc ưu tiên.

[**Message queue (Hàng đợi tin nhấn)**](2024-04-15-message-queue-la-gi.md) cho phép các ứng dụng giao tiếp và trao đổi dữ liệu bất đồng bộ.

Trong một hệ thống có [**Message queue (Hàng đợi tin nhấn)**](2024-04-15-message-queue-la-gi.md), các tin nhắn được gửi từ một ứng dụng A đến ứng dụng B sẽ được tạm thời lưu trữ trong hàng đợi(Queue) trước khi được ứng dụng B lấy ra và xử lý. Điều này sẽ cho phép các ứng dụng làm việc độc lập với nhau, không cần kết nối trực tiếp.

## Đặc điểm của event.
