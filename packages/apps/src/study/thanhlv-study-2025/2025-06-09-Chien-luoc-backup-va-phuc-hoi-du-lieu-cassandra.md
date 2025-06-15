---
footer: true
title: Chiến lược Backup và Phục hồi dữ liệu Cassandra
authors: [ "lethanh" ]
date: 2025-06-09
outline: deep
image: https://static-cdn.thanhlv.com/study/thanhlv-study-2025/2025-06-09-Chien-luoc-backup-va-phuc-hoi-du-lieu-cassandra/image-2025-3-20_11-54-58.png
draft: false
group: 1. Cassandra
---

[[TOC]]

Cassandra là một hệ thống database phân tán, được thiết kế để xử lý lượng dữ liệu lớn trên nhiều máy chủ.

Để đảm bảo tính sẵn sàng cao và bảo mật dữ liệu, việc lập kế hoạch và chiến lược backup và phục hồi rất là quan trọng.

## 1. Chiến lược backup
Trong cassandra chúng ta có 2 kiểu backup.

### 1.1 Backup Snapshot (Ảnh chụp nhanh)
- Snapshot là bản sao lưu toàn bộ dữ liệu tại một thời điểm nhất định. Trong Cassandra, khi một snapshot được thực hiện thì sẽ đóng băng dữ liệu trên đĩa, đảm bảo không có hành động ghi, sửa,xóa trong quá trình này.

#### Cách thực hiện 
Sử dụng lệnh `nodetool snapshot`
![Image](https://static-cdn.thanhlv.com/study/thanhlv-study-2025/2025-06-09-Chien-luoc-backup-va-phuc-hoi-du-lieu-cassandra/image-2025-3-20_11-54-58.png)
Lệnh này sẽ tạo ra 1 bản snapshot chứa tất cả các file SStable hiện tại vào folder snapshot trên mỗi node.

Khi lệnh bắt đầu chạy, Cassandra sẽ thực hiện đóng băng hành động ghi và cập nhật, xóa, sau đó nó sẽ flush tất cả các dữ liệu ở memtable đến SStable, đảm bảo rằng tất cả dữ liệu đã được ghi vào SStable trước khi tạo snapshot.

Sau đó, Cassandra sẽ tạo ra một bản sao của các file SStable trong thư mục snapshot. Các file này sẽ có tên giống như các file SStable gốc nhưng sẽ được đặt trong thư mục snapshot.

Nếu bạn muốn tạo snapshot mà không flush memtables, bạn có thể sử dụng tùy chọn `--skip-flus`h (chỉ có sẵn từ Cassandra 3.4 trở lên). Tuy nhiên, việc này sẽ khiến snapshot của bạn không chứa dữ liệu đang nằm trong memtables.

Sau khi lệnh `nodetool snapshot` hoàn thành, bạn sẽ có một bản sao lưu của tất cả các file SStable trong thư mục snapshot. Bạn có thể sao chép các file này đến một vị trí khác để lưu trữ lâu dài.
![Image](https://static-cdn.thanhlv.com/study/thanhlv-study-2025/2025-06-09-Chien-luoc-backup-va-phuc-hoi-du-lieu-cassandra/image-2025-3-20_13-50-48.png)

### 1.2 Incremental Backups

#### 1.2.1 Incremental Backups là gì ?
Kể từ khi phiên bản 2.1, Cassandra hỗ trợ tính năng sao lưu gia tăng (incremental backups). Tính năng này cho phép bạn sao lưu các thay đổi mới nhất kể từ lần tạo Snapshot cuối cùng, thay vì sao lưu toàn bộ dữ liệu mỗi lần.

Sau khi bạn tạo một snapshot cuối,  các incremental Backups sẽ lưu trữ chỉ các thay đổi sau bản backup snapshot cuối đó.

```plantuml
@startuml Cassandra Snapshot and Incremental Backup Process

!define ICONURL https://raw.githubusercontent.com/tupadr3/plantuml-icon-font-sprites/master/font-awesome-5
!includeurl ICONURL/database.puml
!includeurl ICONURL/save.puml
!includeurl ICONURL/folder.puml
!includeurl ICONURL/copy.puml
!includeurl ICONURL/sync.puml
!includeurl ICONURL/cogs.puml
!includeurl ICONURL/file.puml
!includeurl ICONURL/link.puml

skinparam backgroundColor #FEFEFE
skinparam sequence {
  ArrowColor #333333
  LifeLineBorderColor #333333
  LifeLineBackgroundColor #EEEEEE
  
  ParticipantBorderColor #333333
  ParticipantBackgroundColor #EEEBDC
  ParticipantFontName Arial
  ParticipantFontSize 12
  
  ActorBorderColor #333333
  ActorBackgroundColor #EEEBDC
  ActorFontColor #333333
  ActorFontSize 12
}

skinparam note {
  BackgroundColor #FFF9C4
  BorderColor #FFEB3B
}

title <fa:database> Cassandra Snapshot và Incremental Backup Process

actor "DBA/Admin" as admin
participant "<fa:database> Cassandra Node" as node
participant "<fa:file> Memtable" as memtable
participant "<fa:save> SSTable" as sstable
participant "<fa:folder> Snapshot Directory" as snapshot
participant "<fa:folder> Backup Directory" as backup
participant "<fa:folder> External Storage" as external

== Cấu hình Ban Đầu ==

admin -> node: **Bước 1**: Cấu hình incremental_backups: true
note right of node
  Trong cassandra.yaml:
  incremental_backups: true
end note

== Hoạt Động Bình Thường ==

admin -> node: **Bước 2**: Ghi dữ liệu (INSERT/UPDATE/DELETE)
node -> memtable: **Bước 3**: Lưu dữ liệu vào memtable
note right of memtable
  Dữ liệu được lưu tạm thời trong bộ nhớ
end note

memtable -> sstable: **Bước 4**: Flush memtable thành SSTable
note right of sstable
  Xảy ra khi memtable đầy hoặc 
  theo lịch trình định kỳ
end note

== Tạo Snapshot ==

admin -> node: **Bước 5**: Yêu cầu tạo snapshot\n(nodetool snapshot -t "backup_name" keyspace_name)
note right of node
  Lệnh tạo snapshot cho một keyspace cụ thể
end note

node -> node: **Bước 6**: Flush tất cả memtables
node -> snapshot: **Bước 7**: Tạo hard links cho tất cả SSTables hiện có
note right of snapshot
  Tạo thư mục: data/keyspace/table-UUID/snapshots/backup_name/
  Chứa hard links đến tất cả SSTables tại thời điểm snapshot
end note

node --> admin: **Bước 8**: Thông báo snapshot hoàn thành

== Incremental Backups ==

admin -> node: **Bước 9**: Tiếp tục ghi dữ liệu mới
node -> memtable: **Bước 10**: Lưu dữ liệu vào memtable

memtable -> sstable: **Bước 11**: Flush memtable thành SSTable mới
note right of sstable
  SSTable mới được tạo sau snapshot
end note

sstable -> backup: **Bước 12**: <fa:link> Tự động tạo hard link trong thư mục backups
note right of backup
  Thư mục: data/keyspace/table-UUID/backups/
  Chỉ chứa hard links đến SSTables được tạo sau snapshot
end note

admin -> node: **Bước 13**: Tiếp tục ghi dữ liệu mới
node -> memtable: **Bước 14**: Lưu dữ liệu vào memtable
memtable -> sstable: **Bước 15**: Flush memtable thành SSTable mới khác
sstable -> backup: **Bước 16**: <fa:link> Tự động tạo hard link trong thư mục backups

== Sao Lưu Ngoài ==

admin -> node: **Bước 17**: Sao chép snapshot và incremental backups
node -> external: **Bước 18**: Sao chép thư mục snapshot
node -> external: **Bước 19**: Sao chép thư mục backups
note right of external
  Lưu trữ tại vị trí an toàn bên ngoài cụm Cassandra
end note

== Snapshot Mới và Làm Sạch ==

admin -> node: **Bước 20**: Tạo snapshot mới\n(nodetool snapshot -t "new_backup" keyspace_name)
node -> node: **Bước 21**: Flush tất cả memtables
node -> snapshot: **Bước 22**: Tạo hard links cho tất cả SSTables hiện có
admin -> node: **Bước 23**: Xóa thư mục backups cũ
note right of node
  Sau khi tạo snapshot mới, có thể xóa
  các incremental backups cũ để tiết kiệm không gian
end note
node -> backup: **Bước 24**: Xóa các hard links trong thư mục backups

@enduml

```
#### Tại sao cần có incremental backup?
Thay vì phải backup snapshot 1 cách thường xuyên, incremental backup sẽ chỉ lưu những thay đổi kể từ lần backup gần nhất. Điều này sẽ giảm không gian lưu trữ.

Việc tạo snapshot cũng rất tốn kém nó còn làm đóng băng hệ thống 1 thời gian dài. Incremental backup tốn ít chi phí hệ thống về thời gian cần thiết để sao lưu.

#### Tác động đến chiến lược backup
Với việc sử dụng incremental backup, bạn có thể giảm tần suất tạo snapshot đầy đủ, chỉ cần tạo snapshot định kỳ và sử dụng incremental backup để sao lưu các thay đổi hàng ngày hoặc hàng giờ.

Với snapshot chúng ta có thể định kỳ backup mỗi tháng hoặc năm bởi vì điều này tốn rất nhiều chi phí, còn với incremental chúng ta có thể định kỳ backup hằng ngày. Điều này sẽ làm giảm dủi do mất dữ liệu.

#### Cách thực hiện incremental backup
Để thực hiện incremental backup, bạn cần cấu hình Cassandra để bật tính năng này. Trong tệp cấu hình `cassandra.yaml`, bạn cần đặt `incremental_backups` thành `true`.

```yaml
incremental_backups: true
```
Bởi vì incremental backup sẽ chạy sau khi snapshot được tạo, nên bạn cần tạo snapshot trước khi thực hiện incremental backup.
```bash
nodetool snapshot -t "backup_name" keyspace_name
```

Sau khi snapshot được tạo, Cassandra sẽ tự động tạo hard links cho các SSTable mới trong thư mục `backups` của mỗi keyspace. Các hard links này sẽ chỉ chứa các thay đổi kể từ lần snapshot cuối cùng.

#### 1.3 Lưu trữ Backup
Để đảm bảo an toàn cho dữ liệu, bạn nên sao chép các snapshot và incremental backups đến một vị trí lưu trữ bên ngoài, chẳng hạn như một hệ thống lưu trữ đám mây hoặc một máy chủ lưu trữ khác.
#### 1.4 Lịch trình Backup
Để đảm bảo tính nhất quán và an toàn của dữ liệu, bạn nên thiết lập một lịch trình backup định kỳ. Ví dụ:
- **Snapshot**: Mỗi tháng một lần hoặc mỗi quý một lần, tùy thuộc vào tần suất thay đổi dữ liệu.
- **Incremental Backup**: Hằng ngày hoặc hằng giờ, tùy thuộc vào tần suất thay đổi dữ liệu và yêu cầu về độ an toàn.
- **Lưu trữ**: Sao chép các snapshot và incremental backups đến một vị trí lưu trữ bên ngoài sau mỗi lần backup.
- **Kiểm tra**: Thực hiện kiểm tra định kỳ để đảm bảo rằng các bản sao lưu có thể phục hồi thành công.
- **Xóa cũ**: Xóa các bản sao lưu cũ sau một khoảng thời gian nhất định để tiết kiệm không gian lưu trữ.
- **Giám sát**: Sử dụng các công cụ giám sát để theo dõi tình trạng của các bản sao lưu và cảnh báo khi có sự cố xảy ra.
- **Báo cáo**: Gửi báo cáo định kỳ về tình trạng backup cho các bên liên quan để đảm bảo rằng mọi người đều biết về tình trạng backup và phục hồi dữ liệu.


### 2 Chiến lược phục hồi
Phục hồi dữ liệu từ các bản sao lưu là một phần quan trọng trong chiến lược bảo mật dữ liệu. Dưới đây là các bước để phục hồi dữ liệu từ snapshot và incremental backups trong Cassandra:
#### 2.1 Phục hồi từ Snapshot
Để phục hồi dữ liệu từ một snapshot, bạn cần thực hiện các bước sau:
1. **Xác định Snapshot**: Xác định snapshot mà bạn muốn phục hồi. Bạn có thể sử dụng lệnh `nodetool listsnapshots` để liệt kê các snapshot hiện có. Cần có bản snapshot đầy đủ và không bị lỗi để phục hồi dữ liệu.
2. **Sao chép Snapshot**: Sao chép các file snapshot từ thư mục snapshot đến thư mục dữ liệu của keyspace tương ứng. Bạn có thể sử dụng lệnh `cp` hoặc `rsync` để sao chép các file này.
3. **Khởi động lại Cassandra**: Sau khi sao chép các file snapshot, bạn cần khởi động lại Cassandra để nó nhận diện các file mới. Bạn có thể sử dụng lệnh `systemctl restart cassandra` hoặc `service cassandra restart` tùy thuộc vào hệ điều hành của bạn.
4. **Kiểm tra dữ liệu**: Sau khi Cassandra khởi động lại, bạn có thể kiểm tra dữ liệu đã được phục hồi bằng cách sử dụng các công cụ quản lý dữ liệu như `cqlsh` hoặc các công cụ khác.
5. **Xóa Snapshot Cũ**: Nếu bạn không cần snapshot cũ nữa, bạn có thể xóa nó để giải phóng không gian lưu trữ. Bạn có thể sử dụng lệnh `nodetool clearsnapshot` để xóa tất cả các snapshot hoặc `rm -rf` để xóa một snapshot cụ thể.
6. **Kiểm tra tính toàn vẹn**: Sau khi phục hồi, hãy kiểm tra tính toàn vẹn của dữ liệu để đảm bảo rằng không có lỗi xảy ra trong quá trình phục hồi.
7. **Cập nhật ứng dụng**: Nếu ứng dụng của bạn sử dụng dữ liệu từ keyspace đã phục hồi, hãy đảm bảo rằng ứng dụng được cập nhật để sử dụng dữ liệu mới.
8. **Giám sát**: Theo dõi hệ thống sau khi phục hồi để đảm bảo rằng không có vấn đề phát sinh và hiệu suất của hệ thống vẫn ổn định.
9. **Báo cáo**: Gửi báo cáo về quá trình phục hồi cho các bên liên quan để đảm bảo rằng mọi người đều biết về tình trạng phục hồi dữ liệu.

#### 2.2 Phục hồi từ Incremental Backups
Để phục hồi dữ liệu từ incremental backups, bạn cần thực hiện các bước sau:
1. *Phục hồi Snapshot gần nhất*: Trước khi phục hồi từ incremental backups, bạn nên phục hồi từ snapshot gần nhất trước khi các incremental backups được tạo. Điều này sẽ đảm bảo rằng bạn có một cơ sở dữ liệu ổn định trước khi áp dụng các thay đổi incremental.
2. **Xác định Incremental Backup**: Xác định incremental backup mà bạn muốn phục hồi. Bạn có thể sử dụng lệnh `ls` để liệt kê các file incremental backups trong thư mục `backups`.
3. **Sao chép Incremental Backup**: Sao chép các file incremental backup từ thư mục `backups` đến thư mục dữ liệu của keyspace tương ứng. Bạn có thể sử dụng lệnh `cp` hoặc `rsync` để sao chép các file này.
4. **Khởi động lại Cassandra**: Sau khi sao chép các file incremental backup, bạn cần khởi động lại Cassandra để nó nhận diện các file mới. Bạn có thể sử dụng lệnh `systemctl restart cassandra` hoặc `service cassandra restart` tùy thuộc vào hệ điều hành của bạn.
5. **Kiểm tra dữ liệu**: Sau khi Cassandra khởi động lại, bạn có thể kiểm tra dữ liệu đã được phục hồi bằng cách sử dụng các công cụ quản lý dữ liệu như `cqlsh` hoặc các công cụ khác.
6. **Xóa Incremental Backup Cũ**: Nếu bạn không cần incremental backup cũ nữa, bạn có thể xóa nó để giải phóng không gian lưu trữ. Bạn có thể sử dụng lệnh `rm -rf` để xóa một incremental backup cụ thể.
7. **Kiểm tra tính toàn vẹn**: Sau khi phục hồi, hãy kiểm tra tính toàn vẹn của dữ liệu để đảm bảo rằng không có lỗi xảy ra trong quá trình phục hồi.
8. **Cập nhật ứng dụng**: Nếu ứng dụng của bạn sử dụng dữ liệu từ keyspace đã phục hồi, hãy đảm bảo rằng ứng dụng được cập nhật để sử dụng dữ liệu mới.
9. **Giám sát**: Theo dõi hệ thống sau khi phục hồi để đảm bảo rằng không có vấn đề phát sinh và hiệu suất của hệ thống vẫn ổn định.
10. **Báo cáo**: Gửi báo cáo về quá trình phục hồi cho các bên liên quan để đảm bảo rằng mọi người đều biết về tình trạng phục hồi dữ liệu.

## 3. Kết luận
Việc lập kế hoạch và thực hiện chiến lược backup và phục hồi dữ liệu là rất quan trọng trong việc bảo vệ dữ liệu trong Cassandra. Snapshot và incremental backups cung cấp các phương pháp hiệu quả để sao lưu và phục hồi dữ liệu, giúp đảm bảo tính sẵn sàng cao và bảo mật dữ liệu.
## 3. Tài liệu tham khảo
- [Cassandra Documentation](https://cassandra.apache.org/doc/latest/)
