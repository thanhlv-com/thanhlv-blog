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

#### Hệ thống của chúng ta Nên làm gì để đảm bảo `The network is reliable`.
Sẽ có rất nhiều cách để đảm bảo hệ thống của chúng ta là `network is reliable` khi chúng ta là phụ thuộc của các hệ thống khác, dưới đây là một số ví dụ.

- Cung cấp load balance để phân tải hệ thống, phòng ngừa hệ thống sập.
- Auto scale để mở rộng quy mô tự động.
- Cung cấp tính năng sử dụng Asynchronous messaging.
- Sử dụng CDN và deploy hệ thống ở nhiều khu vực.
- Một điều quan trọng đó là ngay khi thiết kế hệ thống hoặc lập trình viên code thì phải có tư tưởng là sẽ có lỗi mạng.
- ...

### Latency is zero
**Latency is zero** : Dịch tiếng việt là độ trễ là 0.

Tình huống được kiểm tra phổ biến bởi các lập trình viên là các hệ thống phụ thuộc không hoạt động. Tuy nhiên một trong những trường hợp hay xảy ra nhưng ít lập trình viên nghĩ đến đó là các phụ thuộc hoạt động chậm.

Các hệ thống có thể bị đột ngột tăng lượng người sử dụng đột biến, mạng hệ thống chậm, mạng kết nối chậm... everything.., điều này sẽ tác động đến các hệ thống gửi phản hồi(Response) lại cho người dùng chậm hơn.

Hệ thống cần có các cơ chế để phòng ngừa tình trạng các hệ thống khác phản hồi chậm.
![img](images/2024-10-09-Fallacies-of-distributed-computing-nhung-sai-lam-cua-khi-su-dung-distributed-computing/network-latency.png)

#### Hệ thống của chúng ta Nên làm gì để đảm bảo `Latency is zero`.
Sẽ có rất nhiều cách để đảm bảo hệ thống của chúng ta là `Latency is zero` khi chúng ta là phụ thuộc của các hệ thống khác, dưới đây là một số ví dụ.
- Cung cấp load balance để phân tải hệ thống, phòng ngừa quá nhiều yêu cầu gây chậm chạp hệ thống.
- Auto scale để mở rộng quy mô tự động.
- Tư duy luôn luôn nhớ rằng gọi đến một phụ thuộc khác thì luôn luôn có độ trễ, và nó có thể tính bằng phút.
- 

