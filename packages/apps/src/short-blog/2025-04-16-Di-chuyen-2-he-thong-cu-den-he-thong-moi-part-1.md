---
footer: true
title: Di Ch Chuyển 2 Hệ Thống Cũ Đến Hệ Thống Mới (Phần 1)
description: Trong bối cảnh công nghệ AI phát triển với tốc độ vũ bão, một câu hỏi đặt ra là liệu chúng ta nên tập trung vào việc học cách tạo ra AI (phát triển) hay học cách tận dụng sức mạnh của các công cụ AI hiện có (sử dụng)?
authors: [ lethanh ]
date: 2025-04-16
outline: deep
image: https://static-cdn.thanhlv.com/short-blog/images/2025-03-22-Thoi-Dai-AI-Nen-Hoc-Phat-Trien-Hay-Hoc-Su-Dung/5-AI-Advancements-to-Expect-in-the-Next-10-Years-scaled-1.jpeg
draft: false
---

### Context
Xin chào mọi người, quá trình hợp nhất các công ty sẽ có rất nhiều công việc cần làm. Trong đó việc hợp các hệ thống trùng lặp là một trong những việc cần làm dần dần, điều này sẽ giúp cho việc bảo trì và phát triển hệ thống dễ dàng hơn cũng như giảm chi phí bảo trì hệ thống.

Hôm nay mình sẽ chia sẻ một chút về việc di chuyển 2 hệ thống cũ của công ty mình sang một hệ thống mới.

Vì không tiện nói tên dự án nên mình sẽ gọi là hệ thống A và hệ thống B nhé cho hệ thống cũ nhé.

Còn hệ thống A là hệ thống phát triển mới đễ hợp nhất 2 hệ thống cũ lại với nhau.

Một số thông tin về 2 hệ thống cũ và hệ thống mới như sau.
- Hệ thống A: Là hệ thống cũ của công ty mình trước khi hợp nhất, hệ thống này được phát triển từ rất lâu và đã có 3 tỷ 9 dữ liệu.
  - Hệ thống được triển khai trên private cloud của công ty.
  - Hệ thống được phát triển bằng Java và sử dụng Spring Boot.
  - Hệ thống sử dụng MySQL làm cơ sở dữ liệu chính.
- Hệ thống B: Là hệ thống cũ của công ty khác và đã hợp nhất thành một công ty với công ty mình, hệ thống này được phát triển từ rất lâu và đã có 7 tỷ dữ liệu.
  - Hệ thống được triển khai trên private cloud của công ty.
  - Hệ thống được phát triển bằng Java và sử dụng Spring Boot và Spring thymeleaf.
  - Hệ thống sử dụng MySQL làm cơ sở dữ liệu cho Search và history. Và Cassandra làm cơ sở dữ liệu chính để hỗ trợ truy cập dữ liệu nhanh hơn.

### Cách thức di chuyển

Về chi tiết thì mình sẽ không nói nhiều vì đây là một dự án lớn và có rất nhiều thứ cần làm. Nhưng mình sẽ chia sẻ một số điểm chính trong quá trình di chuyển hệ thống nhé.

1. Thực hiện tạo một hệ thống mới, Logic bao gồm cả hệ thống A và hệ thống B. Nhưng tất nhiên là phải hợp nhất lại với nhau.
2. Thực hiện Double Write dữ liệu của 2 hệ thống cũ vào hệ thống mới tại một thời điểm bắt đầu đã được xác định.
3. Thực hiện Migration dữ liệu từ hệ thống cũ sang hệ thống mới.
4. Hoàn thành và terminate hệ thống cũ.

Trong bài viết này mình sẽ chia sẻ về Double Write giữa 2 hệ thống cũ và hệ thống mới nhé.

### Định nghĩa Double Write của team.
Double Write với team mình định nghĩa lúc này là việc khi tạo mới một dữ liệu ở 1 trong 2 ở hệ thống cũ, thì dữ liệu đó sẽ được cũng sẽ được ghi vào hệ thống mới.

#### Xác định điểm bắt đầu Double Write
Bởi vì có 2 hệ thống cũ, vì vậy chúng mình phải xác định được cùng 1 điểm sẽ bắt đầu Double Write.

Sau một quá trình suy nghĩ và đánh giá các phương án, mình đã ra phương án là cấu hình start time. 

Logic Double Write sẽ được thêm vào cả 2 hệ thống cũ và được cấu hình thời gian bắt đầu Double Write.

Ví dụ mình cấu hình thời gian bắt đầu là 2025-05-01 00:00:00 thì tất cả các dữ liệu được tạo mới từ thời điểm này trên 2 hệ thống cũ sẽ được ghi vào hệ thống mới.

Điều này sẽ giúp chúng mình xác định được dữ liệu nào đã được Double Write và dữ liệu nào chưa được Double Write.

Tất cả dữ liệu ở 2 hệ thống cũ có thời điểm tạo trước thời điểm 2025-05-01 00:00:00 là các dữ liệu chưa tồn tại trong hệ thống mới.

#### Cách thức Double Write