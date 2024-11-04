---
footer: true
title: Chúng tôi đã bị tấn công, phòng thủ thành công nhưng có status đặc biệt cần điều tra
description: Design Pattern tập trung vào giải pháp tái sử dụng cho các vấn đề thiết kế cụ thể ở mức độ function, class và project. Software Architecture định nghĩa cấu trúc tổng thể của hệ thống, từ mức độ project đến solution và system.
authors: [ lethanh ]
date: 2024-11-01
outline: deep
draft: false
---

Xin chào mọi người, đây là bài đầu tiên của Short Blog. Thực tế sau sự kiện này xảy ra thì tôi đã nghĩ đến ý tưởng viết Short blog :v.

## Thời điểm bị tấn công

Ứng dụng của chúng tôi là một ứng dụng lớn có nhiều người truy cập hàng ngày với hơn 4 tỉ bản ghi dữ liệu chính(Core Dataset). Vào một ngày khi mọi người đang ngủ ngon, hệ thống của chúng tôi bị tấn công DDoS và bảo mật.

Cụ thể là vào khoản từ **1h sáng đến 5h sáng**, hệ thống của chúng tôi bị tấn công DDoS và bảo mật. Tuy nhiên, các thành viên trong team đã nhận được cảnh báo số lượng request tăng đột biến và những param,header lạ và đã thức dậy để giám sát hệ thống.

## Họ đã tấn công chúng tôi như thế nào ?

Trong quá trình giám sát chúng tôi, chúng tôi đã xác định nhóm hacker đã thực hiện tấn công DDoS và bảo mật. Họ đã sử dụng một số kỹ thuật sau:
- **DDoS**: Sử dụng nhiều máy chủ, gửi nhiều request spam để tấn công hệ thống của chúng tôi.
- **Bảo mật**: Sử dụng các kỹ thuật injection để tìm lỗ hổng trong hệ thống của chúng tôi.
  - Hacker đã inject một số param vào request để tìm lỗ hổng.
  - Hacker đã sử dụng một số header lạ để tìm lỗ hổng.
  - Hacker đã sử dụng 1 số header dành cho token để dò lỗ hổng.
    - Header bị dò nhiều nhất là `Authorization`, `x-fowarded-for`, `x-real-ip`, `x-forwarded-host` và `x-api-key`.
- **SQL Injection**: Hacker đã sử dụng SQL Injection để tìm lỗ hổng trong hệ thống của chúng tôi.

## Phòng thủ

Với tư duy `Không phải hệ thống của chúng ta có bị tấn công hay không, mà là khi nào hệ thống của chúng ta bị tấn công`. Chúng tôi đã chuẩn bị rất nhiều kế hoạch phòng thủ cho trường hợp này.

Bởi vì là một dịch vụ lớn nên không thể bị gián đoạn khi bị tấn công, vì vậy ngay từ đầu các đoạn code từ team đã được viết tối ưu nhất để đảo bảo hiệu suất. Các đoạn code đều được viết với tư duy `Security by design` và `Security by default`.



