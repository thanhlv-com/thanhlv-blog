---
footer: true
title: Event là gì ?
authors: ["lethanh"]
date: 2024-04-015
outline: deep
draft: true
group: 2. Message and event stream
---
# Event là gì ?

Sau khi đã hiểu về **[Message](2024-04-15-message-la-gi.md)**, bước tiếp theo không kém phần quan trọng là khám phá về **Event**.

**Event** là một khái niệm cốt lõi trong việc xây dựng các hệ thống và tương tác. Không giống như Message chủ yếu mang thông tin, Event đại diện cho một sự kiện, một thay đổi trạng thái hoặc một hành động nào đó đã xảy ra trong hệ thống.

Event không chỉ là thông báo về một sự kiện đã xảy ra; nó còn là tín hiệu để kích hoạt các hành động tiếp theo, làm cho hệ thống trở nên linh hoạt và phản ứng nhanh chóng với các thay đổi. Điều này tạo nên một hệ thống có khả năng tự điều chỉnh, tự phục hồi và tối ưu hóa dựa trên các sự kiện xảy ra.

Hãy cùng mình đi sâu vào việc tìm hiểu về bản chất của Event, cách chúng được tạo ra, phát tán, và xử lý trong các hệ thống. Chúng ta sẽ khám phá cách Event tạo ra một môi trường động, nơi mà các thành phần có thể tương tác một cách linh hoạt và hiệu quả.

Bắt đầu cuộc hành trình khám phá về Event, chúng ta sẽ mở ra những hiểu biết mới và cách tiếp cận mới trong việc xây dựng và thiết kế hệ thống. Hãy cùng nhau tiếp tục hành trình này và khám phá sức mạnh của Event trong việc tạo ra các hệ thống thông minh và tự động!

[[TOC]]

## Event là gì ?
- Event có thể được hiểu là một sự kiện, một thay đổi trạng thái, hoặc một hành động cụ thể nào đó xảy ra trong hệ thống hoặc ứng dụng.

- Thông thường **Event** sẽ được tạo sau khi một **Message** kết thúc (Thành công hoặc thất bại), tùy nhiên điều đó không bắt buộc. (Có thể từ một Event khác, từ kết quả của một tính toán định kỳ(Định kỳ 10s đo thân nhiệt).....)

### Đặc điểm của event.
- **Thời điểm xác định**: Mỗi Event đều liên quan đến một thời điểm cụ thể Event đó xảy ra.(Ví dụ 12h)

- **Thông tin**: Event mang theo thông tin liên quan đến event đó, giúp các thành phần khác trong hệ thống có thể phản ứng một cách thích hợp.

- **Không đồng bộ**: Việc xử lý Event **thường** diễn ra không đồng bộ, tức là hệ thống không cần dừng lại để chờ đợi 1 event xử lý thành công.

- **Kích hoạt hành động**: Event có thể có thể được sử dụng để kích hoạt 1 hoặc nhiều hành động, quy trình(job) trong hệ thống tạo điều kiện cho việc phản ứng linh hoạt các thay đổi.

- **Tính phân tán(Broadcast Nature)**: Khác với [Message](2024-04-15-message-la-gi.md) sẽ có người nhận cụ thể vì nó là yêu cầu gửi đến thành phần khác, Event không nhất thiết phải có một người nhận cụ thể.
  - Event được phát ra để thông báo một sự kiện thay đổi trạng thái, hành động xảy ra. Ứng dụng tạo ra event và không cần biết ai sẽ nhận event và xử lý nó.
  - Các thành phần trong hệ thống có thể lắng nghe tất cả hoặc đăng ký lắng nghe các event mà hệ thống quan tâm sau đó phản ứng với event xảy ra mà không cần Evetn chỉ định trực tiếp người nhận.

### Vai trò của Event trong hệ thống:
- **Tăng cường tính linh hoạt**: Event giúp các thành phần trong hệ thống có thể tương tác với nhau một cách linh hoạt và không cần phải biết trước về sau

- **Phản ứng với thay đổi**: Hệ thống có thể được thiết kế để tự động phản ứng với các Event giúp xử lý các thay đổi một cách nhanh chóng và hiệu quả.

- **Tách biệt nghiệp vụ**:  Event giúp tách biệt nghiệp vụ và logic xử lý làm cho hệ thống dễ quản lý và bảo trì.
  - Các thành phần không phụ thuộc trực tiếp vào nhau để hoàn thành nghiệm vụ, thay vào đó tương tác thông qua nhận và gửi event
- 
- **Tối ưu hóa hiệu suất**:  Việc sử dụng Event có thể giúp tối ưu hóa hiệu suất hệ thống bằng cách giảm thiểu sự phụ thuộc và chờ đợi giữa các thành phần.

### Ví dụ

#### Ví dụ 1
##### Ví dụ về hệ thống đặt hàng.

###### **Bối cảnh:** 
- Khi một khách hàng hoàn tất quá trình đặt hàng trên web thương mai điện tử, hệ thống sẽ tạo ra một event **"Đặt hàng mới"**. (Ví dụ sẽ là Thanh toán khi nhận hàng)

###### Quá trình sự lý event
- 1. Hệ thống phát ra Event **"Đặt hàng mới"**.
  - Hệ thống đặt hàng tạo và phát ra event **"Đặt hàng mới"**, bao gồm tất cả thông tin cần thiết về đơn hàng, ID đơn hàng, thông tin sản phẩm, thông tin khách hàng, tổng giá trị đơn.
- 2. Xử lý kho hàng:
  - Hệ thống quản lý kho hàng sẽ lắng nghẹ event **"Đặt hàng mới"**. Khi nhận được event, nó kiểm tra sự có sẵn của sản phẩm trong kho. Nếu thiếu hàng nó sẽ phát ra Event **"Yêu cầu bổ xung hàng"** để thông báo cho bộ phận bán hàng.
- 3. Xử lý thanh toán : 
  - Hệ thống thanh toán sẽ lắng nghe Event **"Đặt hàng mới"**. Dựa trên thông tin đơn hàng, tiến hành xác minh và xử lý thanh tó từ khách hàng.
  - Nếu thanh toán thành công, hệ thống sẽ phát Event **"Thanh toán thành công"**; nếu thất bại hệ thống phát Event **"Thanh toán thất bại"**
