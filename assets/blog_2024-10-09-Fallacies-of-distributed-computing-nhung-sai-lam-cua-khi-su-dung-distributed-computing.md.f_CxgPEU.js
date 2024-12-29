import{_ as n,j as i,o as t,v as h}from"./chunks/framework.9xwLhOZU.js";const a=JSON.parse('{"title":"Fallacies of distributed computing - Những sai lầm khi sử dụng distributed computing","description":"Fallacies of distributed computing là một tập hợp các khẳng định được tập hợp bởi L. Peter Deutsch và một số người tại Sun Microsystems mô tả về những giả định sai lầm của các lập tình viên đanng làm việc với ứng dụng phân tán.","frontmatter":{"footer":true,"title":"Fallacies of distributed computing - Những sai lầm khi sử dụng distributed computing","description":"Fallacies of distributed computing là một tập hợp các khẳng định được tập hợp bởi L. Peter Deutsch và một số người tại Sun Microsystems mô tả về những giả định sai lầm của các lập tình viên đanng làm việc với ứng dụng phân tán.","authors":["lethanh"],"date":"2024-10-09T00:00:00.000Z","outline":"deep","image":"/assets/img.8MakEgbE.png","draft":false},"headers":[{"level":2,"title":"Những sai lầm.","slug":"nhung-sai-lam","link":"#nhung-sai-lam","children":[{"level":3,"title":"The network is reliable","slug":"the-network-is-reliable","link":"#the-network-is-reliable","children":[{"level":4,"title":"Giải pháp The network is reliable.","slug":"giai-phap-the-network-is-reliable","link":"#giai-phap-the-network-is-reliable","children":[]}]},{"level":3,"title":"Latency is zero","slug":"latency-is-zero","link":"#latency-is-zero","children":[{"level":4,"title":"Giải pháp Latency is zero.","slug":"giai-phap-latency-is-zero","link":"#giai-phap-latency-is-zero","children":[]}]},{"level":3,"title":"Bandwidth is infinite","slug":"bandwidth-is-infinite","link":"#bandwidth-is-infinite","children":[{"level":4,"title":"Các thiệt hại khi đạt giới hạn Bandwidth hoặc lạm dụng Bandwidth.","slug":"cac-thiet-hai-khi-đat-gioi-han-bandwidth-hoac-lam-dung-bandwidth","link":"#cac-thiet-hai-khi-đat-gioi-han-bandwidth-hoac-lam-dung-bandwidth","children":[]},{"level":4,"title":"Giải pháp Bandwidth is infinite.","slug":"giai-phap-bandwidth-is-infinite","link":"#giai-phap-bandwidth-is-infinite","children":[]}]},{"level":3,"title":"Network is secure","slug":"network-is-secure","link":"#network-is-secure","children":[{"level":4,"title":"Hệ thống của chúng ta Nên làm gì để đảm bảo Network is secure.","slug":"he-thong-cua-chung-ta-nen-lam-gi-đe-đam-bao-network-is-secure","link":"#he-thong-cua-chung-ta-nen-lam-gi-đe-đam-bao-network-is-secure","children":[]}]},{"level":3,"title":"Topology doesn\'t change(Các liên kết không thay đổi)","slug":"topology-doesn-t-change-cac-lien-ket-khong-thay-đoi","link":"#topology-doesn-t-change-cac-lien-ket-khong-thay-đoi","children":[{"level":4,"title":"Solutions","slug":"solutions","link":"#solutions","children":[]}]},{"level":3,"title":"There is one administrator","slug":"there-is-one-administrator","link":"#there-is-one-administrator","children":[{"level":4,"title":"Solutions","slug":"solutions-1","link":"#solutions-1","children":[{"level":5,"title":"Infrastructure as Code(IAC)","slug":"infrastructure-as-code-iac","link":"#infrastructure-as-code-iac","children":[]},{"level":5,"title":"Logging and monitoring","slug":"logging-and-monitoring","link":"#logging-and-monitoring","children":[]},{"level":5,"title":"Decoupling(Tách rời)","slug":"decoupling-tach-roi","link":"#decoupling-tach-roi","children":[]}]}]},{"level":3,"title":"Transport cost is zero","slug":"transport-cost-is-zero","link":"#transport-cost-is-zero","children":[{"level":4,"title":"Marshalling","slug":"marshalling","link":"#marshalling","children":[]},{"level":4,"title":"Infrastructure","slug":"infrastructure","link":"#infrastructure","children":[]},{"level":4,"title":"Solutions","slug":"solutions-2","link":"#solutions-2","children":[]}]},{"level":3,"title":"The network is homogeneous","slug":"the-network-is-homogeneous","link":"#the-network-is-homogeneous","children":[{"level":4,"title":"Solutions","slug":"solutions-3","link":"#solutions-3","children":[]}]}]},{"level":2,"title":"Tổng kết","slug":"tong-ket","link":"#tong-ket","children":[]}],"relativePath":"blog/2024-10-09-Fallacies-of-distributed-computing-nhung-sai-lam-cua-khi-su-dung-distributed-computing.md","filePath":"blog/2024-10-09-Fallacies-of-distributed-computing-nhung-sai-lam-cua-khi-su-dung-distributed-computing.md","lastUpdated":1734275529000}'),c={name:"blog/2024-10-09-Fallacies-of-distributed-computing-nhung-sai-lam-cua-khi-su-dung-distributed-computing.md"},l=[h('<p>Fallacies of distributed computing là một tập hợp các khẳng định được tập hợp bởi <a href="https://en.wikipedia.org/wiki/L._Peter_Deutsch" target="_blank" rel="noreferrer">L. Peter Deutsch</a> và một số người tại <a href="https://en.wikipedia.org/wiki/Sun_Microsystems" target="_blank" rel="noreferrer">Sun Microsystems</a> mô tả về những giả định sai lầm của các lập tình viên đanng làm việc với ứng dụng phân tán.</p><p>Tuy nhiên trong bài viết này mình sẽ dựa vào khái niệm Fallacies of distributed computing để mapping nó về phát triển ứng dụng, phần mềm trong hệ thống microservices.</p><p>Điều này sẽ giúp các bạn có cái nhìn tổng quan về những sai lầm mà các lập trình viên hay gặp phải khi phát triển và triển khai ứng dụng của mình lên cho người dùng sử dụng.</p><p><img src="/assets/img.8MakEgbE.png" alt="img"></p><h2 id="nhung-sai-lam" tabindex="-1">Những sai lầm. <a class="header-anchor" href="#nhung-sai-lam" aria-label="Permalink to &quot;Những sai lầm.&quot;">​</a></h2><h3 id="the-network-is-reliable" tabindex="-1">The network is reliable <a class="header-anchor" href="#the-network-is-reliable" aria-label="Permalink to &quot;The network is reliable&quot;">​</a></h3><p><strong>The network is reliable</strong>: Dịch tiếng việt là <code>Mạng lưới đáng tin cậy</code>. Đây là 1 sai lầm nghiêm trọng nhưng cũng hay xảy ra bởi các lập trình viên mới.</p><p>Thông thường, các hệ thống sẽ phụ thuộc vào 1 hoặc N các hệ thống khác để hoạt động. Nghĩa là trong quá trình hoàn thành nghiệm vụ của mình, hệ thống sẽ cần gọi đến 1 hoặc N hệ thống khác để hoàn thành nghiêm vụ của mình.</p><p>Câu hỏi đặt ra là: Điều gì sẽ xảy ra khi việc thực hiện gọi đến hệ thống khác không thành công? (Ví dụ timeout hoặc không thể kết nối)</p><p>Rất nhiều lập trình viên tin rằng các kết nối các hệ thống khác sẽ hoạt động tốt và luôn không có vấn đề gì xảy ra. Tuy nhiên kết nối mạng rất sẽ bị lỗi bởi nhiều nguyên nhân như:</p><ul><li>Vấn đề phần mềm.</li><li>Vấn đề phần cứng.(Giới hạn phần cứng, hỏng hóc phần cứng)</li><li>Vấn đề bảo mật(Thiếp lập ssl/tls thất bại...etc..)</li><li>Môi trường mạng không ổn định.</li><li>Một diễn biến xấu: Ví dụ hệ thống khác bị tấn công từ chối dịch vụ (DDoS) hoặc bị tấn công bảo mật.</li></ul><p>Một hệ thống tốt cần có một cơ chế linh loạt bao gồm đầy đủ các tính năng dự phòng khi mất kết nối đến các hệ thống khác.</p><img src="https://www.plantuml.com/plantuml/svg/TLB1Rjim3BthAmZi7A1d7uPWSO8Lw8QYQJw0TLX7Y2ob91qZVpzALjC4nNIHz4W-FZvfAOgiun3SydgIeuydP1pW3RjZpscC-rKAYU77Uht-rQvkCkI0-pJvsCCx1g6R23AdgPOzb7KRx3JnLY-102UID91pwjMkhmU2lwHJuYDuWHSA7jyCts08s5sSAwMm4s90WLszjtIca4ups3gtWyLFs5v4QMXWIt5lJ1yZYRePpE7Qfe5NnYY3LsXHqM7Ggu8D-Z0oER3rYTqGhrACrAbF4PwISUUqB_vT0sipWU4FYM1FZioXAyrsx3h3lr4JduaRs2IUaFUpfC9R0dUwwrnoIb7-gx4r1tFXNTwTo1VIaUFSoHYTYqa9sFS7XVHUSqlPeuXv21sEafyyrcvZvF9CFdYzD2LpSPNIfTYRx-PH3VosiMmqiXzJp9MAFnCFNYIRwKkVYZz6pH5LYfhPYkDdwvJ5GjRgtDAEvHFF-py0" alt="uml diagram"><h4 id="giai-phap-the-network-is-reliable" tabindex="-1">Giải pháp <code>The network is reliable</code>. <a class="header-anchor" href="#giai-phap-the-network-is-reliable" aria-label="Permalink to &quot;Giải pháp `The network is reliable`.&quot;">​</a></h4><details class="details custom-block"><summary>Chi tiết</summary><p>Sẽ có rất nhiều cách để đảm bảo hệ thống của chúng ta là <code>network is reliable</code> khi chúng ta là phụ thuộc của các hệ thống khác, dưới đây là một số ví dụ.(Có thể kết hợp nhiều cách để đảm bảo hệ thống của chúng ta là <code>network is reliable</code>).</p><ul><li>Cung cấp tính năng Retry Mechanism để thử lại kết nối khi kết nối bị lỗi.</li><li>Sử dụng Queue, Thông thường các hệ thống queue sẽ có tính năng retry mechanism chuyển message đến người nhận lỗi. <ul><li>Nếu 1 tin nhắn không thể gửi(Max retry..etc..) thì nó có thể được chuyển đến một hệ thống khác để xử lý hoặc <a href="https://en.wikipedia.org/wiki/Dead_letter_queue" target="_blank" rel="noreferrer">Dead letter queue</a></li></ul></li><li>Một điều quan trọng đó là ngay khi thiết kế hệ thống hoặc lập trình viên code thì phải có tư tưởng là sẽ có lỗi mạng.</li><li>...</li></ul></details><h3 id="latency-is-zero" tabindex="-1">Latency is zero <a class="header-anchor" href="#latency-is-zero" aria-label="Permalink to &quot;Latency is zero&quot;">​</a></h3><p><strong>Latency is zero</strong> : Dịch tiếng việt là độ trễ là 0.</p><p>Độ trễ có thể hiểu đơn giản là một sự kích thích và phản ứng tương ứng với kích thích đó.</p><ul><li>Ví dụ: Khi bạn buồn ngủ, bạn uống cafe và sau 5 phút bạn không còn buồn ngủ. Cafe là kích thích, và việc bạn không còn buồn ngủ là phản ứng tương ứng với kích thích đó và 5 phút là độ trễ.</li></ul><p>Trong thuật ngữ mạng đó là thời gian để di chuyển data từ vị trí A đến vị trí khác thông qua mạng. Trong thuật ngữ phần mềm đó là thời gian để thực hiện một hành động từ khi bắt đầu đến khi kết thúc.</p><ul><li>Việc hoàn thành một hành động có thể sẽ cần phải gọi đến rất nhiều hệ thống khác nhau, mỗi hệ thống sẽ tạo ra độ trễ.</li></ul><p>Độ trễ có thể gần bằng 0 khi chúng ta chạy ứng dụng ở local và không đáng kể nếu sử dụng trong local area network(LAN). Tuy nhiên khi chúng ta sử dụng ứng dụng ở global network thì độ trễ sẽ tăng lên. Bởi vì trong mạng lưới global, dữ liệu phải di chuyển qua nhiều node và đường truyền mạng khác nhau, điều này tạo ra độ trễ.</p><p>Ví dụ từ local của tôi truy cập đến Thanhlv.com sử dụng Tracer để kiểm tra các node mà dữ liệu phải đi qua.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>C:\\Users\\thanhlv&gt;tracert thanhlv.com</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>Tracing route to thanhlv.com [185.199.110.153]</span></span>\n<span class="line"><span>over a maximum of 30 hops:</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>  1    &lt;1 ms    &lt;1 ms    &lt;1 ms  192.168.0.1</span></span>\n<span class="line"><span>  2     1 ms    &lt;1 ms    &lt;1 ms  192.168.1.1</span></span>\n<span class="line"><span>  3     2 ms     5 ms     2 ms  static.vnpt-hanoi.com.vn [203.210.148.37]</span></span>\n<span class="line"><span>  4     4 ms     3 ms     2 ms  static.vnpt.vn [123.29.14.193]</span></span>\n<span class="line"><span>  5     3 ms     3 ms     2 ms  static.vnpt.vn [123.29.14.77]</span></span>\n<span class="line"><span>  6     3 ms     4 ms     3 ms  static.vnpt.vn [113.171.31.92]</span></span>\n<span class="line"><span>  7     3 ms     3 ms     3 ms  static.vnpt.vn [123.29.4.29]</span></span>\n<span class="line"><span>  8     *        *        *     Request timed out.</span></span>\n<span class="line"><span>  9     4 ms     3 ms    23 ms  static.vnpt.vn [113.171.35.83]</span></span>\n<span class="line"><span> 10    21 ms    21 ms    20 ms  static.vnpt.vn [113.171.37.91]</span></span>\n<span class="line"><span> 11    38 ms    38 ms    38 ms  167.82.128.88</span></span>\n<span class="line"><span> 12    22 ms    23 ms    22 ms  cdn-185-199-110-153.github.com [185.199.110.153]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><img src="https://www.plantuml.com/plantuml/svg/VP9DReCm48Ntd6Aahh4OysUpgA8ckK2ghAekN70J5B1JspJgxUjGYAdKnWiCy-QR6VEyiauOD_HTjBgzsLEhpiA87jv4VJeOFQXchJjju66xtJvjreiCUnIDlhJg0E-YitAX26FqPSAISIt5scdpxBuw2U8YhUvb58qns5jfG5ZOHz4UuaVOwS59WnKWfmGBHXA2qHGCEWqwtdGQzBG2VppNrkHJdLry54gtfDQz_uGNcgI4eg-RCPAMhnET1ZhxHOyCKizmZn3awOna0Sdl8UMjIHw8uWy2Ku8baXG9fpDI1AJyjqdc7pDG1e1Li9CVWxGENDlB1dnqoc8XYz-P92ViTbo-y2UvmvI4uynWie2khXObOTuuoWXZSyvexCPFsIfVKgiAwaR5oF8OEOyHanZpb1nQTnpUhYxwNYptHlYVUxKnznD6AwcQyLh_xDy0" alt="uml diagram"><p>Để truy cập website thanhlv.com từ local của tôi, dữ liệu phải đi qua 11 node và mỗi node sẽ tạo ra độ trễ.</p><p>Tương tự với ứng dụng của chúng ta, mỗi hành động sẽ tạo ra độ trễ, mỗi hành động sẽ gọi đến nhiều hệ thống khác nhau, mỗi hệ thống sẽ tạo ra độ trễ.</p><p>Tất cả hành động đều có độ trễ, không có hành động nào có độ trễ là 0. Dù bản thân con người cũng có độ trễ, nhưng nó đủ nhanh để không cảm nhận được độ trễ nhưng nó vẫn tồn tại.</p><p>Việc hạn chế có các độ chễ không cần thiết khi phát triển ứng dụng là một điều cần thiết. Có nhiều các độ chễ nhỏ có thể tính bằng mili giây nhưng nếu có quá nhiều độ chễ nhỏ thì nó có thể tính bằng giây hoặc phút.</p><p>Khi phát triển ứng dụng, chúng ta cần phải nhớ rằng mọi hành động đều có độ trễ và nó có thể tính bằng phút. <img src="/assets/network-latency.WLz64lxW.png" alt="img"></p><p>Một ví dụ điển trình của điều này chính là ORM. Khi sử dụng ORM, chúng ta có thể cấu hình Lazy load và Eager Loading.</p><ul><li>Lazy load: Khi cấu hình Lazy load, dữ liệu sẽ chỉ được load khi cần thiết, điều này có thể tạo ra độ trễ khi bắt đầu sử dụng dữ liệu. <ul><li>Tuy nhiên nó cũng có 2 mặt, nếu dữ liệu đó không cần thiết thì nó sẽ không load dữ liệu đó, giúp giảm tải cho hệ thống.</li><li>Ví dụ: Học sinh Tuấn vào màn hình danh sách lịch học trong tháng: <ul><li>Nếu cấu hình Lazy load: Dữ liệu sẽ được load khi Tuấn click vào từng ngày, mỗi lần click sẽ có độ trễ khoảng 0.5s, tuy nhiên tại màn hình danh sách chỉ tốn 1s.</li></ul></li></ul></li><li>Eager Loading: Khi cấu hình Eager Loading, tất cả dữ liệu sẽ được load ngay khi truy vấn, điều này có thể tạo ra độ trễ khi truy vấn số lượng lớn dữ liệu. <ul><li>Giống với Lazy load, Eager Loading cũng có 2 mặt, nếu dữ liệu đó không được sử dụng thì nó sẽ tạo ra độ trễ không cần thiết.</li><li>Ví dụ: Học sinh Tuấn vào màn hình danh sách lịch học trong tháng: <ul><li>Nếu cấu hình Eager Loading: Dữ liệu sẽ được load ngay khi vào màn hình và tần tốn 3s để load dữ liệu.</li></ul></li></ul></li></ul><h4 id="giai-phap-latency-is-zero" tabindex="-1">Giải pháp <code>Latency is zero</code>. <a class="header-anchor" href="#giai-phap-latency-is-zero" aria-label="Permalink to &quot;Giải pháp `Latency is zero`.&quot;">​</a></h4><details class="details custom-block"><summary>Chi tiết</summary><ul><li>Sử dụng Cache để không cần tính toán lại dữ liệu đã được tính toán trước đó. <ul><li>Có thể sử dụng Cache ở nhiều cấp độ, từ cấp độ ứng dụng, cấp độ hệ thống...</li><li>Có thể cache ở nhiều nơi như Redis, Memcached, CDN, Local Storage...etc...</li></ul><img src="https://www.plantuml.com/plantuml/svg/RL9BRuCm3BxlLrZQkTBE7APgq6c7LPg6kEpc1XUYXgIBJIlswvSG2XLR91xv7hPZPyk2NlhEF6pdFmYBJzgUqMC71rIdnhlUrhappiFZRhTxAVALYbkitLNR1evec5OiUk-ka_rfN6k14kTB6Gm1NebTboACBz4Iu7SKice0pV15tYtqQ8MAoGCoL7TOGHSoxfo8Od5Ki7c6Sc2XBeEIR0sVzDqJoyWc8afoL2rbaBUaJccJWXj9EtZJoP9smL5b8PJqtYQeXW85Hmc5faowlMPUPOgo0t98zagYsiLs8-uhdZBCcZy5b-7mz1zV_JM7qo-DiKu8l6vQ0NUSV2c4-D3-HXE3EF1Kzuh0f8baes8J9t3Nf8ZijTMT_WaXgOkH5Hh3C_lH3gmZD80oBeulF1VoDqMSIoneBcyRaF6Yfkyl" alt="uml diagram"></li><li>Hạn chế sử dụng các remote call(Call database, rest, rpc...etc..) thừa thãi.</li><li>Về mặt vật lý, nếu dữ liệu hoặc máy chủ ở gần khách hàng thì độ trễ sẽ giảm vì dữ liệu không cần phải di chuyển xa, qua nhiều node.</li></ul><img src="https://www.plantuml.com/plantuml/svg/RLDDRzim3BthLn3TES3EFWnPxGmTq1NTt5nsOsKc5k987KatI7_zA3bjTAWl8lb8FdvvBOgiyt5owmz93Y6-8ECHdj4VzfpcEBHfIWnVDflDRTTM7ZBYa4uXxc67ar2587CwNSA-bgy6lIRkzJmHu8aa7Sav3MhgFIf5VuOWy9SuELTSOIl4W0BRYzxHAqtfPJ5spcrXzGtwioWT6-Wf3l27_iqawXPZXkyJ3hSuOVJ43NH1bCFph5G0LwFPk-qUSYP-9UWLDNXeKxJQr1cI7RQDSUZC4Lhq8mqVU4LPa0RQaVnXKHnEkaXm5zI1VOlsMSOE5HtPN2y-lu982Raob0gjdH-aVbm2YaCnLoNqDZNw3B-IBcnng1luFclgFKwPehpmC-uORNIpjo2gN7-dle573ec3XZU29yRTBlWwcPoZ7pd5DCiZ9qyYTZaDt64SBFD3Ygis1niFFA4SnBcOR3ySzgD2sbtQNXfGjalP1nBG11Gb5vE1c-g2tko2RffYNfKjmx9XOxqORPVlaitfQizzhyGAkPgiltUmwWEkZUJPGIxOkRM9vQTQtly0" alt="uml diagram"></details><h3 id="bandwidth-is-infinite" tabindex="-1">Bandwidth is infinite <a class="header-anchor" href="#bandwidth-is-infinite" aria-label="Permalink to &quot;Bandwidth is infinite&quot;">​</a></h3><p><strong>Bandwidth is infinite</strong>: Dịch tiếng việt là Băng thông là vô hạn.</p><p>Bằng thông hiểu đơn giản là tốc chạy của chúng ta mỗi giây. Trong mạng cũng vậy, băng thông là tốc độ truyền dữ liệu mỗi giây. <a href="https://www.nngroup.com/articles/law-of-bandwidth/" target="_blank" rel="noreferrer">Mặc dù băng thông đã tăng rất nhiều trong vài thập kỷ qua nhưng nó không phải là vô hạn.</a></p><p>Người dùng có thể không đủ may mắn để trải nghiệm băng thông mạng cao, bởi do nhiều vấn đề. Ví dụ như: Họ dùng mạng di động. <a href="https://en.wikipedia.org/wiki/List_of_sovereign_states_by_Internet_connection_speeds" target="_blank" rel="noreferrer">Họ dùng mạng ở Việt Nam chứ không phải ở Singapore.</a></p><p>Một điều nữa là do băng thông tăng lên, nên các yêu cầu về dữ liệu lớn cũng tăng lên. Ví dụ như video 4k, 8k, 16k...etc...</p><p>Có lẽ bạn chưa biết, các VPS hoặc cloud ở Việt Nam thường có Bandwidth tối đa là 100 Mb/s. Nếu ứng dụng chúng ta sử dụng Bandwidth vượt quá giới hạn ứng dụng của chúng ta có thể bị tắc nghẽn.</p><p>Và tất nhiên chính thiết bị phần cứng của chúng ta cũng có giới hạn. Nếu tốc độ vượt quá giới hạn phần cứng thì hệ thống của chúng ta sẽ bị tắc nghẽn.</p><ul><li>Ví dụ 1: Ứng dụng của chúng ta cung cấp chức năng xem phim, nếu có quá nhiều người xem phim cùng lúc thì hệ thống của chúng ta sẽ bị tắc nghẽn.</li></ul><img src="https://www.plantuml.com/plantuml/svg/VLDDRzim3BthLn3OETZEEGnfcnGjC1HOqlm0nc8S8RBeKdICzDUFSfpKmR3fee_7n_T8IOkiADerqIrkgtmCgKN11dPO7MlXBladZYpmRRLQFIwV9X7vW9xxa6hOOymqGL24-v7sOnXJi5AMZPuZ0VQKkI7dDAXj7p7vFdWzGCZmclOX1ILunXYnEZit466RIG0pRCVzaauKkRqSBftRmkmdRCvPgPd3XfA7DNrqbDLT3WlyHjgp7EVmBfXo4nIMgEWmwiJ3hr20DM5r8E_0naYR2hmVXBLu7nAKe2-LhUb7xYr5RZbPWyYwD15uE668k8lqLtAI4yaSdbbw53_9FG1t5OmLZWh_SBca60hnBkxEw9gqatHHiepE9RRMIwWF2hmVOmVQQyxMJQYmo-NgTxToOkaNQZ21-H0vkrcfEDLs0mQDm8kLPQNHb7I5J1Ey-G1FZINFnGyKE_ynjL51fJgOCMKm6jRqPUrgvtAZzcPJPFJVkxPCa5iYVrN_pHje9R043PyuSRmctrKcRW-s4rlay4bNqaEdFCiLnjAGaFQ2MQMhhACqCR-mvV3PBlCV" alt="uml diagram"><h4 id="cac-thiet-hai-khi-đat-gioi-han-bandwidth-hoac-lam-dung-bandwidth" tabindex="-1">Các thiệt hại khi đạt giới hạn Bandwidth hoặc lạm dụng Bandwidth. <a class="header-anchor" href="#cac-thiet-hai-khi-đat-gioi-han-bandwidth-hoac-lam-dung-bandwidth" aria-label="Permalink to &quot;Các thiệt hại khi đạt giới hạn Bandwidth hoặc lạm dụng Bandwidth.&quot;">​</a></h4><ul><li>Có thể gây tắc nghẽn hệ thống, request người dùng sẽ không thể đáp ứng hoặc đáp ứng chậm.</li><li>Đa số các bên cho thuê VPS và Cloud đều sẽ tính phí mạng, nếu lạm dụng mạng có thể dẫn đến chi phí cao.</li><li>Lạm dụng băng thông có thể làm tăng nguy cơ bị tấn công từ chối dịch vụ (DDoS), làm giảm khả năng bảo mật của hệ thống.</li><li>Khi băng thông bị giới hạn, khả năng mở rộng của hệ thống cũng bị ảnh hưởng, làm giảm khả năng phục vụ số lượng lớn người dùng cùng lúc.</li></ul><h4 id="giai-phap-bandwidth-is-infinite" tabindex="-1">Giải pháp <code>Bandwidth is infinite</code>. <a class="header-anchor" href="#giai-phap-bandwidth-is-infinite" aria-label="Permalink to &quot;Giải pháp `Bandwidth is infinite`.&quot;">​</a></h4><details class="details custom-block"><summary>Chi tiết</summary><ul><li>Giới hạn tốc độ download và upload của người dùng.</li><li>QoS: Cấu hình phòng ngừa để ưu tiên các tính năng trọng hơn khi sự cố xảy ra. Để đảm bảo rằng các dịch vụ quan trọng nhất của bạn vẫn hoạt động tốt nhất có thể.</li><li>Giảm kích thước của các tài nguyên như hình ảnh, script và stylesheet để giảm lượng dữ liệu truyền tải.</li><li>Tự động mở rộng hạ tầng dựa trên nhu cầu lưu lượng để xử lý các tải khác nhau một cách hiệu quả.</li></ul></details><h3 id="network-is-secure" tabindex="-1">Network is secure <a class="header-anchor" href="#network-is-secure" aria-label="Permalink to &quot;Network is secure&quot;">​</a></h3><p>Ngày nay(2024) các lập trình viên ở Việt Nam chú trọng nhiều vào việc phát triển chức năng, tối ưu hóa hệ thống, tối ưu hóa tốc độ, tối ưu hóa bộ nhớ, tối ưu hóa cơ sở dữ liệu... nhưng ít chú trọng vào việc bảo mật hệ thống.</p><p>Dù lập trình viên có chú ý bảo mật hệ thống trong code của mình rất tốt nhưng khi dữ liệu đi qua mạng thì không bao giờ an toàn.</p><p>Hiện tại khi dữ liệu đi qua mạng thì có rất nhiều cách để hacker hoặc các hệ thống trung gian đứng giữa đánh cắp dữ liệu hoặc thay đổi dữ liệu gây ra vấn đề giả mạo yêu cầu hoặc truy cập trái phép.</p><p>Ngày này HTTPS đã trở thành chuẩn mực để bảo mật dữ liệu truyền tải giữa người dùng và hệ thống. Tuy nhiên vẫn có rất nhiều cách để tấn công dữ liệu truyền tải giữa các hệ thống. Ví dụ: Năm 2014 chính bản thân tiêu chuẩn SSL đã có lỗ hổng <a href="https://heartbleed.com/" target="_blank" rel="noreferrer">Heartbleed</a>, một lỗ hổng nghiêm trọng trong mã nguồn mở OpenSSL.</p><p>Một trong những khái niệm phổ biến về kiểu tấn công này là man-in-the-middle attack.</p><p>Vì vậy hệ thống cần có các cơ chế bảo mật ở tầng mạng để đảm bảo dữ liệu của chúng ta không bị đánh cắp hoặc thay đổi.</p><p>Vấn đề không phải là dữ liệu của bạn có bị đánh cắp hay không; mà là khi nào dữ liệu sẽ bị đánh cắp.</p><details class="details custom-block"><summary>Chi tiết</summary><ul><li>Dù hệ thống có an toàn đến đâu, bạn có vò đầu bứt tai để bảo mật hệ thống của mình thì vẫn luôn có nguy cơ bị tấn công và bị đánh cắp dữ liệu hoặc thay đổi dữ liệu.</li><li>Vì vậy hệ thống cần có các cơ chế bảo mật ở tầng mạng để đảm bảo dữ liệu của chúng ta không bị đánh cắp hoặc thay đổi.</li></ul></details><h4 id="he-thong-cua-chung-ta-nen-lam-gi-đe-đam-bao-network-is-secure" tabindex="-1">Hệ thống của chúng ta Nên làm gì để đảm bảo <code>Network is secure</code>. <a class="header-anchor" href="#he-thong-cua-chung-ta-nen-lam-gi-đe-đam-bao-network-is-secure" aria-label="Permalink to &quot;Hệ thống của chúng ta Nên làm gì để đảm bảo `Network is secure`.&quot;">​</a></h4><details class="details custom-block"><summary>Chi tiết</summary><ul><li>Sử dụng HTTPS để mã hóa dữ liệu truyền tải giữa người dùng và hệ thống.</li><li>Sử dụng VPN để mã hóa dữ liệu truyền tải giữa các hệ thống. <ul><li>Tại sao ử ? Vì dữ liệu truyền tải giữa các hệ thống không an toàn, nếu không mã hóa dữ liệu thì dữ liệu có thể bị đánh cắp hoặc thay đổi khi hacker có truy cập vào mạng và đứng giữa.</li></ul></li><li>Sử dụng SSH để truy cập an toàn vào hệ thống.</li><li>Sử dụng Rate Limiting để giới hạn tốc độ truy cập của người dùng. Phòng trường hợp hack dò lỗi bảo mật.</li><li>Sử dụng Encryption để mã hóa dữ liệu truyền tải giữa các hệ thống hoặc giữa người dùng và hệ thống.</li><li>Sử dụng Multi-Factor Authentication để bảo vệ tài khoản người dùng.</li><li>Luôn kiểm tra các rủi do bảo mật hàng đầu hiện tại : <a href="https://owasp.org/" target="_blank" rel="noreferrer">https://owasp.org/</a></li><li>...etc...</li></ul><img src="https://www.plantuml.com/plantuml/svg/VLDDRy8m3BtdLrZiiXqgxSnXOWEcxW12AztTj1v4j0cotLNy-wLVMs4JkTJfUxQVFp8JHTQgBCpinvAZTITaB667sN7FldBvt1UUuMwvNBuivYE6733tjNLx-CH2Q8GWiwzxjyVsZC5CFITwBWYm9l4b6QDMmtLDMdi-WXL8AAiu02qPKY4654ZxUnoqTNzYOrA8dWRNQN1qEInTnkUJKWuBL3H3tC1Bpg9KJc7BwAIqUatjy8k8xvIH_Q8RGTE6f1Mx4UUTvEITD2KK2YjqaNMH7YXQsJmFjJwhXY8CX1DVf7jpIfpHIRiqFuH1UN2aCg3gOK5jjb_Yh_fuUgKNxbF7X3dk2dem5ERLztXeXOZrhetoJxjUFTV8VnfxcVDc6y9OZ75U2TZk3mh-i_ViWYYZqjwID7MHasRu3J0PxOIqUYVJ5eWWtcutIMz_RDQzbIHnR_KYXgeYM5M5skYrMw7dAWp3gSsmPJHRqwWpis2rJwBxVWC0" alt="uml diagram"></details><h3 id="topology-doesn-t-change-cac-lien-ket-khong-thay-đoi" tabindex="-1">Topology doesn&#39;t change(Các liên kết không thay đổi) <a class="header-anchor" href="#topology-doesn-t-change-cac-lien-ket-khong-thay-đoi" aria-label="Permalink to &quot;Topology doesn&#39;t change(Các liên kết không thay đổi)&quot;">​</a></h3><ul><li>Các môi trường có thể có các yêu cầu mạng khác nhau, môi trường dev thường yêu cầu start nhanh, môi trường production thường yêu cầu tính sẵn sàng cao, khả năng phục hồi và dự phòng.</li><li>các quy tắc về tường lửa có thể thay đổi để đáp ứng các yêu cầu về bảo mật. <ul><li>Ví dụ: Môi trường dev có thể không cần thiết phải cấu hình tường lửa, nhưng môi trường production cần phải cấu hình tường lửa để bảo vệ hệ thống.</li></ul></li><li>Nhiều service mới được triển khai, nhiều service cũ bị xóa bỏ, nhiều service bị thay đổi cấu hình.</li></ul><p>Việc liên kết mạng giữa các ứng dụng thay đổi thường nằm ngoài tầm kiểm soát của chúng ta, bởi vì có nhiều lý do cho điều này. Các máy chủ có thể được thêm mới hoặc gỡ bỏ. Các service có thể được di chuuyển, nâng cấp hoặc không còn được sử dụng nữa.</p><h4 id="solutions" tabindex="-1">Solutions <a class="header-anchor" href="#solutions" aria-label="Permalink to &quot;Solutions&quot;">​</a></h4><p>Do việc liên kết mạng là không ổn định, nên có một số giải pháp để giảm thiểu vấn đề này.</p><ol><li>Abstract network specifics(Trừ tượng về thông tin mạng): <ul><li>Tránh sử dụng trực tiếp từ IP address, thay vào đó hãy sử dụng DNS hostname</li><li>Cân nhắc sử dụng <a href="https://microservices.io/patterns/server-side-discovery.html" target="_blank" rel="noreferrer">service discovery pattern</a> cho Microservice architectures.</li></ul></li><li>Design for failure( Thiết kế cho thất bại) <ul><li>Thiết kế ứng dụng của chúng ta để phòng ngừa tình trạng không thể thay thế. Khi có lỗi chúng ta sẽ có cách để thay thế hoặc sử lý lỗi.</li><li>Kiểm tra hỗn loạn (<a href="https://en.wikipedia.org/wiki/Chaos_engineering" target="_blank" rel="noreferrer">chaos engineering</a>), kiểm tra hành vi của hệ thống trong các lỗi về cơ sở hạ tầng, mạng, application</li></ul></li></ol><img src="https://www.plantuml.com/plantuml/svg/VLF1Yjim4BthAmPww6cXvnnAsZWBWTsmuFO3PkMn8o9hp8mSux_lsF76BcKhC9RyvhrvyuJtcb5otqQtV-pq6bA7WYsyexysmdsg3XnPuClnUFnP73OLUi6AXv0Qg34gRH0KuM6XVPlN5lIPfSnZ9C21b5joBeTinr_S6QSPeM3Iz3N3uOAf8NZ66D6FpirKAEX6aJiIG8N2kGAUlaCvQgPsPs0NUOGVNHU3nnmukJiq5Pqf3opN7HnjuFSOz087JedyLASEOruzt7ixiBNGjcrM6homvhbixLDO1uj0u9LKqLJ8ybcbowdvfzAl65Asvozh_-YNlVScldP8bNE9Cu64vfA1wwL-ffvKUrBmsEjqN_d3YP-7rDrSz0JFGMYmi45wkuu5NB0p3M0J2RLyemgKv4Ro0PPs2juedEhGz387_n0mRp1P-u_1CXk7cc0cCuFnAZFmcStV5cPnBk5YoITiZHEIAM4rYPxU0AjAB9Q7zLFRHMefvTdrvBCAwcqC6PUAWZGq2MeRiCOGUw45U2EnZ-taW1KeDI4HoPmXQTwEjhVj_2_Ttty0" alt="uml diagram"><h3 id="there-is-one-administrator" tabindex="-1">There is one administrator <a class="header-anchor" href="#there-is-one-administrator" aria-label="Permalink to &quot;There is one administrator&quot;">​</a></h3><p>Nếu hệ thống của chúng ta độc lập và được triển khai trong môi trường do chúng ta kiểm soát, hê thống do chúng ta quản lý thì khi đó chỉ có 1 administrator.</p><p>Tuy nhiên 99.999% các hệ thống không phải là như vậy, hệ thống của chúng ta sẽ phụ thuộc vào nhiều hệ thống khác, nhiều dịch vụ khác, mỗi hệ thống khác sẽ có một admin khác nhau.</p><ul><li>Ví dụ: <ul><li>Bạn là CODE OWNERS của project, trong project của bạn có sử dụng dịch vụ của AWS, bạn không phải là admin của AWS, bạn chỉ là người quản lý project của mình.</li><li>Project của bạn là project nội bộ, được triển khai bởi nhóm devops trên hạ tầng k8s do devops quản lý. Bạn không phải là admin của hạ tầng k8s, bạn chỉ là người quản lý project của mình.</li></ul></li></ul><p>Nhiều nhóm nội bộ hoặc bên ngoài có thể tham gia để triển khai và hỗ trợ hệ thống. Các nhóm đó sẽ hoạt động bên ngoài quy trình của chúng ta, họ có thể thay đổi cấu hình, cài đặt, triển khai, nâng cấp hệ thống của chúng ta.</p><h4 id="solutions-1" tabindex="-1">Solutions <a class="header-anchor" href="#solutions-1" aria-label="Permalink to &quot;Solutions&quot;">​</a></h4><h5 id="infrastructure-as-code-iac" tabindex="-1">Infrastructure as Code(IAC) <a class="header-anchor" href="#infrastructure-as-code-iac" aria-label="Permalink to &quot;Infrastructure as Code(IAC)&quot;">​</a></h5><p>Nếu có thể chúng ta có thể tự động hóa việc cung cấp các cấu hình nơi các môi trường được triển khai ứng dụng.</p><p>Infrastructure as Code là thành phần CORE của Devops, với cơ sở hạ tầng được mô hình hóa như code và được quản lý như quy trình quản lý code.</p><p><img src="/assets/iac.lJ2hYGdu.png" alt="IAC"></p><h5 id="logging-and-monitoring" tabindex="-1">Logging and monitoring <a class="header-anchor" href="#logging-and-monitoring" aria-label="Permalink to &quot;Logging and monitoring&quot;">​</a></h5><p>Việc chuẩn đoán lỗi chưa bao giờ là dễ dàng, đặc biệt là với các hệ thống phân tán hoặc microservices.</p><p>Để có khả năng nhìn rõ hơn về hành vi của ứng dụng thì centralised logging, metrics, và tracing (<a href="https://www.oreilly.com/library/view/distributed-systems-observability/9781492033431/ch04.html" target="_blank" rel="noreferrer">The Three Pillars of Observability</a>) được coi là các key chính cần có trong thiết kế hệ thống. <img src="/assets/observability.x9MiPjmU.png" alt="observability"></p><h5 id="decoupling-tach-roi" tabindex="-1">Decoupling(Tách rời) <a class="header-anchor" href="#decoupling-tach-roi" aria-label="Permalink to &quot;Decoupling(Tách rời)&quot;">​</a></h5><ul><li>Đảo bảo khả năng Decouplin giữa cách thành phần trong hệ thống giúp chúng ta dễ dàng thay đổi, nâng cấp, thêm mới, xóa bỏ các thành phần mà không ảnh hưởng đến các thành phần khác. Điều này sẽ giúp khi có một component bị lỗi thì hệ thống có thể chuyển nhanh sang một component khác.</li></ul><h3 id="transport-cost-is-zero" tabindex="-1">Transport cost is zero <a class="header-anchor" href="#transport-cost-is-zero" aria-label="Permalink to &quot;Transport cost is zero&quot;">​</a></h3><p>Chúng ta đã nói đến <a href="#latency-is-zero">latency is zero</a> ở phía trước liên quan đến thời gian cần để giữ liệu gửi qua mạng. Thì <code>Transport cost is zero</code> chính là những thứ cần thiết để thực hiện các điều đó.</p><h4 id="marshalling" tabindex="-1">Marshalling <a class="header-anchor" href="#marshalling" aria-label="Permalink to &quot;Marshalling&quot;">​</a></h4><p>Marshalling là quá trình trong việc sắp xếp dữ liệu và chuyển dữ liệu từ từ layer Application(Layer 7) sang layer Transport(Layer4) trong <code>OSI Reference Model</code> để gửi dữ liệu qua mạng.</p><h4 id="infrastructure" tabindex="-1">Infrastructure <a class="header-anchor" href="#infrastructure" aria-label="Permalink to &quot;Infrastructure&quot;">​</a></h4><p>Chi phí hạ tầng luôn là một trong những chi phí tốn rất nhiều của các công ty công nghệ.</p><p>Đối với private cloud, công ty phải chi trả cho việc mua máy chủ, lưu trữ, mạng, bảo mật, điện, môi trường làm việc, nhân sự quản lý hệ thống.</p><p>Đối với public cloud, mặc dù chi phí phần cứng vật lý tất nhiên không phải là yếu tố đáng lo ngại nhưng công ty phải chi trả cho việc sử dụng dịch vụ của public cloud, chi phí này có thể tăng lên nếu công ty sử dụng nhiều dịch vụ của public cloud.</p><h4 id="solutions-2" tabindex="-1">Solutions <a class="header-anchor" href="#solutions-2" aria-label="Permalink to &quot;Solutions&quot;">​</a></h4><p>Thực tế các chi phí này nằm ngoài tầm kiểm soát của chúng ta, nhưng chúng ta có thể tối ưu hóa việc sử dụng hạ tầng của mình.</p><p>Ví dụ chúng ta có thể giảm bớt chi phí bằng các tối ưu hóa data gửi qua mạng bằng cách tận dụng định dạng dữ liệu được tối ưu hóa như <code>Protocol Buffers</code> thay vì <code>JSON</code>, <code>XML</code>.</p><h3 id="the-network-is-homogeneous" tabindex="-1">The network is homogeneous <a class="header-anchor" href="#the-network-is-homogeneous" aria-label="Permalink to &quot;The network is homogeneous&quot;">​</a></h3><p>The network is homogeneous: Dịch tiếng việt là mạng đồng nhất.</p><p>Mạng thường phải hỗ trợ nhiều loại máy khách được kết nối — từ máy tính để bàn đến thiết bị di động và thiết bị IoT.</p><p>Mỗi loại máy khách có thể sử dụng các giao thức mạng khác nhau, có thể sử dụng các phiên bản giao thức khác nhau, có thể sử dụng các cấu hình mạng khác nhau.</p><h4 id="solutions-3" tabindex="-1">Solutions <a class="header-anchor" href="#solutions-3" aria-label="Permalink to &quot;Solutions&quot;">​</a></h4><p>Khả năng tương tác là chìa khóa để giải quyết vấn đề này.</p><p>Nếu có thể, hãy tránh các ứng dụng sử dụng các giao thức mạng cũ hoặc không an toàn, các giao thức độc quyền.</p><p>Ưu tiên các giao thức mạng tiêu chuẩn, an toàn và phổ biến như HTTP, HTTPS, TCP, UDP.</p><p>Ví dụ sử dụng JSON và RESTfull để tương tác giữa các ứng dụng. Điều này sẽ rất hữu ích để cho các bên thứ 3 có thể tương tác với hệ thống của chúng ta.</p><h2 id="tong-ket" tabindex="-1">Tổng kết <a class="header-anchor" href="#tong-ket" aria-label="Permalink to &quot;Tổng kết&quot;">​</a></h2><p>Những sai lầm này không phải là những lỗi cụ thể mà chúng ta có thể sửa ngay lập tức, mà chúng ta cần phải nhớ rằng chúng tồn tại và cần phải xử lý chúng khi phát triển ứng dụng.</p><p>Vì vậy khi phát triển ứng dụng, chúng ta cần phải nhớ rằng mọi hành động đều có độ trễ, băng thông không phải là vô hạn, mạng không phải là an toàn, mạng không phải là đồng nhất, mạng không phải là ổn định, và không phải chỉ có một admin.</p><p>Một điều quan trọng nhất là chúng ta cần phải nhớ rằng mọi hệ thống đều có thể bị lỗi, và chúng ta cần phải thiết kế hệ thống của mình để phòng tránh lỗi và xử lý lỗi một cách hiệu quả.</p><p>Cảm ơn ban đã đọc bài viết này, hy vọng nó sẽ giúp ích cho bạn trong việc phát triển của mình.</p><h1 id="ref" tabindex="-1">REF <a class="header-anchor" href="#ref" aria-label="Permalink to &quot;REF&quot;">​</a></h1><ul><li><a href="https://dereklawless.ie/fallacies-of-distributed-computing-1-the-network-is-reliable/" target="_blank" rel="noreferrer">https://dereklawless.ie/fallacies-of-distributed-computing-1-the-network-is-reliable/</a></li><li><a href="https://blogs.oracle.com/developers/post/fallacies-of-distributed-systems" target="_blank" rel="noreferrer">https://blogs.oracle.com/developers/post/fallacies-of-distributed-systems</a></li><li><a href="https://medium.com/geekculture/the-eight-fallacies-of-distributed-computing-44d766345ddb" target="_blank" rel="noreferrer">https://medium.com/geekculture/the-eight-fallacies-of-distributed-computing-44d766345ddb</a></li></ul>',107)];const e=n(c,[["render",function(n,h,a,c,e,g){return t(),i("div",null,l)}]]);export{a as __pageData,e as default};