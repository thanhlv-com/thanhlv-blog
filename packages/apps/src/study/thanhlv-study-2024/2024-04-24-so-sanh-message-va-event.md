---
footer: true
title: So sánh Message và Event.
authors: ["lethanh"]
date: 2024-04-24
outline: deep
# image: /assets/1png.s1tm4KaV.png
draft: true
group: 2. Message and event stream
---

Chúng ta đã cùng nhau tìm hiểu về **[Message](2024-04-15-message-la-gi.md)** và [**Event**](2024-04-16-event-la-gi.md) 2 khái niệm và cũng thường là 2 kiểu dữ liệu chính trong ứng dụng của bạn.

Có thể bạn vẫn còn thắc mắc về điểm giống và khác biệt giữa chúng. Trong bài viết này, chúng ta sẽ cùng nhau làm sáng tỏ vấn đề này.

[[TOC]]

## Giống nhau giữa Message và Event
Các điểm giống nhau này sẽ tùy thuộc vào bài toán và cách triển khai mà chúng sẽ giống hoặc không giống

- **Mục đích Giao tiếp**: Cả Message và Event đều được sử dụng như một phương tiện giao tiếp trong hệ thống phần mềm. Chúng cho phép các thành phần, dịch vụ hoặc ứng dụng trao đổi thông tin một cách linh hoạt.

- **Dùng kích hoạt hành động**: Cả 2 đều có thể được sử dụng để kích hoạt một hành động hoặc một process.

  - **Message**: Hệ thống **"Quản lý trạng thái Service"** gửi Message thông báo HTTP đến Hệ thống B để kích hoạt hành động chuyển trạng thái của hệ thống B sang **maintain**.
  
  - **Event**: Hệ thống **"Quản lý trạng thái Service"** thực hiện phát Event đã **"Đã chuyển trạng thái"**, hệ thống B,C,D lắng nghẹ event phát ra từ Hệ thống **"Quản lý trạng thái Service"** và phản ứng lại bằng cách chuyển trạng thái sang **maintain**.

- **Độc lập**: Với nhiều loại thiết kế, cả Message và Event đều có thể thiết kế để hỗ trợ tính độc lập trong hệ thống, các thành phần hoạt động mà không cần biết đến sự tồn tại của nhau.
  - **Các tính độc lập** 

    - **Độc lập về phát triển*: Các dev có thể phát triển các dịch vụ khác nhau một cách độc lập, miễn là **định dạng Message** và thông tin **Event** sử dụng để giao tiếp không thay đổi.
  
    - **Độc lập về triển khai**: Các dev có thể triển khai dịch vụ độc lập, không lo lắng thay đổi code sẽ ảnh hưởng đến hệ thống khác,(Ví dụ cập nhật dịch vụ A sẽ không cần dừng hoặc cập nhật dịch vụ B)
    
    - **Độc lập về quy mô**: Chúng ta có thể mở rộng quy mô của mỗi service một cách độc lập tùy thuộc vòa nhu cầu. Ví dụ dịch vụ A cần nhiều tài nguyên phần cứng hơn dịch vụ B.
    
  - **Ví dụ triển khai**
    - **Message**: Ví dụ về microservice, các dịch vụ giao tiếp với nhau thông qua gửi và nhận message sử dụng Message Queue.
  
    - **Event**: Cũng ví dụ về microservice, các dịch vụ giao tiếp với nhau thông qua phát và lắng nghe Event sử dụng Event stream.
    
- **Khả năng Mở rộng** : Sử dụng Message và Event giúp hệ thống có khả năng mở rộng cao hơn, có thể thêm các thành phần vào hệ thống mà không làm ảnh hưởng đến hệ thống cũ.

- **Tính ổn định**: Nếu một hệ thống gặp sự cố, nó sẽ không làm gián đoạn các hệ thống khác, hệ thống sẽ xử lý bù các message hoặc event khi khởi động lại.
  - Ví dụ: 2 Service **Đặt hàng** và **Xử lý đơn hàng**. Nếu service **Xử lý đơn hàng** lỗi thì service **Đặt hàng** vẫn hoạt động tốt.

- **Linh Hoạt trong Quy mô**: Dễ dàng điều triển quy mô của dịch vụ hoặc cả một hệ thống để đáp ứng nhu cầu.

## Khác nhau giữa Message và Event.

- **Định nghĩa mục đích**:
  - **Message**: 
    - Là một gói dữ liệu được gửi từ một thành phần này đến thành phần khác, thường chứa các thông tin cần được xử lý hoặc hành động cần thực hiện.
    
    - Message thường được sử dụng trong trong mô hình Request/Response, hoặc trong các hệ thống Message Queue, nơi 1 message được gửi và sau đó được xử lý bởi 1 hoặc nhiều người nhận.
    
    - Như đã nói ở trên, Message là một tin nhắn hoặc yêu cầu thực hiện hành động. Vì vậy các hành động lúc gửi message là chưa xảy ra hoặc sẽ không bao giờ xảy ra.(Gửi không đến, vi phạm rule...)
    - Ví dụ:
      - Service **Đặt Hàng** gửi message đến Service **Xử lý đơn hàng**, yêu cầu xử lý đơn hàng đã đặt.
      
  - **Event**: 
    - Là một thông báo về một sự kiện đã xảy ra trên hệ thống và không chứa yêu cầu cụ thể nào cả. Các hệ thống khác sẽ phản ứng lại với sự kiện đó.
    
    - Ví dụ:
      - Service **Đặt Hàng** phát một Event "Đã đặt hàng thành công", Service **Xử lý đơn hàng** đăng ký lắng nghe sự kiện "Đã đặt hàng thành công" và phản ứng lại bằng cách xử lý đơn hàng đã đặt.
      
  - **Hướng Giao tiếp**:
    - Message: Thường có hướng giao tiếp 1 chiều hoặc 2 chiều(Trong mô hình Request/Response) . Một message được gửi từ người gửi đến một người nhận, đôi khi sẽ nhận lại 1 phản hồi từ người nhận.
      - Message thì thường biết rõ người nhận là ai.
    - Event: Dạng giao tiếp 1 chiều. Hệ thống tạo ra event chỉ có nghiệm vụ phát ra Event. 
      - Các hệ thống khác có thể đăng ký lắng nghe và phản ứng lại với Event.
      
      - Hệ thống đăng ký lắng nghe event sẽ không quan nguồn gốc nơi phát ra Event
      
      - Hệ thống tạo ra Event sẽ không quan tâm đến có hoặc không có hoặc có bao nhiêu hệ thống đăng ký lắng nghe event.
      
      - Không biết người nhận là ai.
      
  - **Mô hình Giao tiếp**:
    - Message: Được sử dụng trong các mô hình giao tiếp dựa trên Message, như Message queue... Nơi Message được đặt vào một hàng đợi và sau đó được xử lý bởi một họặc nhiều dịch vụ.
      - Đối với Message, khi đã tạo ra Event thì mong muốn của hệ thống là sẽ có một người nào đó nhận và xử lý Message.
      
    - Evennt: Được sử dụng trong mô hình giao tiếp dựa trên sự kiện(Event driven),
      - Các thành phần sẽ phản ứng lại với sự kiện nhận được mà không cần biết nguồn gốc của sự kiện.
      - Đối với Event, khi tạo ra người tạo ra Event không quan tâm có ai phản ứng với sự kiện đó hay không.
      
  - Tần suất gửi và kiểm soát gửi và xử lý.
    - Message:
      - Tần suất: Tần suất gửi message 
  
  - **Loại Thông tin**:
    - Message: Thường chứa dữ liệu cụ thể và hướng dẫn xử lý hoặc yêu cầu một hành động cụ thể hoặc phản hồi.
    - Event: Chỉ thông báo rằng có một sự kiện nào đó đã xảy ra, không yêu cầu hành động cụ thể tiếp theo.
    
  - **Mục đích sử dụng**:
    - Message: Thường sử dụng để thực hiện một giao tiếp hoặc trao đổi dữ liệu giữa các service hoặc thành phần 1 cách rõ ràng.(Gửi tạo message biết ai sẽ nhận message, và người nhận biết ai gửi)
    - Event: Thường sử dụng để thông báo cho các thành phần khác là đã có một sự kiện xảy ra(Thay đổi trạng thái, đã làm một gì đó) cho phép các thành phần khác có thể phản ứng với sự kiện đó.
  
## REF:
- https://www.linkedin.com/pulse/differences-between-message-queue-event-stream-frank-lieu/
