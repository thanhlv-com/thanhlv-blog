---
footer: true
title: Event là gì ?
authors: ["lethanh"]
date: 2024-04-015
outline: deep
draft: true
group: Message and event stream
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
- **0 hoặc N người nhận**: Khác với [Message](2024-04-15-message-la-gi.md) sẽ có người nhận cụ thể vì nó là yêu cầu gửi đến thành phần khác, Event không nhất thiết phải có một người nhận cụ thể.
  - Event được phát ra để thông báo một sự kiện thay đổi trạng thái, hành động xảy ra. Ứng dụng tạo ra event và không cần biết ai sẽ nhận event và xử lý nó.
  - Các thành phần trong hệ thống có thể lắng nghe tất cả hoặc đăng ký lắng nghe các event mà hệ thống quan tâm sau đó phản ứng với event xảy ra mà không cần Evetn chỉ định trực tiếp người nhận.
