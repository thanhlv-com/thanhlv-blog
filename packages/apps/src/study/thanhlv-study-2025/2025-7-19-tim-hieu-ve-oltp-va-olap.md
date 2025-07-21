---
footer: true
title: Tìm hiểu về OLTP và OLAP trong hệ thống cơ sở dữ liệu
authors: [ lethanh ]
description:  OLTP (Online Transaction Processing) và OLAP (Online Analytical Processing) là hai loại hệ thống quản lý cơ sở dữ liệu với mục đích và cách sử dụng khác nhau.
date: 2025-07-19
outline: deep
image: https://static-cdn.thanhlv.com/study/thanhlv-study-2025/2025-06-16-gioi-thieu-ve-kubernetes/kubernetes2.png
draft: false
group: 3. Database & Database Advanced 2024
---

# 1. OLTP vs OLAP
OLTP (Online Transaction Processing) và OLAP (Online Analytical Processing) là hai loại hệ thống quản lý cơ sở dữ liệu với mục đích và cách sử dụng khác nhau.

Mỗi một loại hệ thống này đều có những đặc điểm riêng biệt, phù hợp với các nhu cầu khác nhau trong việc xử lý dữ liệu. Vì vậy, việc hiểu rõ sự khác biệt giữa OLTP và OLAP là rất quan trọng trong việc thiết kế và triển khai hệ thống cơ sở dữ liệu.

## 1.1 OLTP (Online Transaction Processing)

### 1.1.1 Định nghĩa về OLTP

Online transaction processing (OLTP) là một loại hệ thống quản lý cơ sở dữ liệu(Database) được thiết kế để quản lý thực hiện một lượng lớn các giao dịch.

Các giao dịch này thường là các giao dịch nhỏ, nhanh chóng và thường xuyên, như thêm, sửa, xóa hoặc truy vấn dữ liệu. 

OLTP được sử dụng trong các ứng dụng yêu cầu tính toàn vẹn dữ liệu cao và khả năng xử lý giao dịch nhanh chóng.

Đây là hệ quản trị cơ sở dữ liệu mà hầu hết các ứng dụng của chúng ta tương tác ngày nay.

Các hệ thống ngân hàng, máy ATM, giao dịch tín dụng, thương mại điện tử...

OLTP được tối ưu hóa cho các giao dịch nhanh chóng và hiệu quả, thường là các thao tác CRUD (Create, Read, Update, Delete) trên dữ liệu và đảm bảo tính toàn vẹn của dữ liệu.

Mục tiêu chính của OLTP là : tốc độ, độ chính xác và tính toàn vẹn của dữ liệu.


### 1.1.2 Phân tích từ `Giao dịch(Transaction)`

Một trong những hiểu nhầm phổ biến về OLTP là từ `giao dịch (transaction)`. Mọi người thường nghĩ rằng giao dịch là một thao tác ghi dữ liệu đơn lẻ bằng câu lệnh `INSERT`, `UPDATE`, hoặc `DELETE`.

Tuy nhiên, trong ngữ cảnh của OTLP, một giao dịch là một tập hơn các công việc logic`(logical unit of work)`, nó có thể bảo gồm một chuỗi nhiều thao tác riêng lẻ nhưng nó phải được thực hiện như một đơn vị duy nhất.

**Một ví dụ kinh điển về giao dịch là việc chuyển tiền từ tài khoản A sang tài khoản B.**

Logical unit of work của giao dịch này bao gồm hai thao tác:
- Trừ tiền từ tài khoản A
- Cộng tiền tương ứng vào tài khoản B

Hệ thống OLTP, đảm bảo rằng cả hai thao tác này phải thành công hoặc không có gì thay đổi trong cơ sở dữ liệu. Nếu một trong hai thao tác thất bại, toàn bộ giao dịch sẽ bị hủy bỏ (rollback) để đảm bảo tính toàn vẹn của dữ liệu.

Không thể có trường hợp tiền đã bị trừ khỏi tài khoản A nhưng chưa được cộng vào tài khoản B. Trạng thái **dở dang** này sẽ làm hỏng tính toàn vẹn của dữ liệu và gây tổn thất tài chính. Chính vì vậy, bản chất của OLTP là quản lý các đơn vị công việc logic này một cách an toàn và đáng tin cậy.

```plantuml
@startuml Transaction in OLTP System

!define FONTAWESOME https://raw.githubusercontent.com/tupadr3/plantuml-icon-font-sprites/master/font-awesome-5
!include FONTAWESOME/users.puml
!include FONTAWESOME/database.puml
!include FONTAWESOME/money_bill_wave.puml
!include FONTAWESOME/exchange_alt.puml
!include FONTAWESOME/check_circle.puml
!include FONTAWESOME/times_circle.puml

skinparam sequenceArrowThickness 2
skinparam roundcorner 20
skinparam participantpadding 20
skinparam backgroundColor white
skinparam handwritten false
skinparam monochrome false
skinparam shadowing false

autonumber "<b>[00]"


actor "User" as user
participant "Banking Application" as app
participant "Transaction Manager" as tm
database "Database" as db

note over tm: OLTP Transaction = Logical Unit of Work
note right of user: Chuyển 100$ từ tài khoản A sang B

user -> app: Yêu cầu chuyển tiền
app -> tm: Bắt đầu giao dịch (BEGIN TRANSACTION)

group Successful Transaction Scenario
    tm -> db: Kiểm tra số dư tài khoản A
    db --> tm: Trả về số dư (đủ để chuyển)
    tm -> db: UPDATE - Trừ 100$ từ tài khoản A
    db --> tm: Xác nhận trừ tiền thành công
    tm -> db: UPDATE - Cộng 100$ vào tài khoản B
    db --> tm: Xác nhận cộng tiền thành công
    tm -> db: COMMIT TRANSACTION
    db --> tm: Xác nhận commit thành công
    tm --> app: Giao dịch hoàn tất
    app --> user: Thông báo chuyển tiền thành công
end

note over tm, db #lightgreen: Cả hai thao tác phải thành công\nhoặc không có gì thay đổi

group Failed Transaction Scenario
    tm -> db: Kiểm tra số dư tài khoản A
    db --> tm: Trả về số dư (đủ để chuyển)
    tm -> db: UPDATE - Trừ 100$ từ tài khoản A
    db --> tm: Xác nhận trừ tiền thành công
    tm -> db: UPDATE - Cộng 100$ vào tài khoản B
    db --> tm: Lỗi khi cộng tiền (ví dụ: tài khoản B đã bị khóa)
    tm -> db: ROLLBACK TRANSACTION
    db --> tm: Xác nhận rollback thành công (mọi thay đổi đều bị hủy)
    tm --> app: Giao dịch thất bại
    app --> user: Thông báo lỗi chuyển tiền
end

note over tm, db #pink: Nếu một thao tác thất bại,\ntoàn bộ giao dịch được rollback

@enduml

```

### 1.1.3 Đặc điểm của OLTP
- **Tập trung vào giao dịch**: OLTP được tối ưu cho việc truy vấn ,ghi, cập nhật, xóa các mẩu dữ liệu nhỏ một cách nhanh chóng. Một thao tác này thường được gọi là một giao dịch (transaction).
- **Tốc độ cực nhanh**: OLTP được thiết kế để xử lý hàng triệu giao dịch mỗi ngày. Mỗi một giao dịch chỉ mất vài mili giây(ms) để hoàn thành.
  - Khi mua hàng, hàng tồn kho sẽ được cập nhật ngay lập tức để người khác không đặt món hàng đã hết.
- **Nhiều người dùng cùng lúc**: Hệ thống OLTP được tối ưu để xử lý các giao dịch nhỏ từ hàng triệu người dùng cùng một lúc. Đảm bảo rằng hệ thống có thể xử lý hàng triệu giao dịch mỗi ngày mà không gặp phải tình trạng nghẽn cổ chai.
- **Tính toàn vẹn dữ liệu**: OLTP đảm bảo tính toàn vẹn của dữ liệu thông qua các giao dịch ACID (Atomicity, Consistency, Isolation, Durability). Điều này có nghĩa là mỗi giao dịch phải hoàn thành thành công hoặc không có gì thay đổi trong cơ sở dữ liệu.
- **Cơ sở dữ liệu quan hệ**: OLTP thường sử dụng cơ sở dữ liệu quan hệ (RDBMS) như MySQL, PostgreSQL, Oracle, SQL Server... để lưu trữ dữ liệu. Các bảng trong cơ sở dữ liệu được liên kết với nhau thông qua các khóa ngoại (foreign key).
- **Dữ liệu luôn mới và chính xác**: Dữ liệu trong hệ thống OLTP phản ánh trạng thái mới nhất của hoạt động kinh doanh. 
  - Ví dụ, số dư tài khoản ngân hàng của bạn luôn được cập nhật chính xác sau mỗi lần giao dịch.

### 1.1.4 Cam Kết Toàn Vẹn Dữ Liệu: Phân Tích Chuyên Sâu về Các Thuộc Tính ACID

Tất cả các hệ thống OLTP đều cam kết tính toàn vẹn dữ liệu thông qua các thuộc tính ACID (Atomicity, Consistency, Isolation, Durability).

Bốn thuộc tính ACID là tiêu chuẩn vàng trong việc đảm bảo rằng các giao dịch trong hệ thống OLTP được thực hiện một cách an toàn và đáng tin cậy.

Bốn thuộc tính ACID trong cơ sở dữ liệu được định nghĩa như sau:

#### 1.1.4.1 Atomicity (Tính nguyên tử)

Tính chất này đả bảo một là giao dịch được thực hiện như một đơn vị duy nhất và không thể chia nhỏ, nó phải được hoàn thành toàn bộ hoặc không có gì xảy ra.

Nếu bất kỳ một phần nhỏ nào trong giao dịch bị thất bại, toàn bộ giao dịch sẽ bị hủy bỏ (rollback) và không có thay đổi nào được ghi vào cơ sở dữ liệu.

##### 1.1.4.2 Mục đích:
Mục đích chính của tính Atomicity (Tính nguyên tử) là ngăn chặn dữ liệu rơi vào tình trạng không nhất quán hoặc không đầy đủ.

Tính nguyên tử đảm bảo rằng các hoạt động có liên quan đến nhau được xử lý như là một hoạt động duy nhất. Loại bỏ nguy cơ chỉ một phần của giao dịch được ghi lại.
 
##### 1.1.4.3 Cơ chế hoạt động

DBMS thường sử dụng một cơ chế gọi là `Transaction Log` và `Cơ chế Rollback` để hỗ trợ thực hiện tính nguyên tử.

###### 1.1.4.3.1  Ghi nhật ký giao dịch (Transaction Log / Write-Ahead Logging - WAL) 📝
Đây là một phương pháp phổ biến. Trước khi thực hiện bất kỳ thay đổi nào với dữ liệu, DBMS sẽ ghi lại các thay đổi này vào một nhật ký giao dịch (transaction log).

Truy trình như sau:

1. Bắt đầu giao dịch(`Begin Transaction`) : Một bản ghi được đánh dấu sự bắt đầu của giao dịch được ghi vào transaction log.
2. Ghi lại thay đổi: 
- Đối với mỗi thao tác sửa đổi dữ liệu (INSERT, UPDATE, DELETE), một bản ghi trong transaction log được tạo ra. Bản ghi này chứa thông tin cần thiết để hoàn tác (undo) hoặc làm lại (redo) thao tác đó.
  - **Undo log**: Ghi lại dữ liệu cũ trước khi thay đổi. Để có thể hoàn tác nếu cần.
  - **Redo log**: Ghi lại dữ liệu mới sau khi thay đổi. Để có thể thực hiện lại nếu cần thiết.
3. Commit giao dịch(`Commit Transaction`): Nếu tất cả các thao tác trong giao dịch hoàn thành thành công. Một bản ghi commit được ghi vào transaction log. Điều này cho phép DBMS biết rằng tất cả các thay đổi trong giao dịch đã hoàn thành và có thể được áp dụng vào cơ sở dữ liệu. Tại thời điểm này, thay đổi được coi là vĩnh viễn và được ghi vào database chính.
4. Rollback giao dịch(`Rollback Transaction`): Nếu có lỗi xảy ra trong quá trình thực hiện giao dịch, một bản ghi rollback được ghi vào transaction log. DBMS sẽ sử dụng thông tin trong undo log để hoàn tác tất cả các thay đổi đã thực hiện trong giao dịch, đưa cơ sở dữ liệu trở về trạng thái trước khi giao dịch bắt đầu.

###### 1.1.3.4.2 Cơ chế Rollback (Hoàn tác) ⏪
Cơ chế Rollback sử dụng thông tin trong nhật ký giao dịch để đảm bảo tính Atomicity khi có sự cố.

**Khi xảy ra lỗi**: ví dụ như giao dịch lỗi, mất điện, lỗi phần mềm... hệ thống sẽ đọc nhật ký giao dịch để xác định các thay đổi đã thực hiện và hoàn tác chúng.

**Sử dụng thông tin Undo**: Hệ thống sẽ tìm tất cả các thay đổi thuộc về giao dịch bị lỗi và sử dụng thông tin `undo` đã được ghi lại để khôi phục về trạng thái ban đầu ngay trước khi transaction bắt đầu. Quy trình này được gọi là "rollback".

Nhờ có cơ chế rollback, hệ thống có thể đảm bảo rằng không có thay đổi nào được ghi vào cơ sở dữ liệu nếu giao dịch không hoàn thành thành công.


##### Flow ví dụ về Atomicity

Flow ví dụ về giao dịch chuyển tiền từ tài khoản A sang tài khoản B trong hệ thống OLTP, thể hiện tính nguyên tử của giao dịch:

###### Flow về giao dịch thành công
```plantuml
@startuml Atomicity in Database Management Systems

!define FONTAWESOME https://raw.githubusercontent.com/tupadr3/plantuml-icon-font-sprites/master/font-awesome-5
!include FONTAWESOME/users.puml
!include FONTAWESOME/database.puml
!include FONTAWESOME/file_alt.puml
!include FONTAWESOME/check_circle.puml
!include FONTAWESOME/times_circle.puml
!include FONTAWESOME/undo_alt.puml
!include FONTAWESOME/redo_alt.puml

skinparam sequenceArrowThickness 2
skinparam roundcorner 15
skinparam participantpadding 30
skinparam backgroundColor white
skinparam handwritten false
skinparam monochrome false
skinparam shadowing false

autonumber "<b>[00]"

actor "Client Application" as client
participant "Transaction Manager" as tm
participant "Database Engine" as dbengine
database "Transaction Log" as log
database "Database" as db

note over log: Write-Ahead Logging (WAL)

title <b>Atomicity in DBMS - Transaction Processing with Write-Ahead Logging

== Successful Transaction Scenario ==

client -> tm: BEGIN TRANSACTION (Chuyển tiền A → B)
tm -> log: Ghi bản ghi BEGIN TRANSACTION
log --> tm: Xác nhận ghi log

group Thao tác 1: Trừ tiền từ tài khoản A
    tm -> dbengine: UPDATE account_A SET balance = balance - 100
    dbengine -> log: Ghi UNDO log (dữ liệu cũ của A)
    log --> dbengine: Xác nhận ghi UNDO log
    dbengine -> log: Ghi REDO log (dữ liệu mới của A)
    log --> dbengine: Xác nhận ghi REDO log
    dbengine -> db: Cập nhật dữ liệu trong bộ nhớ đệm
    db --> dbengine: Xác nhận cập nhật
    dbengine --> tm: Thao tác 1 hoàn thành
end

group Thao tác 2: Cộng tiền vào tài khoản B
    tm -> dbengine: UPDATE account_B SET balance = balance + 100
    dbengine -> log: Ghi UNDO log (dữ liệu cũ của B)
    log --> dbengine: Xác nhận ghi UNDO log
    dbengine -> log: Ghi REDO log (dữ liệu mới của B)
    log --> dbengine: Xác nhận ghi REDO log
    dbengine -> db: Cập nhật dữ liệu trong bộ nhớ đệm
    db --> dbengine: Xác nhận cập nhật
    dbengine --> tm: Thao tác 2 hoàn thành
end

tm -> log: Ghi bản ghi COMMIT TRANSACTION
log --> tm: Xác nhận ghi log commit
tm -> dbengine: Yêu cầu đẩy dữ liệu từ bộ đệm vào DB
dbengine -> db: Lưu các thay đổi vào DB (durable)
db --> dbengine: Xác nhận lưu dữ liệu
dbengine --> tm: Commit hoàn tất
tm --> client: Giao dịch thành công << FA5_CHECK_CIRCLE >>

note over tm, db #lightgreen: Giao dịch hoàn thành đầy đủ\nTất cả thay đổi được lưu vào DB


@enduml

```

###### Flow về giao dịch thất bại và được rollback

```plantuml
@startuml Atomicity in Database Management Systems

!define FONTAWESOME https://raw.githubusercontent.com/tupadr3/plantuml-icon-font-sprites/master/font-awesome-5
!include FONTAWESOME/users.puml
!include FONTAWESOME/database.puml
!include FONTAWESOME/file_alt.puml
!include FONTAWESOME/check_circle.puml
!include FONTAWESOME/times_circle.puml
!include FONTAWESOME/undo_alt.puml
!include FONTAWESOME/redo_alt.puml

skinparam sequenceArrowThickness 2
skinparam roundcorner 15
skinparam participantpadding 30
skinparam backgroundColor white
skinparam handwritten false
skinparam monochrome false
skinparam shadowing false

autonumber "<b>[00]"

actor "Client Application" as client
participant "Transaction Manager" as tm
participant "Database Engine" as dbengine
database "Transaction Log" as log
database "Database" as db

note over log: Write-Ahead Logging (WAL)

title <b>Atomicity in DBMS - Transaction Processing with Write-Ahead Logging

== Failed Transaction Scenario ==

client -> tm: BEGIN TRANSACTION (Chuyển tiền A → B)
tm -> log: Ghi bản ghi BEGIN TRANSACTION
log --> tm: Xác nhận ghi log

group Thao tác 1: Trừ tiền từ tài khoản A
    tm -> dbengine: UPDATE account_A SET balance = balance - 100
    dbengine -> log: Ghi UNDO log (dữ liệu cũ của A)
    log --> dbengine: Xác nhận ghi UNDO log
    dbengine -> log: Ghi REDO log (dữ liệu mới của A)
    log --> dbengine: Xác nhận ghi REDO log
    dbengine -> db: Cập nhật dữ liệu trong bộ nhớ đệm
    db --> dbengine: Xác nhận cập nhật
    dbengine --> tm: Thao tác 1 hoàn thành
end

group Thao tác 2: Cộng tiền vào tài khoản B (Lỗi)
    tm -> dbengine: UPDATE account_B SET balance = balance + 100
    dbengine -> log: Ghi UNDO log (dữ liệu cũ của B)
    log --> dbengine: Xác nhận ghi UNDO log
    dbengine -> log: Ghi REDO log (dữ liệu mới của B)
    log --> dbengine: Xác nhận ghi REDO log
    dbengine -> db: Cập nhật dữ liệu trong bộ nhớ đệm
    db --> dbengine: Lỗi (tài khoản B đã bị khóa) << FA5_TIMES_CIRCLE >>
    dbengine --> tm: Báo lỗi thao tác 2
end

tm -> log: Ghi bản ghi ROLLBACK TRANSACTION
log --> tm: Xác nhận ghi log rollback

group Cơ chế Rollback << FA5_UNDO_ALT >>
    tm -> dbengine: Yêu cầu hoàn tác giao dịch
    dbengine -> log: Đọc UNDO logs của giao dịch
    log --> dbengine: Trả về UNDO logs
    dbengine -> db: Khôi phục trạng thái tài khoản A
    db --> dbengine: Xác nhận khôi phục
    dbengine --> tm: Rollback hoàn tất
end

tm --> client: Giao dịch thất bại << FA5_TIMES_CIRCLE >>

note over tm, db #pink: Giao dịch bị hủy bỏ (rollback)\nKhông có thay đổi nào được lưu vào DB

@enduml
```
#### 1.1.5.1 Consistency (Tính nhất quán)

Tính nhất quán đảm bảo rằng cơ sở dữ liệu luôn ở trạng thái hợp lệ trước và sau khi giao dịch.

Dữ liệu sẽ từ một trạng thái hợp lệ (valid state) sang một trạng thái hợp lệ khác sau khi giao dịch hoàn thành.

Nói đơn giản, dữ liệu phải đúng đắn theo quy tắc đã định trước, và không có dữ liệu nào bị mất hoặc bị hỏng trong quá trình giao dịch.

##### 1.1.5.2 Mục đích:

Mục đích chính của tính Consistency (Tính nhất quán) là bảo vệ tính toàn vẹn của dữ liệu trong cơ sở dữ liệu. Nó hoạt động như một người bảo vệ, ngăn chặn mọi giao dịch tạo ra các dữ liệu vi phạm quy tắc.

Khi vi phạm quy tắc, hệ thống sẽ từ chối giao dịch và không cho phép thay đổi nào được thực hiện.


##### 1.1.5.3 Cơ chế hoạt động

###### 1.1.5.3.1 Ràng buộc dữ liệu (Data Constraints)

Đây là cơ chế phòng tuyến đầu tiên và là cơ bản nhất để đảm bảo tính nhất quán. Các ràng buộc là các quy tắc được định nghĩa trực tiếp trên column của bảng trong cơ sở dữ liệu.

Khi một câu lệnh `INSERT`, `UPDATE`, hoặc `DELETE` được thực hiện, hệ thống sẽ kiểm tra các ràng buộc này để đảm bảo rằng dữ liệu mới hoặc dữ liệu đã sửa đổi vẫn tuân thủ các quy tắc đã định.

Nếu có vi phạm, giao dịch sẽ bị từ chối và không có thay đổi nào được thực hiện.

**Cơ chế hoạt động của các ràng buộc phổ biến:**
- **Primary Key**: Đảm bảo rằng mỗi bản ghi trong bảng là duy nhất và không có giá trị NULL. Trước khi thêm một dữ liệu mới, DBMS sẽ kiểm tra xem giá trị khóa chính đã tồn tại hay chưa. Nếu đã có, thao tác sẽ bị từ chối.
- **Ràng buộc khóa ngoại (Foreign Key)**: Đảm bảo rằng giá trị trong một cột phải tồn tại trong một bảng khác. Khi thêm hoặc sửa đổi dữ liệu, DBMS sẽ kiểm tra xem giá trị có hợp lệ hay không.
  - Một ví dụ đơn giản
    - Giả sử bạn có hai bảng: `Customers` và `Orders`. Bảng `Orders` có một cột `CustomerID` là khóa ngoại tham chiếu đến cột `CustomerID` trong bảng `Customers`.
    - Khi bạn thêm một đơn hàng mới, hệ thống sẽ kiểm tra xem `CustomerID` của đơn hàng đó có tồn tại trong bảng `Customers` hay không. Nếu không, giao dịch sẽ bị từ chối.
- **Ràng buộc Duy Nhất (UNIQUE)**: Đảm bảo các dữ liệu trong cùng một cột là duy nhất. Khi thêm hoặc sửa đổi dữ liệu, DBMS sẽ kiểm tra xem giá trị mới có trùng lặp với các giá trị hiện có hay không.
  -  Cơ chế này tương tự khóa chính nhưng cho phép một giá trị NULL.
- **Ràng buộc Kiểu Dữ Liệu (Data Type Constraints)**: Đảm bảo rằng dữ liệu được nhập vào cột phải phù hợp với kiểu dữ liệu đã định nghĩa. Ví dụ, nếu cột được định nghĩa là kiểu số nguyên, hệ thống sẽ từ chối bất kỳ giá trị nào không phải là số nguyên.
- **Ràng buộc NOT NULL**: Đơn giản là không cho phép một cột có giá trị NULL.
- **Ràng buộc Kiểm Tra (CHECK Constraints)**: Đây là các quy tắc tùy chỉnh mà người dùng có thể định nghĩa để kiểm tra tính hợp lệ của dữ liệu. Ví dụ, bạn có thể định nghĩa một ràng buộc rằng giá trị trong cột `Age` phải lớn hơn 0.
- **Ràng buộc Trình Tự (Sequence Constraints)**: Đảm bảo rằng các giá trị trong một cột tuân theo một trình tự nhất định, chẳng hạn như ngày tháng phải tăng dần.
- ....

###### 1.1.5.3.2 Triggers

Các ràng buộc dữ liệu là một phần quan trọng trong việc đảm bảo tính nhất quán, nhưng đôi khi chúng không đủ để xử lý các tình huống phức tạp. Đây là lúc triggers trở nên hữu ích.

Triggers là các đoạn mã được kích hoạt tự động khi có một sự kiện xảy ra trong cơ sở dữ liệu, chẳng hạn như khi một bản ghi được chèn, cập nhật hoặc xóa.

**Cơ chế hoạt động:**
- 1. **Sự kiện kích hoạt:** Một người dùng hoặc ứng dụng thực hiện một câu lệnh DML (ví dụ: `UPDATE SanPham SET SoLuongTon = SoLuongTon - 5 WHERE ID = 101`).
- 2. Kích hoạt Trigger: Nếu có một trigger được định nghĩa cho sự kiện UPDATE trên bảng `SanPham`, DBMS sẽ tạm dừng và thực thi đoạn mã trong trigger.
- 3. **Thực thi logic nghiệp vụ**: Đoạn mã trong trigger có thể thực hiện các kiểm tra phức tạp mà ràng buộc không làm được. 
  - Ví dụ, trigger có thể kiểm tra xem `SoLuongTon` sau khi cập nhật có nhỏ hơn 0 không. Hoặc nó có thể tự động tạo một bản ghi trong bảng `LichSuGiaoDich`.
- 4. **Quyết định:** Dựa trên kết quả logic, trigger có thể cho phép giao dịch tiếp tục hoặc chủ động tạo ra một lỗi để hủy bỏ toàn bộ giao dịch.

Ví dụ, một `trigger BEFORE UPDATE` trên bảng `KhoHang` có thể kiểm tra xem số lượng sản phẩm được yêu cầu xuất kho có vượt quá số lượng tồn kho hiện tại hay không. Nếu vượt quá, trigger sẽ báo lỗi và ngăn chặn hành động cập nhật, qua đó duy trì tính nhất quán của dữ liệu tồn kho.

###### 1.1.5.3.3 Quản Lý Giao Dịch (Transaction Management)

Bản thân khái niệm giao dịch đã là một cơ chế quan trọng để đảm bảo tính nhất quán.

Mỗi một giao dịch là một chuỗi các thao tác được coi là một đơn vị duy nhất. Tính nhất quán đảm bảo rằng nếu một giao dịch bắt đầu từ một trạng thái nhất quán thì khi kết thúc nó phải là một trạng thái nhất quán khác.

**Cơ chế hoạt động:**
- **Bắt đầu giao dịch (Begin Transaction)**: Khi một giao dịch bắt đầu ví dụ: `BEGIN TRANSACTION` DBMS tạo ra một không gian làm việc tạm thời cho giao dịch đó.
- **Thực hiện các thao tác**: Các câu lệnh DML(Data Manipulation Language ) (`INSERT, UPDATE, DELETE`) được thực hiện trong không gian làm việc này.
    - Các thay đổi trong không gian làm việc này không được ghi vào cơ sở dữ liệu chính(`Đĩa`) cho đến khi giao dịch được cam kết.
- **Kiểm tra và Cam kết giao dịch (Commit Transaction)**: Khi có lệnh `COMMIT`, DBMS sẽ thực hiện một loạt các kiểm tra bao gồm các ràng buộc và quy tắc liên quan.
  - Nếu mọi thứ đều hợp lệ, tất cả các thay đổi trong giao dịch sẽ được lưu vĩnh viễn. Cơ sở dữ liệu sẽ chuyển sang một trạng thái nhất quán mới.
- **Rollback giao dịch**: Nếu có bất kỳ lỗi nào xảy ra trong quá trình thực hiện giao dịch, ví dụ, vi phạm ràng buộc, lỗi logic trong trigger, hoặc lệnh ROLLBACK được gọi tường minh)
  - DBMS sẽ hủy bỏ tất cả các thay đổi đã được thực hiện trong giao dịch đó. Cơ sở dữ liệu được trả về trạng thái hợp lệ ngay trước khi giao dịch bắt đầu, như thể giao dịch chưa bao giờ xảy ra.
