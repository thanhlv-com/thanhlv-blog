---
footer: true
title: Giới thiệu về Kubernetes là gì.
authors: [ lethanh ]
description: Bài viết này sẽ giới thiệu về Kubernetes, một nền tảng mã nguồn mở để tự động hóa việc triển khai, mở rộng và quản lý các ứng dụng container.
date: 2025-06-16
outline: deep
image: https://static-cdn.thanhlv.com/study/thanhlv-study-2025/2025-06-16-gioi-thieu-ve-kubernetes/kubernetes2.png
draft: false
group: 2. Kubernetes
---

![Image](https://static-cdn.thanhlv.com/study/thanhlv-study-2025/2025-06-16-gioi-thieu-ve-kubernetes/kubernetes2.png)

[[TOC]]

## 1. Trước Kubernetes chúng ta đã làm gì?

Để đánh giá một giải pháp mới, cách tốt nhất là tìm hiểu vấn đề mà nó giải quyết.

Lịch sử phát triển của hạ tầng ứng dụng là một chuỗi liên tục giải quyết các vấn đề này và cũng vô tình tạo ra các vấn đề mới.

Tính đến thời điểm hiện tại( 17-6-2025 ), Kubernetes đang là mắt xích mới nhất và quan trọng nhất trong chuỗi tiến hóa này.

### Kỷ nguyên Máy chủ Vật lý ([Bare Metal](https://en.wikipedia.org/wiki/Bare-metal_server))

Thời sơ khai của internet, các ứng dụng được triển khai trực tiếp trên máy chủ vật lý, hay còn gọi là Bare Metal.

Nó giống như bạn sở hữu 1 ngồi nhà, bạn có toàn quyền kiểm soát từ móng đến mái, nhưng bạn phải tự mình xây dựng và bảo trì mọi thứ.

1 ứng dụng được triển khai trực tiếp trên máy chủ vật lý, không có sự tách biệt giữa ứng dụng và hệ điều hành.

#### Vấn đề
Điều này dẫn đến việc quản lý tài nguyên trở nên khó khăn, không thể chia sẻ tài nguyên giữa các ứng dụng một cách hiệu quả.

Các vấn đề liên quan đến xung đột thư viện ([`dependency hell` (địa ngục phụ thuộc)](https://en.wikipedia.org/wiki/Dependency_hell)), cấu hình và bảo mật cũng xuất hiện.

Một vấn đề khác là việc lãng phí tài nguyên, khi một ứng dụng không sử dụng hết tài nguyên của máy chủ.

### Sự trỗi dậy của Máy ảo ([Virtual Machines - VMs](https://vi.wikipedia.org/wiki/M%C3%A1y_%E1%BA%A3o))

Công nghệ ảo hóa ra đời như 1 vị cứu tinh, cho phép chạy nhiều máy ảo trên cùng một máy chủ vật lý.

Thay vì sở hữu duy nhất một ngôi nhà, giờ đây bạn có thể thuê một hoặc N căn hộ trong một tòa nhà lớn.

Mỗi căn hộ có không gian riêng, nhưng tất cả đều nằm trong cùng một tòa nhà và chia sẻ các tiện ích chung.

**Giải pháp giải quyết vấn đề của Bare Metal**: VMs giải quyết được vấn đề lãng phí tài nguyên. Một máy chủ vật lý giờ đây có thể chạy nhiều ứng dụng khác nhau, mỗi ứng dụng nằm trong một VM riêng, giúp tối ưu hóa việc sử dụng phần cứng.

#### Vấn đề mới
Mặc dù là một bước tiến lớn, VMs vẫn còn nhiều hạn chế. Mỗi VM phải chứa một hệ điều hành đầy đủ (gọi là `guest OS`), khiến chúng trở nên cồng kềnh (kích thước có thể lên tới hàng gigabyte), khởi động chậm và vẫn tiêu tốn một lượng tài nguyên đáng kể chỉ để chạy hệ điều hành.

Vấn đề `dependency hell` (địa ngục phụ thuộc) – khi các phiên bản thư viện khác nhau xung đột với nhau – vẫn có thể xảy ra bên trong một VM.

### Cuộc cách mạng Container
Và rồi, container ra đời, mang đến một cách tiếp cận hoàn toàn mới. Docker là người tiên phong nổi bật nhất, đã làm thay đổi cuộc chơi.

Container là một bước tiến vượt bậc so với VM. Thay vì ảo hóa toàn bộ phần cứng, container chỉ ảo hóa ở cấp độ hệ điều hành. 

Tất cả các container trên cùng một máy chủ sẽ chia sẻ chung nhân (kernel) của hệ điều hành chủ (host OS).

**Giải pháp giải quyết vấn đề của Virtual Machines - VMs**: Container giải quyết triệt để vấn đề kinh điển `It works on my machine` (Nó chạy trên máy của tôi).

Một container đóng gói mã nguồn ứng dụng cùng với TẤT CẢ các thư viện và tệp phụ thuộc của nó vào một gói duy nhất, nhẹ, độc lập và có thể chạy nhất quán trên mọi môi trường, từ máy tính của lập trình viên đến máy chủ prod. Chúng khởi động gần như ngay lập tức và hiệu quả hơn VM rất nhiều.

#### Vấn đề mới ở quy mô lớn

ự thành công của container đã tạo ra một `cơn đau đầu` mới. Khi các công ty bắt đầu áp dụng kiến trúc microservices và triển khai hàng trăm, thậm chí hàng ngàn container, một thế giới hỗn loạn mới đã xuất hiện.
- **Quản lý vòng đời**: Làm thế nào để theo dõi, cập nhật và gỡ bỏ hàng ngàn container một cách tự động? Việc làm thủ công là không thể.
- **Kết nối mạng**: Các container có thể được tạo ra và hủy đi liên tục, mỗi lần như vậy chúng lại có một địa chỉ IP mới. Làm thế nào để container A có thể tìm thấy và nói chuyện với container B một cách đáng tin cậy?.
- **Tự phục hồi**: Điều gì xảy ra khi một container bị treo hoặc một máy chủ bị sập? Ai sẽ chịu trách nhiệm khởi động lại chúng trên một máy chủ khác?.
- **Co giãn (Scaling)**: Khi lượng truy cập tăng đột biến, làm thế nào để tự động thêm container để xử lý tải? Và làm thế nào để giảm bớt chúng khi không cần thiết để tiết kiệm chi phí?.

Chính những thách thức ở quy mô lớn này đã tạo ra một nhu cầu cấp thiết cho `một hệ thống điều phối container (Container Orchestrator)`. 

Và Kubernetes đã nổi lên như một giải pháp toàn diện và mạnh mẽ nhất, hoàn thiện cuộc cách mạng container và biến nó từ một công cụ hữu ích cho lập trình viên thành một nền tảng vững chắc cho các hệ thống prod quy mô lớn.

## 2. [Kubernetes](https://kubernetes.io/) là Gì và Tại sao lại là `K8s`?

![Image](https://static-cdn.thanhlv.com/study/thanhlv-study-2025/2025-06-16-gioi-thieu-ve-kubernetes/kubernetes2.png)

Đây là một câu tôi định nghĩa ngắn gọn về Kubernetes.

**Kubernetes là một platform(nền tảng) Open-source(mã nguồn mở), Portable(linh động), Extensible(có thể mở rộng), dùng để Automation( tự động hóa việc triển khai ), co giãn(Tăng hoặc giảm) và vận hành các ứng dụng được đóng gói trong container.**


Hãy phân tích từng từ khóa trong định nghĩa này:
- **Platform**: Kubernetes không chỉ là một công cụ, mà là một nền tảng toàn diện cho việc quản lý container. Nó cung cấp các API và công cụ để triển khai, quản lý và mở rộng ứng dụng container.
- **Open-source**: Kubernetes là mã nguồn mở, có nghĩa là bất kỳ ai cũng có thể sử dụng, đóng góp và cải tiến nó. Điều này tạo ra một cộng đồng lớn và sôi động, giúp Kubernetes phát triển nhanh chóng và ổn định.
- **Portable**: Kubernetes có thể chạy trên nhiều môi trường khác nhau, từ máy tính cá nhân đến các dịch vụ đám mây lớn như AWS, GCP, Azure. Điều này giúp ứng dụng dễ dàng di chuyển giữa các môi trường mà không cần thay đổi mã nguồn.
- **Extensible**: Kubernetes có thể mở rộng quy mô và tùy chỉnh theo nhu cầu. Bạn có thể thêm các tính năng mới hoặc tích hợp với các công cụ khác thông qua các API và plugin.
- **Automation**: Kubernetes tự động hóa nhiều tác vụ quản lý container, bao gồm triển khai(Deploy), cập nhật(Update), khôi phục lỗi(error recovery) và tự động mở rộng quy mô(auto scale). Điều này giúp giảm thiểu công sức quản lý và tăng tính ổn định của ứng dụng.

### Nguồn gốc Tên gọi và Biệt danh `K8s`
- **Ý nghĩa của `Kubernetes`**: Tên gọi `Kubernetes` bắt nguồn từ tiếng Hy Lạp cổ (κυβερνήτης), có nghĩa là `người lái tàu` hoặc `hoa tiêu` (helmsman/pilot). 

  - Cái tên này được chọn một cách rất tinh tế để bổ sung cho hình ảnh của Docker. 
  - Nếu Docker đã phổ biến khái niệm `container` giống như các thùng hàng trên một con tàu, thì Kubernetes chính là người hoa tiêu, người có trách nhiệm lèo lái con tàu đó, đảm bảo hàng trăm, hàng ngàn container được vận chuyển đến đúng đích một cách an toàn và hiệu quả. 

- **Tại sao lại là `K8s`?**:  Đây là một cách viết tắt phổ biến trong ngành công nghệ, được gọi là `[numeronym](https://en.wikipedia.org/wiki/Numeronym)` (chữ-số-danh). Cách đọc rất đơn giản: K là chữ cái đầu tiên, s là chữ cái cuối cùng, và số 8 ở giữa đại diện cho 8 chữ cái còn lại (`ubernete`). 
  - Lý do chính cho sự ra đời của biệt danh này là vì `Kubernetes` là một từ dài, khó nhớ và mọi người thường phát âm sai. `K8s` ngắn gọn, dễ viết, dễ nhớ và đã trở thành một thuật ngữ tiêu chuẩn trong cộng đồng.

Một điểm cực kỳ quan trọng làm nên sự thành công của Kubernetes là nó không thuộc sở hữu của bất kỳ công ty nào. 

Mặc dù được Google khởi xướng vào năm 2014, nó đã nhanh chóng được trao tặng cho [Cloud Native Computing Foundation (CNCF)](https://www.cncf.io/), một tổ chức trung lập dưới sự bảo trợ của [The Linux Foundation](https://www.linuxfoundation.org/). Quyết định chiến lược này đã biến Kubernetes từ một dự án của Google thành một `sân chơi chung` cho toàn ngành công nghệ

## 3. Phép ẩn dụ dễ hiểu hơn về Kubernetes
Để hiểu rõ hơn về Kubernetes, chúng ta có thể sử dụng một phép ẩn dụ đơn giản: 

Hã tưởng tưởng bạn là 1 chủ nhà hàng bán phở nổi tiếng ở Hà Nội, lúc nào cũng đông khách.

Một ứng dụng hiện đại, đặc biệt là ứng dụng sử dụng kiên trúc microservices thì cũng giống như căn bếp của nhà hàng của bạn.

Trong căn bếp này, không chỉ có 1 người duy nhất vận hành, mà là sự phối hợp nhịp nhàng của cả một đội ngũ bầu bếp, mỗi người phụ trách một công đoạn riêng biệt.

- **Người thái thịt**, **người chuyên chần bánh phở**, **người chuyên pha nước dùng**, **người chuyên nấu nước lèo**, **người chuẩn bị rau thơm**, **người chuyên trang trí món ăn**, v.v.

Tất cả mọi người sẽ cùng nhau làm việc để tạo ra một bát phở hoàn hảo cho khách hàng. Và chúng ta sẽ có 1 số thành phần chính trong căn bếp này:

- **Bếp chính hay còn gọi là bếp trưởng (Cụ thể là Control Plane))**: 
  - Vị bếp trưởng không trực tiếp đứng bếp nấu từng bát phở, nhưng là người điều phối toàn bộ hoạt động của căn bếp. Ông cầm trong tay thực đơn và các yêu cầu của khách hàng, biết chính xác khi nào cần thêm người thái thịt, khi nào cần tăng tốc chần bánh phở..
  - Bếp trưởng đảm bảo mọi đầu bếp làm đúng việc, đúng lúc và đúng tiêu chuẩn.
  - Tương tự như vậy, Control Plane trong Kubernetes là bộ não của hệ thống, quản lý và điều phối tất cả các thành phần trong cụm k8s mà không trực tiếp chạy ứng dụng phục vụ khách hàng.
  - Control Plane quyết định container nào cần chạy, trên máy chủ nào, cần bao nhiêu tài nguyên, bao nhiêu bản sao, và khi nào cần khởi động lại hoặc thay thế một container.
- Các đầu bếp phục vụ (Cụ thể là Worker Node):
  - Các đầu bếp là những người trực tiếp thực hiện công việc nấu nướng, họ không cần biết đến thực đơn hay yêu cầu của khách hàng, họ chỉ cần làm đúng công việc của mình.
  - Trong Kubernetes, các Worker Node là nơi chạy các container ứng dụng. Mỗi Worker Node có thể chạy nhiều container khác nhau, tương tự như một đầu bếp có thể nấu nhiều món ăn khác nhau cùng một lúc.
  - Trong k8s, các Worker Node sẽ nhận lệnh từ Control Plane và thực hiện các tác vụ như khởi động, dừng hoặc thay thế container.
  - Mỗi Worker Node có thể có nhiều đầu bếp (Container) khác nhau, mỗi người phụ trách một công việc cụ thể trong quá trình nấu nướng.
  - Các container thường được đặt trong một đơn vị gọi là Pod, tương tự như một nhóm đầu bếp cùng làm việc trong một khu vực bếp nhất định.
- Công thức nấu ăn & Yêu cầu từ quản lý ( chính là các file cấu hình YAM ):
  - Công thức nấu ăn là những hướng dẫn chi tiết về cách nấu từng món ăn, bao gồm nguyên liệu, tỷ lệ, thời gian nấu, v.v..
  - Bếp trưởng đọc công thức và chỉ đạo đội ngủ đầu bếp thực hiện.
  - Tương tự các file cấu hình YAML trong Kubernetes định nghĩa cách thức triển khai ứng dụng, bao gồm thông tin về container, tài nguyên cần thiết,...vv..
    - Ví dụ: Tôi muốn có 3 bản sao của web server đang chạy với phiên bản mới nhất, k8s đọc file cấu hình và tự động tạo ra 3 container web server trên các Worker Node.
- Bản phở đến tay khách hàng (Người dùng cuối giao tiếp với ứng dụng):
  - Khách hàng đến nhà hàng, gọi món và chờ đợi bát phở được phục vụ. Họ không cần biết ai là người thái thịt, ai là người chần bánh, và sự phức tạo ở trong phòng bếp họ chỉ cần biết rằng bát phở của họ sẽ được phục vụ đúng lúc, đúng yêu cầu và được ăn một bát phở ngon.
  - TƯơng tự như người dùng cuối tương tức với ứng dụng của chúng ta, họ không cần biết ứng dụng được triển khai như thế nào, chỉ cần biết rằng nó hoạt động ổn định và đáp ứng đúng yêu cầu của họ.

Sự phức tạp của các ứng dụng hiện đại đã đạt đến một ngưỡng mà việc `điều phối` (orchestration) không còn là một lựa chọn, mà đã trở thành một yêu cầu bắt buộc. 

Một ứng dụng đơn khối (`monolithic`) ngày xưa giống như một quán ăn nhỏ chỉ có một đầu bếp duy nhất – dễ quản lý nhưng khó mở rộng khi khách đông. 

Khi chúng ta chuyển sang kiến trúc microservices, chúng ta có một căn bếp lớn với nhiều tài năng chuyên biệt, mang lại sự linh hoạt và tốc độ phát triển nhanh hơn. 

Tuy nhiên, điều này cũng tạo ra một thách thức khổng lồ về sự phối hợp. Nếu các đầu bếp (microservices) tự ý làm việc mà không có sự chỉ huy, kết quả sẽ là một mớ hỗn độn – tương đương với lỗi hệ thống, sập dịch vụ và trải nghiệm người dùng tồi tệ.
