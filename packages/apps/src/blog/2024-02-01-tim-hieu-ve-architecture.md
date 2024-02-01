---
footer: true
title: Tìm hiểu về Architecture
authors: [ lethanh ]
lastUpdated: true
date: 2024-02-01
outline: deep
draft: true
---
# Tìm hiểu về Architecture
Chào mọi người,

Trong bài [trước đây](2024-01-31-tim-hieu-ve-design-pattern.md) mình đã giải thích cơ bản khái niệm, ưu và nhược điểm của [Design Pattern](2024-01-31-tim-hieu-ve-design-pattern.md).
<br/>
Hôm nay chúng ta sẽ tiếp tục cùng nhau khám về ý nghĩa và tầm quan trọng của **Architecture** từ đó để hiểu rõ về cả 2 [Design Pattern](2024-01-31-tim-hieu-ve-design-pattern.md) và **Architecture**

[[TOC]]


## Software Architecture
![img](images/2024-02-01-tim-hieu-ve-architecture/1.png)

### **Software Architecture** là gì ?
Architecture, trong bối cảnh của phần mềm, đề cập đến kiến trúc phần mềm, là một khung khái niệm chung chung cho cách thức tổ chức và xây dựng một hệ thống phần mềm. 

Kiến trúc phần mềm định nghĩa ra cấu trúc chính của hệ thống, bao gồm các thành phần của nó, những thuộc tính quan trọng của từng thành phần, và cách các thành phần này tương tác với nhau.

Thông thường các ứng dụng của chúng ta sẽ cần giao tiếp với nhiều ứng dụng nội bộ hoặc các ứng dụng bên thứ 3. 

Architecture đề cập cách tổ chức hệ thống giữa các ứng dụng, cách chúng tương tác với nhau, môi trường hoạt động, các nguyên tắc giữa các ứng dụng thống nhất.

Nó tương tự như một tòa biệt phủ, Software architecture có chức năng như một bản thiết kế cho các tính năng có trong biệt phủ (Nhà tắm, nhà ăn, bể bơi…) mối liên quan hệ, liên kết giữa chúng.

Các Software architecture thường tập trung giải quyết các vấn đề liên quan đến các mối quan hệ, cách liên lạc... giữa các ứng dụng trong hệ thống của chúng ta.

### Đặc điểm của Software Architecture
Kiến trúc phần mềm là một khuôn khổ tổng quát cho cách thức thiết kế và xây dựng một hệ thống phần mềm. Đây là những đặc điểm chủ chốt của kiến trúc phần mềm:

1. **Định Rõ Mục Tiêu và Hạn Chế của Hệ Thống**: 
