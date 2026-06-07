---
footer: true
title: Thống nhất spec trước khi hợp nhất 2 hệ thống và bài học từ dự án LINE × Yahoo
description: Trong giai đoạn đầu dự án hợp nhất ShortURL của LINE và Yahoo, team đã chốt spec, đối chiếu tài liệu với code thực tế và xử lý các phần bị bỏ sót để giảm rủi ro khi triển khai.
authors: [ lethanh ]
date: 2026-06-07
outline: deep
draft: false
---

Xin chào mọi người! Trong bài này, mình tiếp tục chia sẻ về dự án hợp nhất 2 hệ thống thành một, với chủ đề quan trọng nhất ở giai đoạn đầu: **thống nhất spec trước khi bắt tay triển khai**.

Bài viết tập trung vào 3 ý chính:
- Vì sao phải chốt spec sớm.
- Team đã làm gì để giảm rủi ro bỏ sót.
- Những điểm vẫn có thể sai lệch dù đã review kỹ.

[[TOC]]

# Vì sao phải thống nhất spec trước khi hợp nhất?
Trước khi bắt đầu hợp nhất 2 hệ thống, chúng tôi xác định rằng việc thống nhất **spec** là bắt buộc. Spec mô tả chi tiết cách hệ thống vận hành: thành phần, giao diện, luồng xử lý và các yêu cầu kỹ thuật.

Cả ShortURL của LINE và Yahoo đều có phần chung và phần riêng. Vì vậy, chúng tôi phải quyết định rõ:
- Spec nào được giữ nguyên.
- Spec nào cần loại bỏ.
- Spec nào cần chỉnh sửa để phù hợp với hệ thống mới.

Ngoài ra, LYMIX cũng có các spec mới, nên cần thống nhất luôn từ đầu để tránh vênh giữa các team khi triển khai.

Thực tế, dù đã dành khoảng 3 tuần thảo luận giữa team LINE JP, Yahoo JP và team Việt Nam, vẫn có những điểm bị bỏ sót. Phần dưới mình chia sẻ cụ thể.

## Thách thức khi thống nhất spec
Việc thống nhất spec đặt ra nhiều thách thức.

**Thách thức lớn nhất** là cả hai dự án ShortURL của LINE và Yahoo đều đã hơn 10 năm tuổi.

Nhân sự thay đổi nhiều qua thời gian. Dù tài liệu của phía Nhật khá kỹ, nhưng không thể tin tài liệu 100% nếu không đối chiếu với hệ thống đang chạy thực tế.

Một điểm nữa là cách viết spec thường theo từng mảng, không phải lúc nào cũng đi theo một luồng từ A-Z.

Vì vậy, việc đọc hiểu và cập nhật spec rất dễ sai sót. Dự án càng lâu năm, tài liệu càng phức tạp, người cập nhật sau càng dễ bỏ qua phần quan trọng.

Theo trải nghiệm cá nhân của mình khi làm việc với một team Hàn trước đây, tài liệu của họ thường có luồng rõ ràng hơn và nhiều minh họa hơn, nên việc đọc và cập nhật dễ hơn đáng kể.

Vì vậy, một trong những thách thức lớn nhất của chúng tôi là **hiểu đầy đủ toàn bộ spec hiện tại của cả 2 hệ thống cũ**.

### Cách chúng tôi giải quyết thách thức này
Để xử lý, chúng tôi làm theo 4 bước:
1. Tìm lại những người từng tham gia dự án và vẫn còn trong công ty để hỏi các lưu ý quan trọng.
2. Đọc code hiện tại, đối chiếu với spec để tìm điểm lệch và phần thiếu.
3. Tạo bản spec hợp nhất từ 2 hệ thống, sau đó chỉnh sửa theo thực tế vận hành.
4. Review chéo với tất cả bên liên quan để chốt bản cuối cùng.

## Chốt spec trước khi bắt tay triển khai
Sau khi hiểu rõ spec của hệ thống cũ, chúng tôi chốt bản hợp nhất cho LYMIX.

Trong đó xác định rõ:
- Giữ lại tính năng nào của LINE.
- Giữ lại tính năng nào của Yahoo.
- Spec mới nào sẽ thêm.
- Tính năng nào dừng phát triển mới nhưng vẫn phải tương thích ngược.

Ví dụ: không hỗ trợ tạo ShortURL mới theo kiểu cũ, nhưng vẫn phải hỗ trợ redirect cho các ShortURL đã tạo trước đó.

Việc chốt spec giúp team có phạm vi rõ ràng, giảm tranh luận khi triển khai và hạn chế bỏ sót lớn.

## Những phần vẫn bị bỏ sót (và bài học rút ra)

Dù làm kỹ, vẫn có những điểm chỉ lộ ra khi bắt đầu triển khai, thậm chí sát ngày phát hành.

1. **Dựng spec từ code cũ vẫn có thể thiếu**
   - Code 10-15 năm tuổi đã qua nhiều lần chỉnh sửa, thư viện và framework cũ, nên rất khó khôi phục đầy đủ ý đồ ban đầu.
2. **Cấu hình Kubernetes có thể ảnh hưởng trực tiếp tới logic**
   - Một số hành vi không nằm trong code mà nằm ở cấu hình router/ingress.
   ::: details Chi tiết
   Chúng tôi gặp một trường hợp phía Yahoo ghi đè host ở tầng Kubernetes.
   Ban đầu hệ thống chỉ hỗ trợ 1 domain; khi cần mở rộng nhiều domain, họ xử lý bằng cách ghi đè host thay vì sửa code.
   Nếu chỉ đọc code mà không rà cấu hình deploy, rất dễ bỏ sót trường hợp này.
   Rất may đã phát hiện ra trước khi deploy, nếu không sẽ rất khó debug sau này và ảnh hưởng lớn đến người dùng.
   :::
3. **Logic có thể xung đột khi chạy thực tế**
   - Có những điểm nhìn trên tài liệu là hợp lý nhưng khi ghép luồng thật thì xung đột, buộc phải điều chỉnh lại spec theo thực tế.

## Kết luận
Chốt spec sớm là điều kiện bắt buộc để hợp nhất 2 hệ thống an toàn, nhưng chưa đủ để loại bỏ toàn bộ rủi ro.

Bài học quan trọng nhất của chúng tôi là: **review spec + đối chiếu code + kiểm tra cấu hình môi trường triển khai** phải đi cùng nhau.
