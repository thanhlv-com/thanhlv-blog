---
footer: true
title: Các câu hỏi phỏng vấn về Spring
authors: ["lethanh"]
date: 2025-07-06
outline: deep
comment: false
group: 3. Spring Framework
---
# Các câu hỏi phỏng vấn

## Spring Framework
### Spring core
###### Spring Framework là gì ?

::: details Câu trả lời
Spring framework là một framework mã nguồn mở được sử dụng để phát triển ứng dụng java được phát hành theo giấy phép Apache 2.0 vào năm 2003.
:::

###### Tại sao hiện tại(2025) chúng ta lại sử dụng Spring Framework nhiều.

::: details Câu trả lời
Spring cung cấp một nền tảng mạnh mẽ và linh họoạt cho việc phát triển ứng dụng Java.


Spring cung cấp các tính năng như quản lý phụ thuộc (`Dependency Injection`), lập trình hướng khía cạnh (`Aspect-Oriented Programming`), và hỗ trợ cho việc phát triển ứng dụng web, `RESTful API`, và nhiều hơn nữa.


Một điều đặc biệt là Spring cung cấp một hệ sinh thái phong phú với nhiều module và thư viện hỗ trợ. Đa số các công nghệ phổ biến đước sử dụng nhiều thì đã đều được Spring hỗ trợ.


Kể các nhiều nền tảng công nghệ mới như `Kotlin`, `Reactive Programming`, `Microservices`, Spring đều có các module hỗ trợ.


Thêm nữa, nếu các thư viện nội bộ hoặc mới chưa hỗ trợ, chúng ta cũng có thể dễ dàng tích hợp chúng vào Spring thông qua các cơ chế mở rộng của nó.

:::

###### Tight coupling ( khớp nối chặt chẽ ) là gì ?

::: details Câu trả lời

Tight coupling (khớp nối chặt chẽ) là một khái niệm trong lập trình mô tả mối quan hệ giữa các thành phần trong một hệ thống. 

Khi một thành phần bị phụ thuộc chặt chẽ vào một thành phần khác, chúng ta gọi đó là tight coupling. 

Ví dụ: 
```java
public class UserService {
    private UserRepository userRepository;

    public UserService() {
        this.userRepository = new UserRepository(); // Tight coupling ( khớp nối chặt chẽ )
    }
}
```
:::

###### Loose coupling ( khớp nối lỏng lẻo ) là gì ?

::: details Câu trả lời


Loose coupling (khớp nối lỏng lẻo) là một khái niệm trong lập trình mô tả mối quan hệ giữa các thành phần trong một hệ thống.

Khi một thành phần không phụ thuộc chặt chẽ vào một thành phần khác, chúng ta gọi đó là loose coupling.

Ví dụ:
```java
public class UserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository; // Loose coupling ( khớp nối lỏng lẻo ), userRepository được tạo từ bên ngoài
    }
}
```
:::

###### Inversion of Control (IoC) là gì ?
::: details Câu trả lời
Inversion of Control (IoC) là một nguyên tắc thiết kế trong lập trình, trong đó quyền kiểm soát việc tạo và quản lý các đối tượng được chuyển giao từ mã nguồn của của bạn sang một framework hoặc một container.

IOC giúp giảm sự phụ thuộc giữa các thành phần trong ứng dụng( Loose coupling ( khớp nối lỏng lẻo ) ), từ đó tạo ra mã nguồn dễ bảo trì và mở rộng hơn.

Trong Spring Framework, IoC được thực hiện thông qua `Dependency Injection (DI)`, trong đó các phụ thuộc của một đối tượng được cung cấp từ bên ngoài thay vì được tạo ra bên trong đối tượng đó.

Điều này cho phép bạn dễ dàng thay đổi các phụ thuộc mà không cần phải thay đổi mã nguồn của đối tượng đó, từ đó tạo ra mã nguồn linh hoạt và dễ kiểm thử hơn.

Ví dụ:
```java
@Service
public class UserService {
    private UserRepository userRepository;

    // Dependency Injection thông qua constructor
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```
:::

###### Spring IoC Container là gì ?



###### Bean là gì trong Spring Framework ?

::: details Câu trả lời
Bean trong Spring Framework là một đối tượng được quản lý bởi Spring IoC Container.
Bean có thể là bất kỳ đối tượng nào mà bạn muốn Spring quản lý, từ các service, repository, controller cho đến các đối tượng đơn giản.
Bean được định nghĩa trong các file cấu hình của Spring, có thể là file XML hoặc thông qua các annotation như `@Component`, `@Service`, `@Repository`, `@Controller`, v.v.

Bean được tạo ra và quản lý bởi Spring IoC Container, cho phép bạn dễ dàng tiêm phụ thuộc (Dependency Injection) và quản lý vòng đời của các đối tượng trong ứng dụng.

Ví dụ tạo bean bằng annotation:
```java
@Service
public class UserService {
}
```

Ví dụ tạo bean bằng method `@Bean`:

```java
@Configuration
public class AppConfig {

    // Định nghĩa một bean UserService
    @Bean
    public UserService userService() {
        return new UserService();
    }
}

```
:::

###### Dependency Injection (DI) là gì ?
::: details Câu trả lời
Từ cái tên chắc cũng đã mô tả rõ ràng "Tiêm phụ thuộc".

Dependency Injection (DI) là một kỹ thuật trong lập trình, trong đó các phụ thuộc của một đối tượng được cung cấp từ bên ngoài thay vì được tạo ra bên trong đối tượng đó.

Điều này giúp giảm sự phụ thuộc giữa các thành phần trong ứng dụng (Loose coupling ( khớp nối lỏng lẻo )), từ đó tạo ra mã nguồn dễ bảo trì và mở rộng hơn.

Trong Spring Framework, DI được thực hiện thông qua các annotation như `@Autowired`, `@Inject` hoặc thông qua constructor.

Ví dụ:
```java
@Service
public class UserService {
    private UserRepository userRepository;

    // Dependency Injection thông qua constructor
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```
:::

###### Các loại Dependency Injection trong Spring Framework ?

::: details Câu trả lời
Trong Spring Framework, có ba loại Dependency Injection chính:
1. **Constructor Injection**: Phụ thuộc được cung cấp thông qua constructor của class.
 ```java
 @Service
 public class UserService {
     private UserRepository userRepository;

     @Autowired
    // Khi khởi tạo UserService, Spring sẽ tự động tìm kiếm bean UserRepository tiêm UserRepository vào đây
     public UserService(UserRepository userRepository) {
         this.userRepository = userRepository;
     }
 }
 ```
2. **Setter Injection**: Phụ thuộc được cung cấp thông qua phương thức setter.
```java
@Service
public class UserService {
    private UserRepository userRepository;

    @Autowired
    // Spring sẽ tự động gọi phương thức này và sẽ tự động tìm kiếm bean UserRepository để tiêm UserRepository vào đây
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```
3. **Field Injection**: Phụ thuộc được cung cấp trực tiếp vào trường của class.
```java
@Service
public class UserService {

    // Spring sẽ tự động tìm kiếm bean UserRepository để tiêm UserRepository vào đây
    @Autowired
    private UserRepository userRepository; 
}
```
:::

###### Spring sử dụng kỹ thuật nào để thực hiện Dependency Injection ?
::: details Câu trả lời
Spring sử dụng kỹ thuật **Reflection** để thực hiện Dependency Injection.
Reflection cho phép Spring truy cập và thay đổi các thành phần của class, bao gồm các trường, phương thức và constructor, mà không cần biết trước về chúng.
Điều này cho phép Spring tự động tìm kiếm và tiêm các phụ thuộc vào các class mà không cần phải viết mã cụ thể cho từng class.

Reflection cũng cho phép Spring thực hiện các tính năng như AOP (Aspect-Oriented Programming) và tạo ra các proxy cho các bean, từ đó cung cấp các tính năng như transaction management, security, và nhiều hơn nữa.

Ví dụ đơn giản về tiêm phụ thuộc thông qua Reflection: (Thực tế sẽ phức tạp hơn nhiều)
```java
// Lớp phụ thuộc
class EmailService {
    public void sendEmail(String message) {
        System.out.println("Đang gửi email: " + message);
    }
}

// Lớp chính cần được tiêm phụ thuộc
class UserController {
    // Trường này sẽ được tiêm bằng Reflection
    private EmailService emailService;

    public void sendNotification() {
        if (emailService != null) {
            emailService.sendEmail("Chào mừng người dùng mới!");
        } else {
            System.out.println("EmailService chưa được tiêm!");
        }
    }
}

public class DependencyInjector {

  public static void main(String[] args) {
    // 1. Tạo các đối tượng cần thiết
    UserController userController = new UserController();
    System.out.println("-> Trước khi tiêm:");
    userController.sendNotification(); // Sẽ in ra "EmailService chưa được tiêm!"

    // 2. Bắt đầu quá trình tiêm bằng Reflection
    try {
      // Tạo đối tượng phụ thuộc sẽ được tiêm
      EmailService emailServiceToInject = new EmailService();

      // Lấy thông tin về trường 'emailService' trong lớp UserController
      Field emailServiceField = UserController.class.getDeclaredField("emailService");

      // Cho phép truy cập vào trường 'private'
      // Đây là bước then chốt của Reflection
      emailServiceField.setAccessible(true);

      // Thực hiện hành động "tiêm": gán đối tượng emailServiceToInject
      // vào trường emailServiceField của đối tượng userController
      emailServiceField.set(userController, emailServiceToInject);

    } catch (NoSuchFieldException | IllegalAccessException e) {
      e.printStackTrace();
    }

    // 3. Kiểm tra kết quả sau khi tiêm
    System.out.println("\n-> Sau khi tiêm:");
    userController.sendNotification(); // Bây giờ sẽ hoạt động!
  }
}

```
:::


