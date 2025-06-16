---
footer: true
title: Secondary Indexing 
description: Secondary Indexing là một tính năng trong Apache Cassandra cho phép bạn tạo các chỉ mục phụ trên các cột không phải là khóa chính, giúp tăng tốc độ truy vấn dữ liệu. Bài viết này sẽ giải thích chi tiết về Secondary Indexing, cách sử dụng và những ưu điểm cũng như nhược điểm của nó.
authors: [ "lethanh" ]
date: 2025-05-27
outline: deep
image: https://static-cdn.thanhlv.com/study/thanhlv-study-2025/2025-03-26-what-is-apache-cassandra/cassandra-la-gi-1.webp
draft: false
group: 1. Cassandra
---

[[TOC]]

## 1. Secondary Index là gì ?

Secondary Index sẽ cho phép chúng ta truy vấn dữ liệu không phải là một thành phần trong khóa chính (primary
key)

Tuy nhiên do kiến chúc phân tán của db Casandra nên các truy vấn secondary index không được tối ưu khi truy vấn
trên tệp dữ liệu lớn, truy vấn thường xuyên .

Hiểu đơn giản Secondary là INDEX trong mysql. Tuy nhiên vì cơ chế phân tán của Cassandra, nên nếu chỉ dùng Index
mà không dùng Partition Key, Clustering Key thì ảnh hưởng hiệu suất rất nhiều.

**Nên sử dụng khi:**

- Truy vấn không xảy ra quá thường xuyên hoặc không tạo ra tải ghi/đọc quá nặng.
- Cardinality cao: Dữ liệu trong Secondary Index đa dạng dữ liệu, chứa ít dữ liệu lặp lại.
  - Ví dụ: Cột email sẽ là một cardinality cao vì nó sẽ có rất nhiều data khác nhau. Còn age hoặc sex thì chỉ có
    trong khoảng từ 1 đến 200 cho age hoặc sex thì có nam và nữa và giới tính thứ 3.

**Cần cân nhắc:**

Với khối lượng dữ liệu lớn hoặc cột có giá trị ít đa dạng, việc sử dụng secondary index có thể gây ra tình trạng
hiệu năng giảm sút. Trong những trường hợp này, việc thiết kế lại mô hình dữ liệu theo hướng denormalization hay
sử dụng materialized views sẽ hiệu quả hơn.

### 1.1 Ví dụ về Secondary Index trong Cassandra:

Cho ví dụ với table như sau

```sql
CREATE TABLE users
(
  user_id UUID PRIMARY KEY,
  name    TEXT,
  email   TEXT,
  age     INT
);
```

Trong ví dụ này, **user_id** là khóa chính của bảng. Nếu bạn muốn tìm kiếm người dùng theo **email** mà không
phải qua **user_id**, bạn có thể tạo một Secondary Index trên cột **email**:

```sql
CREATE INDEX email_index ON users (email);
```

Sau khi tạo Secondary Index, bạn có thể thực hiện các truy vấn như sau:

```sql
SELECT *
FROM users
WHERE email = 'user@example.com';
```

Cassandra sẽ sử dụng Secondary Index để nhanh chóng tìm kiếm người dùng có email đó, thay vì phải quét toàn bộ
bảng.

Vì thực tế địa chỉ email rất ít khi lặp lại, nên việc sử dụng Secondary Index trên cột email sẽ mang lại hiệu
suất tốt.

#### Lưu ý:

Secondary Index có thể làm giảm hiệu suất khi dữ liệu lớn hoặc khi có nhiều ghi/chỉnh sửa trên các cột có chỉ
mục. Vì vậy, bạn cần đánh giá kỹ lưỡng khi sử dụng Secondary Index trong các ứng dụng có yêu cầu về hiệu suất
cao.

### 1.2 Cách Secondary Index hoạt động, tìm kiếm dữ liệu và lý do làm giảm hiệu suất

#### 1.2.1. Cách Secondary Index hoạt động trong Cassandra

Khi bạn tạo một Secondary Index trên một cột, Cassandra sẽ tạo một bảng ẩn chứa ánh xạ từ giá trị của cột đó →
Partition Key gốc của bảng chính. Theo cơ chế index.

Ví dụ với bảng `user`

```sql
CREATE TABLE users
(
  user_id int PRIMARY KEY,
  name    TEXT,
  email   TEXT,
  age     INT
);
```
Thực tế ID trong Cassandra thường là UUID, vì là demo nên tôi đã int

Nếu tạo một Secondary Index trên cột email:

```sql
CREATE INDEX email_index ON users (email);
```

Cassandra sẽ tạo một bảng ẩn chứa index ẩn có dạng:

| email                 | user_id(Partition key) |
|-----------------------|------------------------|
| example1@thanhlv.com  | 1                      |
| example2@thanhlv.com | 2                      |
| example3@thanhlv.com | 3                      |

Khi truy vấn: `SELECT * FROM users WHERE email = 'example1@thanhlv.com';`
1. Cassandra tìm giá trị `example1@thanhlv.com` trong bảng index.
2. Tìm thấy `example1@thanhlv.com` có partition key user_id = 1.
3. Truy vấn vào bảng `users` bằng `user_id = 1` để lấy dữ liệu đầy đủ.

#### 1.2.2 Vì sao Secondary Index trong Cassandra làm giảm hiệu suất?
Trong cassandra khi sử dụng Secondary Index  sẽ gây ra vấn đề scatter-gather" (phân tán-thu thập dữ liệu).

Secondary Index trong Cassandra được triển khai local của Node. Điều này là nghĩa là mỗi node chỉ lưu trữ Index cho dữ liệu mà nó lưu trữ. Khi bạn tạo một Secondary Index, Cassandra sẽ tạo một bảng ẩn (hidden table) trên mỗi node. Bảng này ánh xạ giá trị của cột được đánh chỉ mục tới Primary Key của (các) hàng chứa giá trị đó trên chính node đó.

##### Những lý do chính khiến hiệu suất giảm bao gồm:
1. **Query phân tán(Scatter-Gather)):** 
   - Khi thực hiện một query sử dụng Secondary Index mà không chỉ định partition key, query đó phải được gửi đến tất cả các Node trong cluster để tìm kiếm trong Index local trong các Node.
   - Sau đó, node điều phối(coordinator node) sẽ thực hiện thu thập kết quả ở tất cả các node và trả về cho client. Quá trình này làm tăng đáng kế độ trễ.
   - Nếu giá trị tìm kiếm bằng `Secondary Index` bị trùng lặp nhiều, việc này sẽ làm tăng số lượng dữ liệu cần quét và trả về trên mỗi node sau khi đã tìm kiếm xong trong Index local, dẫn đến hiệu suất giảm.
```plantuml
@startuml
!define ICONURL https://raw.githubusercontent.com/tupadr3/plantuml-icon-font-sprites/master/font-awesome-5
!includeurl ICONURL/database.puml
!includeurl ICONURL/server.puml
!includeurl ICONURL/desktop.puml
!includeurl ICONURL/search.puml

skinparam backgroundColor #FEFEFE
skinparam handwritten false
skinparam defaultTextAlignment center
skinparam sequenceArrowThickness 2
skinparam roundcorner 10
skinparam sequence {
    ArrowColor #2C3E50
    LifeLineBorderColor #3498DB
    LifeLineBackgroundColor #A9DCDF
    ParticipantBorderColor #2980B9
    ParticipantBackgroundColor #3498DB
    ParticipantFontColor #FFFFFF
    ActorBorderColor #2980B9
    ActorBackgroundColor #3498DB
    ActorFontColor #FFFFFF
}

actor "<$desktop>\nClient" as Client
participant "<$server>\nCoordinator Node" as Coordinator
participant "<$database>\nNode 1\n(Local Index)" as Node1
participant "<$database>\nNode 2\n(Local Index)" as Node2
participant "<$database>\nNode 3\n(Local Index)" as Node3

note over Client, Node3 #LightYellow
  <b>Query phân tán (Scatter-Gather) trong Cassandra Secondary Index</b>
  Khi sử dụng Secondary Index mà không chỉ định partition key
end note

Client -> Coordinator: <b>1.</b> Gửi query với Secondary Index\n<i>SELECT * FROM users WHERE email = 'user@example.com'</i>

activate Coordinator
note right of Coordinator #PaleGreen
  <b>2.</b> Không có partition key trong query
  nên phải gửi đến tất cả các node
end note

Coordinator ->> Node1: <b>3a.</b> Tìm kiếm trong Local Index
Coordinator ->> Node2: <b>3b.</b> Tìm kiếm trong Local Index
Coordinator ->> Node3: <b>3c.</b> Tìm kiếm trong Local Index

activate Node1
activate Node2
activate Node3

note right of Node1 #LightBlue
  <b>4a.</b> Tìm trong bảng Index ẩn
  email -> primary key mapping
end note

note right of Node2 #LightBlue
  <b>4b.</b> Tìm trong bảng Index ẩn
  email -> primary key mapping
end note

note right of Node3 #LightBlue
  <b>4c.</b> Tìm trong bảng Index ẩn
  email -> primary key mapping
end note

Node1 -> Node1: <b>5a.</b> Nếu tìm thấy, truy vấn\nbảng chính bằng primary key
Node2 -> Node2: <b>5b.</b> Nếu tìm thấy, truy vấn\nbảng chính bằng primary key
Node3 -> Node3: <b>5c.</b> Nếu tìm thấy, truy vấn\nbảng chính bằng primary key

Node1 -->> Coordinator: <b>6a.</b> Trả về kết quả (nếu có)
Node2 -->> Coordinator: <b>6b.</b> Trả về kết quả (nếu có)
Node3 -->> Coordinator: <b>6c.</b> Trả về kết quả (nếu có)

deactivate Node1
deactivate Node2
deactivate Node3

Coordinator -> Coordinator: <b>7.</b> Tổng hợp kết quả từ tất cả các node

Coordinator --> Client: <b>8.</b> Trả về kết quả tổng hợp

deactivate Coordinator

note over Client, Node3 #FFAAAA
  <b>Vấn đề hiệu suất:</b>
  - Phải gửi query đến <b>tất cả các node</b> trong cluster
  - Mỗi node phải thực hiện <b>2 bước đọc</b>: tìm trong index rồi đọc bảng chính
  - Coordinator phải <b>chờ phản hồi</b> từ tất cả các node
  - <b>Tăng độ trễ</b> khi số lượng node tăng lên
end note
@enduml

```
2. **Tăng Tải Ghi (Write Amplification)**
   - Mỗi khi ghi(Insert) ,Cập nhật(Update )hoặc xóa(Delete) dữ liệu trong bảng chính, Cassandra cũng phải cập nhật bảng Index tương ứng. Điều này làm tăng tải ghi trên hệ thống, đặc biệt là khi có nhiều ghi/chỉnh sửa trên các cột có Index.
   - Điều này làm tăng gấp đôi (hoặc hơn) số lượng thao tác ghi cho mỗi lần thay đổi dữ liệu.
```plantuml
@startuml
!define ICONURL https://raw.githubusercontent.com/tupadr3/plantuml-icon-font-sprites/master/font-awesome-5
!includeurl ICONURL/database.puml
!includeurl ICONURL/server.puml
!includeurl ICONURL/desktop.puml
!includeurl ICONURL/save.puml
!includeurl ICONURL/pen.puml

skinparam backgroundColor #FEFEFE
skinparam handwritten false
skinparam defaultTextAlignment center
skinparam sequenceArrowThickness 2
skinparam roundcorner 10
skinparam sequence {
    ArrowColor #2C3E50
    LifeLineBorderColor #3498DB
    LifeLineBackgroundColor #A9DCDF
    ParticipantBorderColor #2980B9
    ParticipantBackgroundColor #3498DB
    ParticipantFontColor #FFFFFF
    ActorBorderColor #2980B9
    ActorBackgroundColor #3498DB
    ActorFontColor #FFFFFF
}

actor "<$desktop>\nClient" as Client
participant "<$server>\nCoordinator Node" as Coordinator
participant "<$database>\nNode\n(Primary Table)" as PrimaryTable
participant "<$database>\nNode\n(Secondary Index)" as SecondaryIndex
participant "<$save>\nCommit Log" as CommitLog
participant "<$pen>\nMemtable" as Memtable
participant "<$database>\nSSTable" as SSTable

note over Client, SSTable #LightYellow
  <b>Tăng Tải Ghi (Write Amplification) trong Cassandra Secondary Index</b>
  Minh họa quá trình ghi dữ liệu khi có Secondary Index
end note

Client -> Coordinator: <b>1.</b> Gửi yêu cầu ghi/cập nhật dữ liệu\n<i>INSERT INTO users (user_id, email, name) VALUES ('123', 'user@example.com', 'John')</i>

activate Coordinator
Coordinator -> PrimaryTable: <b>2.</b> Chuyển tiếp yêu cầu ghi đến node chứa partition

activate PrimaryTable

PrimaryTable -> CommitLog: <b>3a.</b> Ghi vào Commit Log\n(Đảm bảo tính bền vững)
activate CommitLog
CommitLog --> PrimaryTable: Xác nhận
deactivate CommitLog

PrimaryTable -> Memtable: <b>3b.</b> Ghi vào Memtable\n(Bảng chính)
activate Memtable
Memtable --> PrimaryTable: Xác nhận
deactivate Memtable

note right of PrimaryTable #PaleGreen
  <b>4.</b> Phát hiện cột có Secondary Index (email)
  Cần cập nhật bảng Index ẩn
end note

PrimaryTable -> SecondaryIndex: <b>5.</b> Cập nhật Secondary Index\n(email -> user_id mapping)
activate SecondaryIndex

SecondaryIndex -> CommitLog: <b>6a.</b> Ghi thêm vào Commit Log\n(Cho Secondary Index)
activate CommitLog
CommitLog --> SecondaryIndex: Xác nhận
deactivate CommitLog

SecondaryIndex -> Memtable: <b>6b.</b> Ghi vào Memtable\n(Cho bảng Index ẩn)
activate Memtable
Memtable --> SecondaryIndex: Xác nhận
deactivate Memtable

SecondaryIndex --> PrimaryTable: Xác nhận cập nhật Index
deactivate SecondaryIndex

note right of PrimaryTable #LightBlue
  <b>7.</b> Định kỳ, Memtable sẽ được flush
  thành SSTable trên đĩa (cho cả bảng
  chính và bảng Index ẩn)
end note

PrimaryTable -> SSTable: <b>8a.</b> Flush Memtable bảng chính\nthành SSTable
activate SSTable
SSTable --> PrimaryTable: Xác nhận
deactivate SSTable

SecondaryIndex -> SSTable: <b>8b.</b> Flush Memtable bảng Index\nthành SSTable
activate SSTable
SSTable --> SecondaryIndex: Xác nhận
deactivate SSTable

PrimaryTable --> Coordinator: <b>9.</b> Xác nhận hoàn thành ghi
deactivate PrimaryTable

Coordinator --> Client: <b>10.</b> Trả về kết quả thành công
deactivate Coordinator

note over Client, SSTable #FFAAAA
  <b>Vấn đề Write Amplification:</b>
  - Mỗi thao tác ghi/cập nhật phải thực hiện <b>ghi đôi</b>: vào bảng chính và bảng Index ẩn
  - Tăng gánh nặng cho <b>Commit Log</b> (ghi 2 lần)
  - Tăng gánh nặng cho <b>Memtable</b> (lưu 2 bản ghi)
  - Tăng số lượng <b>SSTable</b> được tạo ra
  - Tăng tải cho hệ thống khi có <b>nhiều Secondary Index</b>
  - Làm chậm thao tác ghi và tăng độ trễ
end note
@enduml

```
3. **Tăng Tải Đọc (Read Amplification):**
   - Ngay khi truy vấn được gửi đến một node, việc đọc từ Secondary Index yêu cầu hai bước: đầu tiên là tìm kiếm trong bảng chỉ mục để lấy Primary Key, sau đó dùng Primary Key đó để đọc dữ liệu từ bảng chính. 
   - Nếu một giá trị chỉ mục xuất hiện ở nhiều Record hoặc trên nhiều node, điều này có thể dẫn đến nhiều lần đọc riêng lẻ và giảm hiệu suất.
```plantuml
@startuml
!include https://raw.githubusercontent.com/tupadr3/plantuml-icon-font-sprites/master/font-awesome-5/database.puml
!include https://raw.githubusercontent.com/tupadr3/plantuml-icon-font-sprites/master/font-awesome-5/search.puml
!include https://raw.githubusercontent.com/tupadr3/plantuml-icon-font-sprites/master/font-awesome-5/server.puml
!include https://raw.githubusercontent.com/tupadr3/plantuml-icon-font-sprites/master/font-awesome-5/user.puml

skinparam backgroundColor #FEFEFE
skinparam handwritten false
skinparam sequence {
    ArrowColor #2C3E50
    ActorBorderColor #2C3E50
    LifeLineBorderColor #2C3E50
    LifeLineBackgroundColor #A9DCDF
    
    ParticipantBorderColor #2C3E50
    ParticipantBackgroundColor #EB8540
    ParticipantFontColor #FFFFFF
    ParticipantFontSize 17
    ParticipantFontName "Verdana"
    
    ActorBackgroundColor #EB8540
    ActorFontColor #FFFFFF
    ActorFontSize 17
    ActorFontName "Verdana"
}

actor "<$user>\nClient" as Client
participant "<$server>\nCoordinator Node" as Coordinator
participant "<$server>\nNode 1" as Node1
participant "<$server>\nNode 2" as Node2
participant "<$server>\nNode 3" as Node3

note over Client, Node3 #LightBlue
  <b>Read Amplification trong Secondary Index của Cassandra</b>
  Minh họa quá trình tăng tải đọc khi sử dụng Secondary Index
end note

Client -> Coordinator: <b>1.</b> Query với Secondary Index\n(SELECT * FROM users WHERE email='user@example.com')

activate Coordinator
Coordinator -> Node1: <b>2.</b> Gửi query đến tất cả các node
Coordinator -> Node2: <b>2.</b> Gửi query đến tất cả các node
Coordinator -> Node3: <b>2.</b> Gửi query đến tất cả các node

activate Node1
activate Node2
activate Node3

note right of Node1 #FFAAAA
  <b>Read Amplification:</b>
  Mỗi node phải thực hiện 2 bước đọc:
  1. Tìm trong Secondary Index
  2. Đọc dữ liệu từ bảng chính
end note

Node1 -> Node1: <b>3.</b> Tìm kiếm trong Secondary Index local\n(email -> primary_key)
Node2 -> Node2: <b>3.</b> Tìm kiếm trong Secondary Index local\n(email -> primary_key)
Node3 -> Node3: <b>3.</b> Tìm kiếm trong Secondary Index local\n(email -> primary_key)

Node1 -> Node1: <b>4.</b> Đọc dữ liệu từ bảng chính\nsử dụng primary_key tìm được
Node2 -> Node2: <b>4.</b> Đọc dữ liệu từ bảng chính\nsử dụng primary_key tìm được
Node3 -> Node3: <b>4.</b> Đọc dữ liệu từ bảng chính\nsử dụng primary_key tìm được

Node1 --> Coordinator: <b>5.</b> Trả về kết quả (nếu có)
Node2 --> Coordinator: <b>5.</b> Trả về kết quả (nếu có)
Node3 --> Coordinator: <b>5.</b> Trả về kết quả (nếu có)

deactivate Node1
deactivate Node2
deactivate Node3

Coordinator -> Coordinator: <b>6.</b> Tổng hợp kết quả từ các node

Coordinator --> Client: <b>7.</b> Trả về kết quả cuối cùng

deactivate Coordinator

note over Client, Node3 #LightGreen
  <b>Nguyên nhân Read Amplification:</b>
  1. Mỗi node phải thực hiện 2 lần đọc: đọc index và đọc bảng chính
  2. Query phải được gửi đến tất cả các node (scatter)
  3. Nếu giá trị index xuất hiện nhiều lần, số lượng đọc từ bảng chính tăng lên
  4. Coordinator phải đợi và tổng hợp kết quả từ tất cả các node (gather)
end note

@enduml

```
4. **Vấn Đề với Cardinality:**
   - High Cardinality (Độ đa dạng cao): Nếu Column sử dụng để đánh Secondary Index có nhiều giá trị duy nhất(Ví dụ: Email, user_id, ...) bảng Index ẩn có thể sẽ rất lớn, làm tăng dung lượng lưu trữ.
     - Mặc dù vẫn gửi request đến tất cả các node, nhưng việc tìm kiếm trong Index sẽ nhanh hơn so với việc quét toàn bộ bảng chính. Bởi vì nếu tại bước đầu tiên không tìm thấy giá trị trong Index thì sẽ không thực hiện lấy dữ liệu từ bảng chính trong node đó.
   - Low Cardinality (Độ đa dạng thấp): Nếu column có ít giá trị duy nhất (ví dụ: giới tính, trạng thái), bảng Index sẽ chứa nhiều bản ghi trùng lặp. Điều này dẫn đến việc quét hàng triệu bản ghi trên bảng chính để tìm kiếm các bản ghi phù hợp với Index, làm giảm hiệu suất.
```plantuml
@startuml
!include https://raw.githubusercontent.com/tupadr3/plantuml-icon-font-sprites/master/font-awesome-5/database.puml
!include https://raw.githubusercontent.com/tupadr3/plantuml-icon-font-sprites/master/font-awesome-5/table.puml
!include https://raw.githubusercontent.com/tupadr3/plantuml-icon-font-sprites/master/font-awesome-5/search.puml
!include https://raw.githubusercontent.com/tupadr3/plantuml-icon-font-sprites/master/font-awesome-5/server.puml

skinparam backgroundColor #FEFEFE
skinparam defaultTextAlignment center
skinparam roundcorner 20
skinparam shadowing false

skinparam note {
  BackgroundColor #FFFFCC
  BorderColor #999999
}

' Định nghĩa màu sắc
skinparam ArrowColor #2C3E50
skinparam rectangle {
  BackgroundColor #A9DCDF
  BorderColor #2C3E50
}

title <b>Vấn đề Cardinality với Secondary Index trong Cassandra</b>

rectangle "<$server>\nCassandra Node" as Node {
  rectangle "<$table>\nBảng Chính (users)" as MainTable {
    rectangle "user_id | email | gender | status" as Header
    rectangle "001 | john@example.com | male | active" as Row1
    rectangle "002 | jane@example.com | female | active" as Row2
    rectangle "003 | bob@example.com | male | inactive" as Row3
    rectangle "004 | alice@example.com | female | active" as Row4
    rectangle "... | ... | ... | ..." as RowN
  }
  
  rectangle "<b>High Cardinality Index</b>\n<$table>\nSecondary Index (email)" as HighCardIndex {
    rectangle "email | user_id" as HeaderHigh
    rectangle "john@example.com | 001" as RowHigh1
    rectangle "jane@example.com | 002" as RowHigh2
    rectangle "bob@example.com | 003" as RowHigh3
    rectangle "alice@example.com | 004" as RowHigh4
    rectangle "... | ..." as RowHighN
  }
  
  rectangle "<b>Low Cardinality Index</b>\n<$table>\nSecondary Index (gender)" as LowCardIndex {
    rectangle "gender | user_id" as HeaderLow
    rectangle "male | 001" as RowLow1
    rectangle "male | 003" as RowLow2
    rectangle "male | ..." as RowLow3
    rectangle "female | 002" as RowLow4
    rectangle "female | 004" as RowLow5
    rectangle "female | ..." as RowLow6
  }
  
  rectangle "<b>Low Cardinality Index</b>\n<$table>\nSecondary Index (status)" as StatusIndex {
    rectangle "status | user_id" as HeaderStatus
    rectangle "active | 001" as RowStatus1
    rectangle "active | 002" as RowStatus2
    rectangle "active | 004" as RowStatus3
    rectangle "active | ..." as RowStatus4
    rectangle "inactive | 003" as RowStatus5
    rectangle "inactive | ..." as RowStatus6
  }
}

note left of HighCardIndex
  <b>1. High Cardinality</b>
  - Nhiều giá trị duy nhất (email)
  - Mỗi giá trị chỉ xuất hiện 1 lần
  - Index lớn nhưng tìm kiếm hiệu quả
  - Ít bản ghi cần đọc từ bảng chính
end note

note right of LowCardIndex
  <b>2. Low Cardinality</b>
  - Ít giá trị duy nhất (gender)
  - Mỗi giá trị xuất hiện nhiều lần
  - Nhiều bản ghi cần đọc từ bảng chính
end note

note bottom of StatusIndex
  <b>3. Low Cardinality (status)</b>
  - Phần lớn người dùng có status="active"
  - Truy vấn WHERE status='active' sẽ:
    + Trả về phần lớn bảng
    + Hiệu suất tệ như full table scan
end note

note bottom of Node
  <b>Vấn đề với Cardinality:</b>
  
  <b>High Cardinality:</b>
  + Ưu điểm: Tìm kiếm hiệu quả, ít bản ghi cần đọc
  - Nhược điểm: Bảng index lớn, tốn bộ nhớ
  
  <b>Low Cardinality:</b>
  + Ưu điểm: Bảng index nhỏ
  - Nhược điểm: Tìm kiếm kém hiệu quả, nhiều bản ghi cần đọc
  - Nhược điểm: Có thể tệ hơn full table scan
end note

@enduml

```
##### Minh họa chi tiết về vấn đề hiệu suất .
Giả sử chúng ta có một bảng users để lưu thông tin người dùng, và chúng ta muốn tìm kiếm người dùng theo thành phố.

:::details Chi tiết
### 1. Tạo Bảng:
```sql
CREATE KEYSPACE my_keyspace WITH replication = {
       'class': 'SimpleStrategy', 'replication_factor': 3
       };

USE my_keyspace;

CREATE TABLE users (
    user_id uuid PRIMARY KEY,
    name text,
    email text,
    city text
);
```
Trong bảng này, `user_id` là `Partition Key`. Chúng ta chỉ có thể truy vấn hiệu quả theo `user_id`. Nếu muốn tìm theo `city`, chúng ta cần `Secondary Index`.

### 2. Tạo Secondary Index:
```sql
CREATE INDEX idx_city ON users (city);
```
`Cassandra` sẽ tự động tạo một bảng index ẩn trên mỗi node. Bảng này sẽ có cấu trúc tương tự như: idx_city (city_value, user_id).

### 3. Thêm Dữ Liệu:
```sql
INSERT INTO users (user_id, name, email, city) VALUES (uuid(), 'Thành', 'alice@example.com', 'Hanoi');
INSERT INTO users (user_id, name, email, city) VALUES (uuid(), 'Tuấn', 'bob@example.com', 'HCM');
INSERT INTO users (user_id, name, email, city) VALUES (uuid(), 'Nam', 'charlie@example.com', 'Hanoi');

```

- Khi ghi `Thành`, Node chịu trách nhiệm sẽ ghi hàng vào `users` và ghi (`Hanoi`, `Thành_user_id`) vào `idx_city`.
- Khi ghi `Tuấn`, Node chịu trách nhiệm sẽ ghi hàng vào `users` và ghi (`HCM`, `Tuấn_user_id`) vào `idx_city`.
- Khi ghi `Nam`, Node chịu trách nhiệm sẽ ghi hàng vào `users` và ghi (`Hanoi`, `Nam_user_id`) vào `idx_city`.

Lưu ý rằng `Thành` và `Nam` có thể nằm trên các node khác nhau, vì partition key token khác nhau, và mỗi node đó sẽ có mục nhập `Hanoi` trong index local của nó.

### 4. Tìm Kiếm Dữ Liệu:
Bây giờ, chúng ta muốn tìm tất cả người dùng ở `Hanoi`:
```sql
SELECT * FROM users WHERE city = 'Hanoi';
```
Đây là cách Cassandra xử lý (giả sử có 3 nút `N1`, `N2`, `N3` và `Thành` ở N1, `Nam` ở N3):

1. Node điều phối nhận the query(Có thể là 1 trong các node Cassandra, giả sử là `N1`).
2. Bởi vì `city` là một Secondary Index, vì vậy `N1` sẽ gửi query đến cả `N2` và `N3` để tìm kiếm trong index local của chúng.(Tìm kiếm dữ liệu trên cả 2 Node)
3. `N1`: Tìm `Hanoi` trong `idx_city` local, thấy `Thành_user_id`. Đọc Record của `Thành` từ users.
4. `N2`: Tìm `Hanoi` trong `idx_city` local, không thấy. Gửi về kết quả rỗng.
5. `N3`: Tìm `Hanoi` trong `idx_city` local, thấy `Nam_user_id`. Đọc Record của `Nam` từ users và gửi về.
6. `N1` thu thập kết quả từ `N2` và `N3`, trả về cho client.(`Thành`, `Nam`)

Như bạn thấy, dù chỉ có hai kết quả, truy vấn đã phải `hỏi` cả ba Node, gây ra hiện tượng `scatter-gather` và làm giảm hiệu suất so với việc truy vấn theo `user_id`.

:::

### 1.3 Khi nào nên dùng Secondary Index?
1. Khi thực sự cần truy vấn theo column không phải là partition key và chấp nhận độ trễ cao hơn.
2. Khi truy vấn kết hợp với Partition Key, giúp giới hạn số lượng nút cần quét.
3. Khi column có độ đa dạng (cardinality) không quá cao cũng không quá thấp (khó xác định).

### Khi nào không nên sử dụng Secondary Index?
1. Không nên sử dụng Secondary Index khi có thể sử dụng Partition Key để truy vấn.
2. Không nên sử dụng Secondary Index nếu không kèm theo Partition Key, vì sẽ làm giảm hiệu suất.
   2.1 Nếu có kèm theo Partition Key, thì hiệu suất sẽ tốt hơn. Dữ liệu chỉ cần tìm trên 1 node.
3. Không nên sử dụng Secondary Index trên các cột có độ đa dạng (cardinality) quá thấp, vì sẽ làm tăng số lượng bản ghi cần quét.
