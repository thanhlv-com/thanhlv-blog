import{_ as t,j as n,o as h,v as i}from"./chunks/framework.9xwLhOZU.js";const a=JSON.parse('{"title":"Event stream và Event stream platform là gì ?","description":"","frontmatter":{"footer":true,"title":"Event stream và Event stream platform là gì ?","authors":["lethanh"],"date":"2024-04-21T00:00:00.000Z","outline":"deep","image":"/assets/1png.s1tm4KaV.png","draft":false,"group":"2. Message and event stream"},"headers":[{"level":2,"title":"Vậy Event Stream là gì ?","slug":"vay-event-stream-la-gi","link":"#vay-event-stream-la-gi","children":[{"level":3,"title":"Đặc điểm của Event Stream.","slug":"đac-điem-cua-event-stream","link":"#đac-điem-cua-event-stream","children":[]},{"level":3,"title":"Có thể sử dụng Event Stream trong những bài toán nào ?","slug":"co-the-su-dung-event-stream-trong-nhung-bai-toan-nao","link":"#co-the-su-dung-event-stream-trong-nhung-bai-toan-nao","children":[]}]},{"level":2,"title":"Event stream platform là gì ?","slug":"event-stream-platform-la-gi","link":"#event-stream-platform-la-gi","children":[{"level":3,"title":"Các tính năng chính thường có của event streaming platform:","slug":"cac-tinh-nang-chinh-thuong-co-cua-event-streaming-platform","link":"#cac-tinh-nang-chinh-thuong-co-cua-event-streaming-platform","children":[]}]},{"level":2,"title":"Các Event stream platform phổ biến hiện tại","slug":"cac-event-stream-platform-pho-bien-hien-tai","link":"#cac-event-stream-platform-pho-bien-hien-tai","children":[]},{"level":2,"title":"Tổng kết","slug":"tong-ket","link":"#tong-ket","children":[]}],"relativePath":"study/thanhlv-study-2024/2024-04-21-event-stream-va-event-stream-platform-la-gi.md","filePath":"study/thanhlv-study-2024/2024-04-21-event-stream-va-event-stream-platform-la-gi.md","lastUpdated":1734275529000}'),e={name:"study/thanhlv-study-2024/2024-04-21-event-stream-va-event-stream-platform-la-gi.md"},l=[i('<h1 id="event-stream-la-gi" tabindex="-1">Event Stream là gì ? <a class="header-anchor" href="#event-stream-la-gi" aria-label="Permalink to &quot;Event Stream là gì ?&quot;">​</a></h1><p>Chúng ta đã cùng nhau tìm hiểu về <strong><a href="./2024-04-15-message-la-gi.html">Message</a></strong> và <a href="./2024-04-16-event-la-gi.html"><strong>Event</strong></a> là 2 khái niệm về dữ liệu và <strong><a href="./2024-04-19-stream-la-gi.html">Stream</a></strong> là khái niệm về dữ liệu truyền liên tục.</p><p>Nhưng có một khái niệm khác nữa về dữ liệu mà chúng ta chưa khám phá sâu hơn đó là <strong>Event Stream</strong>.</p><p>Trong bài viết này, chúng ta sẽ cùng nhau khám phá về <strong>Event Stream</strong>, và tại sao nó là một phần quan trọng của hệ thống phần mềm hiện đại.</p><nav class="table-of-contents"><ul><li><a href="#vay-event-stream-la-gi">Vậy Event Stream là gì ?</a><ul><li><a href="#đac-điem-cua-event-stream">Đặc điểm của Event Stream.</a></li><li><a href="#co-the-su-dung-event-stream-trong-nhung-bai-toan-nao">Có thể sử dụng Event Stream trong những bài toán nào ?</a></li></ul></li><li><a href="#event-stream-platform-la-gi">Event stream platform là gì ?</a><ul><li><a href="#cac-tinh-nang-chinh-thuong-co-cua-event-streaming-platform">Các tính năng chính thường có của event streaming platform:</a></li></ul></li><li><a href="#cac-event-stream-platform-pho-bien-hien-tai">Các Event stream platform phổ biến hiện tại</a></li><li><a href="#tong-ket">Tổng kết</a></li></ul></nav><h2 id="vay-event-stream-la-gi" tabindex="-1">Vậy Event Stream là gì ? <a class="header-anchor" href="#vay-event-stream-la-gi" aria-label="Permalink to &quot;Vậy Event Stream là gì ?&quot;">​</a></h2><ul><li>Event Stream là một luồng dữ liệu được tạo ra bởi các sự kiện(Event) xảy ra trong hệ thống theo thời gian.</li><li>Mỗi Event thường đại diện cho một hành động cụ thể đã xảy ra hoặc thay đổi trạng thái trong ứng dụng hoặc hệ thống.</li><li>Các Event này có thể là mọi thứ đã xảy ra như thao tác người dùng chạm vào button, thậm chí là từ các thiết bị IoT.</li><li>Event Stream tương tự như hệ thống dây thần kinh của chúng ta. Xử lý hàng triệu, tỉ sự kiện và gửi tín hiệu đến các bộ phận trên cơ thể chúng ta. <ul><li>Một số tín hiệu được tạo ra bởi hành động của chúng ta (Lấy một quả táo) và cũng có các tín hiệu tạo ra một cách vô thức(Tăng nhịp tin khi bị mẹ mắng 😄) <img src="/assets/1png.s1tm4KaV.png" alt=""><strong>Ví dụ</strong>:</li></ul></li><li>Người dùng nhấp vào nút mua hàng.</li><li>Các tương các của người dùng trên website.</li><li>Nhiệt độ phòng thay đổi.</li><li>Tin nhắn mới được gửi đến từ telegram, slack...</li><li></li></ul><h3 id="đac-điem-cua-event-stream" tabindex="-1">Đặc điểm của Event Stream. <a class="header-anchor" href="#đac-điem-cua-event-stream" aria-label="Permalink to &quot;Đặc điểm của Event Stream.&quot;">​</a></h3><p>Thực thế các đặc điểm này là sự kết hợp của các đặc điểm Event + Stream.</p><ol><li><strong>Tức thời</strong>: <ul><li>Event Stream là một chuỗi liên tục các sự kiện được tạo ra và gửi đi trong thời gian thực hoặc gần thời gian thực. Các Event sẽ được gửi đi ngay khi xảy ra.</li><li>Các Event sẽ được sắp xếp và gửi đi theo đúng thứ tự bởi thời gian chúng được tạo ra.(Thời gian tạo Event A trước B thì A sẽ được gửi trước)</li></ul></li><li><strong>Thời gian thực</strong>: <ul><li>Event stream cho phép xử lý các Event ngay lập tức giúp hệ thống phản ứng nhanh chóng và linh hoạt vơi các Event xảy ra trong môi trường real-time.</li></ul></li><li><strong>Phân tán và đa nguồn</strong>: <ul><li>Các Event có thể được gửi đi đến 0 hoặc N người nhận.</li><li>Các Event stream có thể được tạo ra từ nhiều nguồn khác nhau. <ul><li>Ứng dụng, Server, thiết bị IoT.</li></ul></li></ul></li><li><strong>Đa dạng dữ liệu</strong>: <ul><li>Event Stream không giới hạn định dạng dữ liệu, nó có thể là JSon, text thuần, byte, video...</li></ul></li><li><strong>Linh hoạt và dễ mở rộng</strong>: <ul><li>Dễ mở rộng bởi đặc điểm <strong>Phân tán và đa nguồn</strong>.</li></ul></li></ol><h3 id="co-the-su-dung-event-stream-trong-nhung-bai-toan-nao" tabindex="-1">Có thể sử dụng Event Stream trong những bài toán nào ? <a class="header-anchor" href="#co-the-su-dung-event-stream-trong-nhung-bai-toan-nao" aria-label="Permalink to &quot;Có thể sử dụng Event Stream trong những bài toán nào ?&quot;">​</a></h3><p>Event Stream thường được sử dụng để theo dõi và phản ứng với các sự kiện trong thời gian thực(Real-time) giúp hệ thống phản hồi nhanh chóng.</p><p>Các ứng dụng của Event Stream có thể là:</p><ol><li><strong>Hệ thống giám sát các hệ thống khác.</strong><ul><li>Theo dõi và giám sát hệ thống khác bằng cách thu thập và phân tích các Event từ các service và server. Điều này sẽ giúp phát hiển sớm và xử lý các sự cố hệ thống một cách nhanh chóng và hiệu quả.</li></ul></li><li><strong>Phân tích dữ liệu real-time.</strong><ul><li>Sử dụng để thu thập dữ liệu từ nhiều nguồn khác nhau như website, Mobile app, thiết bị IoT... Các Event này có thể được sử dụng để phân tích các nguy cơ, dự đoán xu hướng, dự đoán nhu cầu khách hàng...</li><li><strong>Ví dụ:</strong> Khách hàng vừa xuống máy bay. Hệ thống gửi thông báo đặt xe grab đến khách hàng với giá rẻ.</li></ul></li><li>Xây dựng các hệ thống tương tác thông qua Event.(Một phần quan trọng được sử dụng nhiều trong kiến trúc microservices ) <ul><li>Giúp hệ thống dễ dàng mở rộng và linh hoạt hơn.+</li></ul></li><li>Ứng dụng IoT: <ul><li>Sử dụng rộng dãi trong các ứng dụng IoT để thu thập, xử lý và phản hồi dữ liệu từ các thiết bị IoT. Điều này giúp tổ chức quản lý và điều khiển xác hệ thống IoT dễ dàng, nhanh chóng và hiệu quả.</li></ul></li><li>Xây dựng các ứng dụng real-time, <ul><li>Các ứng dụng real-time như video stream, chat real-time, game trực tuyến...</li></ul></li><li>Gian lận thẻ tín dụng: Chủ thẻ có thể không biết thẻ bị sử dụng, sử dụng Event stream để phân tích thói quen sử dụng, địa chỉ hay sử dụng...etc..</li><li>Ngành tài chính: <ul><li>Phân tích xu hướng tài chính để các nhà đầu tư và môi giới sử dụng.</li></ul></li></ol><h2 id="event-stream-platform-la-gi" tabindex="-1">Event stream platform là gì ? <a class="header-anchor" href="#event-stream-platform-la-gi" aria-label="Permalink to &quot;Event stream platform là gì ?&quot;">​</a></h2><p>Event stream platform là một hệ thống phần mềm được thiết kế để thu thập, lưu trữ, xử lý và phân phối các event stream trong thời gian thực hoặc gần thời gian thực.</p><h3 id="cac-tinh-nang-chinh-thuong-co-cua-event-streaming-platform" tabindex="-1">Các tính năng chính thường có của event streaming platform: <a class="header-anchor" href="#cac-tinh-nang-chinh-thuong-co-cua-event-streaming-platform" aria-label="Permalink to &quot;Các tính năng chính thường có của event streaming platform:&quot;">​</a></h3><ul><li><p><strong>Thu thập và lưu trữ Event:</strong> Thu thập dữ liệu từ nhiều nguồn và lưu trữ chúng một cách an toàn và dễ truy cập.</p></li><li><p><strong>Xử lý dữ liệu Event :</strong> Hỗ trợ xử lý các Event Stream theo thời gian thực hoặc theo batch-data, bao gồm filter, transform...</p></li><li><p><strong>Phân phối dữ liệu Event:</strong> Gửi các Event đến 1 học N người nhận(Đích nhận), có thể là các ứng dụng, hệ thống lưu trữ khác hoặc thậm chí là một hệ thống Event stream platform khác.</p></li><li><p><strong>Đảm bảo độ tin cậy và khả năng mở rộng:</strong> Cung cấp khả năng chịu lỗi, độ trễ thấp, khả năng mở rộng để xử lý lượng dữ liệu lớn từ nhiều nguồn.</p></li></ul><h2 id="cac-event-stream-platform-pho-bien-hien-tai" tabindex="-1">Các Event stream platform phổ biến hiện tại <a class="header-anchor" href="#cac-event-stream-platform-pho-bien-hien-tai" aria-label="Permalink to &quot;Các Event stream platform phổ biến hiện tại&quot;">​</a></h2><ul><li>Apache Kafka.</li><li>Amazon Kinesis</li><li>Google Pub/Sub</li><li>Microsoft Azure Event Hubs</li></ul><h2 id="tong-ket" tabindex="-1">Tổng kết <a class="header-anchor" href="#tong-ket" aria-label="Permalink to &quot;Tổng kết&quot;">​</a></h2><ol><li><p>Event Stream là một luồng dữ liệu liên tục được tạo ra bởi các Event xảy ra trong hệ thống, đại diện cho các hành động và trạng thái thay đổi đã xảy ra.</p></li><li><p>Đặc điểm chinh của Event Stream là sự tức thời và thời gian thực hoặc gần thực trong việc xử lý Event, khả năng phân tán, đa nguồn dữ liệu và đa dạng định dạng.</p></li><li><p>Cho phép xử lý các Event ngay lập tức giúp hệ thống phản ứng nhanh chóng và linh hoạt.</p></li><li><p>Dễ dàng mở rộng nhờ tính linh hoạt và khả năng phân tán, đa nguồn.</p></li><li><p>Event Stream được sử dụng trong nhiều lĩnh vực khác nhau như giám sát hệ thống, phân tích dữ liệu, xây dựng hệ thống tương tác qua Event, ứng dụng IoT hoặc các ứng dụng real-time.</p></li></ol>',22)];const g=t(e,[["render",function(t,i,a,e,g,c){return h(),n("div",null,l)}]]);export{a as __pageData,g as default};