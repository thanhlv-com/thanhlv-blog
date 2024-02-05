---
footer: true
title: Tìm hiểu về Architecture
authors: [ lethanh ]
lastUpdated: true
date: 2024-02-01
outline: deep
draft: true
---
# Tìm hiểu về Architecture ( Kiến trúc phần mềm )
Chào mọi người,

Trong bài [trước đây](2024-01-31-tim-hieu-ve-design-pattern.md) mình đã giải thích cơ bản khái niệm, ưu và nhược điểm của [Design Pattern](2024-01-31-tim-hieu-ve-design-pattern.md).
<br/>
Hôm nay chúng ta sẽ tiếp tục cùng nhau khám phá về ý nghĩa và tầm quan trọng của **Architecture( Kiến trúc phần mềm )** từ đó để hiểu rõ về cả 2 [Design Pattern](2024-01-31-tim-hieu-ve-design-pattern.md) và **Architecture**

[[TOC]]


## Software Architecture
![img](images/2024-02-01-tim-hieu-ve-architecture/1.png)

### **Software Architecture(Kiến trúc phần mềm)** là gì ?
Architecture, trong bối cảnh của phần mềm, đề cập đến kiến trúc phần mềm, là một khung khái niệm chung chung cho cách thức tổ chức và xây dựng một hệ thống phần mềm. 

Kiến trúc phần mềm định nghĩa ra cấu trúc chính của hệ thống, bao gồm các thành phần của nó, những thuộc tính quan trọng của từng thành phần, và cách các thành phần này tương tác với nhau.

Thông thường các ứng dụng của chúng ta sẽ cần giao tiếp với nhiều ứng dụng nội bộ hoặc các ứng dụng bên thứ 3. 

Architecture đề cập cách tổ chức hệ thống giữa các ứng dụng, cách chúng tương tác với nhau, môi trường hoạt động, các nguyên tắc giữa các ứng dụng thống nhất.

Nó tương tự như một tòa biệt phủ, Software architecture có chức năng như một bản thiết kế cho các tính năng có trong biệt phủ (Nhà tắm, nhà ăn, bể bơi…) hoặc liên kết đến các biệt phụ khác và mối liên quan hệ, liên kết giữa chúng.

Các Software architecture thường tập trung giải quyết các vấn đề liên quan đến các mối quan hệ, cách liên lạc... giữa các ứng dụng trong hệ thống của chúng ta.

### Đặc điểm của Software Architecture
Kiến trúc phần mềm là một khuôn khổ tổng quát cho cách thức thiết kế và xây dựng một hệ thống phần mềm. Đây là những đặc điểm chủ chốt của kiến trúc phần mềm:

1. **Xác định các thành phần và mô-đun(Module)**: **Software Architecture** giúp xác định các thành phần hoặc module của phần mềm, cũng như chức năng và giao diện của chúng.
   ![img](images/2024-02-01-tim-hieu-ve-architecture/2.svg)
   - 1. **Thành phần(Component)**: Architecture giúp xác định các thành phần riêng lẻ như cơ sở dữ liệu, các dịch vụ web, và các lớp logic nghiệp vụ. Mỗi thành phần được thiết kế để thực hiện một nhóm chức năng cụ thể. Trong kiến trúc phần mềm, thành phần (component) là một đơn vị cấu trúc tự chứa có thể bao gồm một hoặc nhiều mô-đun (module) và có những nhiệm vụ cụ thể.
      -  Đặc điểm của Component:
            - 1. Được định nghĩa bởi các chức năng mà nó cung cấp (thường thông qua một giao diện - interface).
            - 2. Có thể tái sử dụng nên được thiết kế để có khả năng kết hợp trong các hệ thống khác nhau.( Có thể sử dụng lại Component này mà không cần viết lại từ đầu )
            - 3. Là độc lập với các thành phần khác: nó có thể được phát triển, thử nghiệm, triển khai và cập nhật một cách độc lập.
            - 4. Như giải thích 2 và 3. Một Component có thể nằm trong một Component khác hoặc được triển khai thành một dịch vụ độc lập.
      -  Ví dụ về thành phần có thể là:
            - 1. **Web Service**: Thành phần có chức năng nhận và xử lý các yêu cầu HTTP.
            - 2. **Thư viện Xử lý Hình ảnh**: Cung cấp các chức năng để chỉnh sửa và biến đổi hình ảnh. (Component này sẽ được sử dụng bởi một Component khác)
            - 3. **Cơ sở dữ liệu**: Được xem xét như là một thành phần độc lập quản lý tất cả các hoạt động liên quan đến lưu trữ và truy xuất dữ liệu. (Được triển khai thành một dịch vụ độc lập)
            - 4. **UI Framework**: Một bộ thư viện hoặc thành phần cung cấp các thành phần giao diện người dùng để xây dựng các màn hình tương tác.
            - 5. **Monitoring**: Thành phần giúp giám sát hệ thống.( Ví dụ : [Prometheus](https://github.com/prometheus/prometheus)) 
            - 6. Hệ Thống Xử Lý Đơn Hàng (Order Processing System).
            - 7. Hệ thống thanh toán.(Payment System).
   - 2. **Mô-đun (Module)**: Mô-đun trong hệ thống phần mềm còn có thể được coi là một **phần** của thành phần(**Component**) - là các đơn vị nhỏ hơn cung cấp chức năng cụ thể và thường được nhóm lại theo năng lực, chức năng hoặc tính năng.
      -  Đặc điểm của Module:
           - 1. **Tính cụ thể**: Chứa một tập hợp chức năng liên quan và thường là một phần của ngữ cảnh lập trình.
           - 2. **Tính kết hợp**: Nhiều Mô-đun kết hợp với nhau có thể tạo thành một **Component**
           - 3. **Tính độc lập**: Mô-đun được thiết kế để có thể phát triển, thử nghiệm, và bảo trì một cách độc lập. Điều này giúp việc quản lý mã nguồn và các công việc bảo trì trở nên đơn giản hơn.
           - 4. **Giao tiếp qua giao diện( Interface )**: Mỗi mô-đun tương tác với phần còn lại của hệ thống thông qua một giao diện rõ ràng (interface). Giao diện này định nghĩa ra những hàm, phương thức hoặc API mà các phần khác của hệ thống có thể sử dụng để tương tác với mô-đun đó.
      -  Tác dụng của Mô-đun:
           - 1. **Chia nhỏ phức tạp**: Quy mô lớn của hệ thống có thể gây ra khó khăn trong việc quản lý và hiểu biết. Mô-đun giúp chia nhỏ hệ thống thành các phần nhỏ hơn, dễ quản lý và hiểu rõ hơn.
           - 2. **Dễ dàng bảo trì và nâng cấp**: Khi một mô-đun cần được sửa đổi hoặc nâng cấp, việc này có thể được thực hiện mà không ảnh hưởng đến những phần khác của hệ thống, miễn là giao diện của mô-đun vẫn giữ nguyên.
           - 3. **Tái sử dụng mã nguồn**: Mô-đun có thể được thiết kế để tái sử dụng trong các dự án khác nhau, giảm thiểu việc viết lại mã cho các chức năng tương tự.
           - 4. **Phát triển song song**: Mô-đun giúp phân chia công việc theo chức năng hoặc tính năng, cho phép các nhóm phát triển cùng làm việc một cách hiệu quả mà không can thiệp vào công việc của nhau.
           - 4. **Đảm bảo chất lượng**: Mô-đun có thể được kiểm tra và xác minh chất lượng một cách độc lập, giúp đảm bảo rằng mỗi phần của hệ thống đều tuân thủ các tiêu chuẩn kỹ thuật và chất lượng.
     -  Ví dụ về Mô-đun có thể là:
           - Module Quản lý Người Dùng (User Management Module) trong một Ứng Dụng Web.
              - Đặc tả chức năng:
                - 1. **Đăng ký**: Cho phép người dùng tạo tài khoản mới.
                - 2. **Đăng nhập**: Xác thực thông tin người dùng và cung cấp quyền truy cập vào ứng dụng.
                - 3. **Quản lý hồ sơ**: Người dùng có thể cập nhật thông tin cá nhân như họ tên, địa chỉ email, ảnh đại diện.
                - 4. **Phân quyền**: Định nghĩa và quản lý nhóm quyền truy cập cho người dùng (ví dụ: admin, người dùng thông thường).
                - 5. **Bảo mật**: Cung cấp chức năng liên quan đến bảo mật, thiếp lập/đổi mật khẩu và các chính sách bảo mật khác (ví dụ: xác thực đa yếu tố).
              - Cấu trúc của module:
                - 1. **Database Schema**: Bảng `Users` để lưu thông tin đăng nhập, bảng `UserProfiles` để lưu thông tin người dùng, bảng `Roles` và `Permissions` để quản lý quyền.
                - 2. **APIs**: Gồm các API cho phép `frontend` gửi yêu cầu và nhận dữ liệu từ server như APIs đăng nhập, đăng ký, cập nhật hồ sơ, etc.
                - 3. **Business Logic**: Mã xử lý logic như xác thực, cấp phiên làm việc (session), và encrypt/decrypt mật khẩu.
                - 4. **Interface**: Các interface cho các module khác để tương tác, ví dụ thông qua một API gateway hoặc grpc...etc...
   - **Component và mô-đun(Module) thay thế cho nhau**: Tùy ngữ cảnh, một Module có thể là một Component hoặc một Component có thể được coi là một Module được sử dụng trong Component khác. Vì vậy khi thiết kế hệ thống, người thiết kế cần xác định rõ đâu là Module đâu là Component để có cùng một ý hiểu.
     - Có thể chia làm 3 level là Business systems, Component và Module.
     ![img](images/2024-02-01-tim-hieu-ve-architecture/2.svg)
       - Trong đó Business systems là tất cả các chức năng mà business cung cấp cho người dùng.(Nó ở mức trừu tượng cao nhất)
       - Component là chức năng năng cung cấp cho người dùng.
       - Module là các mảnh ghép trong một Component để lắp ghép thành một chức năng hoạt động hoàn chỉnh.
2. **Mô tả các mối quan hệ**: 
   - 1. **Quan hệ giữa các thành phần**: **Architecture** sẽ chỉ rõ cách giao tiếp giữa các thành phần (thông qua APIs), phụ thuộc lẫn nhau và cách chúng kết nối trong cấu trúc tổng thể của hệ thống.
   - 2. **Loose coupling và High cohesion**: **Architecture** hiệu quả thường nhấn mạnh việc có sự ràng buộc lỏng lẻo (loose coupling) giữa các thành phần và sự liên kết cao (high cohesion) bên trong mỗi thành phần.
3. **Xác định patterns**: 
   - 1. **Xác định kiến trúc**: Việc áp dụng các kiến trúc như MVC hoặc microservices... giúp giải quyết các vấn đề chung trong kỹ thuật phần mềm và tạo ra một cách tiếp cận chuẩn hóa cho các tình huống thường gặp.
4. **Quản lý rủi ro kỹ thuật**:
   - 1. **Nhận diện rủi ro**: **Architecture** làm nổi bật các thành phần(Component) và mô-đun(Module) hệ thống có nguy cơ rủi do cao và giúp nhóm phát triển tập trung vào việc giảm thiểu rủi ro từ sớm.
   - 2. **Đối phó với biến đổi**: Các quyết định **Architecture** giúp hệ thống phần mềm linh hoạt và dễ thích nghi với các thay đổi trong tương lai, như thay đổi công nghệ hoặc yêu cầu kinh doanh.
5. **Đảm bảo chất lượng**:
   - 1. **Chất lượng phần mềm**: **Architecture** phần mềm đặt nền móng cho performance (hiệu suất), security (bảo mật), scalability (khả năng mở rộng), và maintainability (khả năng bảo trì).
   - 2. **Đánh giá và kiểm định**: **Architecture** cho phép tiến hành đánh giá và kiểm định chất lượng dựa trên những chỉ tiêu đã định trước.
6. **Cung cấp một bản kế hoạch**: 
   - 1. **Lập kế hoạch**: **Architecture** cung cấp một kế hoạch toàn diện, giống như một bản vẽ kiến trúc cho một tòa nhà, mô tả cấu trúc, công nghệ và cách thức triển khai của hệ thống phần mềm.
   - 2. **Hỗ trợ quản lý dự án**: Nó giúp các nhà quản lý dự án hiểu được phạm vi công việc, dự đoán nguồn lực cần thiết và lịch trình dự kiến.
7. **Định hình và quyết định công nghệ**
   - 1. **Lựa chọn công nghệ**: **Architecture** xác định các công nghệ cần sử dụng trong dự án, từ ngôn ngữ lập trình, database, middleware, cho đến hạ tầng mạng...
   - 2. **Thích ứng với yêu cầu**: Quyết định kiến trúc bảo đảm rằng các công nghệ được chọn phù hợp với yêu cầu về chức năng và không gian, như khả năng mở rộng hoặc tích hợp.
8. **Khả năng tái sử dụng và tích hợp** 
   - 1. **Tái sử dụng**: **Architecture** tốt thúc đẩy việc thiết kế các thành phần(Component) có thể tái sử dụng trong các dự án khác nhau, giúp tiết kiệm thời gian và nguồn lực.
   - 2. **Tích hợp**: **Architecture**  cung cấp một hướng dẫn để tích hợp các thành phần(Component) mới hay các hệ thống bên ngoài một cách suôn sẻ mà không làm xáo trộn đến cấu trúc cốt lõi của hệ thống hiện tại.
9. **Kiểm soát sự thay đổi**
   - 1. **Kiểm soát phiên bản**:  **Architecture** xác định cách các thay đổi được quản lý thông qua kiểm soát phiên bản, đảm bảo rằng các cập nhật không làm ảnh hưởng đến tính ổn định của hệ thống.
   - 2. **Quản lí sự thay đổi**: Nó giúp lập kế hoạch cho việc thay đổi, đảm bảo rằng mọi cải tiến hoặc bảo trì đều diễn ra một cách có tổ chức mà không làm xáo trộn đến hoạt động hiện tại.
10. **Giao tiếp giữa các bên liên quan**
   - 1. **Ngôn ngữ chung**: **Architecture** cung cấp một ngôn ngữ và cấu trúc chung giúp các bên liên quan từ nhiều lĩnh vực khác nhau có thể hiểu và thảo luận về hệ thống.
   - 2. **Rõ ràng và dễ hiểu**: Các biểu đồ kiến trúc như diagram class, sequence diagram và các tài liệu mô tả giúp truyền đạt rõ ràng, đảm bảo mọi người đều hiểu về hướng đi và mục tiêu của dự án.
