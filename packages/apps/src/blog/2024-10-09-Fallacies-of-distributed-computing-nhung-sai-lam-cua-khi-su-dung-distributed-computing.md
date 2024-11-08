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

Fallacies of distributed computing là một tập hợp các khẳng định được tập hợp bởi [L. Peter Deutsch](https://en.wikipedia.org/wiki/L._Peter_Deutsch) và một số người tại [Sun Microsystems](https://en.wikipedia.org/wiki/Sun_Microsystems) mô tả về những giả định sai lầm của các lập tình viên đanng làm việc với ứng dụng phân tán.

Tuy nhiên trong bài viết này mình sẽ dựa vào khái niệm Fallacies of distributed computing để mapping nó về phát triển ứng dụng, phần mềm trong hệ thống microservices.

Điều này sẽ giúp các bạn có cái nhìn tổng quan về những sai lầm mà các lập trình viên hay gặp phải khi phát triển và triển khai ứng dụng của mình lên cho người dùng sử dụng.

## Những sai lầm.
### The network is reliable
**The network is reliable**: Dịch tiếng việt là `Mạng lưới đáng tin cậy`. Đây là 1 sai lầm nghiêm trọng nhưng cũng hay xảy ra bởi các lập trình viên mới.

Thông thường, các hệ thống sẽ phụ thuộc vào 1 hoặc N các hệ thống khác để hoạt động. Nghĩa là trong quá trình hoàn thành nghiệm vụ của mình, hệ thống sẽ cần gọi đến 1 hoặc N hệ thống khác để hoàn thành nghiêm vụ của mình.

Câu hỏi đặt ra là: Điều gì sẽ xảy ra khi việc thực hiện gọi đến hệ thống khác không thành công? (Ví dụ timeout hoặc không thể kết nối)

Rất nhiều lập trình viên tin rằng các kết nối các hệ thống khác sẽ hoạt động tốt và luôn không có vấn đề gì xảy ra. Tuy nhiên kết nối mạng rất sẽ bị lỗi bởi nhiều nguyên nhân như:
- Vấn đề phần mềm.
- Vấn đề phần cứng.(Giới hạn phần cứng, hỏng hóc phần cứng)
- Vấn đề bảo mật(Thiếp lập ssl/tls thất bại...etc..)
- Môi trường mạng không ổn định.
- Một diễn biến xấu: Ví dụ hệ thống khác bị tấn công từ chối dịch vụ (DDoS) hoặc bị tấn công bảo mật.


Một hệ thống tốt cần có một cơ chế linh loạt bao gồm đầy đủ các tính năng dự phòng khi mất kết nối đến các hệ thống khác.

```plantuml
@startuml
skinparam backgroundColor #EEEBDC
skinparam shadowing false
skinparam arrowColor #000000
skinparam actorStyle awesome

title The Network is Reliable Fallacy

actor User as U
actor Developer as D

U -> System: Send Request
System -> Network: Transmit Data
alt Network Failure
    Network -> System: Connection Lost
    System -> U: Error Message
else Network Success
    Network -> Server: Forward Data
    Server -> Network: Send Response
    Network -> System: Deliver Response
    System -> U: Return Data
end

note right of System
    Issues causing network unreliability:
    - Network congestion
    - Hardware failures
    - Permission issues
    - Intermittent connectivity
end note

@enduml
```

#### Giải pháp `The network is reliable`.
::: details Chi tiết
Sẽ có rất nhiều cách để đảm bảo hệ thống của chúng ta là `network is reliable` khi chúng ta là phụ thuộc của các hệ thống khác, dưới đây là một số ví dụ.(Có thể kết hợp nhiều cách để đảm bảo hệ thống của chúng ta là `network is reliable`).

- Cung cấp tính năng Retry Mechanism để thử lại kết nối khi kết nối bị lỗi.
- Sử dụng Queue, Thông thường các hệ thống queue sẽ có tính năng retry mechanism chuyển message đến người nhận lỗi.
  - Nếu 1 tin nhắn không thể gửi(Max retry..etc..) thì nó có thể được chuyển đến một hệ thống khác để xử lý hoặc [Dead letter queue](https://en.wikipedia.org/wiki/Dead_letter_queue)
- Một điều quan trọng đó là ngay khi thiết kế hệ thống hoặc lập trình viên code thì phải có tư tưởng là sẽ có lỗi mạng.
- ...
:::
### Latency is zero
**Latency is zero** : Dịch tiếng việt là độ trễ là 0.

Độ trễ có thể hiểu đơn giản là một sự kích thích và phản ứng tương ứng với kích thích đó.
- Ví dụ: Khi bạn buồn ngủ, bạn uống cafe và sau 5 phút bạn không còn buồn ngủ. Cafe là kích thích, và việc bạn không còn buồn ngủ là phản ứng tương ứng với kích thích đó và 5 phút là độ trễ.

Trong thuật ngữ mạng đó là thời gian để di chuyển data từ vị trí A đến vị trí khác thông qua mạng.
Trong thuật ngữ phần mềm đó là thời gian để xử lý một yêu cầu từ người dùng và trả về kết quả cho người dùng.
....

Tất cả hành động đều có độ trễ, không có hành động nào có độ trễ là 0. Dù bản thân con người cũng có độ trễ, nhưng nó đủ nhanh để không cảm nhận được độ trễ nhưng nó vẫn tồn tại.

Việc hạn chế có các độ chễ không cần thiết khi phát triển ứng dụng là một điều cần thiết. Có nhiều các độ chễ nhỏ có thể tính bằng mili giây nhưng nếu có quá nhiều độ chễ nhỏ thì nó có thể tính bằng giây hoặc phút.

Khi phát triển ứng dụng, chúng ta cần phải nhớ rằng mọi hành động đều có độ trễ và nó có thể tính bằng phút.
![img](images/2024-10-09-Fallacies-of-distributed-computing-nhung-sai-lam-cua-khi-su-dung-distributed-computing/network-latency.png)

Một ví dụ điển trình của điều này chính là ORM. Khi sử dụng ORM, chúng ta có thể cấu hình Lazy load và Eager Loading.
- Lazy load: Khi cấu hình Lazy load, dữ liệu sẽ chỉ được load khi cần thiết, điều này có thể tạo ra độ trễ khi bắt đầu sử dụng dữ liệu.
  - Tuy nhiên nó cũng có 2 mặt, nếu dữ liệu đó không cần thiết thì nó sẽ không load dữ liệu đó, giúp giảm tải cho hệ thống.
  - Ví dụ: Học sinh Tuấn vào màn hình danh sách lịch học trong tháng: 
    - Nếu cấu hình Lazy load: Dữ liệu sẽ được load khi Tuấn click vào từng ngày, mỗi lần click sẽ có độ trễ khoảng 0.5s, tuy nhiên tại màn hình danh sách chỉ tốn 1s.
- Eager Loading: Khi cấu hình Eager Loading, tất cả dữ liệu sẽ được load ngay khi truy vấn, điều này có thể tạo ra độ trễ khi truy vấn số lượng lớn dữ liệu.
  - Giống với Lazy load, Eager Loading cũng có 2 mặt, nếu dữ liệu đó không được sử dụng thì nó sẽ tạo ra độ trễ không cần thiết.
  - Ví dụ: Học sinh Tuấn vào màn hình danh sách lịch học trong tháng:
    - Nếu cấu hình Eager Loading: Dữ liệu sẽ được load ngay khi vào màn hình và tần tốn 3s để load dữ liệu.


#### Giải pháp `Latency is zero`.

::: details Chi tiết

- Sử dụng Cache để không cần tính toán lại dữ liệu đã được tính toán trước đó.
  - Có thể sử dụng Cache ở nhiều cấp độ, từ cấp độ ứng dụng, cấp độ hệ thống...
  - Có thể cache ở nhiều nơi như Redis, Memcached, CDN, Local Storage...etc...
  ```plantuml
     @startuml
      skinparam backgroundColor #EEEBDC
      skinparam shadowing false
      skinparam arrowColor #000000
      skinparam actorStyle awesome
      
      title Latency is Zero
      
      actor User as U
      actor Developer as D
      
      U -> System: Send Request
      System -> Cache: Check Cache
      alt Cache Hit
      Cache -> U: Return Cached Data
      else Cache Miss
      System -> Database: Fetch Data
      Database -> System: Return Data
      System -> Cache: Store Data
      System -> U: Return Data
      end
      
      note right of System
      Strategies to reduce latency:
      - Use Cache
        - Minimize remote calls
        - Physically closer servers
        end note
      
     @enduml
  ```
- Hạn chế sử dụng các remote call(Call database, rest, rpc...etc..) thừa thãi.
- Về mặt vật lý, nếu dữ liệu hoặc máy chủ ở gần khách hàng thì độ trễ sẽ giảm.
```plantuml
@startuml
skinparam backgroundColor #EEEBDC
skinparam shadowing false
skinparam arrowColor #000000
skinparam actorStyle awesome

title Latency is Zero

actor User as U
actor Developer as D

U -> System: Send Request
System -> LoadBalancer: Distribute Load
LoadBalancer -> CDN: Serve Static Content
CDN -> U: Return Cached Content

System -> Cache: Check Cache
alt Cache Hit
    Cache -> U: Return Cached Data
else Cache Miss
    System -> Server: Fetch Data
    Server -> Cache: Store Data
    Server -> U: Return Data
end

System -> AutoScaler: Scale Infrastructure
System -> QoS: Prioritize Traffic
System -> AsynchronousProcessing: Handle Non-Critical Tasks

note right of System
    Strategies to ensure
    "Latency is zero":
    - Load Balancing
    - CDN
    - Caching
    - Auto-scaling
    - QoS
    - Asynchronous Processing
end note

@enduml
```

:::

### Bandwidth is infinite

**Bandwidth is infinite**: Dịch tiếng việt là Băng thông là vô hạn.

Bằng thông hiểu đơn giản là tốc chạy của chúng ta mỗi giây. Trong mạng cũng vậy, băng thông là tốc độ truyền dữ liệu mỗi giây. [Mặc dù băng thông đã tăng rất nhiều trong vài thập kỷ qua nhưng nó không phải là vô hạn.](https://www.nngroup.com/articles/law-of-bandwidth/)

Người dùng có thể không đủ may mắn để trải nghiệm băng thông mạng cao, bởi do nhiều vấn đề. Ví dụ như: Họ dùng mạng di động. [Họ dùng mạng ở Việt Nam chứ không phải ở Singapore.](https://en.wikipedia.org/wiki/List_of_sovereign_states_by_Internet_connection_speeds)

Một điều nữa là do băng thông tăng lên, nên các yêu cầu về dữ liệu lớn cũng tăng lên. Ví dụ như video 4k, 8k, 16k...etc... 

Có lẽ bạn chưa biết, các VPS hoặc cloud ở Việt Nam thường có Bandwidth tối đa là 100 Mb/s. Nếu ứng dụng chúng ta sử dụng Bandwidth vượt quá giới hạn ứng dụng của chúng ta có thể bị tắc nghẽn.

Và tất nhiên chính thiết bị phần cứng của chúng ta cũng có giới hạn. Nếu tốc độ vượt quá giới hạn phần cứng thì hệ thống của chúng ta sẽ bị tắc nghẽn.

- Ví dụ 1: Ứng dụng của chúng ta cung cấp chức năng xem phim, nếu có quá nhiều người xem phim cùng lúc thì hệ thống của chúng ta sẽ bị tắc nghẽn.

```plantuml
@startuml
skinparam backgroundColor #EEEBDC
skinparam shadowing false
skinparam arrowColor #000000
skinparam actorStyle awesome

title Bandwidth is Infinite Fallacy

actor User as U
actor Developer as D

U -> System: Send Request
System -> Network: Transmit Data
alt Bandwidth Limit Reached
    Network -> System: Throttle Data
    System -> U: Slow Response
else Bandwidth Available
    Network -> Server: Forward Data
    Server -> Network: Send Response
    Network -> System: Deliver Response
    System -> U: Return Data
end

note right of System
    Issues causing bandwidth limitations:
    - Network congestion
    - Hardware limitations
    - High data demands
end note

note right of System
    Strategies to manage bandwidth:
    - Limit download/upload speeds
    - QoS prioritization
    - Reduce resource sizes
    - Auto-scaling infrastructure
end note

@enduml
```

#### Các thiệt hại khi đạt giới hạn Bandwidth hoặc lạm dụng Bandwidth.
- Có thể gây tắc nghẽn hệ thống, request người dùng sẽ không thể đáp ứng hoặc đáp ứng chậm.
- Đa số các bên cho thuê VPS và Cloud đều sẽ tính phí mạng, nếu lạm dụng mạng có thể dẫn đến chi phí cao.
- Lạm dụng băng thông có thể làm tăng nguy cơ bị tấn công từ chối dịch vụ (DDoS), làm giảm khả năng bảo mật của hệ thống.
- Khi băng thông bị giới hạn, khả năng mở rộng của hệ thống cũng bị ảnh hưởng, làm giảm khả năng phục vụ số lượng lớn người dùng cùng lúc.
#### Giải pháp `Bandwidth is infinite`.
::: details Chi tiết
- Giới hạn tốc độ download và upload của người dùng.
- QoS: Cấu hình phòng ngừa để ưu tiên các tính năng trọng hơn khi sự cố xảy ra. Để đảm bảo rằng các dịch vụ quan trọng nhất của bạn vẫn hoạt động tốt nhất có thể.
- Giảm kích thước của các tài nguyên như hình ảnh, script và stylesheet để giảm lượng dữ liệu truyền tải.
- Tự động mở rộng hạ tầng dựa trên nhu cầu lưu lượng để xử lý các tải khác nhau một cách hiệu quả.
:::

## Network is secure

Ngày nay(2024) các lập trình viên ở Việt Nam chú trọng nhiều vào việc phát triển chức năng, tối ưu hóa hệ thống, tối ưu hóa tốc độ, tối ưu hóa bộ nhớ, tối ưu hóa cơ sở dữ liệu... nhưng ít chú trọng vào việc bảo mật hệ thống.

Dù lập trình viên có chú ý bảo mật hệ thống trong code của mình rất tốt nhưng khi dữ liệu đi qua mạng thì không bao giờ an toàn.

Hiện tại khi dữ liệu đi qua mạng thì có rất nhiều cách để hacker hoặc các hệ thống trung gian đứng giữa đánh cắp dữ liệu hoặc thay đổi dữ liệu gây ra vấn đề giả mạo yêu cầu hoặc truy cập trái phép.

Ngày này HTTPS đã trở thành chuẩn mực để bảo mật dữ liệu truyền tải giữa người dùng và hệ thống. Tuy nhiên vẫn có rất nhiều cách để tấn công dữ liệu truyền tải giữa các hệ thống.
Ví dụ: Năm 2014 chính bản thân tiêu chuẩn SSL đã có lỗ hổng [Heartbleed](https://heartbleed.com/), một lỗ hổng nghiêm trọng trong mã nguồn mở OpenSSL.

Một trong những khái niệm phổ biến về kiểu tấn công này là man-in-the-middle attack.

Vì vậy hệ thống cần có các cơ chế bảo mật ở tầng mạng để đảm bảo dữ liệu của chúng ta không bị đánh cắp hoặc thay đổi.

Vấn đề không phải là dữ liệu của bạn có bị đánh cắp hay không; mà là khi nào dữ liệu sẽ bị đánh cắp.
::: details Chi tiết
- Dù hệ thống có an toàn đến đâu, bạn có vò đầu bứt tai để bảo mật hệ thống của mình thì vẫn luôn có nguy cơ bị tấn công và bị đánh cắp dữ liệu hoặc thay đổi dữ liệu.
- Vì vậy hệ thống cần có các cơ chế bảo mật ở tầng mạng để đảm bảo dữ liệu của chúng ta không bị đánh cắp hoặc thay đổi.
:::

### Hệ thống của chúng ta Nên làm gì để đảm bảo `Network is secure`.
 ::: details Chi tiết
- Sử dụng HTTPS để mã hóa dữ liệu truyền tải giữa người dùng và hệ thống.
- Sử dụng VPN để mã hóa dữ liệu truyền tải giữa các hệ thống.
- Sử dụng SSH để truy cập an toàn vào hệ thống.
- Sử dụng Rate Limiting để giới hạn tốc độ truy cập của người dùng. Phòng trường hợp hack dò lỗi bảo mật.
- Sử dụng Encryption để mã hóa dữ liệu truyền tải giữa các hệ thống hoặc giữa người dùng và hệ thống.
- Sử dụng Multi-Factor Authentication để bảo vệ tài khoản người dùng.
- Luôn kiểm tra các rủi do bảo mật hàng đầu hiện tại : https://owasp.org/
- ...etc...

```plantuml
@startuml
skinparam backgroundColor #EEEBDC
skinparam shadowing false
skinparam arrowColor #000000
skinparam actorStyle awesome

title Network is Secure

actor User as U
actor Hacker as H

U -> Network: Send Encrypted Data
Network -> System: Transmit Encrypted Data
System -> Network: Receive Encrypted Data
Network -> U: Return Encrypted Response

alt Man-in-the-Middle Attack
    H -> Network: Intercept Data
    H -> System: Attempt to Decrypt Data
    System -> H: Encrypted Data (Unreadable)
else Secure Transmission
    Network -> System: Forward Encrypted Data
    System -> U: Return Encrypted Response
end

note right of System
    Strategies to ensure
    "Network is secure":
    - HTTPS
    - VPN
    - SSH
    - Encryption
    - Multi-Factor Authentication
end note
@enduml
```

 :::

### Topology doesn't change(Các liên kết không thay đổi)
- Các môi trường có thể có các yêu cầu mạng khác nhau, môi trường dev thường yêu cầu start nhanh, môi trường production thường yêu cầu tính sẵn sàng cao, khả năng phục hồi và dự phòng.
- các quy tắc về tường lửa có thể thay đổi để đáp ứng các yêu cầu về bảo mật.
  - Ví dụ: Môi trường dev có thể không cần thiết phải cấu hình tường lửa, nhưng môi trường production cần phải cấu hình tường lửa để bảo vệ hệ thống.
- Nhiều service mới được triển khai, nhiều service cũ bị xóa bỏ, nhiều service bị thay đổi cấu hình.

Việt liên kết mạng giữa các ứng dụng thay đổi thường nằm ngoài tầm kiểm soát của chúng ta, bởi vì có nhiều lý do cho điều này

# REF
- https://dereklawless.ie/fallacies-of-distributed-computing-1-the-network-is-reliable/
