---
footer: true
title: Các thành phần chính trong kiến trúc Kubernetes.
authors: [ lethanh ]
description: Các thành phần chính trong kiến trúc Kubernetes bao gồm các thành phần như Node, Pod, Service, Deployment, ConfigMap, Secret, Volume, Namespace và Ingress. Mỗi thành phần đóng vai trò quan trọng trong việc quản lý và triển khai ứng dụng trên Kubernetes.
date: 2025-06-17
outline: deep
image: https://static-cdn.thanhlv.com/study/thanhlv-study-2025/2025-06-16-gioi-thieu-ve-kubernetes/kubernetes2.png
draft: false
group: 2. Kubernetes
---

Khiến trúc của Kubernetes bao gồm nhiều thành phần khác nhau và được xây dựng dựa trên nguyên tắc trừu tượng hía và phân tách trách nghiệm.

[[TOC]]


# Các thành phần chính trong kiến trúc Kubernetes

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

## 3. Node:
