---
footer: true
title: Stream là gì ?
authors: ["lethanh"]
date: 2024-04-19
outline: deep
draft: true
group: 2. Message and event stream
---

Hiểu biết về **[Message](2024-04-15-message-la-gi.md)** và [**Event**](2024-04-16-event-la-gi.md) là cơ sở quan trọng cho việc làm việc với dữ liệu trong ứng dụng của bạn.

Tuy nhiên, để thực sự tận dụng hết khả năng của hệ thống, chúng ta cần khám phá thêm về **Stream**.

Stream không chỉ là cách để xử lý dữ liệu một cách liên tục và hiệu quả, mà còn mở ra cơ hội cho việc xây dựng ứng dụng đa nền tảng, có khả năng mở rộng và linh hoạt.

Hãy cùng nhau khám phá sâu hơn về **Stream** và cách nó có thể tối ưu hóa hiệu suất và trải nghiệm người dùng của ứng dụng!"

[[TOC]]

## Stream là gì ?
Theo [Wikipedia](https://en.wikipedia.org/wiki/Stream_(computing)#:~:text=In%20computer%20science%2C%20a%20stream,rather%20than%20in%20large%20batches.), Stream là một chuỗi các phần tử dữ liệu được cung cấp theo thời gian. Trên một Stream, từng dữ liệu sẽ được xử lý thay vì xử lý một lô lớn( Batch data ).

Với cách hiểu của mình thì Stream đề cập đến việc truyền dữ liệu từ một nguồn đến một đích một cách liên tục và có tổ chức. Nó tương tự như dòng nước chảy từ một nguồn đến một đích.

Các loại **Stream** thường được chia thành hai loại chính là **input stream (dữ liệu đầu vào)** và **output stream (dữ liệu đầu ra**). 

Sử dụng stream giúp cho việc xử lý dữ liệu trở nên linh hoạt và hiệu quả, đặc biệt là khi làm việc với dữ liệu lớn hoặc khi cần xử lý dữ liệu một cách tuần tự.
