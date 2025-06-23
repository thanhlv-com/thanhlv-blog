---
footer: true
title: Các thành phần chính dev hay tiếp xúc trong kiến trúc Kubernetes.
authors: [ lethanh ]
description: Các thành phần chính trong kiến trúc Kubernetes bao gồm các thành phần như Node, Pod, Service, Deployment, ConfigMap, Secret, Volume, Namespace và Ingress. Mỗi thành phần đóng vai trò quan trọng trong việc quản lý và triển khai ứng dụng trên Kubernetes.
date: 2025-06-17
outline: deep
image: https://static-cdn.thanhlv.com/study/thanhlv-study-2025/2025-06-16-gioi-thieu-ve-kubernetes/kubernetes2.png
draft: false
group: 2. Kubernetes
---

Khiến trúc của Kubernetes bao gồm nhiều thành phần khác nhau và được xây dựng dựa trên nguyên tắc trừu tượng hía và phân tách trách nghiệm.

Tuy nhiên, nếu bạn là một developer, bạn sẽ thường xuyên tiếp xúc với một số thành phần chính trong kiến trúc Kubernetes. Bài viết này sẽ giúp bạn hiểu rõ hơn về các thành phần này và cách chúng hoạt động cùng nhau để cung cấp một môi trường triển khai ứng dụng hiệu quả.

[[TOC]]


# Các thành phần chính dev hay tiếp xúc trong kiến trúc Kubernetes.

**4 thành phần cơ bản.**

## 1. Container: 

Mọi thứ trong Kubernetes đều xoay quanh container.
- **Định nghĩa**: Container là một đơn vị phần mềm tiêu chuẩn, nhẹ, độc lập, chứa mã nguồn của ứng dụng và tất cả các thư viện, công cụ cần thiết để chạy ứng dụng đó.
  - Container như là một hộp nguyên liệu được đóng gói sẵn, chứa mọi thứ cần thiết để thực hiện công việc của mình mà không cần lo lắng về môi trường bên ngoài.
  - Thông thường container sẽ là một instance của một image docker hoặc một số nền tảng container khác như Podman, rkt, ...
- **So sánh với máy ảo (VM):** Sự khác biệt cốt lõi nằm ở layer ảo hóa, VM ảo hóa cả phần cứng tạo ra một máy tính hoàn toàn với hệ điều hành riêng, trong khi container sẽ ảo hóa hệ điều hành và chia sẻ kernel với hệ điều hành host.

### Bảng so sánh giữa Container và VM

| Tiêu chí           | Container                                                          | Máy ảo (VM)                                                   |
|--------------------|--------------------------------------------------------------------|---------------------------------------------------------------|
| Ảo hóa             | Ảo hóa hệ điều hành                                                | Ảo hóa phần cứng                                              |
| Kích thước         | Nhẹ, nhanh chóng(Có thể tình bằng MB)                              | Nặng, chậm hơn(Tính bằng GB)                                  |
| Khởi động          | Nhanh chóng (Vài giây)                                             | Chậm hơn (Vài phút)                                           |
| Hiệu suất          | Hiệu suất cao hơn, ít overhead, gần tương đương với máy chủ vật lý | Hiệu suất thấp hơn, nhiều overhead vì có một layer hypervisor |
| Quản lý tài nguyên | Chia sẻ OS kernel, sử dụng tài nguyên hiệu quả hơn                 | Tài nguyên riêng biệt cho mỗi VM                              |
| Mức độ cô lập      | Cô lập ở mức process, chia sẻ kernel với hệ điều hành host         | Cô lập ở mức phần cứng, mỗi VM có hệ điều hành riêng          |

## 2. Pod:
Pod là đơn vị cơ bản nhất trong Kubernetes, đại diện cho một hoặc nhiều container chạy trên cùng một node. Mỗi Pod có thể chứa một hoặc nhiều container, và các container trong cùng một Pod chia sẻ cùng một địa chỉ IP, không gian mạng và không gian lưu trữ.

- **Định nghĩa**: Là đơn bị nhỏ nhất trong Kubernetes, đại diện cho một hoặc nhiều container chạy trên cùng một node.
  - **Mạng ( Network ):** Tất cả các container trong cùng một Pod sẽ chia sẻ cùng một địa chỉ IP và không gian mạng, điều này giúp chúng có thể giao tiếp với nhau một cách dễ dàng. Chúng có thể gọi trực tiếp đến nhau thông qua localhost, giống hệt như các đầu bếp chân phở và nấu nứ có thể nói chuyện trực tiếp với nhau.
  - **Lưu trữ ( Storage ):** Các container trong cùng một Pod có thể chia sẻ các volume, cho phép chúng truy cập vào cùng một dữ liệu. Điều này giống như việc các đầu bếp có thể sử dụng chung một tủ lạnh để lưu trữ nguyên liệu.
- **Tại sao cần pod ?:** Đây là một câu hỏi rất quan trọng, thay vì chỉ chạy các container riêng lẻ, Kubernetes sử dụng Pod để nhóm các container có liên quan với nhau. Điều này giúp quản lý và triển khai ứng dụng dễ dàng hơn.
  - **Đơn giản hóa việc giao tiếp và chia sẻ dữ liệu**
    - Pod sẽ chứa các contianer có liên kết chặt chẽ với nhau, thường là các container cần giao tiếp với nhau hoặc chia sẻ tài nguyên.
  - **Quản lý như một đơn vị thống nhất**
    - Pod đóng vai trò là đơn vị để lập lịch (scheduling), mở rộng (scaling) và quản lý vòng đời. Kubernetes sẽ di chuyển, nhân bản hoặc dừng cả Pod (bao gồm tất cả các container bên trong) chứ không phải từng container riêng lẻ. Điều này đảm bảo rằng các container phụ thuộc lẫn nhau luôn được đặt trên cùng một máy (Node) và được quản lý đồng bộ
  - **Mô hình triển khai linh hoạt**
    - Mặc dù Pod có thể chứa nhiều container, nhưng đa số một pod chạy một container duy nhất. Ngay cả trong trường hợp này, Pod vẫn đóng vai trò là một lớp trừu tượng (abstraction layer), cho phép Kubernetes quản lý nó một cách nhất quán. Khi cần mở rộng ứng dụng, bạn chỉ cần tạo thêm các bản sao của Pod đó.
### Ví dụ điển hình (Sidecar Pattern): Hãy tưởng tượng một "trạm nấu ăn" (Pod) chứa 2 đầu bếp( Container )
1. **Đầu bếp chính**: Chịu trách nhiệm nấu phở (Chạy webserver)
2. **Đầu bếp phụ**(Sidecar): Chuyên dọn dẹp và ghi chép lại những gì đầu bếp chính đã dùng (thu thập log). Đầu bếp phụ này sẽ xem các "ghi chép" của đầu bếp chính (thông qua một Volume được chia sẻ) và báo cáo lại cho bếp trưởng. Cả hai đầu bếp này sống và chết cùng nhau như một thể thống nhất.

Mình sẽ có 1 bài viết các k8s tạo pod như nào để chia sẻ cùng network và volume và có một demo sử dụng với docker. Mình sẽ làm nó sau.

### Ví dụ thực tế
Một ứng dụng tích hợp SSO của google.

1. **Container chính chứa các logic nghiệp vụ của chúng ta**: 
   - Chạy ứng dụng web, xử lý các yêu cầu từ người dùng.
   - Ví dụ: Một ứng dụng web sử dụng Flask hoặc Node.js để xử lý các yêu cầu HTTP.
2. **Container phụ (Sidecar)**: Sử dụng oauth2-proxy
   - Chạy oauth2-proxy để xử lý xác thực người dùng thông qua Google SSO.
   - Container này sẽ giao tiếp với google và người dùng để xác nhận người dùng và lấy danh tinh người dùng.
   - Sau khi xác thực, nó sẽ chuyển tiếp yêu cầu đến container chính để xử lý yêu cầu.

## 3. Node ( Worker Node )
Nếu Pod là "trạm nấu ăn", thì Node là "nhà bếp" nơi trạm nấu ăn được đặt.

- **Định nghĩa**: Node là một máy trạm trong cụm k8s, nó thường là một máy chủ vật lý hoặc máy ảo. Đây là nơi các pod thực sự chạy.
- **Chức năng**: Node cung cấp tài nguyên tính toán (CPU, RAM, Disk) cho các Pod. Mỗi Node có thể chạy nhiều Pod, và Kubernetes sẽ quản lý việc phân phối Pod trên các Node để đảm bảo hiệu suất và khả năng mở rộng.
- **Các thành phần chính trên mỗi Node**: Mỗi "Nhà bếp" (Node) sẽ cần có một số "nhân viên hậu cần" (Kubelet, Kube-proxy, Container Runtime) để đảm bảo mọi thứ hoạt động trơn tru.
  - kubelet: Đây là "Quản lý bếp" (Agent) của k8s trên mỗi Node, nó giao tiếp với bếp trưởng (Kubernetes Control Plane) để nhận lệnh, báo cáo trạng thái của các Pod đang chạy trên Node và đảm bảo rằng các đầu bếp (container) đang làm việc và khỏe mạnh.
  - kube-proxy: Đây là "Bộ phận phân phối nguyên liệu" (Network Proxy) của k8s trên mỗi Node, nó đảm bảo rằng các đầu bếp (container) có thể giao tiếp với nhau và với thế giới bên ngoài thông qua mạng.
  - Container Runtime: Đây là phần chịu trách nghiệm thực sự chạy các container trên Node. Nó có thể là Docker, containerd, hoặc một runtime khác.
  - **Các thành phần khác**: Mỗi Node cũng có thể có các thành phần khác như:
    - **CNI (Container Network Interface)**: Để quản lý mạng cho các Pod.
    - **Volume Plugins**: Để quản lý lưu trữ cho các Pod.
    - **Metrics Server**: Để thu thập và cung cấp thông tin về hiệu suất của Node và Pod.
    - **Logging Agent**: Để thu thập và gửi log từ các container đến hệ thống log tập trung.
    - **Node Problem Detector**: Để phát hiện và báo cáo các vấn đề về phần cứng hoặc phần mềm trên Node.
    - **Node Affinity**: Để xác định các Pod nào có thể chạy trên Node này dựa trên các thuộc tính của Node (ví dụ: loại máy chủ, vùng địa lý, ...).
    - **Node Taints and Tolerations**: Để kiểm soát việc phân phối Pod trên các Node, cho phép một số Pod chỉ chạy trên các Node nhất định hoặc tránh chạy trên các Node có vấn đề.
    - ....

## 4. Control Plane ( Bếp trưởng ), trước đây gọi là Master Node

Dây là "bộ não" của Kubernetes, nơi quản lý và điều phối các Node và Pod và mọi thứ khác trong cụm Kubernetes.
- **Định nghĩa**: Control Plane là tập hợp các thành phần chịu trách nhiệm quản lý toàn bộ trạng thái của cluster Kubernetes.
  - Nó đưa ra các quyết định về việc triển khai, mở rộng, và quản lý vòng đời của các Pod và Node.
  - Nó cũng đảm bảo rằng trạng thái thực tế của cluster luôn đồng bộ với trạng thái mong muốn được định nghĩa trong các cấu hình.
  - Để đảm bảo tính sẵn sàng cao, Control Plane có thể được triển khai trên nhiều máy chủ (Master Node) và sử dụng cơ chế đồng bộ hóa để đảm bảo rằng tất cả các thành phần đều hoạt động nhất quán.
  - **Các thành phần chính của Control Plane**:
    - **Kube-apiserver**: Đây là interface chính để tương tác với Kubernetes. Nó cung cấp API RESTful để quản lý các tài nguyên trong cluster. Nó giống như thư ký của bếp trưởng, tiếp nhận các yêu cầu, kiểm tra tính hợp lệ và gửi lên.
    - **etcd**: Là cơ sở dữ liệu phân tán có dạng Key Value, lưu trữ tất cả các cấu hình và trạng thái của cluster. Nó đảm bảo tính nhất quán và độ bền của dữ liệu.
    - **Kube-scheduler**: Nghiệm vụ duy nhất của nó là quyết định Node nào sẽ chạy Pod mới. Nó xem xét các yếu tố như tài nguyên, affinity, anti-affinity, và các ràng buộc khác để đưa ra quyết định tốt nhất.
    - **Kube-controller-manager**: Chạy các controller để theo dõi trạng thái của cluster và thực hiện các hành động cần thiết để duy trì trạng thái mong muốn.
      - Mỗi controller sẽ theo dõi một loại tài nguyên cụ thể (ví dụ: Node, Pod, Deployment) và thực hiện các hành động cần thiết để đảm bảo rằng trạng thái thực tế của tài nguyên đó luôn đồng bộ với trạng thái mong muốn.
      - **Ví dụ**: Replication Controller đảm bảo rằng số lượng đầu bếp chần phở luôn đúng như yêu cầu, nếu một người nghỉ, nó sẽ ngay lập tức tìm người thay thế.

**Các đối tượng quản lý bậc cao**:

Thực tế, dev hiếm khi làm việc trực tiếp với pdo trên k8s. Thay vào đó sẽ sử dụng các dối tượng quản lý bậc cao hơn để quản lý.

## 5. Deployment
Một đối tượng sử dụng nhiều và thường xuyên nhất trong k8s.

- **Định nghĩa**: Deployment là một đối tượng quản lý bậc cao trong Kubernetes, cho phép bạn định nghĩa và quản lý các ứng dụng stateless ( không) trạng thái).
  - Ví dụ như các web server, API server, ... Deployment sẽ tự động quản lý việc tạo, cập nhật và xóa các Pod để đảm bảo rằng số lượng Pod đang chạy luôn đúng như mong muốn.
- **Vai trò**: 
  - Bạn không cần phải tạo từng Pod một cách thủ công, thay vào đó, bạn chỉ cần định nghĩa Deployment và khai báo "Tôi muốn chạy ứng dụng A, sử dụng container B và tôi cần 3 bản sao (replicas)"
  - Khi bạn muốn cập nhật ứng dụng lên phiên bản mới, bạn chỉ cần thay đổi image file trong Deployment. Sau đó thực hiện rolling update, Kubernetes sẽ tự động tạo các Pod mới với phiên bản mới và dừng các Pod cũ một cách an toàn.

## 6. Service
Nếu Deployment trả lời cho câu hỏi "Chạy cái gì ? Bao nhiêu bản?", thì Service trả lời cho câu hỏi "Làm thế nào để truy cập vào ứng dụng đó?".

- **Định nghĩa**: Service là một đối tượng trong Kubernetes, cung cấp một điểm truy cập ổn định cho các Pod. Nó cho phép bạn truy cập vào các Pod thông qua một địa chỉ IP và cổng cố định, bất kể Pod có thể được di chuyển hoặc thay thế.
  - Ví dụ: Nếu bạn có một ứng dụng web chạy trên nhiều Pod, bạn có thể tạo một Service để truy cập vào tất cả các Pod đó thông qua một địa chỉ IP duy nhất.
- **Vai trò**: 
  - Service giúp giải quyết vấn đề về địa chỉ IP của Pod có thể thay đổi khi chúng được tạo mới hoặc di chuyển. Khi bạn tạo một Service, Kubernetes sẽ cung cấp một địa chỉ IP ổn định và một tên DNS cho Service đó.
  - Điều này cho phép các ứng dụng khác trong cluster hoặc người dùng cuối có thể truy cập vào ứng dụng của bạn mà không cần phải biết địa chỉ IP cụ thể của từng Pod.
  - Service cũng hỗ trợ cân bằng tải (load balancing) giữa các Pod, đảm bảo rằng lưu lượng truy cập được phân phối đều giữa các Pod đang chạy ứng dụng.

Service giải quyết vấn đề này bằng cách:
- Cung cấp một địa chỉ IP ảo và một tên DNS cố định: Service có một địa chỉ IP ảo (gọi là ClusterIP) và một tên DNS duy nhất trong cụm. Các ứng dụng khác chỉ cần "nói chuyện" với Service này mà không cần quan tâm đến địa chỉ IP của từng Pod riêng lẻ.
- Tự động khám phá Pod (Pod Discovery): Service sử dụng một cơ chế gọi là "selectors" (bộ chọn) dựa trên các "labels" (nhãn) để tự động tìm và nhóm các Pod mà nó cần quản lý. Bất kỳ Pod nào có nhãn khớp với bộ chọn của Service sẽ tự động được đưa vào danh sách đích.
- Cân bằng tải (Load Balancing): Khi có nhiều Pod cùng chạy một ứng dụng, Service sẽ tự động phân phối các yêu cầu mạng đến các Pod đó một cách đồng đều (thường theo thuật toán round-robin). Điều này giúp tăng khả năng chịu tải và tính sẵn sàng cao cho ứng dụng.
- **Các loại Service trong Kubernetes**:
  - **ClusterIP**: Đây là loại Service mặc định, cung cấp một địa chỉ IP nội bộ trong cluster để các Pod có thể giao tiếp với nhau. Nó không thể truy cập từ bên ngoài cluster.
  - **NodePort**: Mở một cổng trên mỗi Node trong cluster, cho phép truy cập vào Service từ bên ngoài thông qua địa chỉ IP của Node và cổng đã mở.
  - **LoadBalancer**: Tạo một Load Balancer bên ngoài (nếu được hỗ trợ bởi nhà cung cấp dịch vụ đám mây) để phân phối lưu lượng truy cập đến Service.
  - **ExternalName**: Cung cấp một tên DNS bên ngoài cho Service, cho phép bạn ánh xạ tên DNS đến một địa chỉ IP hoặc tên miền bên ngoài.

## 7. ConfigMap
ConfigMap là một đối tượng trong Kubernetes, cho phép bạn lưu trữ các cấu hình và thông tin không nhạy cảm dưới dạng key-value pairs. Điều này giúp tách biệt cấu hình khỏi mã nguồn của ứng dụng, cho phép bạn thay đổi cấu hình mà không cần phải tái biên dịch hoặc tái triển khai ứng dụng.

- **Định nghĩa**: ConfigMap là một đối tượng trong Kubernetes, cho phép bạn lưu trữ các cấu hình và thông tin không nhạy cảm dưới dạng key-value pairs.
  - Ví dụ: Bạn có thể lưu trữ các biến môi trường, đường dẫn đến tệp cấu hình, hoặc bất kỳ thông tin nào mà ứng dụng của bạn cần để hoạt động.
- **Vai trò**: 
  - ConfigMap giúp tách biệt cấu hình khỏi mã nguồn của ứng dụng, cho phép bạn thay đổi cấu hình mà không cần phải tái biên dịch hoặc tái triển khai ứng dụng.
  - Bạn có thể sử dụng ConfigMap để cung cấp các biến môi trường cho các Pod, hoặc để mount các tệp cấu hình vào trong Pod.
  - Điều này giúp quản lý cấu hình dễ dàng hơn và giảm thiểu rủi ro khi thay đổi cấu hình.
  - ConfigMap cũng hỗ trợ việc quản lý cấu hình theo môi trường (development, staging, production) một cách dễ dàng. Bạn có thể tạo nhiều ConfigMap khác nhau cho từng môi trường và sử dụng chúng trong các Pod tương ứng.

## 8. Secret
Secret là một đối tượng trong Kubernetes, cho phép bạn lưu trữ các thông tin nhạy cảm như mật khẩu, token, hoặc chứng chỉ một cách an toàn. 

Secret giúp bảo vệ thông tin nhạy cảm khỏi việc bị lộ ra ngoài và cung cấp một cách an toàn để truyền tải thông tin này đến các Pod.

- **Định nghĩa**: Secret là một đối tượng trong Kubernetes, cho phép bạn lưu trữ các thông tin nhạy cảm như mật khẩu, token, hoặc chứng chỉ một cách an toàn.
  - Ví dụ: Bạn có thể lưu trữ mật khẩu cơ sở dữ liệu, token API, hoặc chứng chỉ SSL trong Secret.
  - Secret được mã hóa và chỉ có thể truy cập bởi các Pod hoặc người dùng có quyền truy cập thích hợp.
- **Vai trò**: 
  - Secret giúp bảo vệ thông tin nhạy cảm khỏi việc bị lộ ra ngoài và cung cấp một cách an toàn để truyền tải thông tin này đến các Pod.
  - Bạn có thể sử dụng Secret để cung cấp các biến môi trường cho các Pod, hoặc để mount các tệp cấu hình vào trong Pod.
  - Điều này giúp quản lý thông tin nhạy cảm dễ dàng hơn và giảm thiểu rủi ro khi thay đổi thông tin nhạy cảm.
  - Secret cũng hỗ trợ việc quản lý thông tin nhạy cảm theo môi trường (development, staging, production) một cách dễ dàng. Bạn có thể tạo nhiều Secret khác nhau cho từng môi trường và sử dụng chúng trong các Pod tương ứng.

## 9. Volume
Volume là một đối tượng trong Kubernetes, cho phép bạn lưu trữ dữ liệu bền vững cho các Pod. Volume giúp đảm bảo rằng dữ liệu không bị mất khi Pod bị xóa hoặc di chuyển.
- **Định nghĩa**: Volume là một đối tượng trong Kubernetes, cho phép bạn lưu trữ dữ liệu bền vững cho các Pod.
  - Ví dụ: Bạn có thể sử dụng Volume để lưu trữ dữ liệu của cơ sở dữ liệu, tệp cấu hình, hoặc bất kỳ dữ liệu nào mà ứng dụng của bạn cần để hoạt động.
- **Vai trò**: 
  - Volume giúp đảm bảo rằng dữ liệu không bị mất khi Pod bị xóa hoặc di chuyển. Khi một Pod bị xóa, dữ liệu trong Volume vẫn được giữ nguyên và có thể được sử dụng lại trong các Pod khác.
  - Bạn có thể sử dụng Volume để chia sẻ dữ liệu giữa các Pod, hoặc để lưu trữ dữ liệu bền vững cho các ứng dụng cần lưu trữ lâu dài.
  - Volume cũng hỗ trợ việc quản lý dữ liệu theo môi trường (development, staging, production) một cách dễ dàng. Bạn có thể tạo nhiều Volume khác nhau cho từng môi trường và sử dụng chúng trong các Pod tương ứng.


