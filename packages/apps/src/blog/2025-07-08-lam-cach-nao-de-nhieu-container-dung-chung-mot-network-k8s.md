---
footer: true
title: Làm cách nào để nhiều container dùng chung một network K8s?
description: Làm cách nào để nhiều container dùng chung một network K8s? Trong bài viết này mình sẽ giải thích và làm cách ví dụ để cho các bạn hiểu.
authors: [ lethanh ]
date: 2025-07-08
outline: deep
image: https://static-cdn.thanhlv.com/blog/images/2025-07-08-lam-cach-nao-de-nhieu-container-dung-chung-mot-network-k8s/img.png
draft: false
---

# Làm cách nào để nhiều container dùng chung một network K8s?

Như bạn đã biết, trong kubernetes đơn vị nhỏ nhất có thể đưoợc deploy là Pod. Mỗi Pod có thể chứa một hoặc nhiều container. 

Mỗi Pod sẽ được gán một IP duy nhất và các container trong cùng một Pod sẽ dùng chung IP này.

Và tại trong cùng một pod, các container có thể giao tiếp với nhau thông qua localhost.

Bạn có từng hỏi là tại sao không ? làm cách nào để k8s thực hiện được điều đó ?

Muốn thử điều đó ở docker thì sao ?

Trong bài viết này mình sẽ giải thích và làm cách ví dụ để cho các bạn hiểu.

## Tại sao lại dùng nhiều container trong một Pod? 🤔

Thực tế, thông thường một Pod sẽ chỉ chứa một container. 

Tuy nhiên, trong một số trường hợp, bạn có thể muốn chạy nhiều container trong cùng một Pod để chúng có thể giao tiếp với nhau một cách nhanh chóng và hiệu quả.

Mô hình "sidecar" là một trường hợp sử dụng phổ biến cho các Pod có nhiều container.

- Container chính (Main Container): Thực hiện chức năng cốt lõi của ứng dụng.

- Container phụ (Sidecar Container): Thực hiện các tác vụ phụ trợ như thu thập log, giám sát, hoặc hoạt động như một proxy mạng.

Việc gom các container này vào chung một Pod cho phép chúng hoạt động chặt chẽ với nhau, tận dụng không gian mạng và lưu trữ chung mà không cần cấu hình phức tạp.

## Làm cách nào để nhiều container dùng chung một network K8s?

Cơ chế hoạt động chi tiết step by step như sau:

### 1. **Tạo Pause Container**
Khi một pod được khởi tạo, kubernetes không bắt đầu ngay với các container được định nghĩa trong spec của pod. 

Thay vào đó, nó sẽ khởi tạo một container đặc biệt gọi là **"pause container"**. Container này sẽ giữ vai trò là điểm khởi đầu của pod. (Pause container là một internal container )

Nhiệm vụ của container này là thiết lập và **"giữ"** không gian tên mạng(network space), UTS namespace và IPC (Inter-Process Communication) namespace  cho tất cả các container trong pod.

Đây là một thành phần quan trọng của cơ chế điều phối container của Kubernetes, cung cấp nền tảng cho giao tiếp **container-to-container** và cách ly mạng trong một pod.

**"pause container"** rất đặc biệt vì nó không thực hiện bất kỳ công việc thực tế nào, mà chỉ đơn giản là tồn tại để giữ không gian mạng cho pod.

Tuy nhiên, nó lại rất quan trọng, nó chịu trách nghiệm định tuyến(router) traffic giữa pod và thế giới bên ngoài pod.

Container tạm dừng được containerd tự động tạo khi bạn khởi động Pod. Nó không hiển thị đối với kubectl, nhưng bạn có thể nhìn thấy nó bằng lệnh ctr

```bash
# Lệnh này cần được chạy trong node k8s
# Lệnh này sẽ hiển  thị tất cả các container đang chạy trong namespace k8s.io
sh-5.1# ctr -n k8s.io containers list
```
![Image](@cdn/blog/images/2025-07-08-lam-cach-nao-de-nhieu-container-dung-chung-mot-network-k8s/img.png)

Như hình ảnh ở trên, có 2 container được tạo ra trong cụm k8s của mình.

```bash
6121dfaca1a7eb0ba2dfd873391985d7598d13da7fb38d3c7f1c99fa76135a30    registry.k8s.io/pause:3.5                                                              io.containerd.runc.v2    
6d5a12a6a70d94b063c8378332f7547eb549a669d408a85b9d721d137d9e379b    docker.io/library/ubuntu:latest                                                        io.containerd.runc.v2
```

::: details Cách chạy lệnh phía trên nếu bạn chỉ có thể truy cập vào kubectl và không thể truy cập trực tiếp vào node K8s
Giải pháp tốt nhất là sử dụng kubectl debug để tạm thời tạo một pod có đặc quyền trên node bạn muốn kiểm tra.

1. **lấy về All node**
```bash
kubectl get nodes
NAME                               STATUS   ROLES           AGE     VERSION
default-kks-az1-fnthx-8hnvg        Ready    worker          6d12h   v1.32.0
default-kks-az2-nhcsz-cfsrp        Ready    worker          6d11h   v1.32.0
default-kks-az3-l2sb2-wvnns        Ready    worker          6d10h   v1.32.0
dev-internal-control-plane-5zfvw   Ready    control-plane   6d11h   v1.32.0
dev-internal-control-plane-rxmvf   Ready    control-plane   6d12h   v1.32.0
dev-internal-control-plane-zrw8s   Ready    control-plane   6d12h   v1.32.0
```
2. **Tạo một pod debug**
Format lệnh như sau:
```bash
kubectl debug node/<tên-node-của-bạn> -it --image=ubuntu 
```
Thay **<tên-node-của-bạn>** bằng tên node thực tế (ví dụ: default-kks-az1-fnthx-8hnvg).
Sau khi chạy, bạn sẽ thấy một dấu nhắc lệnh mới, ví dụ root@<tên-node-của-bạn>:/#.
```bash
kubectl debug node/default-kks-az1-fnthx-8hnvg -it --image=ubuntu
Creating debugging pod node-debugger-default-kks-az1-fnthx-8hnvg-pc2zk with container debugger on node default-kks-az1-fnthx-8hnvg.
If you don't see a command prompt, try pressing enter.
root@default-kks-az1-fnthx-8hnvg:/# 
```

3. **Thay đổi root directory vào host**: 
Bên trong pod debug, filesystem của node được mount vào thư mục /host. Để có thể chạy các lệnh của node một cách tự nhiên, hãy dùng lệnh chroot:
```bash
root@default-kks-az1-fnthx-8hnvg:/# chroot /host 
sh-5.1# 
```
Bây giờ, bạn đang ở trong môi trường của node.

Để thoát, sẽ sử dụng lệnh exit 2 lần. (Lưu ý bỏ vietkey)

:::

pause container rất nhẹ. Size Image của nó chỉ khoảng vài trăm KB. Thông thường là dưới 1MB.
Ví dụ:
- https://hub.docker.com/r/ibmcom/pause
- https://hub.docker.com/r/google/pause
- https://hub.docker.com/r/rancher/pause
- https://hub.docker.com/r/kubeedge/pause
- https://hub.docker.com/r/portainer/pause

### 2. **Các container được định nghĩa trong yaml được tạo lên**
Sau khi pause container được khởi tạo, Kubernetes sẽ tiếp tục khởi tạo các container khác được định nghĩa trong spec của pod.

Các container này sẽ được kết nối với cùng một không gian mạng mà pause container đã tạo ra.

## Một số đặc điểm và chức năng chính của pause container:

### Network Namespace
Pause container sẽ tạo một network namespace và chia sẽ network đó đến tất cả các container khác trong pod.

Điều này có nghĩa là tất cả các container trong cùng một pod sẽ cùng một network stack và sẽ có thể giao tiếp với nhau thông qua localhost và sử dụng cùng một địa chỉ IP. ( Nó sẽ giống như đang ở trên cùng 1 máy chủ)

### IPC Namespace

Tương tự như network namespace, pause container cũng tạo ra một IPC namespace. Điều này cho phép các container trong cùng một pod có thể giao tiếp với nhau thông qua các cơ chế IPC như shared memory, System V IPC and POSIX message queues.

### UTS namespace
Pause container cũng tạo ra một UTS namespace, cho phép các container trong cùng một pod chia sẻ thông tin về hostname và domain name.

### Resource Isolation

Pause container cung cấp một cơ chế cách ly tài nguyên cho các container trong pod.

Mặc dù các container trong cùng một pod chia sẻ cùng một network namespace, nhưng chúng vẫn có thể được cấu hình để sử dụng các tài nguyên khác nhau như CPU, bộ nhớ và lưu trữ.

### Lifetime Management
Pause container quản lý vòng đời của pod. Khi tất cả các container khác trong pod đã bị xóa, pause container sẽ vẫn tồn tại để giữ cho network namespace và IPC namespace không bị xóa.

Điều này đảm bảo các tài nguyên phân bổ cho pod không bị giải phóng sớm, cho phép các container mới có thể được khởi tạo trong cùng một pod mà không cần phải tạo lại network namespace.


### Minimal Resource Usage
Pause container được thiết kế để sử dụng tài nguyên tối thiểu. 

Nó không thực hiện bất kỳ công việc thực tế nào, chỉ đơn giản là tồn tại để giữ cho network namespace và IPC namespace hoạt động.

Vì vậy, nó tiêu tốn rất ít tài nguyên CPU và bộ nhớ.

### Automatically Managed
Pause container được Kubernetes tự động quản lý. Bạn không cần phải tạo hoặc xóa nó một cách thủ công.
Nó sẽ được tạo ra khi pod được khởi tạo và sẽ bị xóa khi pod bị xóa.

## Một số lợi ích chính của việc sử dụng vùng chứa tạm dừng trong Kubernetes
### Hiệu suất cao
Việc sử dụng pause container giúp giảm thiểu overhead của việc tạo và xóa network namespace cho mỗi container trong pod.
Điều này giúp cải thiện hiệu suất của các ứng dụng chạy trong pod, đặc biệt là trong các trường hợp có nhiều container cần giao tiếp với nhau.

### Cách ly network
Pause container cung cấp một cơ chế cách ly network hiệu quả cho các pod.

Vùng chứa tạm dừng tạo ra một không gian tên mạng riêng biệt cho mỗi Pod, giúp cách ly các Pod với nhau. 

Điều này có thể cải thiện bảo mật và hiệu suất bằng cách giảm lượng lưu lượng có thể lưu thông giữa các Pod.

### Cấu hình đơn giản
Việc sử dụng pause container giúp đơn giản hóa cấu hình mạng cho các pod.

Pause container xử lý tất cả các chi tiết cấp thấp cho việc quản lý mạng cho Pod. Điều này giúp cấu hình và quản lý mạng trong Kubernetes trở nên dễ dàng hơn.

## Xem chi tiết thông tin của pause container

Bạn có thể xem chi tiết thông tin của pause container bằng lệnh ctr.

Như trong ví dụ của mình, pause container có ID là `6121dfaca1a7eb0ba2dfd873391985d7598d13da7fb38d3c7f1c99fa76135a30`, bạn có thể xem chi tiết thông tin của nó bằng lệnh sau:

```bash
6121dfaca1a7eb0ba2dfd873391985d7598d13da7fb38d3c7f1c99fa76135a30    registry.k8s.io/pause:3.5                                                              io.containerd.runc.v2    
6d5a12a6a70d94b063c8378332f7547eb549a669d408a85b9d721d137d9e379b    docker.io/library/ubuntu:latest                                                        io.containerd.runc.v2

sh-5.1# ctr -n k8s.io c info 6121dfaca1a7eb0ba2dfd873391985d7598d13da7fb38d3c7f1c99fa76135a30
```

Bạn sẽ nhận được rất rất nhiều thông tin chi tiết về pause container, bao gồm:
- ID của container
- Image của container
- Label của container
- Hostname của container
- namespaces, đây là các namespace mà pause container đã tạo ra cho pod, bao gồm network namespace, IPC namespace và UTS namespace và mount nếu cần.
    ```json
    "namespaces": [
                  {
                      "type": "pid"
                  },
                  {
                      "type": "ipc"
                  },
                  {
                      "type": "uts"
                  },
                  {
                      "type": "mount"
                  },
                  {
                      "type": "network",
                      "path": "/var/run/netns/cni-c16cff09-4654-4298-51c8-e04ec37efd83"
                  }
              ],

    ```

::: details Full data
```
{
    "ID": "6121dfaca1a7eb0ba2dfd873391985d7598d13da7fb38d3c7f1c99fa76135a30",
    "Labels": {
        "app": "otel-collector-logs-system",
        "controller-revision-hash": "665b9d948c",
        "io.cri-containerd.kind": "sandbox",
        "io.kubernetes.pod.name": "otel-collector-logs-system-hscg9",
        "io.kubernetes.pod.namespace": "kube-system",
        "io.kubernetes.pod.uid": "a5f9b6bf-6094-49e8-be66-9f6e55cafe4f",
        "pod-template-generation": "1"
    },
    "Image": ".../pause:3.9",
    "Runtime": {
        "Name": "io.containerd.runc.v2",
        "Options": {
            "type_url": "containerd.runc.v1.Options",
            "value": "SAE="
        }
    },
    "SnapshotKey": "6121dfaca1a7eb0ba2dfd873391985d7598d13da7fb38d3c7f1c99fa76135a30",
    "Snapshotter": "overlayfs",
    "CreatedAt": "2025-07-02T03:43:14.063913397Z",
    "UpdatedAt": "2025-07-02T03:43:14.301518484Z",
    "Extensions": {
        "io.cri-containerd.sandbox.metadata": {
            "type_url": "github.com/containerd/cri/pkg/store/sandbox/Metadata",
            "value": "eyJWZXJzaW9uIjo.......bnVsbH0sIlByb2Nlc3NMYWJlbCI6IiJ9fQ=="
        }
    },
    "SandboxID": "",
    "Spec": {
        "ociVersion": "1.1.0",
        "process": {
            "user": {
                "uid": 0,
                "gid": 0,
                "additionalGids": [
                    0
                ]
            },
            "args": [
                "/pause"
            ],
            "env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "cwd": "/",
            "capabilities": {
                "bounding": [
                    "CAP_CHOWN",
                    "CAP_DAC_OVERRIDE",
                    "CAP_FSETID",
                    "CAP_FOWNER",
                    "CAP_MKNOD",
                    "CAP_NET_RAW",
                    "CAP_SETGID",
                    "CAP_SETUID",
                    "CAP_SETFCAP",
                    "CAP_SETPCAP",
                    "CAP_NET_BIND_SERVICE",
                    "CAP_SYS_CHROOT",
                    "CAP_KILL",
                    "CAP_AUDIT_WRITE"
                ],
                "effective": [
                    "CAP_CHOWN",
                    "CAP_DAC_OVERRIDE",
                    "CAP_FSETID",
                    "CAP_FOWNER",
                    "CAP_MKNOD",
                    "CAP_NET_RAW",
                    "CAP_SETGID",
                    "CAP_SETUID",
                    "CAP_SETFCAP",
                    "CAP_SETPCAP",
                    "CAP_NET_BIND_SERVICE",
                    "CAP_SYS_CHROOT",
                    "CAP_KILL",
                    "CAP_AUDIT_WRITE"
                ],
                "permitted": [
                    "CAP_CHOWN",
                    "CAP_DAC_OVERRIDE",
                    "CAP_FSETID",
                    "CAP_FOWNER",
                    "CAP_MKNOD",
                    "CAP_NET_RAW",
                    "CAP_SETGID",
                    "CAP_SETUID",
                    "CAP_SETFCAP",
                    "CAP_SETPCAP",
                    "CAP_NET_BIND_SERVICE",
                    "CAP_SYS_CHROOT",
                    "CAP_KILL",
                    "CAP_AUDIT_WRITE"
                ]
            },
            "noNewPrivileges": true,
            "oomScoreAdj": -998
        },
        "root": {
            "path": "rootfs",
            "readonly": true
        },
        "hostname": "otel-collector-logs-system-hscg9",
        "mounts": [
            {
                "destination": "/proc",
                "type": "proc",
                "source": "proc",
                "options": [
                    "nosuid",
                    "noexec",
                    "nodev"
                ]
            },
            {
                "destination": "/dev",
                "type": "tmpfs",
                "source": "tmpfs",
                "options": [
                    "nosuid",
                    "strictatime",
                    "mode=755",
                    "size=65536k"
                ]
            },
            {
                "destination": "/dev/pts",
                "type": "devpts",
                "source": "devpts",
                "options": [
                    "nosuid",
                    "noexec",
                    "newinstance",
                    "ptmxmode=0666",
                    "mode=0620",
                    "gid=5"
                ]
            },
            {
                "destination": "/dev/mqueue",
                "type": "mqueue",
                "source": "mqueue",
                "options": [
                    "nosuid",
                    "noexec",
                    "nodev"
                ]
            },
            {
                "destination": "/sys",
                "type": "sysfs",
                "source": "sysfs",
                "options": [
                    "nosuid",
                    "noexec",
                    "nodev",
                    "ro"
                ]
            },
            {
                "destination": "/dev/shm",
                "type": "bind",
                "source": "/run/containerd/io.containerd.grpc.v1.cri/sandboxes/6121dfaca1a7eb0ba2dfd873391985d7598d13da7fb38d3c7f1c99fa76135a30/shm",
                "options": [
                    "rbind",
                    "ro",
                    "nosuid",
                    "nodev",
                    "noexec"
                ]
            },
            {
                "destination": "/etc/resolv.conf",
                "type": "bind",
                "source": "/var/lib/containerd/io.containerd.grpc.v1.cri/sandboxes/6121dfaca1a7eb0ba2dfd873391985d7598d13da7fb38d3c7f1c99fa76135a30/resolv.conf",
                "options": [
                    "rbind",
                    "ro",
                    "nosuid",
                    "nodev",
                    "noexec"
                ]
            }
        ],
        "annotations": {
            "io.kubernetes.cri.container-type": "sandbox",
            "io.kubernetes.cri.sandbox-cpu-period": "100000",
            "io.kubernetes.cri.sandbox-cpu-quota": "0",
            "io.kubernetes.cri.sandbox-cpu-shares": "102",
            "io.kubernetes.cri.sandbox-id": "6121dfaca1a7eb0ba2dfd873391985d7598d13da7fb38d3c7f1c99fa76135a30",
            "io.kubernetes.cri.sandbox-log-directory": "/var/log/pods/kube-system_otel-collector-logs-system-hscg9_a5f9b6bf-6094-49e8-be66-9f6e55cafe4f",
            "io.kubernetes.cri.sandbox-memory": "629145600",
            "io.kubernetes.cri.sandbox-name": "otel-collector-logs-system-hscg9",
            "io.kubernetes.cri.sandbox-namespace": "kube-system",
            "io.kubernetes.cri.sandbox-uid": "a5f9b6bf-6094-49e8-be66-9f6e55cafe4f"
        },
        "linux": {
            "resources": {
                "devices": [
                    {
                        "allow": false,
                        "access": "rwm"
                    }
                ],
                "cpu": {
                    "shares": 2
                }
            },
            "cgroupsPath": "kubepods-burstable-poda5f9b6bf_6094_49e8_be66_9f6e55cafe4f.slice:cri-containerd:6121dfaca1a7eb0ba2dfd873391985d7598d13da7fb38d3c7f1c99fa76135a30",
            "namespaces": [
                {
                    "type": "pid"
                },
                {
                    "type": "ipc"
                },
                {
                    "type": "uts"
                },
                {
                    "type": "mount"
                },
                {
                    "type": "network",
                    "path": "/var/run/netns/cni-c16cff09-4654-4298-51c8-e04ec37efd83"
                }
            ],
            "seccomp": {
                "defaultAction": "SCMP_ACT_ERRNO",
                "architectures": [
                    "SCMP_ARCH_X86_64",
                    "SCMP_ARCH_X86",
                    "SCMP_ARCH_X32"
                ],
                "syscalls": [
                    {
                        "names": [
                            "accept",
                            "accept4",
                            "access",
                            "adjtimex",
                            "alarm",
                            "bind",
                            "brk",
                            "cachestat",
                            "capget",
                            "capset",
                            "chdir",
                            "chmod",
                            "chown",
                            "chown32",
                            "clock_adjtime",
                            "clock_adjtime64",
                            "clock_getres",
                            "clock_getres_time64",
                            "clock_gettime",
                            "clock_gettime64",
                            "clock_nanosleep",
                            "clock_nanosleep_time64",
                            "close",
                            "close_range",
                            "connect",
                            "copy_file_range",
                            "creat",
                            "dup",
                            "dup2",
                            "dup3",
                            "epoll_create",
                            "epoll_create1",
                            "epoll_ctl",
                            "epoll_ctl_old",
                            "epoll_pwait",
                            "epoll_pwait2",
                            "epoll_wait",
                            "epoll_wait_old",
                            "eventfd",
                            "eventfd2",
                            "execve",
                            "execveat",
                            "exit",
                            "exit_group",
                            "faccessat",
                            "faccessat2",
                            "fadvise64",
                            "fadvise64_64",
                            "fallocate",
                            "fanotify_mark",
                            "fchdir",
                            "fchmod",
                            "fchmodat",
                            "fchmodat2",
                            "fchown",
                            "fchown32",
                            "fchownat",
                            "fcntl",
                            "fcntl64",
                            "fdatasync",
                            "fgetxattr",
                            "flistxattr",
                            "flock",
                            "fork",
                            "fremovexattr",
                            "fsetxattr",
                            "fstat",
                            "fstat64",
                            "fstatat64",
                            "fstatfs",
                            "fstatfs64",
                            "fsync",
                            "ftruncate",
                            "ftruncate64",
                            "futex",
                            "futex_requeue",
                            "futex_time64",
                            "futex_wait",
                            "futex_waitv",
                            "futex_wake",
                            "futimesat",
                            "getcpu",
                            "getcwd",
                            "getdents",
                            "getdents64",
                            "getegid",
                            "getegid32",
                            "geteuid",
                            "geteuid32",
                            "getgid",
                            "getgid32",
                            "getgroups",
                            "getgroups32",
                            "getitimer",
                            "getpeername",
                            "getpgid",
                            "getpgrp",
                            "getpid",
                            "getppid",
                            "getpriority",
                            "getrandom",
                            "getresgid",
                            "getresgid32",
                            "getresuid",
                            "getresuid32",
                            "getrlimit",
                            "get_robust_list",
                            "getrusage",
                            "getsid",
                            "getsockname",
                            "getsockopt",
                            "get_thread_area",
                            "gettid",
                            "gettimeofday",
                            "getuid",
                            "getuid32",
                            "getxattr",
                            "inotify_add_watch",
                            "inotify_init",
                            "inotify_init1",
                            "inotify_rm_watch",
                            "io_cancel",
                            "ioctl",
                            "io_destroy",
                            "io_getevents",
                            "io_pgetevents",
                            "io_pgetevents_time64",
                            "ioprio_get",
                            "ioprio_set",
                            "io_setup",
                            "io_submit",
                            "io_uring_enter",
                            "io_uring_register",
                            "io_uring_setup",
                            "ipc",
                            "kill",
                            "landlock_add_rule",
                            "landlock_create_ruleset",
                            "landlock_restrict_self",
                            "lchown",
                            "lchown32",
                            "lgetxattr",
                            "link",
                            "linkat",
                            "listen",
                            "listxattr",
                            "llistxattr",
                            "_llseek",
                            "lremovexattr",
                            "lseek",
                            "lsetxattr",
                            "lstat",
                            "lstat64",
                            "madvise",
                            "membarrier",
                            "memfd_create",
                            "memfd_secret",
                            "mincore",
                            "mkdir",
                            "mkdirat",
                            "mknod",
                            "mknodat",
                            "mlock",
                            "mlock2",
                            "mlockall",
                            "map_shadow_stack",
                            "mmap",
                            "mmap2",
                            "mprotect",
                            "mq_getsetattr",
                            "mq_notify",
                            "mq_open",
                            "mq_timedreceive",
                            "mq_timedreceive_time64",
                            "mq_timedsend",
                            "mq_timedsend_time64",
                            "mq_unlink",
                            "mremap",
                            "msgctl",
                            "msgget",
                            "msgrcv",
                            "msgsnd",
                            "msync",
                            "munlock",
                            "munlockall",
                            "munmap",
                            "name_to_handle_at",
                            "nanosleep",
                            "newfstatat",
                            "_newselect",
                            "open",
                            "openat",
                            "openat2",
                            "pause",
                            "pidfd_open",
                            "pidfd_send_signal",
                            "pipe",
                            "pipe2",
                            "pkey_alloc",
                            "pkey_free",
                            "pkey_mprotect",
                            "poll",
                            "ppoll",
                            "ppoll_time64",
                            "prctl",
                            "pread64",
                            "preadv",
                            "preadv2",
                            "prlimit64",
                            "process_mrelease",
                            "pselect6",
                            "pselect6_time64",
                            "pwrite64",
                            "pwritev",
                            "pwritev2",
                            "read",
                            "readahead",
                            "readlink",
                            "readlinkat",
                            "readv",
                            "recv",
                            "recvfrom",
                            "recvmmsg",
                            "recvmmsg_time64",
                            "recvmsg",
                            "remap_file_pages",
                            "removexattr",
                            "rename",
                            "renameat",
                            "renameat2",
                            "restart_syscall",
                            "rmdir",
                            "rseq",
                            "rt_sigaction",
                            "rt_sigpending",
                            "rt_sigprocmask",
                            "rt_sigqueueinfo",
                            "rt_sigreturn",
                            "rt_sigsuspend",
                            "rt_sigtimedwait",
                            "rt_sigtimedwait_time64",
                            "rt_tgsigqueueinfo",
                            "sched_getaffinity",
                            "sched_getattr",
                            "sched_getparam",
                            "sched_get_priority_max",
                            "sched_get_priority_min",
                            "sched_getscheduler",
                            "sched_rr_get_interval",
                            "sched_rr_get_interval_time64",
                            "sched_setaffinity",
                            "sched_setattr",
                            "sched_setparam",
                            "sched_setscheduler",
                            "sched_yield",
                            "seccomp",
                            "select",
                            "semctl",
                            "semget",
                            "semop",
                            "semtimedop",
                            "semtimedop_time64",
                            "send",
                            "sendfile",
                            "sendfile64",
                            "sendmmsg",
                            "sendmsg",
                            "sendto",
                            "setfsgid",
                            "setfsgid32",
                            "setfsuid",
                            "setfsuid32",
                            "setgid",
                            "setgid32",
                            "setgroups",
                            "setgroups32",
                            "setitimer",
                            "setpgid",
                            "setpriority",
                            "setregid",
                            "setregid32",
                            "setresgid",
                            "setresgid32",
                            "setresuid",
                            "setresuid32",
                            "setreuid",
                            "setreuid32",
                            "setrlimit",
                            "set_robust_list",
                            "setsid",
                            "setsockopt",
                            "set_thread_area",
                            "set_tid_address",
                            "setuid",
                            "setuid32",
                            "setxattr",
                            "shmat",
                            "shmctl",
                            "shmdt",
                            "shmget",
                            "shutdown",
                            "sigaltstack",
                            "signalfd",
                            "signalfd4",
                            "sigprocmask",
                            "sigreturn",
                            "socketcall",
                            "socketpair",
                            "splice",
                            "stat",
                            "stat64",
                            "statfs",
                            "statfs64",
                            "statx",
                            "symlink",
                            "symlinkat",
                            "sync",
                            "sync_file_range",
                            "syncfs",
                            "sysinfo",
                            "tee",
                            "tgkill",
                            "time",
                            "timer_create",
                            "timer_delete",
                            "timer_getoverrun",
                            "timer_gettime",
                            "timer_gettime64",
                            "timer_settime",
                            "timer_settime64",
                            "timerfd_create",
                            "timerfd_gettime",
                            "timerfd_gettime64",
                            "timerfd_settime",
                            "timerfd_settime64",
                            "times",
                            "tkill",
                            "truncate",
                            "truncate64",
                            "ugetrlimit",
                            "umask",
                            "uname",
                            "unlink",
                            "unlinkat",
                            "utime",
                            "utimensat",
                            "utimensat_time64",
                            "utimes",
                            "vfork",
                            "vmsplice",
                            "wait4",
                            "waitid",
                            "waitpid",
                            "write",
                            "writev"
                        ],
                        "action": "SCMP_ACT_ALLOW"
                    },
                    {
                        "names": [
                            "socket"
                        ],
                        "action": "SCMP_ACT_ALLOW",
                        "args": [
                            {
                                "index": 0,
                                "value": 40,
                                "op": "SCMP_CMP_NE"
                            }
                        ]
                    },
                    {
                        "names": [
                            "personality"
                        ],
                        "action": "SCMP_ACT_ALLOW",
                        "args": [
                            {
                                "index": 0,
                                "value": 0,
                                "op": "SCMP_CMP_EQ"
                            }
                        ]
                    },
                    {
                        "names": [
                            "personality"
                        ],
                        "action": "SCMP_ACT_ALLOW",
                        "args": [
                            {
                                "index": 0,
                                "value": 8,
                                "op": "SCMP_CMP_EQ"
                            }
                        ]
                    },
                    {
                        "names": [
                            "personality"
                        ],
                        "action": "SCMP_ACT_ALLOW",
                        "args": [
                            {
                                "index": 0,
                                "value": 131072,
                                "op": "SCMP_CMP_EQ"
                            }
                        ]
                    },
                    {
                        "names": [
                            "personality"
                        ],
                        "action": "SCMP_ACT_ALLOW",
                        "args": [
                            {
                                "index": 0,
                                "value": 131080,
                                "op": "SCMP_CMP_EQ"
                            }
                        ]
                    },
                    {
                        "names": [
                            "personality"
                        ],
                        "action": "SCMP_ACT_ALLOW",
                        "args": [
                            {
                                "index": 0,
                                "value": 4294967295,
                                "op": "SCMP_CMP_EQ"
                            }
                        ]
                    },
                    {
                        "names": [
                            "process_vm_readv",
                            "process_vm_writev",
                            "ptrace"
                        ],
                        "action": "SCMP_ACT_ALLOW"
                    },
                    {
                        "names": [
                            "arch_prctl",
                            "modify_ldt"
                        ],
                        "action": "SCMP_ACT_ALLOW"
                    },
                    {
                        "names": [
                            "chroot"
                        ],
                        "action": "SCMP_ACT_ALLOW"
                    },
                    {
                        "names": [
                            "clone"
                        ],
                        "action": "SCMP_ACT_ALLOW",
                        "args": [
                            {
                                "index": 0,
                                "value": 2114060288,
                                "op": "SCMP_CMP_MASKED_EQ"
                            }
                        ]
                    },
                    {
                        "names": [
                            "clone3"
                        ],
                        "action": "SCMP_ACT_ERRNO",
                        "errnoRet": 38
                    }
                ]
            },
            "maskedPaths": [
                "/proc/acpi",
                "/proc/asound",
                "/proc/kcore",
                "/proc/keys",
                "/proc/latency_stats",
                "/proc/timer_list",
                "/proc/timer_stats",
                "/proc/sched_debug",
                "/sys/firmware",
                "/sys/devices/virtual/powercap",
                "/proc/scsi"
            ],
            "readonlyPaths": [
                "/proc/bus",
                "/proc/fs",
                "/proc/irq",
                "/proc/sys",
                "/proc/sysrq-trigger"
            ]
        }
    }
}
```
:::

## Hướng dẫn sử dụng docker và docker compose để 2 hoặc N container tham gia cùng một network namespace.
### Chạy với docker cmd
Mình sẽ thực hiện mô phỏng pod của k8s với Docker. Bước đầu mình sẽ chạy 1 pause container trước, sau đó khởi chạy các container ứng dụng là Nginx và busybox cùng tham gia vào network namespace của pause container.

####  Chạy pause container
Đầu tiên, mình chạy một container từ image `registry.k8s.io/pause` và đặt tên cho nó, ví dụ `my-pause-container`.
```bash
docker run -d --name my-pause-container registry.k8s.io/pause:3.9
```

- `-d`: Chạy container ở chế độ nền (detached).
- `--name my-pause-container`: Đặt tên cho container để dễ dàng tham chiếu.
- `registry.k8s.io/pause:3.9`: Sử dụng image pause từ registry của Kubernetes.

```bash
docker run -d --name my-pause-container registry.k8s.io/pause:3.9
Unable to find image 'registry.k8s.io/pause:3.9' locally
3.9: Pulling from pause
7d78c0d0d6c8: Pull complete 
Digest: sha256:7031c1b283388d2c2e09b57badb803c05ebed362dc88d84b480cc47f72a21097
Status: Downloaded newer image for registry.k8s.io/pause:3.9
2efbf382f432414471b9482f83b336932b30cbbe93a28bee7a7ef648413c6112
```

#### Chạy Container Ứng dụng thứ nhất (ví dụ: Nginx):
Tiếp theo, khởi chạy container Nginx và cho nó sử dụng chung network và PID namespace của `my-pause-container`.

```bash
docker run -d --name nginx-app --net=container:my-pause-container --pid=container:my-pause-container nginx
```

- `--net=container:my-pause-container`: Yêu cầu container này sử dụng chung network namespace của `my-pause-container`.
- `--pid=container:my-pause-container`: Yêu cầu container này sử dụng chung process namespace.
- `nginx`: Sử dụng image Nginx.

```bash
docker run -d --name nginx-app --net=container:my-pause-container --pid=container:my-pause-container nginx
Unable to find image 'nginx:latest' locally
latest: Pulling from library/nginx
37259e733066: Pull complete 
42b122e31aa6: Pull complete 
004c60765aad: Pull complete 
7243db3466b3: Pull complete 
1184df424fa0: Pull complete 
7482a68d7c64: Pull complete 
6ac604e5e41f: Pull complete 
Digest: sha256:93230cd54060f497430c7a120e2347894846a81b6a5dd2110f7362c5423b4abc
Status: Downloaded newer image for nginx:latest
a7861d3d931d6b5a113519604fdb1ec228c696e2d1eeca70584a02a68da9e60c
```

#### Chạy Container Ứng dụng thứ hai (ví dụ: Busybox để kiểm tra):
Bây giờ, hãy chạy một container `busybox` để kiểm tra xem nó có thể "thấy" container Nginx qua mạng localhost và thấy được pid process của Nginx hay không.
```bash
docker run --rm -it --net=container:my-pause-container --pid=container:my-pause-container busybox sh
```
- `--rm`: Tự động xóa container khi thoát.
- `-it`: Chế độ tương tác.

```bash
docker run --rm -it --net=container:my-pause-container --pid=container:my-pause-container busybox sh
Unable to find image 'busybox:latest' locally
latest: Pulling from library/busybox
189fdd150837: Pull complete 
Digest: sha256:f85340bf132ae937d2c2a763b8335c9bab35d6e8293f70f606b9c6178d84f42b
Status: Downloaded newer image for busybox:latest
/ # 
```

#### Kiểm tra kết nối mạng đến nginx từ localhost và PID

##### Kiểm tra kết nối mạng đến Nginx

```bash
/ # wget -O - localhost
Connecting to localhost (127.0.0.1:80)
writing to stdout
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
-                    100% |*******************************************************************************************************************************************************************************************************************************************************************|   615  0:00:00 ETA
written to stdout
/ # 
```
Bạn sẽ thấy trang chào mừng mặc định của `Nginx`, chứng tỏ hai container đang giao tiếp qua localhost.

##### Kiểm tra PID 
```bash
/ # ps aux
PID   USER     TIME  COMMAND
    1 65535     0:00 /pause
    7 root      0:00 nginx: master process nginx -g daemon off;
   35 101       0:00 nginx: worker process
   36 101       0:00 nginx: worker process
   37 101       0:00 nginx: worker process
   38 101       0:00 nginx: worker process
   39 101       0:00 nginx: worker process
   40 101       0:00 nginx: worker process
   41 root      0:00 sh
   48 root      0:00 ps aux
/ # 
```

Bạn sẽ thấy cả tiến trình nginx và tiến trình pause, xác nhận rằng chúng đang chia sẻ cùng một namespace process.
![Image](@cdn/blog/images/2025-07-08-lam-cach-nao-de-nhieu-container-dung-chung-mot-network-k8s/img_1.png)

### Chạy với docker compose

Cách tiếp cận với ví dụ này đơn giản hơn vì chỉ cần định nghĩa tất cả các container trong một tệp `docker-compose.yml` duy nhất.

##### Tạo tệp `docker-compose.yml`
```yaml
version: '3.8'

services:
  # 1. Pause Container - Đóng vai trò là "khung sườn" của pod
  pause:
    image: registry.k8s.io/pause:3.9
    container_name: my-pause-container

  # 2. Container ứng dụng Nginx
  # Container này sẽ "tham gia" vào network và PID của pause container
  nginx-app:
    image: nginx
    container_name: my-nginx-app
    depends_on:
      - pause
    # Sử dụng network của service 'pause'
    network_mode: "service:pause"
    # Sử dụng không gian tiến trình (PID) của service 'pause'
    pid: "service:pause"

  # 3. Container để kiểm tra
  # Container này cũng tham gia vào network của 'pause' để kiểm tra giao tiếp
  busybox-checker:
    image: busybox
    container_name: my-busybox-checker
    depends_on:
      - pause
      - nginx-app
    network_mode: "service:pause"
    pid: "service:pause"
    # Chạy lệnh để ping localhost (tức là ping nginx-app)
    # và giữ container chạy
    command: >
      sh -c "
        sleep 10;
        echo '--- Pinging nginx on localhost ---';
        wget -O - localhost;
        echo '--- Checking processes ---';
        ps aux;
        sleep infinity;
      "
```

**Giải thích:**
- **pause**: Đây là container "pause" giống như trong ví dụ trước, nó sẽ giữ không gian mạng và PID cho các container khác.
- **nginx-app**: Container Nginx sẽ sử dụng không gian mạng và PID của container `pause`.
  - **depends_on**: [pause]: Đảm bảo container pause được khởi tạo trước.
  - **network_mode: "service:pause"**: Đây là chỉ thị quan trọng . Nó yêu cầu Docker cho container `nginx-app` sử dụng chung không gian mạng (network namespace) của container `pause`. Do đó, nginx-app sẽ có thể được truy cập qua localhost từ các container khác trong "pod" này.
  - **pid**: "service:pause": Điều này yêu cầu container `nginx-app` sử dụng không gian PID của container `pause`, cho phép nó chia sẻ process với pause.
- **busybox-checker**: Container này sẽ kiểm tra kết nối với việc chạy các lệnh `wget` và `ps aux` để chứng minh rằng nó có thể giao tiếp với `nginx-app `qua `localhost` và thấy được các tiến trình của container khác.
  - Depends_on: [pause, nginx-app]: Đảm bảo rằng cả hai container `pause` và `nginx-app` đã sẵn sàng trước khi chạy `busybox-checker`

##### Chạy Docker Compose
Để chạy ứng dụng này, bạn cần lưu tệp `docker-compose.yml` và sau đó chạy lệnh sau trong thư mục chứa tệp:
```bash
docker-compose up -d
```

```bash
docker compose up -d          
[+] Running 4/4
 ✔ Network network_default           Created                                                                                                                                                                                                                                                                      0.1s 
 ✔ Container my-pause-container  Started                                                                                                                                                                                                                                                                      0.2s 
 ✔ Container my-nginx-app        Started                                                                                                                                                                                                                                                                      0.2s 
 ✔ Container my-busybox-checker  Started
```

##### Kiểm tra kết quả
Để xem kết quả kiểm tra từ `busybox-checker`, bạn có thể xem log của nó:
Tuy nhiên, bạn cần đợi khoảng 10s. vì vậy đang chờ sau khi *busybox-checker* khởi động sẽ chờ 10 giây trước khi thực hiện các lệnh kiểm tra.
```bash
docker logs my-busybox-checker
```

```bash
docker logs my-busybox-checker
--- Pinging nginx on localhost ---
Connecting to localhost (127.0.0.1:80)
writing to stdout
-                    100% |********************************|   615  0:00:00 ETA
written to stdout
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
--- Checking processes ---
PID   USER     TIME  COMMAND
    1 65535     0:00 /pause
    7 root      0:00 nginx: master process nginx -g daemon off;
   35 101       0:00 nginx: worker process
   36 101       0:00 nginx: worker process
   37 101       0:00 nginx: worker process
   38 101       0:00 nginx: worker process
   39 101       0:00 nginx: worker process
   40 101       0:00 nginx: worker process
   41 root      0:00 sh -c    sleep 10;   echo '--- Pinging nginx on localhost ---';   wget -O - localhost;   echo '--- Checking processes ---';   ps aux;   sleep infinity; 
   49 root      0:00 ps aux
```

Bạn sẽ thấy kết quả tương tự như khi chạy với Docker CLI, chứng tỏ rằng các container đang chia sẻ cùng một network namespace và PID namespace.
