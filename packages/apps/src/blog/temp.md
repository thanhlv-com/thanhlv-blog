---
footer: true
title: Thống nhất spect trước khi kết hợp | Chia sẻ dự án Mix 2 hệ thống vào làm một.
description: Chia sẻ dự án Mix 2 hệ thống vào làm một. Đây là một dự án khá thú vị và có nhiều bài học kinh nghiệm được rút ra từ quá trình thực hiện dự án này.s
authors: [ lethanh ]
date: 2026-06-07
outline: deep
draft: false
---

Xin chào mọi người! Hôm nay mình sẽ tiếp tục chia sẻ về dự án Mix 2 hệ thống vào làm một, và trong phần này mình sẽ nói về việc thống nhất spect trước khi kết hợp.

Đây cũng là phần đầu tiên và rất quan trọng trong quá trình hợp nhất 2 hệ thống, vì nếu không có một spect rõ ràng và thống nhất, việc kết hợp sẽ trở nên rất khó khăn và có thể dẫn đến nhiều vấn đề sau này.

[[TOC]]

# Tại sao cần thống nhất spect?
Trước khi bắt đầu hợp nhất 2 hệ thống, chúng tôi đã nhận ra rằng việc thống nhất spect là rất quan trọng. Spect là một tài liệu mô tả chi tiết về cách thức hoạt động của hệ thống, bao gồm các thành phần, giao diện, quy trình và các yêu cầu kỹ thuật khác.

Cả ShortUrl của LINE và Yahoo đều có những spect chung và spect riêng biệt, vì vậy chúng tôi cần quyết định sau khi hợp nhất 2 hệ thống thì những spect nào sẽ được giữ lại, những spect nào sẽ bị loại bỏ, và những spect nào sẽ cần được chỉnh sửa để phù hợp với hệ thống mới.

Và tất nhiên, sẽ có các spect mới dành riêng cho LYMIX, vì vậy chúng tôi cũng cần xác định rõ ràng những spect này sẽ như thế nào và sẽ được phát triển như thế nào.

Thật sự mà nói mặc dù ở bước này chúng tôi đã làm rất là kỹ càng, dành 3 tuần để thảo luận giữa Team LINE JP, Yaho JP và team Việt Nam nhưng vẫn có rất nhiều điều bị bỏ sót bởi 1 số nguyên nhân.
Tôi sẽ chia sẻ chi tiết điều này ở dưới.

## Thách thức khi thống nhất spect
Việc thống nhất spect đã đặt ra nhiều thách thức đối với chúng tôi.

**Thách thức lớn nhất** là dự án ShortUrl của LINE và Yahoo đều đã là dự án hơn 10 năm tuổi. 

Người ra người vào dự án rất nhiều, mặc dù phong cách người Nhật rất là kỹ càng và tài liệu rất tốt nhưng không thể tin tài liệu 100%.

1 điểm nữa mình đánh giá là cách viết spect của người nhật thường không theo một luồng từ a-z mà thường viết theo từng phần và nó nhiều khi giống như liệt kê vậy.

Vì vậy việc đọc hiểu và cập nhật spect cũng là một thách thức lớn. Khi dự án càng lâu dài thì file spect càng phức tạp và đọc khó khăn hơn. Khiến những người cập nhật sau rất sẽ mắc sai lầm và bỏ sót những phần quan trọng.

Tôi từng làm việc với bên Hàn và thấy cách viết spect của họ rất là rõ ràng, có luồng từ a-z, có phần giải thích chi tiết về từng phần, và có nhiều hình ảnh minh họa. Điều này giúp cho việc đọc hiểu và cập nhật spect trở nên dễ dàng hơn rất nhiều.

Vì vậy, 1 trong những **thách thức lớn nhất của chúng tôi sẽ hiểu về tất cả spect hiện tại của cả 2 hệ thống cũ**.

### Cách chúng tôi giải quyết thách thức này
Để giải quyết thách thức này, chúng tôi đã thực hiện một số biện pháp:
1. Chúng tôi đã tìm kiếm lại những người đã từng tham gia vào dự án và vẫn đang làm trong công ty để hỏi họ các thông tin chi tiết về spect cũng như những điều đặc biệt lưu ý họ nhận thấy trước khi chuyển dự án mới.
2. Nhóm đang tham gia dự án tiến hành đọc code sau đó so sánh với spect hiện tại để tìm ra những điểm khác biệt và những phần nào đã bị bỏ sót trong spect.
3. Sau đó chúng tôi thực hiện clone bản spect hiện tại của cả 2 hệ thống, sau đó chỉnh sửa lại để tạo ra một bản spect cuối cùng cho hệ thống hiện tại.
4. Sau khi có bản spect cuối cùng, chúng tôi đã tổ chức một buổi review spect với sự tham gia của tất cả các bên liên quan để đảm bảo rằng mọi người đều hiểu và đồng ý với nội dung của spect mới này.

## Chốt spect trước khi kết hợp
Sau khi đã tìm hiểu rõ các spect của hệ thống cũ, chúng tôi đã tiến hành chốt gộp spect của cả 2 hệ thống lại với nhau.

Ở LYMIX chúng tôi sẽ giữ lại tính năng nào của LINE, giữ lại tính năng nào của Yahoo, các spect mới thêm và những tính năng nào mặc dù bị loại bỏ nhưng vẫn phải được hỗ trợ.
(Ví dụ không hỗ trợ tạo shortUrl mới kiểu đó nhưng vẫn phải hỗ trợ Redirect các shortUrl đã tạo trước đó)

Việc chốt spect này đã giúp chúng tôi có một cái nhìn rõ ràng về những gì cần phải làm trong quá trình hợp nhất, và cũng giúp chúng tôi tránh được những sai lầm và bỏ sót quan trọng trong quá trình phát triển hệ thống mới.

## Bỏ sót ?

Nói thật, dù đã rất kỹ càng nhưng vẫn có những phần bị bỏ sót, và những phần này chỉ được phát hiện khi chúng tôi bắt đầu triển khai dự án mới. Có những phần đến gần lúc phát hành mới được phát hiện.

1 số phần bị bỏ qua.
- Đọc từ code cũ để ra spect bị thiếu sót.
  - Nói thật, đọc các code phát triển từ 15 năm trước để ra được spect là một việc rất khó khăn, vì code có thể đã được chỉnh sửa nhiều lần, cách thức viết code, thư viện và FW sử dụng rất cũ.
- Cấu hình trên k8s. Bạn biết đó đôi khi có các cấu hình ở trên k8s luôn mà nó ảnh hưởng đến cả logic. Đó là các cấu hình router...etc..
  ::: details Chi tiết
   Chúng tôi bị 1 trường hợp bên Yahoo đang ghi đè host. Bên Yahoo trong quá khứ thiết kế chỉ hỗ trợ 1 domain duy nhất, về sau họ cần hỗ trợ nhiều domain.
   Thay vì chỉnh sửa code, hệ thống để hỗ trợ nhiều domain họ đã thực hiện bằng cách ghi đè host ở trên k8s.
  :::
- Logic khi triển khai thực tế bị xung đột.
  - Mặc dù đã kiểm tra spect rất kỹ nhưng khi triển khai thực tế thì vẫn có những phần bị xung đột với nhau, vì vậy chúng tôi phải điều chỉnh lại spect để phù hợp với thực tế hơn.
- 
