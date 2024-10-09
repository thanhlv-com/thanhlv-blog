---
footer: true
title: Fallacies of distributed computing - Những sai lầm khi sử dụng distributed computing
description: Từ những phiên bản đầu tiên khi Kafka được Open Source đến phiên bản 2.3.1, mặc định Kafka producer khi gửi các Record có key là null sẽ thực hiện Round Robin Partition
authors: [ lethanh ]
date: 2024-10-09
outline: deep
image: /assets/KafkaProducer12.qYn0oVGH.png
draft: true
---

- Fallacies of distributed computing là một tập hợp các khẳng định được tập hợp bởi [L. Peter Deutsch](https://en.wikipedia.org/wiki/L._Peter_Deutsch) và một số người tại [Sun Microsystems](https://en.wikipedia.org/wiki/Sun_Microsystems) mô tả về những giả định sai lầm của các lập tình viên đanng làm việc với ứng dụng phân tán.

## Những sai lầm.
### The network is reliable
**The network is reliable**: Dịch tiếng việt là `Mạng lưới đáng tin cậy`. Đây là 1 sai lầm nghiêm trọng nhưng cũng hay xảy ra nhất. 

Rất nhiều lập trình viên tin rằng các kết nối mạng đến node hoặc hệ thống khác sẽ tốt và luôn không có vấn đề gì xảy ra. Tuy nhiên kết nối mạng rất sẽ bị lỗi bởi nhiều nguyên nhân như mất kết nối, không có quyền, lỗi phần cứng...etc..

Hệ thống cần có một cơ chế linh loạt bao gồm đầy đủ các tính năng dự phòng khi mất kết nối đến các hệ thống khác.

::: details Ví dụ: Hệ thống A không thể gọi đến hệ thống B
- Hệ thống A có thể gọi đến các dịch vụ dự phòng ví dụ như thay vì chỉ sử dụng Cache redis chúng có có thể thêm sử dụng EVCache khi redis lỗi.
- Hệ thống A cung cấp tính năng retry.
:::

### Hệ thống của chúng ta Nên làm gì để đảm bảo `The network is reliable`.
Sẽ có rất nhiều cách để đảm bảo hệ thống của chúng ta là `network is reliable` khi chúng ta là phụ thuộc của các hệ thống khác, dưới đây là một số ví dụ.

- Cung cấp load balance để phân tải hệ thống, phòng ngừa hệ thống sập.
- Auto scale để mở rộng quy mô tự động.
- Cung cấp tính năng sử dụng Asynchronous messaging.
- Sử dụng CDN và deploy hệ thống ở nhiều khu vực.
- ...

### Latency is zero
**Latency is zero** : Dịch tiếng việt là độ trễ là 0.

Tình huống được kiểm tra phổ biến bởi các lập trình viên là các hệ thống phụ thuộc không hoạt động. Tuy nhiên một trong những trường hợp hay xảy ra đó là các phụ thuộc hoạt động chậm.

Các hệ thống có thể bị đột ngột tăng lượng người sử dụng đột biến, mạng hệ thống chậm, mạng kết nối chậm... everything.., điều này sẽ tác động đến các hệ thống gửi phản hồi(Response) lại cho người dùng chậm hơn.

Hệ thống cần có các cơ chế để phòng ngừa tình trạng các hệ thống khác phản hồi chậm.

::: details Ví dụ: Hệ thống A gọi đến hệ thống B bị chậm lên tới 90s hoặc hơn.
- A là hệ thống bất đồng bộ, các request từ client sẽ được đưa vào Queue xử lý dần dần.
- A cài đặt thời gian timeout tối đa cho mỗi request gửi đến B.
- Cấu hình Circuit breaker để ngắt kết nối tạm thời đến B khi B bị lỗi quá số lần cấu hình
- Sử dụng Bulkhead pattern để ngăn chặn service B lỗi gây nên sập toàn hệ thống.
- Một số response của B có thể được cache lại tại A. (Ví dụ tên sản phẩm có Id = 100)
- 
:::
