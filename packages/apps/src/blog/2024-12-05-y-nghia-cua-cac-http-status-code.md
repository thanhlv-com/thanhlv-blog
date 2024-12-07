---
footer: true
title: Ý nghĩa của các HTTP Status Code
description: Về lựa chọn RESTful API hay gRPC chúng ta sẽ cần xem xét từng trường hợp cụ thể. Nó giống như là một chai nước tăng lực `monster` và một chai nước suối `lavie`. Mỗi chai nước sẽ phù hợp với một trường hợp cụ thể.
authors: [ lethanh ]
date: 2024-12-05
outline: deep
# image: /assets/gRPC-vs-REST.zQiSJpLn.jpg
draft: true
---


Ngày nay, mỗi một giây trôi qua, có hàng triệu request HTTP được gửi đi và nhận về trên mạng global hoặc mạng internal. 
HTTP là một phần không thể thiếu trong cuộc sống của chúng ta. Một trong những thành phần quan trọng nhất của HTTP là HTTP Status Code.

Một vấn đề thực tế ở Việt Nam là các lập trình thường chỉ biết đến các Status Code là `200`, `400`, `401`, `403` và `500`. Nhiều status khác như `201`, `204`, `206`, `301`... thì ít khi được sử dụng nên không được biết đến.

Nhiều khi các lập trình viên vẫn chưa phân biệt được giữa `401` và `403` hoặc khác biệt giữa các status code 2xx, 3xx, 4xx và 5xx nên khi trả về lỗi cho client khiến team Forntend hoặc bên thứ 3 không hiểu rõ vấn đề.

Một vấn đề nữa là hiện tại nhiều kiểu thiết kế `wrapper status Response` được sử dụng nên khi trả về lỗi hoặc thành công vẫn là 200 hoặc chỉ có 200 và 400.

::: details Ví dụ về `wrapper status Response`
``` shell
# Thành công (HTTP 200)
curl -X GET http://api.example.com/users/123 -H "Authorization: Bearer TOKEN"
# Response:
{
  "code": 0,
  "status": "success",
  "message": "User retrieved successfully.",
  "data": { "id": 123, "name": "John Doe" }
}

# Lỗi logic (HTTP 200)
curl -X GET http://api.example.com/users/999 -H "Authorization: Bearer TOKEN"
# Response:
{
  "code": 1001,
  "status": "error",
  "message": "User not found.",
  "data": null
}

# Request không hợp lệ (HTTP 400)
curl -X POST http://api.example.com/users -H "Authorization: Bearer TOKEN" \
     -H "Content-Type: application/json" -d '{"name":""}'
# Response:
{
  "code": 1002,
  "status": "error",
  "message": "Validation failed: 'name' field is required.",
  "data": null
}
```
::: 


Bài viết này mình sẽ chia sẻ với các bạn về ý nghĩa của các HTTP Status Code thông dụng và trường hợp sử dụng chúng.

## HTTP Status code là gì ?
Theo tài liệu rfc của HTTP thì [HTTP code](https://www.rfc-editor.org/rfc/rfc2616.html#page-39) là một số nguyên không âm gồm 3 chữ số, mỗi một số đại diện cho một ý nghĩa cụ thể.

HTTP Status Code được sử dụng để thông báo nhanh cho client về kết quả của request mà nó đã gửi đi. Client sẽ có cái nhìn tổng quan nhanh về kết quả của request chứ chưa cần kiểm tra kỹ content response, ví dụ thành công hay thất bại.

HTTP Status Code được chia thành 5 nhóm chính: `1xx`, `2xx`, `3xx`, `4xx` và `5xx`. 

Mỗi nhóm sẽ có ý nghĩa cụ thể, đôi khi chỉ mang ý nghĩa chung chung và các lập viên có cái nhìn tổng quan về kết quả của request.

Tuy nhiên, có nhiều status code khi browser nhận về, browser sẽ thực hiện hành vi khác nhau, ví dụ như `301`, `302` sẽ chuyển hướng.

Cùng bắt đầu với các nhóm status code nhé.

## HTTP Status Code 1xx: Informational
1xx là nhóm status code dùng để thông báo cho client rằng request của nó đã được nhận và đang xử lý. Client không cần phải làm gì cả.

### 100 Continue
HTTP này thông báo rằng client đã gửi request phần đầu tiên(Header) và server đã chấp nhận request và sẵn sàng body để xử lý dữ liệu, thường điều này xảy ra khi body rất lớn và client có thể gửi phần tiếp theo(Body).

Ví dụ:
Request từ client:
```
POST /upload HTTP/1.1
Host: example.com
Content-Type: application/json
Content-Length: 1024
Expect: 100-continue
```
Trong trường hợp này:

Client đang thông báo rằng yêu cầu của nó có một body với kích thước (1024 bytes) và mong đợi phản hồi 100 Continue từ Server trước khi gửi phần thân dữ liệu.

Server sẽ response :
```
HTTP/1.1 100 Continue
```
Sau đó, client gửi body của yêu cầu, ví dụ:
```
{
  "fileName": "example.txt",
  "fileContent": "Base64 encoded content here..."
}
```
Kết quả cuối cùng:
```
HTTP/1.1 201 Created
Content-Type: application/json

{
  "status": "success",
  "fileId": "12345"
}
```

```plantuml
@startuml

title HTTP 100 Continue - Step by Step

participant "Client" as C
participant "Server" as S

C -> S: POST /upload HTTP/1.1\nHost: example.com\nExpect: 100-continue\nContent-Length: 1024
note right of S: Client gửi yêu cầu POST kèm theo tiêu đề "Expect: 100-continue". Server nhận được yêu cầu và kiểm tra tính hợp lệ.

S --> C: HTTP/1.1 100 Continue
note left of C: Server trả lời với mã trạng thái 100 Continue, thông báo cho Client rằng nó có thể tiếp tục gửi dữ liệu.

C -> S: {"fileName": "example.txt",\n"fileContent": "Base64 encoded content..."}
note right of S: Client gửi dữ liệu hoàn chỉnh trong một yêu cầu POST. Dữ liệu này có thể bao gồm tên tập tin và nội dung được mã hóa Base64.

S --> C: HTTP/1.1 201 Created\n{"status": "success", "fileId": "12345"}
note left of C: Server trả lời với mã trạng thái 201 Created, cùng với JSON chứa trạng thái thành công và ID của tập tin đã được tạo.

@enduml


```
Thực tế, status code này hiện tại ít được sử dụng.

### 101 Switching Protocols

Hiện tại HTTP/2 và HTTP/3 đã rất phổ biến và được sử dụng. Tuy nhiên không phải server nào cũng hỗ trợ HTTP/2 hoặc HTTP/3.

Vì vậy mặc định client sẽ request đến server là HTTP/1.1, nếu server hỗ trợ HTTP/2 hoặc HTTP/3 thì server sẽ trả về status code 101 Switching Protocols để thông báo cho client chuyển sang giao thức mới.

Sau đó client sẽ gửi lại request theo giao thức mới.

Thực tế, status code này ít được sử dụng bởi các lập trình viên bình thường, thường các framework sẽ tự động xử lý.(Được handler bởi người viết framework, lib)


```plantuml
@startuml
title HTTP 101 Switching Protocols - WebSocket Upgrade

participant "Client" as C
participant "Server" as S

C -> S: GET /chat HTTP/1.1\nHost: example.com\nUpgrade: websocket\nConnection: Upgrade\nSec-WebSocket-Key: abc123...\nSec-WebSocket-Version: 13
note right of S: Client gửi yêu cầu GET để nâng cấp lên WebSocket. Server nhận được yêu cầu và kiểm tra các tiêu đề.

S --> C: HTTP/1.1 101 Switching Protocols\nUpgrade: websocket\nConnection: Upgrade\nSec-WebSocket-Accept: xyz456...
note left of C: Server trả lời với mã trạng thái 101 Switching Protocols, xác nhận việc chuyển giao giao thức và các tiêu đề "Upgrade" và "Connection".

C -> S: WebSocket message: "Hello, Server!"
note right of S: Client gửi tin nhắn WebSocket đến Server.

S --> C: WebSocket message: "Hello, Client!"
@enduml

```

Thực tế, status code này hiện tại ít được sử dụng.


#### Sử dụng tls để Switching Protocols khi ACK https
Có 1 cách nữa mà đa số được sử dụng là tại thời điểm bắt tay tls handshake, client sẽ gửi lên danh sách protocol mà nó hỗ trợ, server sẽ chọn ra protocol phù hợp và trả về cho client.

### 102 Processing
Status code này thông báo rằng server đang xử lý request nhưng chưa hoàn thành. Client có thể chờ đợi hoặc gửi request khác.

Thực tế, status code này hiện tại ít được sử dụng.

### 103 Early Hints
Status code này được sử dụng để thông báo cho client rằng client cần tài trước một số thông tin trước khi nhận response chính thức.

Ví dụ: Để hiển thị một HTMl thì client cần tải trước một số file css, js, image... để hiển thị đúng.

Thực tế, status code này hiện tại ít được sử dụng.

## HTTP Status Code 2xx: Success
HTTP Status Code 2xx là nhóm status code thông báo cho client rằng request của client đã được xử lý thành công.

### 200 OK
Status code này thông báo rằng request của client đã được xử lý thành công và thông tin được trả về trong response( Nếu có ).
```plantuml
@startuml
title HTTP 200 OK - Successful Request

participant "Client" as C
participant "Server" as S

C -> S: GET /resource HTTP/1.1\nHost: example.com
note right of S: Client gửi yêu cầu GET đến Server để truy cập tài nguyên. Server nhận và xử lý yêu cầu.

S --> C: HTTP/1.1 200 OK\nContent-Type: application/json\nContent-Length: 123 \n {"data": "example"}
note left of C: Client nhận được phản hồi từ Server với dữ liệu yêu cầu.
@enduml
```
### 201 Created
Status code này thông báo rằng request của client đã được xử lý thành công và một resource mới đã được tạo ra. Thường được sử dụng khi client gửi request POST để tạo mới một resource.

Response sẽ chứa thông tin về resource mới được tạo ra.

```plantuml
@startuml

title HTTP 201 Created - Resource Created

participant "Client" as C
participant "Server" as S

C -> S: POST /create HTTP/1.1\nHost: example.com\nContent-Type: application/json\n{"name": "New Resource"}
note right of S: Client gửi yêu cầu POST để tạo tài nguyên mới. Server nhận và xử lý yêu cầu tạo tài nguyên.

S --> C: HTTP/1.1 201 Created\nLocation: /resource/12345\nContent-Type: application/json\n{"status": "success", "id": 12345}
note left of C: Client nhận được phản hồi từ Server với thông tin chi tiết về tài nguyên đã được tạo.
@enduml
```

### 202 Accepted
Status code này thông báo rằng request của client đã được chấp nhận và sẽ được xử lý sau. Thường được sử dụng khi client gửi request để xử lý một công việc nào đó mà không cần phải trả về kết quả ngay lập tức.

Ví dụ: Gửi email, chạy job build, xử lý dữ liệu lớn...

Mục đích của status code này là để thông báo cho client rằng request của nó đã được chấp nhận và sẽ được xử lý sau bởi một worker khác.

Response sẽ không chứa thông tin về kết quả của request nhưng có thể sẽ chứa thông tin về job worker sẽ xử lý request.

Ví dụ bạn gửi request để xử lý một công việc nào đó, server sẽ trả về 202 Accepted và thông tin về id của task sẽ xử lý công việc đó.

```plantuml
@startuml

title HTTP 202 Accepted - Request Accepted for Processing

participant "Client" as C
participant "Server" as S

C -> S: POST /process HTTP/1.1\nHost: example.com\nContent-Type: application/json\n{"task": "Send email"}
note right of S: Client gửi yêu cầu POST để xử lý tác vụ. Server nhận và chấp nhận yêu cầu để xử lý sau.

S --> C: HTTP/1.1 202 Accepted\nContent-Type: application/json\n{"status": "accepted", "taskId": 98765}
note left of C: Client nhận được phản hồi từ Server, cho biết yêu cầu đã được chấp nhận và sẽ được xử lý trong tương lai.

C -> S: GET /status/98765 HTTP/1.1\nHost: example.com
note right of S: Client có thể kiểm tra trạng thái của tác vụ sau.

S --> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{"status": "in progress", "taskId": 98765}
note left of C: Client nhận được cập nhật trạng thái của tác vụ.
@enduml
```

### 203 Non-Authoritative Information
HTTP Status code này thông báo rằng request đã được xử lý thành công nhưng thông tin trả về không phải từ server gốc mà từ một server khác.

Các ứng dụng sử dụng các dịch vụ proxy hoặc cache có thể sử dụng mã 203 để chỉ ra rằng thông tin trả về không phải từ nguồn gốc mà từ một nguồn khác.

Thực tế, status code này hiện tại ít được sử dụng.
```plantuml
@startuml

title HTTP 203 Non-Authoritative Information

participant "Client" as C
participant "Proxy" as P
participant "Server" as S

C -> P: GET /data HTTP/1.1\nHost: example.com
note right of P: Client gửi yêu cầu GET tới Proxy để truy cập dữ liệu. Proxy kiểm tra xem nó có dữ liệu đã được lưu trữ hay không.

P -> S: GET /data HTTP/1.1\nHost: example.com
note right of S: Proxy chuyển tiếp yêu cầu đến Server để xử lý và gửi dữ liệu.

S --> P: HTTP/1.1 200 OK\nContent-Type: application/json\n{"data": "Original data"}
note left of P: Server xử lý yêu cầu và gửi phản hồi gốc.

P --> C: HTTP/1.1 203 Non-Authoritative Information\nContent-Type: application/json\n{"data": "Cached data"}
note left of C: Client nhận được phản hồi từ Proxy với dữ liệu được lưu trữ, kèm theo cảnh báo thông tin không chính xác.
@enduml
```


### 204 No Content
HTTP Status code này thông báo rằng request đã được xử lý thành công nhưng không có thông tin(Body) nào được trả về. 

Tuy nhiên, đầu ra của phản hồi vẫn có thể chứa các thông tin hữu ích trong phần header, ví dụ như thông tin về các tài nguyên tiếp theo có thể được yêu cầu hoặc hướng dẫn về hành động tiếp theo.

Ví dụ với method `put` hoặc `delete` client chỉ cần biết là đã thành công.

```plantuml
@startuml

title HTTP 204 No Content - Successful Request with No Content

participant "Client" as C
participant "Server" as S

C -> S: DELETE /resource HTTP/1.1\nHost: example.com
note right of S: 'Client gửi yêu cầu DELETE để xóa tài nguyên. Server nhận và xử lý yêu cầu.'

S --> C: HTTP/1.1 204 No Content
note left of C: 'Client nhận được phản hồi từ Server với không có nội dung, \n báo hiệu rằng tài nguyên đã được xóa thành công.'
@enduml
```

### 205 Reset Content
HTTP Status code này thông báo rằng client cần reset lại form mà nó đã gửi đi. Thường được sử dụng trong trường hợp client gửi form và server xử lý thành công và cần client reset lại form submit.

Thực tế, status code này hiện tại ít được sử dụng.
```plantuml
@startuml

title HTTP 205 Reset Content - Request Processed, Reset Document View

participant "Client" as C
participant "Server" as S

C -> S: POST /submit-form HTTP/1.1\nHost: example.com\nContent-Type: application/x-www-form-urlencoded\n{"formData": "user input"}
note right of S: Client gửi yêu cầu POST để gửi dữ liệu từ biểu mẫu. Server nhận và xử lý dữ liệu.

S --> C: HTTP/1.1 205 Reset Content
note left of C: Client nhận được phản hồi từ Server, yêu cầu reset lại biểu mẫu hoặc màn hình hiển thị.
@enduml

```

### 206 Partial Content
HTTP Status code này thông báo rằng server đã trả về một phần dữ liệu của resource mà client yêu cầu. Thường được sử dụng khi client yêu cầu một phần dữ liệu của file lớn.

HTTP code này được sử dụng rất nhiều trong quá khứ, hiện tại 2024 thì nó đã giảm bớt.

Trong quá khứ, khi client yêu cầu một file lớn, server sẽ trả về dữ liệu theo từng phần, client sẽ nhận từng phần và hiển thị dữ liệu.

Ví dụ: Khi xem video trên mạng, client sẽ yêu cầu từng phần dữ liệu của video và hiển thị chứ không cần tải toàn bộ video lên đến vài GB về.

```plantuml
@startuml

title HTTP 206 Partial Content - Partial Response

participant "Client" as C
participant "Server" as S

C -> S: GET /file HTTP/1.1\nHost: example.com\nRange: bytes=0-1023
note right of S: Client yêu cầu một phần của tệp (0 đến 1023 byte)

S --> C: HTTP/1.1 206 Nội dung từng phần\nContent-Range: bytes 0-1023/2048\nContent-Type: application/octet-stream
note left of C: Server gửi nội dung từng phần được yêu cầu (bytes 0-1023)

C -> S: GET /file HTTP/1.1\nHost: example.com\nRange: bytes=1024-2047
note right of S: Client yêu cầu dải tiếp theo của tệp (1024 đến 2047 byte)

S --> C: HTTP/1.1 206 Nội dung từng phần\nContent-Range: bytes 1024-2047/2048\nContent-Type: application/octet-stream
note left of C: Server gửi phần tiếp theo của nội dung (bytes 1024-2047)

@enduml

```
Thực tế bây giờ kỹ thuật HLS, Dash đã phổ biến nên status code này ít được sử dụng.

### 207 Multi-Status
HTTP Status code này thông báo rằng request của client đã được xử lý thành công nhưng response chứa nhiều thông tin về trạng thái của các tài nguyên khác nhau.

Status này được sử dụng khi request của người dùng yêu cầu xử lý nhiều tài nguyên cùng một lúc và mỗi tài nguyên có một trạng thái khác nhau.

Ví dụ: Client gửi request để xóa nhiều file, server sẽ trả về 207 Multi-Status và thông tin về trạng thái của từng file.

Thực tế, status code này hiện tại ít được sử dụng.

```plantuml
@startuml

title HTTP 207 Multi-Status - Multiple Status Codes in One Response (JSON)

participant "Client" as C
participant "Server" as S

C -> S: PROPFIND /collection HTTP/1.1\nHost: example.com
note right of S: Client yêu cầu các thuộc tính của nhiều tài nguyên trong một bộ sưu tập. 

S --> C: HTTP/1.1 207 Multi-Status\nContent-Type: application/json\n{\n  "multiStatus": [\n    {\n      "href": "/resource1",\n      "status": "200 OK"\n    },\n    {\n      "href": "/resource2",\n      "status": "404 Not Found"\n    }\n  ]\n}
note left of C: Server trả về phản hồi đa trạng thái, chứa mã trạng thái cho mỗi tài nguyên dưới định dạng JSON.
@enduml

```

## HTTP Status Code 3xx: Redirection
Hiểu đơn giản HTTP Status Code 3xx là nhóm status code thông báo cho client rằng client cần thực hiện một hành động khác để hoàn thành request.

### 300 Multiple Choices
HTTP Status code này thông báo rằng request của client có nhiều lựa chọn để chọn. Client cần chọn một trong số các lựa chọn được trả về.
Ví dụ: Client request một resource mà có nhiều phiên bản, client cần chọn một phiên bản để xem.

Thực tế, status code này hiện tại ít được sử dụng.

```plantuml
@startuml

title HTTP 300 Multiple Choices - Multiple Representations Available

participant "Client" as C
participant "Server" as S

C -> S: GET /resource HTTP/1.1\nHost: example.com
note right of S: Client yêu cầu tài nguyên có nhiều biểu diễn có thể có.

S --> C: HTTP/1.1 300 Multiple Choices\nContent-Type: application/json\n{\n  "choices": [\n    {"url": "/resource/en", "language": "English"},\n    {"url": "/resource/fr", "language": "French"},\n    {"url": "/resource/es", "language": "Spanish"}\n  ]\n}
note left of C: Server trả lời với danh sách các lựa chọn có sẵn cho tài nguyên dưới dạng JSON.

C -> S: GET /resource/en HTTP/1.1\nHost: example.com
note right of S: Client chọn một trong các lựa chọn có sẵn.

S --> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{"content": "English content"}
note left of C: Server trả lời với biểu diễn đã chọn trong tiếng Anh.
@enduml
```

### 301 Moved Permanently
HTTP Status code này thông báo rằng request của client đã được chuyển hướng vĩnh viễn đến một URL khác. Các công cụ tìm kiếm sẽ cập nhật URL cũ thành URL mới trong index của chúng.
Hiện tại HTTP Status code này vẫn được sử dụng rất nhiều, nó thường phục vụ cho việc một URL bị thay đổi hoặc một trang web bị chuyển địa chỉ.

Khi trình duyệt nhận được status code này, nó sẽ đọc header `Location` và chuyển hướng đến URL mới.

```plantuml
@startuml

title HTTP 301 Moved Permanently

participant "Client" as C
participant "Server" as S

C -> S: GET /old-url HTTP/1.1\nHost: example.com
note right of S: Client yêu cầu tài nguyên đã được di chuyển vĩnh viễn

S --> C: HTTP/1.1 301 Chuyển hướng vĩnh viễn\nLocation: /new-url
note left of C: Server trả lời với mã trạng thái 301 và URL mới

C -> S: GET /new-url HTTP/1.1\nHost: example.com
note right of S: Client làm theo chuyển hướng và yêu cầu URL mới

S --> C: HTTP/1.1 200 OK\nContent-Type: text/html\n<html>Nội dung trang mới</html>
note left of C: Server trả lời với nội dung của URL mới

@enduml

```

### 302 Found (Trước đây là Moved Temporarily)
HTTP Status code này thông báo rằng request của client đã được chuyển hướng tạm thời đến một URL khác, nhưng bạn dự định sẽ phục hồi URL ban đầu sau một thời gian. Các công cụ tìm kiếm sẽ không thay đổi URL trong index.
Thực tế  302 sẽ tương tự như 301, tuy nhiên 302 sẽ nói rằng đây chỉ là tạm thời chứ không phải vĩnh viễn.

```plantuml
@startuml

title HTTP 302 Found

participant "Client" as C
participant "Server" as S

C -> S: POST /old-url HTTP/1.1\nHost: example.com
note right of S: Client yêu cầu tài nguyên mà đã tạm thời di chuyển.

S --> C: HTTP/1.1 302 Found\nLocation: /temporary-url
note left of C: Server phản hồi với mã trạng thái 302 và URL tạm thời để chuyển hướng.

C -> S: GET /temporary-url HTTP/1.1\nHost: example.com
note right of S: Client làm theo chuyển hướng và yêu cầu URL tạm thời.

S --> C: HTTP/1.1 200 OK\nContent-Type: text/html\n<html>Temporary page content</html>
note left of C: Server phản hồi với nội dung của URL tạm thời.
@enduml
```

Thực tế HTTP Status này sẽ hỗ trợ tốt với SEO, 302 sẽ cho các công cụ tìm kiếm biết rằng đây là chuyển hướng tạm thời và không cần cập nhật lại index.

Nếu bạn muốn chuyển hướng vĩnh viễn thì nên sử dụng 301.

### 303 See Other
HTTP Status này thông báo cho client biết rằng tài nguyên mà client yêu cầu đã được tạo và nằm ở một URL khác. Client cần gửi một request mới đến URL mới để lấy thông tin.
Ví dụ sau khi submit một form thành công, chuyển hướng người dùng đến web page `cảm ơn`.

```plantuml
@startuml

title HTTP 303 See Other

participant "Client" as C
participant "Server" as S

C -> S: POST /submit-form HTTP/1.1\nHost: example.com\nContent-Type: application/x-www-form-urlencoded\nData: form_data
note right of S: Client gửi một yêu cầu `POST` để gửi dữ liệu từ biểu mẫu.

S --> C: HTTP/1.1 303 See Other\nLocation: /confirmation
note left of C: Server phản hồi với mã trạng thái 303, chỉ ra rằng Client nên thực hiện một yêu cầu `GET` tới URL mới.

C -> S: GET /confirmation HTTP/1.1\nHost: example.com
note right of S: Client làm theo chuyển hướng và gửi yêu cầu `GET` tới URL mới.

S --> C: HTTP/1.1 200 OK\nContent-Type: text/html\n<html>Confirmation page content</html>
note left of C: Server phản hồi với nội dung của trang xác nhận.
@enduml
```

Thực tế, status code này hiện tại ít được sử dụng.

### 304 Not Modified

HTTP Status code này thông báo rằng tài nguyên mà client yêu cầu không thay đổi từ lần cuối cùng client yêu cầu. Server sẽ trả về status code này và không trả về dữ liệu của tài nguyên. Client sẽ sử dụng cache để hiển thị dữ liệu.

Status code này thường được sử dụng khi client yêu cầu một tài nguyên mà đã được cache và không thay đổi từ lần cuối cùng client yêu cầu.

Thường sẽ kèm theo một số header để biểu thị hash hoặc thời gian thay đổi lần cuối của tài nguyên.

```plantuml
@startuml

title HTTP 200 OK and 304 Not Modified with Cache

participant "Client" as C
participant "Server" as S

C -> S: GET /resource HTTP/1.1\nHost: example.com
note right of S: Client yêu cầu tài nguyên lần đầu tiên

S --> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{"data": "Resource content"}
note left of C: Server phản hồi với nội dung của tài nguyên
note right of C: Client lưu tài nguyên vào bộ nhớ đệm

C -> S: GET /resource HTTP/1.1\nHost: example.com\nIf-Modified-Since: <last-modified-date>
note right of S: Client gửi yêu cầu với tiêu đề `If-Modified-Since` để kiểm tra xem tài nguyên đã thay đổi hay chưa

S --> C: HTTP/1.1 304 Not Modified
note left of C: Server phản hồi với mã trạng thái 304, chỉ ra rằng không có sự thay đổi
note right of C: Client lấy tài nguyên từ bộ nhớ đệm của mình

@enduml

```

### 305 Use Proxy
HTTP Status code này thông báo rằng client cần sử dụng proxy để truy cập tài nguyên. Thường được sử dụng trong trường hợp client không thể truy cập trực tiếp tài nguyên mà cần thông qua proxy.

HTTP code này cần được trả về từ chính Origin Server, không được trả về từ Proxy. Và khi trả về sẽ kèm theo url của proxy thông qua header `Location`.

```plantuml
@startuml

title HTTP 305 Sử dụng Proxy

participant "Client" as C
participant "Server" as S
participant "Proxy" as P

C -> S: GET /resource HTTP/1.1\nHost: example.com
note right of S: Client yêu cầu tài nguyên, và server chỉ định sử dụng proxy

S --> C: HTTP/1.1 305 Sử dụng Proxy\nLocation: http://proxy.example.com
note left of C: Server phản hồi với mã trạng thái 305 và URL của proxy

C -> P: GET /resource HTTP/1.1\nHost: proxy.example.com
note right of P: Client gửi yêu cầu đến Server proxy đã chỉ định

P --> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{"data": "Nội dung tài nguyên"}
note left of C: Proxy phản hồi với nội dung của tài nguyên

@enduml
```

Thực tế, status code này hiện tại ít được sử dụng.

### 306 Switch Proxy
Thực tế status code này không được sử dụng nữa, nó chỉ tồn tại trong HTTP/1.1 draft.

### 307 Temporary Redirect
Tuong tự như 302, status code này thông báo rằng request của client đã được chuyển hướng tạm thời đến một URL khác. 
Client cần gửi một request mới đến URL mới để lấy thông tin.

Tuy nhiên, khác với 302, client sẽ không thay đổi phương thức request, nghĩa là nếu client gửi request POST thì sẽ vẫn gửi POST.

Nguyên nhân dẫn đến vấn đề này là ở phiên bản HTTP/1, HTTP STATUS 302 cũng mô tả giữ nguyên method, nhưng nhiều trinh trình duyệt chuyển hướng request POST thành GET.

Vì vậy ở phiên bản HTTP/1.1, 307 được tạo ra để giữ nguyên method của request và phân biên rõ ràng với 302.

```plantuml
@startuml

title HTTP 307 Temporary Redirect

participant "Client" as C
participant "Server" as S

C -> S: POST /old-url HTTP/1.1\nHost: example.com
note right of S: Client yêu cầu tài nguyên mà đã tạm thời chuyển hướng

S --> C: HTTP/1.1 307 Temporary Redirect\nLocation: /new-url
note left of C: Server phản hồi với mã trạng thái 307 và URL tạm thời

C -> S: POST /new-url HTTP/1.1\nHost: example.com
note right of S: Client làm theo chuyển hướng và gửi lại cùng phương thức HTTP (POST) đến URL mới

S --> C: HTTP/1.1 200 OK\nContent-Type: text/html\n<html>New page content</html>
note left of C: Server phản hồi với nội dung của URL mới
@enduml
```

### 308 Permanent Redirect
Tương tự vấn đề của 302 và 307, 308 được tạo ra để giữ nguyên method của request và phân biên rõ ràng với 301.

HTTP Status code này thông báo rằng request của client đã được chuyển hướng vĩnh viễn đến một URL khác giống với 301 nhưng giữ nguyên method của request khi chuyển hướng.



```plantuml
@startuml

title HTTP 308 Permanent Redirect

participant "Client" as C
participant "Server" as S

C -> S: POST /old-url HTTP/1.1\nHost: example.com
note right of S: Client yêu cầu tài nguyên mà đã được chuyển hướng vĩnh viễn

S --> C: HTTP/1.1 308 Permanent Redirect\nLocation: /new-url
note left of C: Server phản hồi với mã trạng thái 308 và URL vĩnh viễn

C -> S: POST /new-url HTTP/1.1\nHost: example.com
note right of S: Client làm theo chuyển hướng và gửi lại cùng phương thức HTTP (POST) tới URL mới

S --> C: HTTP/1.1 200 OK\nContent-Type: text/html\n<html>New page content</html>
note left of C: Server phản hồi với nội dung của URL mới
@enduml
```

## HTTP Status Code 4xx: Client Error
Status code 4xx là nhóm status code thông báo cho client rằng request của client không hợp lệ hoặc không thể xử lý.
Nguyên nhân có thể là do client gửi request không hợp lệ(Thiếu dữ liệu...etc...), không có quyền truy cập tài nguyên hoặc tài nguyên không tồn tại.

### 400 Bad Request
HTTP Status code này thông báo rằng request của client không hợp lệ. Thường được sử dụng khi client gửi request không đúng cú pháp, thiếu dữ liệu.
Ví dụ: Client gửi request POST nhưng không có body nhưng server yêu cầu body.
```plantuml
@startuml

title HTTP 400 Bad Request - Missing Required Parameter

participant "Client" as C
participant "Server" as S

C -> S: GET /resource HTTP/1.1\nHost: example.com
note right of S: Client gửi yêu cầu mà không có tham số truy vấn bắt buộc "userId"

note left of S: Server yêu cầu tham số "userId" để xử lý yêu cầu

S --> C: HTTP/1.1 400 Bad Request\nContent-Type: text/html\n<html>Missing required parameter: userId</html>
note left of C: Server phản hồi với mã trạng thái 400, chỉ ra rằng thiếu tham số "userId"

C -> S: GET /resource?userId=123 HTTP/1.1\nHost: example.com
note right of S: Client gửi lại yêu cầu với tham số bắt buộc "userId"

S --> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{"data": "Resource content"}
note left of C: Server phản hồi với tài nguyên đã yêu cầu sau khi tham số đúng được cung cấp
@enduml
```

### 401 Unauthorized
HTTP Status code này thông báo rằng client cần xác thực để truy cập tài nguyên. Thường được sử dụng khi client gửi request mà không có thông tin xác thực hoặc thông tin xác thực không hợp lệ.

Ví dụ khi client gửi request mà không gửi token ở trong header, hoặc token không hợp lệ.

```plantuml
@startuml

title HTTP 401 Unauthorized - No Authorization Header & Invalid Token

participant "Client" as C
participant "Server" as S

== Case 1: Missing Authorization Header ==
C -> S: GET /protected-resource HTTP/1.1\nHost: example.com
note right of S: Client gửi yêu cầu mà không có tiêu đề Authorization.

note left of S: Server yêu cầu tiêu đề Authorization để xác thực yêu cầu.

S --> C: HTTP/1.1 401 Unauthorized\nContent-Type: text/html\n<html>Missing Authorization header</html>
note left of C: Server phản hồi với mã trạng thái 401, chỉ ra rằng tiêu đề Authorization là bắt buộc.

== Case 2: Invalid Authorization Header ==
C -> S: GET /protected-resource HTTP/1.1\nHost: example.com\nAuthorization: Bearer invalid_token
note right of S: Client gửi yêu cầu với một token không hợp lệ.

note left of S: Server kiểm tra token và xác định là không hợp lệ.

S --> C: HTTP/1.1 401 Unauthorized\nContent-Type: text/html\n<html>Invalid token</html>
note left of C: Server phản hồi với mã trạng thái 401, chỉ ra rằng thông tin xác thực không hợp lệ.

== Successful Request ==
C -> S: GET /protected-resource HTTP/1.1\nHost: example.com\nAuthorization: Bearer valid_token
note right of S: Client gửi yêu cầu với một token hợp lệ.

note left of S: Server xác thực token và cấp quyền truy cập.

S --> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{"data": "Protected resource content"}
note left of C: Server phản hồi với tài nguyên đã yêu cầu, vì Client đã được xác thực.
@enduml
```

Như mô tả ở trên, khi API yêu cầu xác thực, client cần gửi thông tin xác thực lên cho server, nếu không gửi hoặc gửi thông tin không hợp lệ thì server sẽ trả về `401 Unauthorized`.

### 402 Payment Required
Code này không được sử dụng, nó được tạo ra để sử dụng trong tương lai và chưa được chuẩn hóa.

### 403 Forbidden
HTTP Status code này thông báo rằng client không có quyền truy cập tài nguyên. Thường được sử dụng khi client gửi request mà không có quyền truy cập tài nguyên.

Ví dụ một tài khoản đã pass 401 nhưng khi kiểm tra quyền để truy cập tài nguyên thì không có, khi đó HTTP Status code 403 sẽ được trả về.

```plantuml
@startuml

title HTTP 403 Forbidden - Authorization Passed but Insufficient Permissions

participant "Client" as C
participant "Server" as S

== Case 1: Failed Authentication (401 Unauthorized) ==
C -> S: GET /admin-resource HTTP/1.1\nHost: example.com
note right of S: Client gửi yêu cầu mà không có tiêu đề Authorization hoặc với thông tin xác thực không hợp lệ.

note left of S: Server yêu cầu phải xác thực để kiểm tra yêu cầu.

S --> C: HTTP/1.1 401 Unauthorized\nContent-Type: text/html\n<html>Unauthorized</html>
note left of C: Server phản hồi với 401, chỉ ra rằng yêu cầu xác thực là cần thiết.

== Case 2: Authentication Passed but Lacks Permissions (403 Forbidden) ==
C -> S: GET /admin-resource HTTP/1.1\nHost: example.com\nAuthorization: Bearer valid_token
note right of S: Client gửi một token hợp lệ nhưng không có quyền truy cập yêu cầu cho tài nguyên đã yêu cầu.

note left of S: Server kiểm tra token nhưng từ chối quyền truy cập do thiếu quyền.

S --> C: HTTP/1.1 403 Forbidden\nContent-Type: text/html\n<html>Access forbidden</html>
note left of C: Server phản hồi với 403, chỉ ra rằng Client đã được xác thực nhưng không có quyền truy cập vào tài nguyên.

== Successful Request (Admin Access) ==
C -> S: GET /admin-resource HTTP/1.1\nHost: example.com\nAuthorization: Bearer admin_token
note right of S: Client gửi lại yêu cầu với thông tin xác thực cho phép quyền admin.

note left of S: Server kiểm tra token và xác nhận rằng Client có đủ quyền.

S --> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{"data": "Admin resource content"}
note left of C: Server phản hồi với tài nguyên admin đã yêu cầu, vì Client có quyền truy cập cần thiết.

@enduml
```

### 404 Not Found
HTTP Status code này thông báo rằng server không tìm thấy tài nguyên mà client yêu cầu. Thường được sử dụng khi client yêu cầu một tài nguyên không tồn tại.

```plantuml
@startuml

title HTTP 404 Not Found and Successful 200 OK Response

participant "Client" as C
participant "Server" as S

== Case 1: Nonexistent Resource ==
C -> S: GET /nonexistent-resource HTTP/1.1\nHost: example.com
note right of S: Client yêu cầu một tài nguyên mà không tồn tại trên Server.

note left of S: Server kiểm tra các route và cơ sở dữ liệu tài nguyên của nó nhưng không tìm thấy bất kỳ sự khớp nào.

S --> C: HTTP/1.1 404 Not Found\nContent-Type: text/html\n<html>Resource not found</html>
note left of C: Server phản hồi với mã 404, cho biết tài nguyên yêu cầu không tồn tại.

== Case 2: Typo in URL ==
C -> S: GET /ressource HTTP/1.1\nHost: example.com
note right of S: Client gửi yêu cầu đến một endpoint bị đánh vần sai.

note left of S: Server không thể khớp yêu cầu với một route hợp lệ do lỗi chính tả.

S --> C: HTTP/1.1 404 Not Found\nContent-Type: text/html\n<html>Invalid endpoint</html>
note left of C: Client nhận được phản hồi 404 do URL không đúng.

== Case 3: Resource Previously Deleted ==
C -> S: GET /deleted-resource HTTP/1.1\nHost: example.com
note right of S: Client yêu cầu một tài nguyên đã bị xóa

note left of S: Server xác nhận rằng tài nguyên từng tồn tại nhưng hiện không còn sẵn.

S --> C: HTTP/1.1 404 Not Found\nContent-Type: text/html\n<html>Resource deleted</html>
note left of C: Server phản hồi với 404, cho biết tài nguyên không còn sẵn.

== Case 4: Resource Found ==
C -> S: GET /existing-resource HTTP/1.1\nHost: example.com
note right of S: Client yêu cầu tài nguyên tồn tại trên Server.

note left of S: Server tìm thấy tài nguyên yêu cầu và chuẩn bị để giao nó.

S --> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{"data": "Resource content"}
note left of C: Server phản hồi với 200, giao tài nguyên yêu cầu thành công.

@enduml
```

Lưu ý: Có thể là không tồn tại, hoặc đã bị xóa cứng hoặc đã bị xóa mềm. 

### 405 Method Not Allowed
HTTP Status code này thông báo rằng phương thức request của client không được phép trên tài nguyên. Thường được sử dụng khi client gửi request với phương thức không được hỗ trợ.

Ví dụ server chỉ hỗ trợ method GET cho endpoint `/resource` nhưng client gửi request với method POST thì server sẽ trả về 405 Method Not Allowed.

```plantuml
@startuml

title HTTP 405 Method Not Allowed and Method Allowed Response

participant "Client" as C
participant "Server" as S

== Example: Method Not Allowed ==
C -> S: POST /resource HTTP/1.1\nHost: example.com
note right of S: Client gửi yêu cầu POST đến một endpoint mà chỉ hỗ trợ GET.

note left of S: Server kiểm tra các phương thức được phép cho endpoint và phát hiện rằng POST không được hỗ trợ.

S --> C: HTTP/1.1 405 Method Not Allowed\nContent-Type: text/html\n<html>Method Not Allowed</html>
note left of C: Server phản hồi với mã 405, thông báo rằng phương thức POST không được phép trên tài nguyên.

== Example: Method Allowed ==
C -> S: GET /resource HTTP/1.1\nHost: example.com
note right of S: Client gửi yêu cầu GET đến một endpoint hỗ trợ GET.

note left of S: Server kiểm tra các phương thức được phép cho endpoint và phát hiện rằng GET được hỗ trợ.

S --> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{"data": "Resource content"}
note left of C: Server phản hồi với 200, giao tài nguyên yêu cầu thành công.

@enduml
```

### 406 Not Acceptable
HTTP Status code này thông báo rằng server không thể trả về dữ liệu theo định dạng mà client yêu cầu. Thường được sử dụng khi client yêu cầu dữ liệu ở một định dạng mà server không hỗ trợ.

Khi gửi request, client cần gửi thông tin về định dạng mà nó muốn nhận dữ liệu thông qua header `Accept` và có thể thêm `Accept-Encoding` và `Accept-Language`.

Đây là định nghĩa data type mà client muốn nhận dữ liệu từ server.

Nếu server không hỗ trợ định dạng mà client yêu cầu thì server sẽ trả về 406 Not Acceptable.

```plantuml
@startuml

title HTTP 406 Not Acceptable

participant "Client" as C
participant "Server" as S

== Example: Unsupported Data Format ==
C -> S: GET /resource HTTP/1.1\nHost: example.com\nAccept: application/xml
note right of S: Client yêu cầu tài nguyên dưới định dạng XML.

note left of S: Server kiểm tra các định dạng hỗ trợ của nó và nhận thấy không hỗ trợ XML.

S --> C: HTTP/1.1 406 Not Acceptable\nContent-Type: text/html\n<html>Unsupported data format</html>
note left of C: Server phản hồi với mã 406, thông báo không thể trả dữ liệu trong định dạng yêu cầu.

== Example: Supported Data Format ==
C -> S: GET /resource HTTP/1.1\nHost: example.com\nAccept: application/json
note right of S: Client yêu cầu tài nguyên dưới định dạng JSON.

note left of S: Server kiểm tra các định dạng hỗ trợ của nó và xác nhận rằng JSON được hỗ trợ.

S --> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{"data": "Resource content"}
note left of C: Server phản hồi với 200, giao tài nguyên yêu cầu dưới định dạng được hỗ trợ.

@enduml
```

### 407 Proxy Authentication Required
Khi client sử dụng một proxy trung gian để truy câp tài nguyên đến server, và proxy yêu cầu client cần xác thực để truy cập tài nguyên.

Client cần gửi kèm thông tin xác thực của proxy. Nếu client không gửi thông tin xác thực hoặc thông tin xác thực không hợp lệ thì server sẽ trả về 407 Proxy Authentication Required.

```plantuml
@startuml

title HTTP 407 Proxy Authentication Required

participant "Client" as C
participant "Proxy Server" as PS
participant "Server" as S

== Example: Proxy Authentication Required (Client does not send credentials) ==
C -> PS: GET /resource HTTP/1.1\nHost: example.com
note right of PS: Client yêu cầu tài nguyên thông qua proxy mà không gửi thông tin xác thực.

note left of PS: Server proxy nhận được yêu cầu và nhận thấy không có thông tin xác thực được cung cấp.

PS --> C: HTTP/1.1 407 Proxy Authentication Required\nContent-Type: text/html\n<html>Authentication Required</html>
note left of C: Server proxy phản hồi với mã 407, yêu cầu Client cung cấp thông tin xác thực hợp lệ.

== Example: Proxy Authentication Required (Invalid credentials) ==
C -> PS: GET /resource HTTP/1.1\nHost: example.com\nProxy-Authorization: Basic InvalidCredentials
note right of PS: Client yêu cầu tài nguyên thông qua proxy, nhưng cung cấp thông tin xác thực không hợp lệ.

note left of PS: Server proxy nhận được yêu cầu và kiểm tra các thông tin xác thực. Chúng được phát hiện là không hợp lệ.

PS --> C: HTTP/1.1 407 Proxy Authentication Required\nContent-Type: text/html\n<html>Invalid credentials</html>
note left of C: Server proxy phản hồi với mã 407 lần nữa, thông báo rằng các thông tin xác thực được cung cấp không hợp lệ.

== Example: Proxy Authentication Successful ==
C -> PS: GET /resource HTTP/1.1\nHost: example.com\nProxy-Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
note right of PS: Client gửi yêu cầu thông qua proxy, cung cấp thông tin xác thực hợp lệ.

note left of PS: Server proxy chuyển yêu cầu đến Server chính với các thông tin xác thực hợp lệ.

PS -> S: GET /resource HTTP/1.1\nHost: example.com
note right of PS: Server nhận được yêu cầu với thông tin xác thực proxy hợp lệ.

note left of S: Server kiểm tra và xác minh các thông tin xác thực.

S --> PS: HTTP/1.1 200 OK\nContent-Type: application/json\n{"data": "Resource content"}
note left of PS: Server phản hồi với 200 OK, cho phép truy cập vào tài nguyên yêu cầu.

PS -> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{"data": "Resource content"}
note left of C: Server proxy chuyển tiếp phản hồi thành công lại cho Client.

@enduml
```

### 408 Request Timeout

HTTP Status code này thông báo rằng server đã hết thời gian xử lý request của client. Thường được sử dụng khi server không thể xử lý request của client trong khoảng thời gian quy định.

Ví dụ server sẽ xử lý request của client trong 30s, nếu server không xử lý xong trong 30s thì sẽ trả về 408 Request Timeout.

```plantuml
@startuml

title HTTP 408 Request Timeout and Successful Response

participant "Client" as C
participant "Server" as S

== Example: Request Timeout ==
C -> S: GET /resource HTTP/1.1\nHost: example.com
note right of S: Client gửi yêu cầu tài nguyên.

note left of S: Server bắt đầu xử lý yêu cầu nhưng không hoàn thành trong thời gian cho phép.

S --> C: HTTP/1.1 408 Request Timeout\nContent-Type: text/html\n<html>Request Timeout</html>
note left of C: Server phản hồi với mã 408, cho biết yêu cầu mất quá nhiều thời gian để xử lý.

== Example: Successful Request ==
C -> S: GET /resource HTTP/1.1\nHost: example.com
note right of S: Client gửi yêu cầu tài nguyên.

note left of S: Server xử lý yêu cầu trong thời gian cho phép.

S --> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{"data": "Resource content"}
note left of C: Server phản hồi với 200, giao tài nguyên yêu cầu thành công.

@enduml
```

### 409 Conflict
Như cái tên cũng đã mô tả, HTTP Status code này thông báo rằng request của client làm xung đột với trạng thái hiện tại của tài nguyên. 

Thường được sử dụng khi client gửi request mà xung đột với trạng thái hiện tại của tài nguyên.

Ví dụ: Khi client lấy về thông tin của tài nguyên và thông tin tài nguyên có trạng thái `pending`, sau đó client gửi request để cập nhật thông tin tài nguyên thành `reject` nhưng thông tin tài nguyên đã được cập nhật bởi một client khác và trạng thái của tài nguyên đã là `approved`.

Khi đó server sẽ trả về 409 Conflict.

Điều này để bảo vệ dữ liệu của tài nguyên khỏi việc bị ghi đè do nhầm lẫn.

```plantuml
@startuml

title HTTP 409 Conflict Example

participant "Khách hàng 1" as C1
participant "Khách hàng 2" as C2
participant "Máy chủ" as S

== Lần đầu lấy về trạng thái pending ==
C1 -> S: GET /resource HTTP/1.1\nHost: example.com
note right of S: Khách hàng 1 gửi yêu cầu để lấy thông tin tài nguyên.

note left of S: Máy chủ trả về tài nguyên với trạng thái là pending.

S --> C1: HTTP/1.1 200 OK\nContent-Type: application/json\n{"status": "pending", "data": {...}}
note left of C1: Khách hàng 1 nhận được tài nguyên với trạng thái "pending".

== Khách hàng 2 cập nhật trạng thái thành approved ==
C2 -> S: PUT /resource HTTP/1.1\nHost: example.com
note right of S: Khách hàng 2 gửi yêu cầu để cập nhật trạng thái tài nguyên thành "approved".

note left of S: Máy chủ nhận thấy trạng thái "pending" đã thay đổi thành "approved".

S --> C2: HTTP/1.1 200 OK\nContent-Type: application/json\n{"status": "approved", "message": "Resource updated successfully"}
note left of C2: Khách hàng 2 nhận thông báo cập nhật thành công.

== Khách hàng 1 cố gắng cập nhật lại thành reject ==
C1 -> S: PUT /resource HTTP/1.1\nHost: example.com
note right of S: Khách hàng 1 gửi yêu cầu để thay đổi trạng thái tài nguyên thành "reject".

note left of S: Máy chủ nhận ra rằng trạng thái hiện tại của tài nguyên đã bị thay đổi bởi khách hàng khác và không cho phép thay đổi.

S --> C1: HTTP/1.1 409 Conflict\nContent-Type: text/html\n<html>Conflict: The resource has already been updated by another client.</html>
note left of C1: Máy chủ phản hồi với mã 409, thông báo rằng tài nguyên đã bị thay đổi bởi khách hàng khác.

@enduml
```
