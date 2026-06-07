---
footer: true
title: Mở đầu | Chia sẻ dự án Mix 2 hệ thống vào làm một.
description: Chia sẻ dự án Mix 2 hệ thống vào làm một. Đây là một dự án khá thú vị và có nhiều bài học kinh nghiệm được rút ra từ quá trình thực hiện dự án này.s
authors: [ lethanh ]
date: 2026-06-04
outline: deep
draft: false
---


Xin chào mọi người! Đã rất lâu mình chưa tiếp tục chia sẻ về những dự án mà mình đã tham gia. Hôm nay, mình muốn chia sẻ về một dự án khá thú vị mà mình đã tham gia, đó là dự án Mix 2 hệ thống vào làm một.

Đây là một dự án mang lại nhiều trải nghiệm và bài học kinh nghiệm quý giá.

đây sẽ là 1 bài khá dài, vì vậy mình sẽ chia sẻ theo từng phần để mọi người dễ theo dõi hơn.

[[TOC]]

# Danh sách series bài viết về dự án Mix 2 hệ thống vào làm một:
1. [Mở đầu | Chia sẻ dự án Mix 2 hệ thống vào làm một.](2026-06-04-mo-dau-mix-2-he-thong-lam-mot.md)
2. [Thống nhất spec trước khi hợp nhất 2 hệ thống và bài học từ dự án LINE × Yahoo](2026-06-07-thong-nhat-spect-truoc-khi-hop-nhat-2-he-thong.md)

## Phần 1: Giới thiệu về dự án Mix 2 hệ thống vào làm một
Năm 2019 Softbank và Navar (Công ty mẹ của LINE) đã lên kế hoạch hợp nhất hoạt động kinh doanh của LINE và Yahoo Japan.
 
Mục tiêu là tạo 1 tập đoàn đủ lớn để cạnh tranh với google, Amazon, Alibaba.

Đến tháng 3 năm 2021, tập đoàn mới có tên là Z Holdings đã được thành lập.

Và sau đó, vào tháng 10 năm 2021, LINE và Yahoo Japan đã chính thức hợp nhất thành một công ty duy nhất đặt tên là LY Corporation và có trụ sở chính tại Tokyo, Nhật Bản.


## Số lượng phục vụ người dùng.
LINE và Yahoo Japan đều là những dịch vụ lớn với hàng trăm triệu người dùng hàng tháng.

Ước tính ứng dụng LINE có khoảng 180 đến 200 triệu người dùng hàng tháng, trong khi Yahoo Japan có khoảng 100 đến 150 triệu người dùng hàng tháng.

Vì vậy, sau khi hợp nhất, LY Corporation sẽ phục vụ một lượng lớn người dùng hàng tháng, có thể lên đến 300 triệu người dùng hoặc hơn, tùy thuộc vào cách tính và sự chồng chéo giữa người dùng của hai dịch vụ này.

Đây là một con số ấn tượng và cho thấy tầm ảnh hưởng rộng lớn của tập đoàn mới này trên thị trường công nghệ.

Tuy nhiên, đây cũng là một thách thức lớn đối với LY Corporation trong việc duy trì và cải thiện trải nghiệm người dùng, đảm bảo hiệu suất và bảo mật của các dịch vụ, cũng như phát triển các sản phẩm mới để đáp ứng nhu cầu ngày càng tăng của người dùng.

## Nhiều dự án trùng lặp nhau.
Sau khi hợp nhất, LY Corporation đã phải đối mặt với một thách thức lớn đó là có nhiều dự án trùng lặp nhau giữa LINE và Yahoo Japan. Điều này xảy ra do cả hai công ty đều đã phát triển các sản phẩm và dịch vụ tương tự nhau trước khi hợp nhất.

Các dự án trùng nhau đã tiêu tốn tài nguyên vận hạnh và phát triển của tập đoàn, đồng thời khi phát trển tính năng mới cũng phải phát triển trên 2 hệ thống khác nhau, điều này làm tăng chi phí và thời gian phát triển.
Bạn biết đấy cả LINE và Yahoo Japan đều là 2 công ty lớn ở Nhật bản, lưong dữ liệu của họ đều rất lớn, và việc duy trì 2 hệ thống riêng biệt cho các dự án trùng lặp nhau đã trở thành một gánh nặng lớn đối với LY Corporation.

Vì vậy kế hoạch LYMix đã được đưa ra để giải quyết vấn đề này. Mục tiêu của LYMix là hợp nhất các dự án trùng lặp nhau thành một hệ thống duy nhất, giúp tối ưu hóa tài nguyên và cải thiện hiệu suất của tập đoàn.

## Dự án tôi đảm nhận

Rất vui vì tôi đã được đảm nhật một dự án quan trọng trong kế hoạch LYMix này. Dự án của tôi là hợp nhất 2 hệ thống ShortUrl của LINE và Yahoo Japan thành một hệ thống duy nhất.

ShortUrl là một dịch vụ rút gọn URL, giúp người dùng có thể chia sẻ các liên kết dài một cách dễ dàng hơn.

### Thách thức của dự án
Dự án này đã đặt ra nhiều thách thức đối với tôi và đội ngũ của tôi. 

1. Đầu tiên, chúng tôi phải đảm bảo rằng việc hợp nhất không làm gián đoạn trải nghiệm người dùng của cả hai dịch vụ. Điều này đòi hỏi chúng tôi phải thực hiện quá trình chuyển đổi một cách cẩn thận và có kế hoạch chi tiết.
2. Di chuyển sang hạ tầng cloud nội bộ mới. Cả LINE và Yahoo Japan đều đã sử dụng các hạ tầng cloud khác nhau. Vì vậy đã có 1 dự án LYMIX hạ tầng cloud nội bộ mới. Các dự án LYMIx sẽ cần deploy trên hạ tầng cloud mới này.
3. Hạ tầng cloud mới có ACL và VPC riêng, nên việc kết nối giữa các hệ thống cũng là một thách thức lớn. Chúng tôi phải đảm bảo rằng các hệ thống có thể giao tiếp với nhau một cách an toàn và hiệu quả nhưng vẫn phải đảm bảo an toàn khi giao tiếp liên hạ tầng
4. Dữ liệu lớn, với LINE đã có khoảng gần 5 tỉ bản ghi với khoảng 4TB dữ liệu(Mysql), trong khi Yahoo có 7 tỉ bản ghi với 23TB dữ liệu(Cassandra). Việc hợp nhất dữ liệu từ hai hệ thống này là một thách thức lớn, đòi hỏi chúng tôi phải thiết kế một giải pháp hiệu quả để xử lý và lưu trữ lượng dữ liệu khổng lồ này.
5. Đảm bảo tính sẵn sàng cao và hiệu suất của hệ thống sau khi hợp nhất. Với lượng người dùng lớn và dữ liệu khổng lồ, chúng tôi phải đảm bảo rằng hệ thống mới có thể xử lý lưu lượng truy cập cao và cung cấp trải nghiệm người dùng tốt.

Hi, nếu bạn đọc đến đây chứng tỏ bạn đã rất hứng thú với dự án này rồi đúng không? Hãy tiếp tục theo dõi phần tiếp theo của bài viết để biết thêm chi tiết về quá trình thực hiện dự án và những bài học kinh nghiệm mà chúng tôi đã rút ra từ dự án này nhé!
