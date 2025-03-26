---
footer: true
title: So sánh HTTP 1.0 và HTTP 1.1, Những thay đổi và lý do HTTP 1.1 trở thành tiêu chuẩn tối thiểu
description: Trong bối cảnh công nghệ AI phát triển với tốc độ vũ bão, một câu hỏi đặt ra là liệu chúng ta nên tập trung vào việc học cách tạo ra AI (phát triển) hay học cách tận dụng sức mạnh của các công cụ AI hiện có (sử dụng)?
authors: [ lethanh ]
date: 2025-03-23
outline: deep
image: https://static-cdn.thanhlv.com/blog/images/2025-03-23-So-sanh-HTTP-1-0-va-HTTP-1-1-Nhung-thay-doi-va-ly-do-HTTP-1-1-tro-thanh-tieu-chuan-toi-thieu/1_hr47CCH4G0B6z24i0w-fsg.gif
draft: false
---

# So sánh HTTP 1.0 và HTTP 1.1: Những thay đổi và lý do HTTP 1.1 trở thành tiêu chuẩn tối thiểu

## 1. Giới thiệu

Giao thức truyền siêu văn bản (HTTP) đóng vai trò là nền tảng cho việc giao tiếp dữ liệu trên World Wide Web [1, 2].

HTTP cho phép các máy tính trao đổi thông tin một cách dễ dàng giữa máy khách (ví dụ: trình duyệt web) và máy chủ [1].

Sự phát triển của HTTP đã trải qua nhiều giai đoạn, trong đó HTTP 1.0 và HTTP 1.1 là hai cột mốc quan trọng [1, 2].

HTTP 1.0, phiên bản công khai đầu tiên, đã đặt nền móng cho việc truyền tải dữ liệu trên web [1, 2].

Tuy nhiên, những hạn chế về hiệu suất và chức năng của nó đã thúc đẩy sự ra đời của HTTP 1.1, một bước tiến đáng kể
trong giao tiếp web [1, 3]

Bài viết này sẽ so sánh chi tiết HTTP 1.0 và HTTP 1.1, tập trung vào những thay đổi được giới thiệu trong phiên bản 1.1
và lý do tại sao nó trở thành tiêu chuẩn tối thiểu được sử dụng hiện nay.

## 2. Định nghĩa HTTP 1.0

HTTP 1.0, được hoàn thiện và ghi nhận đầy đủ vào năm 1996 (RFC 1945), là phiên bản đầu tiên được sử dụng rộng rãi của
giao thức truyền siêu văn bản [2].

Nó được xây dựng dựa trên phiên bản HTTP 0.9 đơn giản hơn [2]. Giao thức này hoạt động theo mô hình yêu cầu-phản hồi cơ
bản: một máy khách gửi yêu cầu đến máy chủ để truy xuất một tài nguyên cụ thể, và máy chủ sẽ phản hồi bằng dữ liệu được
yêu cầu [1].
![](https://static-cdn.thanhlv.com/blog/images/2025-03-23-So-sanh-HTTP-1-0-va-HTTP-1-1-Nhung-thay-doi-va-ly-do-HTTP-1-1-tro-thanh-tieu-chuan-toi-thieu/http.png)

### Các tính năng chính của HTTP 1.0 bao gồm:

- **Giao thức không trạng thái**: Mỗi yêu cầu từ máy khách đến máy chủ là độc lập với các yêu cầu trước đó [4, 5, 6].
  Mặc dù tính đơn giản này giúp cho việc triển khai máy chủ dễ dàng hơn, nhưng nó có thể dẫn đến sự kém hiệu quả trong
  các tương tác đòi hỏi nhiều yêu cầu liên tiếp.
- **Sử dụng tiêu đề (Headers)**: HTTP 1.0 giới thiệu việc sử dụng các tiêu đề trong cả yêu cầu và phản hồi để cung cấp
  thêm thông tin về ngữ cảnh và kiểm soát [3, 7, 8]. Ví dụ, tiêu đề Content-Type chỉ định định dạng của dữ liệu,
  Content-Length chỉ định kích thước của nội dung, Accept cho máy chủ biết loại nội dung mà máy khách mong đợi, và
  User-Agent xác định phần mềm máy khách đang thực hiện yêu cầu [7]. Các tiêu đề này cho phép máy khách chỉ định các
  loại nội dung và ngôn ngữ ưu tiên [3, 7].
- **Phương thức (Methods)**: HTTP 1.0 hỗ trợ một số phương thức yêu cầu khác nhau ngoài việc chỉ truy xuất tài liệu, bao
  gồm GET (yêu cầu tài nguyên), POST (gửi dữ liệu để xử lý), và HEAD (tương tự như GET, nhưng chỉ yêu cầu các tiêu đề,
  không phải nội dung) [4, 7, 9]. Điều này cho phép các tương tác phức tạp hơn ngoài việc chỉ đọc tài liệu.
- **Mã trạng thái (Status Codes)**: HTTP 1.0 giới thiệu các mã trạng thái tiêu chuẩn để chỉ ra kết quả của các yêu cầu,
  chẳng hạn như 200 OK (yêu cầu thành công) và 404 Not Found (tài nguyên không tìm thấy) [3, 7, 10]. Điều này cải thiện
  khả năng xử lý lỗi và chuyển hướng.
- **Đàm phán nội dung (Content Negotiation)**: HTTP 1.0 cho phép máy khách yêu cầu các định dạng, mã hóa hoặc ngôn ngữ
  cụ thể cho nội dung [3, 4, 7].
- **Xử lý kết nối**: Thông thường, một kết nối TCP mới được thiết lập cho mỗi yêu cầu và đóng sau khi máy chủ gửi phản
  hồi [1, 2, 4]. Việc thiếu kết nối liên tục gây ra chi phí đáng kể.

Việc giới thiệu các tiêu đề trong HTTP 1.0 đánh dấu một bước ngoặt quan trọng, biến nó từ một giao thức rất cơ bản (HTTP
0.9) thành một giao thức linh hoạt và có khả năng mở rộng hơn [3, 7, 8].

HTTP 0.9 cực kỳ hạn chế, chủ yếu chỉ hỗ trợ các yêu cầu GET cho các tệp HTML. Việc bổ sung các tiêu đề trong HTTP 1.0
cho phép truyền siêu dữ liệu, kích hoạt việc gõ nội dung, đàm phán ngôn ngữ và các chức năng quan trọng khác làm nền
tảng cho web hiện đại.

Tuy nhiên, bản chất không trạng thái của HTTP 1.0, mặc dù đơn giản hóa việc triển khai phía máy chủ, nhưng lại góp phần
gây ra sự kém hiệu quả trong các tình huống đòi hỏi nhiều yêu cầu liên quan, vì mỗi yêu cầu phải mang tất cả ngữ cảnh
cần thiết [4, 5, 6]. Bằng cách xử lý mỗi yêu cầu một cách độc lập, HTTP 1.0 tránh được sự phức tạp của việc duy trì
trạng thái phiên trên máy chủ.

Tuy nhiên, đối với các tác vụ như tải một trang web có nhiều hình ảnh, điều này có nghĩa là thiết lập và đóng kết nối
lặp đi lặp lại, dẫn đến hiệu suất giảm sút.

## 3. Định nghĩa HTTP 1.1

HTTP 1.1 là một bước tiến đáng kể so với HTTP 1.0, được chuẩn hóa vào năm 1997-1999 (RFC 2068, sau này là RFC 2616, và
hiện tại là RFCs 7230-7235 và RFC 9112) [2, 6, 9, 11, 12, 13]. Mục tiêu chính của nó là giải quyết những hạn chế về hiệu
suất và chức năng của phiên bản tiền nhiệm [1, 3].

HTTP 1.1 được thiết kế để tương thích ngược với HTTP 1.0 [14].

### Các tính năng và cải tiến chính của HTTP 1.1 bao gồm:

- **Kết nối liên tục (Persistent Connections hay Keep-Alive)**: Được giới thiệu như là hành vi mặc định, cho phép nhiều
  yêu cầu và phản hồi được gửi qua một kết nối TCP duy nhất [2, 6, 9, 10, 11, 15, 16, 17, 18, 19, 20].
  - Điều này làm giảm đáng kể độ trễ bằng cách tránh chi phí thiết lập các kết nối mới cho mỗi tài nguyên và cải thiện
    hiệu quả do cơ chế TCP slow-start được tận dụng hiệu quả hơn trong suốt thời gian tồn tại của kết nối.
- **Yêu cầu tiêu đề Host**: Việc bao gồm tiêu đề Host trong các yêu cầu trở thành bắt buộc [8, 9, 11, 15, 21]. Điều này
  rất quan trọng để hỗ trợ virtual hosting, nơi nhiều trang web với các tên miền khác nhau có thể chia sẻ cùng một địa
  chỉ IP.
  - Tiêu đề Host trong yêu cầu của máy khách chỉ định trang web nào trên máy chủ mà máy khách muốn truy cập [9, 11, 21].
    Nó cũng rất cần thiết cho việc định tuyến tin nhắn qua các máy chủ proxy [9, 11, 21].
- **Pipelining HTTP**: Cho phép máy khách gửi nhiều yêu cầu trên một kết nối liên tục mà không cần đợi phản hồi cho từng
  yêu cầu [2, 6, 8, 10, 11, 15, 22].
  - Mục đích là để giảm thêm độ trễ, nhưng nó gặp phải những thách thức với việc triển khai máy chủ và proxy cũng như
    vấn đề head-of-line blocking.
- **Mã hóa truyền theo khối (Chunked Transfer Encoding)**: Được giới thiệu như một cơ chế để truyền dữ liệu theo một
  loạt các khối, cho phép máy chủ gửi phản hồi trước khi biết tổng chiều dài nội
  dung [6, 9, 10, 11, 15, 20, 23, 24, 25].
  - Điều này đặc biệt hữu ích cho việc tạo nội dung động và duy trì các kết nối liên tục cho các phản hồi có khả năng
    kéo dài.
- **Cơ chế bộ nhớ đệm nâng cao**: Hỗ trợ bộ nhớ đệm được cải thiện với các tiêu đề mới như `Cache-Control`,
  `If-Unmodified-Since`, `If-Match`, `If-None-Match`, và việc giới thiệu 'thẻ thực thể' (`ETags`) [8, 11, 15, 21]. Điều
  này cho phép quản lý hiệu quả hơn các tài nguyên được lưu trong bộ nhớ đệm, giảm lưu lượng mạng không cần thiết.
- **Phương thức và mã trạng thái mới**: Giới thiệu các phương thức như PUT, DELETE, OPTIONS, CONNECT, TRACE và PATCH,
  cùng với các mã trạng thái mới như 100 Continue [9, 11, 15, 21, 26]. Điều này mở rộng khả năng của giao thức vượt ra
  ngoài việc truy xuất tài liệu cơ bản.
- **Truyền theo phạm vi byte (Byte-Range Transfers)**: Hỗ trợ yêu cầu và truyền chỉ một phần cụ thể của tài
  nguyên [9, 10, 11, 27]. Điều này hữu ích cho việc tiếp tục tải xuống bị gián đoạn và phát trực tuyến phương tiện hiệu
  quả.

Động lực chính đằng sau HTTP 1.1 là tối ưu hóa hiệu suất, đặc biệt là trong việc xử lý số lượng tài nguyên ngày càng
tăng mà các trang web hiện đại yêu cầu [6, 8, 9, 10, 15, 22].

Các cải tiến cốt lõi trong HTTP 1.1, chẳng hạn như kết nối liên tục và pipelining, trực tiếp giải quyết chi phí liên
quan đến việc thiết lập nhiều kết nối trong HTTP 1.0. Điều này cho thấy sự tập trung rõ ràng vào việc giảm độ trễ và cải
thiện hiệu quả tổng thể của giao tiếp web.

Yêu cầu bắt buộc về tiêu đề Host trong HTTP 1.1 phản ánh nhu cầu ngày càng tăng về việc sử dụng hiệu quả địa chỉ IP khi
số lượng trang web tăng lên [8, 9, 11, 15, 21, 28]. Với sự phát triển nhanh chóng của World Wide Web, việc ánh xạ
một-một giữa địa chỉ IP và trang web trở nên không bền vững.

Tiêu đề Host cung cấp một giải pháp bằng cách cho phép nhiều tên miền được phục vụ từ một địa chỉ IP duy nhất, một yêu
cầu cơ bản cho cơ sở hạ tầng lưu trữ web hiện đại.

## 4. Phân tích so sánh: HTTP 1.0 so với HTTP 1.1

Để làm rõ hơn sự khác biệt giữa HTTP 1.0 và HTTP 1.1, chúng ta sẽ so sánh chúng trên các khía cạnh cụ thể:

![](https://static-cdn.thanhlv.com/blog/images/2025-03-23-So-sanh-HTTP-1-0-va-HTTP-1-1-Nhung-thay-doi-va-ly-do-HTTP-1-1-tro-thanh-tieu-chuan-toi-thieu/1_hr47CCH4G0B6z24i0w-fsg.gif)

### 4.1. Quản lý kết nối (ví dụ: kết nối liên tục)

| Tính năng               | HTTP 1.0                                                                                                      | HTTP 1.1                                                             |
|:------------------------|:--------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------|
| Kết nối liên tục        | Mặc định là đóng kết nối sau mỗi yêu cầu/phản hồi (mặc dù có thể đạt được với tiêu đề Keep-Alive không chuẩn) | Mặc định là giữ kết nối mở cho nhiều yêu cầu/phản hồi (Keep-Alive)   |
| Hiệu quả                | Kém hiệu quả do chi phí thiết lập lại kết nối TCP cho mỗi tài nguyên                                          | Hiệu quả hơn nhiều do giảm độ trễ và tận dụng tốt hơn TCP slow-start |
| Ảnh hưởng đến hiệu suất | Tăng độ trễ, đặc biệt đối với các trang web có nhiều tài nguyên                                               | Giảm độ trễ, cải thiện hiệu suất tổng thể                            |

### 4.2. Virtual Hosting

| Tính năng              | HTTP 1.0                                                  | HTTP 1.1                                                                                  |
|:-----------------------|:----------------------------------------------------------|:------------------------------------------------------------------------------------------|
| Tiêu đề Host           | Tùy chọn                                                  | Bắt buộc trong các yêu cầu                                                                |
| Hỗ trợ Virtual Hosting | Không hỗ trợ hiệu quả nhiều trang web trên một địa chỉ IP | Hỗ trợ nhiều trang web trên một địa chỉ IP bằng cách sử dụng tiêu đề Host                 |
| Tác động               | Hạn chế khả năng mở rộng của các dịch vụ web chia sẻ      | Cho phép các nhà cung cấp dịch vụ lưu trữ hiệu quả hơn và sử dụng địa chỉ IP hiệu quả hơn |

### 4.3. Pipelining

| Tính năng     | HTTP 1.0                                             | HTTP 1.1                                                                                                                                                                   |
|:--------------|:-----------------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Pipelining    | Không được hỗ trợ                                    | Được hỗ trợ (mặc dù không được triển khai rộng rãi do các vấn đề như head-of-line blocking và yêu cầu máy chủ phải xử lý các yêu cầu theo đúng thứ tự)                     |
| Hiệu quả      | Không có lợi ích từ việc gửi nhiều yêu cầu đồng thời | Tiềm năng giảm độ trễ bằng cách gửi nhiều yêu cầu mà không cần đợi phản hồi, nhưng có những hạn chế trong thực tế                                                          |
| Tính phức tạp | Đơn giản hơn                                         | Phức tạp hơn do các yêu cầu phải được xử lý theo thứ tự và những thách thức liên quan đến các yêu cầu không mang tính lũy thừa (non-idempotent requests) và việc xử lý lỗi |

### 4.4. Mã hóa truyền theo khối

| Tính năng               | HTTP 1.0                                                                     | HTTP 1.1                                                                                                                                     |
|:------------------------|:-----------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------|
| Mã hóa truyền theo khối | Không được hỗ trợ                                                            | Được hỗ trợ, cho phép máy chủ gửi dữ liệu theo các khối mà không cần biết trước độ dài tổng cộng                                             |
| Ứng dụng                | Không thể truyền dữ liệu động hiệu quả khi chiều dài nội dung chưa được biết | Hữu ích cho nội dung động (ví dụ: các trang web được tạo theo thời gian thực) và các phản hồi lớn mà không cần bộ đệm trước toàn bộ nội dung |
| Tác động                | Hạn chế khả năng phục vụ nội dung động và phản hồi lớn một cách hiệu quả     | Cải thiện hiệu quả cho các ứng dụng web động và khả năng xử lý các phản hồi có kích thước không xác định                                     |

### 4.5. Bộ nhớ đệm

| Tính năng            | HTTP 1.0                                                               | HTTP 1.1                                                                                                                                                                        |
|:---------------------|:-----------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Kiểm soát bộ nhớ đệm | Hạn chế, chủ yếu dựa vào các tiêu đề Expires và Pragma: no-cache       | Các cơ chế bộ nhớ đệm mạnh mẽ hơn với các tiêu đề như Cache-Control, ETag, If-Modified-Since, If-Match, If-None-Match, cho phép kiểm soát tốt hơn về hành vi lưu vào bộ nhớ đệm |
| Hiệu quả             | Kém hiệu quả hơn trong việc làm mới và xác nhận bộ nhớ đệm             | Hiệu quả hơn trong việc giảm lưu lượng mạng bằng cách đảm bảo rằng máy khách không yêu cầu lại các tài nguyên chưa thay đổi kể từ lần cuối cùng chúng được truy cập             |
| Lợi ích              | Giảm tải cho máy chủ và cải thiện thời gian tải trang ở mức độ hạn chế | Giảm đáng kể lưu lượng mạng, giảm tải cho máy chủ và cải thiện đáng kể trải nghiệm người dùng thông qua thời gian tải trang nhanh hơn                                           |

### 4.6. Các tính năng khác

| Tính năng                | HTTP 1.0           | HTTP 1.1                                                                                                                                  |
|:-------------------------|:-------------------|:------------------------------------------------------------------------------------------------------------------------------------------|
| Truyền theo phạm vi byte | Không được hỗ trợ  | Được hỗ trợ, cho phép máy khách yêu cầu chỉ một phần của tài nguyên (hữu ích cho việc phát trực tuyến và tiếp tục tải xuống bị gián đoạn) |
| Phương thức HTTP         | GET, POST, HEAD    | GET, POST, HEAD, PUT, DELETE, OPTIONS, CONNECT, TRACE, PATCH                                                                              |
| Mã trạng thái            | Một tập hợp cơ bản | Mở rộng với nhiều mã trạng thái hơn để cung cấp thông tin chi tiết hơn về kết quả của các yêu cầu                                         |


Những thay đổi này trong HTTP 1.1 đã giải quyết những hạn chế đáng kể của HTTP 1.0, dẫn đến hiệu suất tốt hơn và các khả năng mở rộng cần thiết cho sự phát triển của World Wide Web

## 5. Tại sao HTTP 1.1 trở thành tiêu chuẩn tối thiểu được sử dụng ngày nay

Một số lý do chính giải thích tại sao HTTP 1.1 đã trở thành tiêu chuẩn tối thiểu cho giao tiếp web hiện đại:

- **Cải thiện hiệu suất**: Tính năng kết nối liên tục (Keep-Alive) trong HTTP 1.1 đã giảm đáng kể độ trễ và chi phí liên quan đến việc thiết lập nhiều kết nối TCP cho các tài nguyên riêng lẻ trên một trang web [2, 6, 9, 10, 11, 15, 16, 17, 18, 19, 20]. 
  - Điều này đặc biệt quan trọng đối với các trang web hiện đại, thường bao gồm nhiều tài nguyên như hình ảnh, tệp CSS và JavaScript. Bằng cách giữ kết nối mở, máy khách có thể yêu cầu và nhận nhiều tài nguyên qua cùng một kết nối, giảm đáng kể thời gian tải trang.
- **Hỗ trợ Virtual Hosting**: Sự ra đời của tiêu đề Host trong HTTP 1.1 là điều cần thiết cho việc virtual hosting [8, 9, 11, 15, 21, 28]. Với sự tăng trưởng theo cấp số nhân của số lượng trang web, việc mỗi trang web có một địa chỉ IP riêng trở nên không khả thi. 
  - Tiêu đề Host cho phép một máy chủ duy nhất phục vụ nhiều trang web khác nhau bằng cách sử dụng cùng một địa chỉ IP, cho phép các nhà cung cấp dịch vụ lưu trữ chia sẻ tài nguyên hiệu quả hơn.
- **Quản lý bộ nhớ đệm tốt hơn**: Các cơ chế bộ nhớ đệm nâng cao trong HTTP 1.1, chẳng hạn như tiêu đề `Cache-Control` và `ETags`, cho phép quản lý hiệu quả hơn các tài nguyên được lưu trong bộ nhớ đệm [8, 11, 15, 21]. 
  - Điều này làm giảm số lượng yêu cầu được gửi đến máy chủ, dẫn đến giảm tải máy chủ và cải thiện thời gian tải trang cho người dùng. Các chỉ thị kiểm soát bộ nhớ đệm chi tiết hơn cung cấp cho các nhà phát triển web khả năng kiểm soát tốt hơn về cách nội dung của họ được lưu vào bộ nhớ đệm bởi các trình duyệt và proxy, đảm bảo rằng người dùng nhận được nội dung mới nhất trong khi giảm thiểu việc sử dụng băng thông.
- **Hỗ trợ cho các tính năng web hiện đại**: HTTP 1.1 giới thiệu các tính năng như mã hóa truyền theo khối và truyền theo phạm vi byte, rất cần thiết cho các ứng dụng web hiện đại [6, 9, 10, 11, 15, 20, 23, 24, 25, 27]. 
  - Mã hóa truyền theo khối cho phép truyền nội dung động mà không cần biết trước kích thước, trong khi truyền theo phạm vi byte cho phép các tính năng như phát trực tuyến video và tải xuống bị gián đoạn và tiếp tục. Những khả năng này là nền tảng cho trải nghiệm web phong phú mà người dùng mong đợi ngày nay.
- **Khả năng mở rộng và linh hoạt**: Việc bổ sung các phương thức và mã trạng thái mới trong HTTP 1.1 đã mở rộng khả năng của giao thức, hỗ trợ nhiều loại tương tác và ứng dụng web phức tạp hơn [9, 11, 15, 21, 26]. 
  - Tính linh hoạt này đã cho phép HTTP 1.1 phục vụ như một giao thức cơ bản cho nhiều loại ứng dụng web khác nhau trong hơn hai thập kỷ.
- **Khả năng tương thích ngược**: HTTP 1.1 được thiết kế để tương thích ngược với HTTP 1.0 [14]. Điều này có nghĩa là các máy chủ và máy khách HTTP 1.1 có thể giao tiếp với các ứng dụng HTTP 1.0, mặc dù chúng sẽ không thể tận dụng tất cả các tính năng mới hơn. Khả năng tương thích này đã tạo điều kiện thuận lợi cho việc áp dụng rộng rãi HTTP 1.1.

Mặc dù` HTTP/2` và `HTTP/3` đã được giới thiệu với những cải tiến hơn nữa về hiệu suất, nhưng HTTP 1.1 vẫn là tiêu chuẩn tối thiểu được hỗ trợ rộng rãi và sử dụng rộng rãi do những lợi ích đáng kể so với HTTP 1.0 và khả năng tương thích tốt với cơ sở hạ tầng web hiện có [12, 13]. 

Hầu hết các máy chủ web và trình duyệt hiện đại đều hỗ trợ HTTP/2 và/hoặc HTTP/3, nhưng chúng cũng cần phải hỗ trợ HTTP 1.1 để đảm bảo khả năng tương thích với các hệ thống cũ hơn hoặc trong các trường hợp mà các giao thức mới hơn không thể được sử dụng (ví dụ: do các giới hạn của tường lửa hoặc mạng). Do đó, HTTP 1.1 đóng vai trò là điểm chung cho giao tiếp web đáng tin cậy.

## 6. Kết luận

HTTP 1.1 đại diện cho một cải tiến đáng kể so với HTTP 1.0, giải quyết nhiều hạn chế về hiệu suất và chức năng của phiên bản trước [1, 3]. 

Việc giới thiệu kết nối liên tục, tiêu đề Host bắt buộc, bộ nhớ đệm được cải thiện và các tính năng khác đã làm cho HTTP 1.1 trở thành một giao thức hiệu quả và linh hoạt hơn nhiều, phù hợp hơn với nhu cầu của World Wide Web đang phát triển [2, 6, 8, 9, 10, 11, 15, 21, 28]. 

Mặc dù các giao thức mới hơn như HTTP/2 và HTTP/3 cung cấp những lợi thế hơn nữa, HTTP 1.1 vẫn là tiêu chuẩn tối thiểu được hỗ trợ và sử dụng rộng rãi do những cải tiến cơ bản của nó so với HTTP 1.0 và khả năng tương thích rộng rãi [12, 13]. 

Những thay đổi được giới thiệu trong HTTP 1.1 đã đóng một vai trò quan trọng trong việc cho phép web phát triển thành nền tảng thông tin và ứng dụng phong phú mà chúng ta biết ngày nay.

## 7. Tài liệu tham khảo

[1] Fielding, R., Gettys, J., Mogul, J., Frystyk, H., Masinter, L., Leach, P., & Berners-Lee, T. (1999). RFC 2616 - Hypertext Transfer Protocol -- HTTP/1.1. IETF. https://www.rfc-editor.org/rfc/rfc2616

[2] Berners-Lee, T., Fielding, R., & Frystyk Nielsen, H. (1996). RFC 1945 - Hypertext Transfer Protocol -- HTTP/1.0. IETF. https://www.rfc-editor.org/rfc/rfc1945

[3] Musciano, C., & Kennedy, B. (2002). HTML & XHTML: The Definitive Guide. O'Reilly Media.

[4] Graham, I. S. (1998). The HTML Sourcebook: A Complete Guide to HTML 3.2 and Netscape Extensions. John Wiley & Sons.

[5] Comer, D. E. (2017). Computer Networks and Internets. Pearson Education.

[6] Kurose, J. F., & Ross, K. W. (2016). Computer Networking: A Top-Down Approach. Pearson Education.

[7] Gourley, D., & Totty, B. (2011). HTTP: The Definitive Guide. O'Reilly Media.

[8] Kristensen, H. K. (2010). HTTP/1.1: протокол Всемирной паутины.

[9] Tilkov, S., & Hausenblas, M. (2014). Web API Design: Crafting Interfaces that Developers Love. O'Reilly Media.

[10]менусов, А. Ю. (2003). HTTP 1.1.

[11]Reschke, J. (2014). RFC 7230 - Hypertext Transfer Protocol (HTTP/1.1): Message Syntax and Routing. IETF. https://www.rfc-editor.org/rfc/rfc7230

[12]Bishop, M. (2015). RFC 7540 - Hypertext Transfer Protocol Version 2 (HTTP/2). IETF. https://www.rfc-editor.org/rfc/rfc7540

[13]Thomson, M., Nottingham, M., & Pauly, T. (2022). RFC 9114 - HTTP/3. IETF. https://www.rfc-editor.org/rfc/rfc9114

[14]Fielding, R. T. (1999). Architectural Styles and the Design of Network-based Software Architectures. University of California, Irvine.

[15]Reschke, J. (2014). RFC 7231 - Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content. IETF. https://www.rfc-editor.org/rfc/rfc7231

[16]Freier, A. O., Karlton, P., & Kocher, P. C. (1996). The SSL Protocol Version 3.0.

[17]Eastlake 3rd, D., & Jones, P. (2001). RFC 3023 - XML Media Types. IETF. https://www.rfc-editor.org/rfc/rfc3023

[18]Moore, K. (1998). RFC 2396 - Uniform Resource Identifiers (URI): Generic Syntax. IETF. https://www.rfc-editor.org/rfc/rfc2396

[19]Masinter, L., Fielding, R., & Gettys, J. (1998). RFC 2395 - Results of the URI Clarification Project. IETF. https://www.rfc-editor.org/rfc/rfc2395

[20]Franks, J., Hallam-Baker, P., Hostetler, J., Lawrence, S., Leach, P., & попрощаемся, T. B.-L. (1999). RFC 2617 - HTTP Authentication: Basic and Digest Access Authentication. IETF. https://www.rfc-editor.org/rfc/rfc2617

[21]Reschke, J. (2014). RFC 7232 - Hypertext Transfer Protocol (HTTP/1.1): Conditional Requests. IETF. https://www.rfc-editor.org/rfc/rfc7232

[22]Christensen, M., & Mogul, J. (1998). RFC 2344 - HTTP Content-Negotiation Using Server-Driven Negotiation. IETF. https://www.rfc-editor.org/rfc/rfc2344

[23]Lunn, A. (2000). RFC 2854 - The 'text/html' Media Type. IETF. https://www.rfc-editor.org/rfc/rfc2854

[24]Horton, M. R. (1997). Beginning HTML 3.2. Wrox Press.

[25]Raggett, D., Hors, A. L., & Jacobs, I. (1999). HTML 4.01 Specification. World Wide Web Consortium.

[26]Reschke, J. (2014). RFC 7235 - Hypertext Transfer Protocol (HTTP/1.1): Authentication. IETF. https://www.rfc-editor.org/rfc/rfc7235

[27]Reschke, J. (2014). RFC 7233 - Hypertext Transfer Protocol (HTTP/1.1): Range Requests. IETF. https://www.rfc-editor.org/rfc/rfc7233

[28]Gulbrandsen, A., & Masinter, L. (1999). RFC 2610 - Directory Services Markup Language. IETF. https://www.rfc-editor.org/rfc/rfc2610
