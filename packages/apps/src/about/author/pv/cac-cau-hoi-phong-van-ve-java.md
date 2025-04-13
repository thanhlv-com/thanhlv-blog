---
footer: true
title: Các câu hỏi phỏng vấn về Java
authors: ["lethanh"]
date: 2025-03-30
outline: deep
comment: false
group: 2. Java
---
# Các câu hỏi phỏng vấn

## Java
### Java core
###### Nêu 4 tính chất của OOP

::: details Câu trả lời
**1. Kế thừa** :
- Class con có thể kế thừa tất cả các thuộc tính cũng như method của class cha, các class con có thể override các method của class cha để nâng cấp và phát triển thêm.
- Kế thừa cho phép class mở rộng các đặc tính có sẵn mà không cần phải định nghĩa lại.
- Chúng ta không thể khởi tạo một object cha và tham chiếu đến type của con. Bởi vì khi đó con sẽ không được khởi tạo. ===> `Con c = new Cha();`
    ::: details Ví dụ
    - Lớp cha động vật(`Animal`) sẽ có tên và hành động ăn và ngủ
    - Các loài động vật khác như `Dog` và `Cat` đều kế thừa từ cha và đều có `hành động ăn và ngủ` nhưng `DOg có thể sủa` và `Cat kêu meo meo`
    ```plantuml
      @startuml
     class Animal {
     - String name
     + Animal(String name)
     + void eat()
     + void sleep()
     }
     
     class Dog {
     + Dog(String name)
     + void bark()
     }
     
     class Cat {
     + Cat(String name)
     + void meow()
     }
     
     
     Animal <|-- Dog
     Animal <|-- Cat
     
     @enduml
    ```
    ```java
       // Lớp cha Animal
       class Animal {
           // Thuộc tính của lớp Animal
           protected String name;
       
           // Constructor của lớp Animal
           public Animal(String name) {
               this.name = name;
           }
       
           // method của lớp Animal
           public void eat() {
               System.out.println(name + " is eating.");
           }
       
           public void sleep() {
               System.out.println(name + " is sleeping.");
           }
       }
       
       // Lớp con Dog kế thừa từ lớp Animal
       class Dog extends Animal {
           // Constructor của lớp Dog
           public Dog(String name) {
               super(name); // Gọi constructor của lớp cha
           }
       
           // method riêng của lớp Dog
           public void bark() {
               System.out.println(name + " is barking.");
           }
       }
       
       // Lớp con Cat kế thừa từ lớp Animal
       class Cat extends Animal {
           // Constructor của lớp Cat
           public Cat(String name) {
               super(name); // Gọi constructor của lớp cha
           }
       
           // method riêng của lớp Cat
           public void meow() {
               System.out.println(name + " is meowing.");
           }
       }
       
       // Lớp Main để kiểm tra
       public class Main {
           public static void main(String[] args) {
               // Tạo object Dog
               Dog dog = new Dog("Buddy");
               dog.eat();   // Gọi method từ lớp cha
               dog.sleep(); // Gọi method từ lớp cha
               dog.bark();  // Gọi method riêng của lớp Dog
       
               // Tạo object Cat
               Cat cat = new Cat("Whiskers");
               cat.eat();   // Gọi method từ lớp cha
               cat.sleep(); // Gọi method từ lớp cha
               cat.meow();  // Gọi method riêng của lớp Cat
           }
       }
    ```
    :::
**2. Đóng gói**:
  - Là việc gói các dữ liệu(thuộc tính) và tạo ra các method hoạt động trên dữ liệu đó.
  - Mục đích của đóng gói che giấu chi tiết về một object và chỉ cho phép tương tác với object thông qua các method.
  - Đóng gói sẽ giúp bảo vệ dữ liệu của object không bị truy cập hoặc thay đổi bất hợp pháp từ bên ngoài.
  - Tùy ngôn ngữ mà đóng gói sẽ thể hiện khác nhau, tuy nhiên đa phần là `thuộc tính được đặt quyền truy cập private `và có `getter` và `setter`
    ::: details Ví dụ
    Đảm bảo về thay đổi dữ liệu của age phải lớn hơn 0.
       ```plantuml
        @startuml
        class Person {
        - String name
        - int age
        + String getName()
        + void setName(String name)
        + int getAge()
        + void setAge(int age)
        + void displayInfo()
        }
        
        note right of Person::setAge
        Kiểm tra tuổi phải lớn hơn 0
        nếu không sẽ in ra cảnh báo.
        end note
        
        note right of Person::displayInfo
        Hiển thị thông tin của Person
        bao gồm name và age.
        end note
        @enduml
       ```
       ```java
        // Lớp Person với các thuộc tính private
            public class Person {
              // Các thuộc tính private
              private String name;
              private int age;
         
              // Getter cho thuộc tính name
              public String getName() {
                 return name;
              }
              // Setter cho thuộc tính name
              public void setName(String name) {
                 this.name = name;
              }
              // Getter cho thuộc tính age
              public int getAge() {
                 return age;
              }
              // Setter cho thuộc tính age
              public void setAge(int age) {
                if (age > 0) { // Kiểm tra tuổi phải lớn hơn 0
                  this.age = age;
                } else {
                  System.out.println("Age must be positive.");
                }
              }
              // method hiển thị thông tin của Person
              public void displayInfo() {
                System.out.println("Name: " + name);
              System.out.println("Age: " + age);
              }
            }
       
           // Lớp Main để kiểm tra
           public class Main {
               public static void main(String[] args) {
                   // Tạo object Person
                   Person person = new Person("John Doe", 30);
                   // Hiển thị thông tin của Person
                   person.displayInfo();
                   // Thay đổi giá trị của thuộc tính name và age thông qua setter
                   person.setName("Jane Doe");
                   person.setAge(25);
                   // Hiển thị lại thông tin của Person sau khi thay đổi
                   person.displayInfo();
               }
           }
       ```
    :::
**3. Đa hình**:
    Đa hình là các method có cùng tên nhưng tùy vào hoàn cảnh sẽ có cách thức hoạt động khác nhau.
    Đa hình có 2 kiểu là `override` và `overloading`
  - **Override**: Khi một class con kế thừa một class cha, nó khả năng ghi đè hành động của cha để hành động ở con sẽ khác với cha.
    ::: details Ví dụ
    - Nhìn ở ví dụ dưới, có một method ở cha là `makeSound`. Class `Dog` và `Cat` đều kế thừa từ `Animal` với override `makeSound` để với Dog và Cat sẽ kêu khác nhau
     ```java
     // Lớp cha Animal
     class Animal {
         // Thuộc tính của lớp Animal
         protected String name;
     
         // Constructor của lớp Animal
         public Animal(String name) {
             this.name = name;
         }
     
         // method của lớp Animal
         public void makeSound() {
             System.out.println(name + " is making a sound.");
         }
     }
     
     // Lớp con Dog kế thừa từ lớp Animal
     class Dog extends Animal {
         // Constructor của lớp Dog
         public Dog(String name) {
             super(name); // Gọi constructor của lớp cha
         }
     
         // Ghi đè method makeSound của lớp cha
         @Override
         public void makeSound() {
             System.out.println(name + " is barking.");
         }
     }
     
     // Lớp con Cat kế thừa từ lớp Animal
     class Cat extends Animal {
         // Constructor của lớp Cat
         public Cat(String name) {
             super(name); // Gọi constructor của lớp cha
         }
     
         // Ghi đè method makeSound của lớp cha
         @Override
         public void makeSound() {
             System.out.println(name + " is meowing.");
         }
     }
     
     // Lớp Main để kiểm tra
     public class Main {
         public static void main(String[] args) {
             // Tạo object Dog
             Dog dog = new Dog("Buddy");
             dog.makeSound(); // Gọi method makeSound đã được ghi đè
     
             // Tạo object Cat
             Cat cat = new Cat("Whiskers");
             cat.makeSound(); // Gọi method makeSound đã được ghi đè
         }
     }
     ```
    :::
  - **Overload method**: Hay dịch tiếng việt là **Nạp chồng method** là một kỹ thuật cho phép một method có nhiều phiên bản(Version) có cùng tên trong một class nhưng khác nhau về param.
    - Các param kể đến là khác nhau về số lượng, kiểu dữ liệu.
    - Mục đích của Overload là để tăng tính linh hoạt và khả năng mở rộng của code, giúp các method có thể sử lý các tính huống khác nhau.
      ::: details Ví dụ 1
      - Ví dụ đầu tiên đơn giản trong Java đó là StringBuilder
      - Cùng một method tên là `append` nhưng chấp nhận nhiều kiểu dữ liệu.
        ![java-javacore-oop-overload.png](https://static-cdn.thanhlv.com/blog/images/2024-07-16-cac-cau-hoi-phong-van/java-javacore-oop-overload.png)
        :::
        ::: details Ví dụ 2
      - Ví dụ thứ 2 là về tính tổng các số.
       ```java
       public class MathUtils {
       
           // method tính tổng hai số nguyên
           public int add(int a, int b) {
               return a + b;
           }
       
           // method tính tổng ba số nguyên
           public int add(int a, int b, int c) {
               return a + b + c;
           }
       
           // method tính tổng hai số thực
           public double add(double a, double b) {
               return a + b;
           }
       
           // method tính tổng ba số thực
           public double add(double a, double b, double c) {
               return a + b + c;
           }
       
           public static void main(String[] args) {
               MathUtils mathUtils = new MathUtils();
               
               // Sử dụng các method nạp chồng
               System.out.println("Sum of 2 and 3: " + mathUtils.add(2, 3)); // Gọi method add(int, int)
               System.out.println("Sum of 2, 3 and 4: " + mathUtils.add(2, 3, 4)); // Gọi method add(int, int, int)
               System.out.println("Sum of 2.5 and 3.5: " + mathUtils.add(2.5, 3.5)); // Gọi method add(double, double)
               System.out.println("Sum of 2.5, 3.5 and 4.5: " + mathUtils.add(2.5, 3.5, 4.5)); // Gọi method add(double, double, double)
           }
       }
       
       ```
      :::
**4. Trừu tượng**:
  - Tính trừu tượng liên quan đến việc ẩn dấu chi tiết của object mà chỉ cung cấp các thuộc tính và method cần thiết để sử dụng object đó.
  - Trừu tượng sẽ giúp người dùng tập trung cho việc object đó sẽ hỗ trợ làm những gì thay vì cách thức object đó làm.
  - Đối với java, tính trừu tượng được thể hiển bằng cách sử dụng `abstract class` hoặc `interface`
    ::: details Ví dụ 1 về `Abstract class`
       ```java
       // Lớp trừu tượng Animal được khai báo với keyword abstract
       abstract class Animal {
           // method trừu tượng được khai báo với keyword abstract
           abstract void makeSound();
           
           // method không trừu tượng
           public void sleep() {
               System.out.println("Zzz...");
           }
       }
       // Lớp Dog kế thừa từ lớp trừu tượng Animal
       class Dog extends Animal {
           // Triển khai method trừu tượng
           void makeSound() {
               System.out.println("Woof woof");
           }
       }
       // Lớp Cat kế thừa từ lớp trừu tượng Animal
       class Cat extends Animal {
           // Triển khai method trừu tượng
           void makeSound() {
               System.out.println("Meow meow");
           }
       }
       public class Main {
           public static void main(String[] args) {
               Animal dog = new Dog();
               Animal cat = new Cat();
               
               dog.makeSound(); // In ra "Woof woof"
               cat.makeSound(); // In ra "Meow meow"
               
               dog.sleep(); // In ra "Zzz..."
               cat.sleep(); // In ra "Zzz..."
           }
       }
       ```
    :::
    ::: details Ví dụ 2 về `interface`
      ```
       // Giao diện Animal
       interface Animal {
           void makeSound();
           void sleep();
       }
       
       // Lớp Dog triển khai giao diện Animal
       class Dog implements Animal {
           public void makeSound() {
               System.out.println("Woof woof");
           }
           
           public void sleep() {
               System.out.println("Zzz...");
           }
       }
       
       // Lớp Cat triển khai giao diện Animal
       class Cat implements Animal {
           public void makeSound() {
               System.out.println("Meow meow");
           }
           
           public void sleep() {
               System.out.println("Zzz...");
           }
       }
       
       public class Main {
           public static void main(String[] args) {
               Animal dog = new Dog();
               Animal cat = new Cat();
               
               dog.makeSound(); // In ra "Woof woof"
               cat.makeSound(); // In ra "Meow meow"
               
               dog.sleep(); // In ra "Zzz..."
               cat.sleep(); // In ra "Zzz..."
           }
       }
       
       ```
    :::
  - Khi nào sử dụng `abstract class` hoặc `interface`
  - **Abstract class**: Nếu bạn muốn định nghĩa một class cha cho tất cả các class có cùng bản chất, một số thuộc tính và method giống nhau thì bạn có thể sử dụng `Abstract class`.
    ::: details Ví dụ về `abstract class`
      ```
      // Lớp trừu tượng Animal
      abstract class Animal {
          // Các thuộc tính chung của tất cả loài động vật
          protected String name;
          protected int age;
          
          // Constructor
          public Animal(String name, int age) {
              this.name = name;
              this.age = age;
          }
          
          // method trừu tượng mà mỗi con vật sẽ khác nhau
          abstract void makeSound();
          
          // method không trừu tượng các côn vật có hành động giống nhau
          public void sleep() {
              System.out.println(name + " is sleeping. Zzz...");
          }
          
          // method để in thông tin về động vật
          public void printInfo() {
              System.out.println("Name: " + name);
              System.out.println("Age: " + age);
          }
      }
      
      // Lớp Dog kế thừa từ lớp trừu tượng Animal
      class Dog extends Animal {
          // Constructor
          public Dog(String name, int age) {
              super(name, age);
          }
          
          // Triển khai method trừu tượng về cách kêu của Dog là gau gau
          @Override
          void makeSound() {
              System.out.println(name + " says: Woof woof");
          }
          
          // method riêng của Dog cho việc đi lấy bóng
          public void fetch() {
              System.out.println(name + " is fetching the ball.");
          }
          // method riêng của Dog cho việc vẫy đuôi
          public void wagTail() {
              System.out.println(name + " is wagging its tail.");
          }
      }
      
      // Lớp Cat kế thừa từ lớp trừu tượng Animal
      class Cat extends Animal {
          // Constructor
          public Cat(String name, int age) {
              super(name, age);
          }
          
          // Triển khai method trừu tượng về cách kêu của Cat là meo meo
          @Override
          void makeSound() {
              System.out.println(name + " says: Meow meow");
          }
          
          // method riêng của Cat cho việc cào đồ vật
          public void scratch() {
              System.out.println(name + " is scratching the furniture.");
          }
      }
      
      public class Main {
          public static void main(String[] args) {
              Animal dog = new Dog("Buddy", 3);
              Animal cat = new Cat("Whiskers", 2);
              
              // Thông tin và hành vi của chó
              dog.printInfo();
              dog.makeSound();
              dog.sleep();
              
              // Gọi method riêng của Dog
              ((Dog) dog).fetch();
              ((Dog) dog).wagTail();
              
              System.out.println();
              
              // Thông tin và hành vi của mèo
              cat.printInfo();
              cat.makeSound();
              cat.sleep();
              
              // Gọi method riêng của Cat
              ((Cat) cat).scratch();
          }
      }
      ```
    :::
    - Khi thiết kế `Abstract class` chúng ta sẽ nghĩ về kiểu của object. Ví dụ thiết kế `Abstract class` cho object `Animal` thì đối với một `Animal` sẽ có các` thuộc tính` và `method chung nào`
  - **Interface**: Với interface chúng ta có thể sử dụng để định nghĩa các chức năng mà class sẽ hỗ trợ.
    ::: details Ví dụ 1 về `Interface`
       ```java
       interface Drawable {
           void draw();
       }
       
       class Circle implements Drawable {
           public void draw() {
               System.out.println("Drawing a circle");
           }
       }
       
       class Rectangle implements Drawable {
           public void draw() {
               System.out.println("Drawing a rectangle");
           }
       }
       
       ```
    :::
    - Khi thiết kế `Interface` chúng ta sẽ nghĩ về chức năng hoặc hành động sẽ hỗ trợ chữ không xác định rõ kiểu object.
  - Ví dụ về kết hợp cả `abstract class` và `interface`
    ::: details Ví dụ về kết hợp cả `abstract class` và `interface`
       ```
       // Interface chung AnimalBehavior cho tất cả động vật
       interface AnimalBehavior {
           void makeSound();
           void move();
       }
       
       // Interface riêng cho Dog
       interface DogBehavior {
           void fetch();
           void wagTail();
       }
       
       // Interface riêng cho Cat
       interface CatBehavior {
           void scratch();
           void purr();
       }
       
       // Abstract class Animal
       abstract class Animal implements AnimalBehavior {
           protected String name; // thuộc tính chung
           protected int age; // thuộc tính chung
           
           public Animal(String name, int age) {
               this.name = name;
               this.age = age;
           }
           
           public void sleep() {
               System.out.println(name + " is sleeping. Zzz...");
           }
           
           public void printInfo() {
               System.out.println("Name: " + name);
               System.out.println("Age: " + age);
           }
       }
       
       // Lớp Dog kế thừa từ abstract class Animal và triển khai DogBehavior
       class Dog extends Animal implements DogBehavior {
           public Dog(String name, int age) {
               super(name, age);
           }
           
           @Override
           public void makeSound() {
               System.out.println(name + " says: Woof woof");
           }
           
           @Override
           public void move() {
               System.out.println(name + " is running.");
           }
           
           @Override
           public void fetch() {
               System.out.println(name + " is fetching the ball.");
           }
           
           @Override
           public void wagTail() {
               System.out.println(name + " is wagging its tail.");
           }
       }
       
       // Lớp Cat kế thừa từ abstract class Animal và triển khai CatBehavior
       class Cat extends Animal implements CatBehavior {
           public Cat(String name, int age) {
               super(name, age);
           }
           
           @Override
           public void makeSound() {
               System.out.println(name + " says: Meow meow");
           }
           
           @Override
           public void move() {
               System.out.println(name + " is stalking.");
           }
           
           @Override
           public void scratch() {
               System.out.println(name + " is scratching the furniture.");
           }
           
           @Override
           public void purr() {
               System.out.println(name + " is purring.");
           }
       }
       ```
    :::
:::

##### String Pool là gì ?
::: details Câu trả lời
String Pool, hay còn gọi là String Constant Pool, là một vùng nhớ đặc biệt trong bộ nhớ Heap của Java Virtual Machine (JVM) được sử dụng để lưu trữ các chuỗi ký tự (String literals). Tạo String bằng tón tử `=`

Mục đích chính của String Pool là để tối ưu hóa việc sử dụng bộ nhớ và tăng hiệu suất bằng cách tái sử dụng các object String giống nhau. Điều này giúp giảm việc tạo ra nhiều bản sao của cùng một chuỗi trong bộ nhớ.

Dưới đây là một số điểm quan trọng về String Pool:

 - Vị trí: String Pool nằm trong vùng nhớ Heap. Trước Java 7, nó nằm trong vùng nhớ PermGen (Permanent Generation), nhưng từ Java 7 trở đi, nó được chuyển vào vùng nhớ Heap chính.

 - Chỉ chứa String literals: String Pool chỉ lưu trữ các chuỗi được tạo ra bằng cách sử dụng String literals (ví dụ: "hello") chứ không phải các object String được tạo bằng toán tử new (ví dụ: new String("hello")).
 - method intern(): Đối với các object String được tạo bằng toán tử new, bạn có thể sử dụng method intern() để đưa object đó vào String Pool (nếu nó chưa tồn tại) hoặc lấy tham chiếu đến object đã tồn tại trong Pool.
  ```java
public static void main(String[] args) {
  // Ví dụ 1
  String a = "Việt Nam Vô Địch";
  a = "Việt Nam Vô Địch";
  final String b = "Việt Nam Vô Địch";
  final String c = new String("Việt Nam Vô Địch");
  System.out.printf("a==b: %b\n", a == b);
  System.out.printf("a==c: %b\n", a == c);
  // Câu hỏi 1: Tạo ra mấy object String trong bộ nhớ ?
  // Câu hỏi 2: Kết quả in ra là gì ?

  // Ví dụ 2
  Integer d = 1;
  Integer e = 1;
  System.out.printf("d==e: %b\n", d == e);
  d = 500;
  e = 500;
  System.out.printf("d==e: %b\n", d == e);
  // Câu hỏi 3: Tạo ra mấy object Integer trong bộ nhớ ?
  // Câu hỏi 4: Kết quả in ra là gì ?

  /**
   * 1: Tạo ra 2 object String trong bộ nhớ
   * 2: true và false
   * 3: Không tạo thêm object, bởi vì mặc định Integer sẽ tạo ra 1 object trong cache từ -128 đến 127
   * 4: true và false vì 500 không nằm trong cache nên sẽ tạo ra 2 object khác nhau
   *  Vì sao ??: Vì Phạm vi từ -128 đến 127 là một phạm vi phổ biến trong khoa học máy tính, liên quan đến biểu diễn của số nguyên 8-bit có dấu. Phạm vi này thường bao gồm các giá trị được sử dụng thường xuyên nhất trong lập trình máy tính
   */
}
  ```
:::

#### Tính bất biến ( Immutable ) của String là gì? Vì sao cần String là bất biến?
::: details Câu trả lời
String là bất biến (Immutable) có nghĩa là một khi một object String đã được tạo ra, nó không thể thay đổi giá trị của nó. Điều này có nghĩa là mỗi lần bạn thay đổi giá trị của một chuỗi, JVM sẽ tạo ra một object String mới trong bộ nhớ Heap thay vì thay đổi trực tiếp giá trị của object cũ.
:::

#### Có thể phá vỡ nguyên tắc Immutable của String dể thay đổi giá trị của một object String sau khi đã tạo không?
::: details Câu trả lời
 Có, có thể sử dụng kỹ thuật Reflection để thay đổi. 
:::

#### Nếu thay đổi một object String thì sẽ có nguy cơ gì xảy ra ?
::: details Câu trả lời
 - Có thể dẫn đến dữ liệu không chính xác, ví dụ bạn muốn giá trị là "hello" nhưng bạn lại nhận được giá trị khác. 
 - Bởi vì khi gán lại giá trị java sẽ tìm trong cache trong String pool, khi đó giá trị đã bị sai.
 - Ví dụ:
```java
public static void main(String[] args) throws Exception {
    String originalString = "Hello";
    System.out.println("Chuỗi ban đầu: " + originalString);

    // Lấy trường 'value' (tên trường có thể thay đổi tùy thuộc vào phiên bản JVM)
    Field valueField = String.class.getDeclaredField("value");
    valueField.setAccessible(true);

    // Tạo một mảng char mới với giá trị mong muốn
    char[] newValue = {'W', 'o', 'r', 'l', 'd'};

    // Thay đổi giá trị của trường 'value'
    valueField.set(originalString, newValue);

    // In lại chuỗi ==> Kết quả: "World"
    System.out.println("Chuỗi sau khi thay đổi (bằng reflection): " + originalString);

    // Thử in lại một tham chiếu khác đến cùng chuỗi (String pool)
    String anotherString = "Hello";
    // In chuỗi anotherString ==> Kết quả: "World", dữ liệu đã bị sai
    System.out.println("Một tham chiếu khác đến 'Hello': " + anotherString);
}
```
:::

#### So sánh interface và abstract class
::: details Câu trả lời
 - Abstract class:
   - Là một class cha cho tất cả các class con có cùng bản chất. Bản chất ở đây có thể là các thuộc tính và method giống nhau.
   - Ví dụ: Abstract class `Phone` có các thuộc tính `name` và `hãng` và method `call()`
     - Chúng ta có thể tạo ra các class con như `Iphone`, `Samsung`, `Nokia` kế thừa từ `Phone` và override method `call()`
 - Interface : Là một interface chứa các method mà class sẽ hỗ trợ.
   - Ví dụ: Interface `IhponeBluetooth` có method `AirDrop()`, `carPlay()
     - Class `Iphone` sẽ implement `IphoneBluetooth` và triển khai các method `AirDrop()`, `CarPlay()``
   - Ví dụ : Interface `SamssungBluetooth` có method `SamsungPay()`, `SamsungHealth()`
     - Class `Samsung` sẽ implement `SamsungBluetooth` và triển khai các method `SamsungPay()`, `SamsungHealth()`

Interface thường được sửa dụng để tạo 1 bản thiết kế các chức năng cho các class.

Còn nếu chúng ta cần tạo 1 bản thiết kế tổng thể và chi tiết thì sử dụng Abstract class.
:::

#### Khác nhau giữa toán tử == và method equals
::: details Câu trả lời
 - Toán tử `==`:
   - Toán tử `==` được sử dụng để so sánh 2 tham chiếu đến object trong bộ nhớ Heap.
   - Nếu 2 tham chiếu trỏ đến cùng 1 object thì kết quả trả về là `true`, ngược lại trả về `false`.
   - Ví dụ:
     ```java
     String a = "hello";
     String b = "hello";
     System.out.println(a == b); // true
     ```
 - Method `equals()`:
   - Method `equals()` được sử dụng để so sánh 2 object dựa trên nội dung của chúng.
   - Method `equals()` được định nghĩa trong class `Object` và được override bởi các class con.
   - Ví dụ:
     ```java
     String a = "hello";
     String b = new String("hello");
     System.out.println(a.equals(b)); // true
     ```
:::

#### Constructor là gì?
::: details Câu trả lời
Constructor là một method đặc biệt trong Java được sử dụng để khởi tạo object. Constructor có tên giống với tên class và không có kiểu trả về.
:::

#### Có thể Overload Constructor( nạp chồng Constructor) không ?
::: details Câu trả lời
Có, bạn có thể overload Constructor trong Java bằng cách khai báo nhiều Constructor với các danh sách tham số khác nhau.
:::

#### Từ khóa this trong java là gì ?
::: details Câu trả lời
Từ khóa `this` trong Java được sử dụng để tham chiếu đến object hiện tại. Nó có thể được sử dụng để truy cập các thuộc tính và method của object hiện tại.
:::

#### Sự khác nhau giữa JDK, JRE và JVM?
::: details Câu trả lời
 - **JVM (Java Virtual Machine)**: JVM là một máy ảo Java, nó là một phần của Java Runtime Environment (JRE). JVM thực thi các chương trình Java bằng cách chuyển mã Java thành mã máy.
 - **JRE (Java Runtime Environment)**: JRE bao gồm JVM, các thư viện Java và các file cần thiết để chạy các ứng dụng Java như các file .class.
 - **JDK (Java Development Kit)**: JDK bao gồm JRE và các công cụ phát triển Java như `javac`, `java`, `jar`,...
:::

#### từ phiên bản bao nhiêu JVM và JRE gộp lại ?
::: details Câu trả lời
Từ phiên bản Java 11, JDK và JRE đã được gộp lại thành một bản duy nhất.
:::

#### Các Access modifier ( phạm vi truy cập )  trong java.
::: details Câu trả lời
Java cung cấp 4 loại Access modifier (phạm vi truy cập) để kiểm soát việc truy cập vào các thành phần của class:
 - **private**: Chỉ có thể truy cập từ bên trong class.
 - **default (không có modifier)**: Chỉ có thể truy cập từ bên trong package.
 - **protected**: Chỉ có thể truy cập từ bên trong package và các class con.
 - **public**: Có thể truy cập từ bất kỳ nơi nào.
:::

#### Có bao nhiêu loại biến trong Java?
::: details Câu trả lời
Trong Java, có 3 loại biến:
 - **Local variables (biến cục bộ)**: Biến được khai báo bên trong một method và chỉ có thể truy cập từ bên trong method đó.
 - **Instance variables (biến instance hoặc biến của object)**: Biến được khai báo bên trong class nhưng bên ngoài method và được sử dụng để lưu trữ trạng thái của object.
 - **Static variables (biến static)**: Biến được khai báo với từ khóa `static` và được chia sẻ giữa tất cả các object của class. Đây là biến của class chứ không phải của object.
:::

#### Có bao nhiêu loại method trong Java?
::: details Câu trả lời
Trong Java, có 4 loại method:
 - **Instance methods (method của object)**: Method không được khai báo với từ khóa `static` và được gọi trên object.
 - **Static methods (method static)**: Method được khai báo với từ khóa `static` và được gọi trên class.
 - **Constructor (hàm khởi tạo)**: Method được sử dụng để khởi tạo object.
 - **Abstract methods (method trừu tượng)**: Method không có phần thân và được khai báo trong abstract class hoặc interface.
:::

#### Có bao nhiêu loại class trong Java?
::: details Câu trả lời
Trong Java, có 3 loại class:
 - **Concrete class (class cụ thể)**: Là class thông thường mà không phải là abstract class hoặc interface.
 - **Abstract class (class trừu tượng)**: Là class chứa ít nhất một method trừu tượng.
 - **Inner class (class bên trong)**: Là class được khai báo bên trong một class hoặc method.
:::

#### Có thể khai báo một class hoặc interface là private không?
::: details Câu trả lời
Không, bạn không thể khai báo một class hay interface là private trong Java. Một class hay interface chỉ có thể có các phạm vi truy cập là `public` hoặc `default`.
:::

#### Có thể kế thừa từ nhiều class trong Java không?
::: details Câu trả lời
Không, trong Java một class chỉ có thể kế thừa từ một class cha duy nhất. Tuy nhiên, một class có thể implement nhiều interface.
:::

#### Một class có thể kế thừa nhiều Abstract class không?
::: details Câu trả lời
Không, một class chỉ có thể kế thừa từ một Abstract class duy nhất. Tuy nhiên, một Abstract class có thể kế thừa từ một Abstract class khác hoặc implement nhiều interface.
:::

#### Có thể kế thừa từ một class abstract không có bất ky method trừu tượng không?
::: details Câu trả lời
Có, một class abstract không cần phải chứa bất kỳ method trừu tượng nào. Một class abstract có thể không chứa bất kỳ method trừu tượng nào và vẫn có thể chứa các method cụ thể.
:::

#### Có thể khai báo biến trong interface không?
::: details Câu trả lời
Trong Java, từ Java 8 trở đi, bạn có thể khai báo biến trong interface. Tất cả các biến trong interface đều là `public`, `static` và `final` mặc định.
:::

#### Keyword super trong Java là gì?
::: details Câu trả lời
Trong Java, từ khóa `super` được sử dụng để tham chiếu đến class cha của class hiện tại. Nó được sử dụng để gọi constructor, method và truy cập các thuộc tính của class cha.
::: 

#### Keyword final trong Java là gì?
::: details Câu trả lời
Trong Java, từ khóa `final` được sử dụng để khai báo một biến, method hoặc class không thể thay đổi sau khi đã được khởi tạo.
 - **Biến final**: Biến final phải được khởi tạo giá trị và không thể gán lại giá trị sau đó.
 - **Method final**: Method final không thể bị override bởi các class con.
 - **Class final**: Class final không thể được kế thừa.
:::

#### Keyword static trong Java là gì?
::: details Câu trả lời
Trong Java, từ khóa `static` được sử dụng để khai báo biến, method hoặc class thuộc về class chứ không phải object.
 - **Biến static**: Biến static được chia sẻ giữa tất cả các object của class.
 - **Method static**: Method static không cần tạo object để gọi.
 - **Class static**: Class static không thể được kế thừa.
:::

#### Keywork finally trong Java là gì?
::: details Câu trả lời
Trong Java, từ khóa `finally` được sử dụng trong khối `try-catch` để chứa các câu lệnh sẽ được thực thi sau khi khối `try-catch` kết thúc.
:::

#### Khi nào các câu lệnh trong khối finally không được thực thi?
::: details Câu trả lời
Các câu lệnh trong khối `finally` không được thực thi trong các trường hợp sau:
 - Khi chương trình bị kết thúc bởi lệnh `System.exit()`.
 - Khi chương trình bị kết thúc bởi một lỗi không được bắt.
 - Khi JVM bị tắt.
:::

#### keyword finalize trong Java là gì?
::: details Câu trả lời
- Trong Java, method `finalize()` là một method của class `Object` được gọi trước khi một object bị thu hồi bởi garbage collector.
- Method này giúp bạn thực hiện các công việc dọn dẹp trước khi object bị thu hồi.
:::

#### keyword transient trong Java là gì?
::: details Câu trả lời
- Trong Java, từ khóa `transient` được sử dụng để bỏ qua việc serialization của một biến.
- Khi một biến được đánh dấu là `transient`, nó sẽ không được lưu trữ khi object được serialized.
- Thường các biến `transient` là các biến tạm thời hoặc được tính toán từ các biến khác.
:::

#### Keywork volatile trong Java là gì?
::: details Câu trả lời
Trong Java, từ khóa `volatile` được sử dụng để đảm bảo rằng một biến sẽ luôn được đọc từ và ghi vào bộ nhớ main, không phải từ bộ nhớ cache của thread.

Điều này sẽ đảm bảo tất cả các thread đều đọc và ghi vào cùng một giá trị của biến.

- Trong một hệ thống đa luồng, mỗi luồng có thể có bộ nhớ cache cục bộ (local cache) riêng để lưu trữ bản sao của các biến mà nó đang làm việc.
   - Điều này nhằm mục đích tăng hiệu suất. Tuy nhiên, điều này có thể dẫn đến tình huống một luồng thay đổi giá trị của một biến, nhưng các luồng khác có thể không nhìn thấy sự thay đổi này ngay lập tức vì chúng đang làm việc với bản sao đã lỗi thời trong bộ nhớ cache cục bộ của chúng.
:::

#### khi nào nên sử dụng từ khóa volatile?
::: details Câu trả lời
Bạn nên sử dụng từ khóa `volatile` khi:
 - Một biến được truy cập bởi nhiều thread và giá trị của biến có thể thay đổi.
 - Bạn muốn đảm bảo rằng tất cả các thread đều đọc và ghi vào cùng một giá trị của biến.
 - Bạn không cần thực hiện các phép toán atomic như `increment` hoặc `decrement`. Vì `volatile` không đảm bảo atomicity.
:::

#### Keyword synchronized trong Java là gì?
::: details Câu trả lời
Trong Java, từ khóa `synchronized` được sử dụng để đồng bộ hóa việc truy cập vào các phần của code giữa các thread.
Khi một method hoặc một khối code được đánh dấu là `synchronized`, chỉ một thread có thể thực thi method hoặc khối code đó tại một thời điểm.
:::

#### keyword strictfp trong Java là gì?
::: details Câu trả lời
- Trong Java, từ khóa `strictfp` được sử dụng để đảm bảo rằng kết quả của các phép toán số học trên các số dấu phẩy động sẽ giống nhau trên tất cả các nền tảng.
- với từ khóa `strictfp`, kết quả của các phép toán số học sẽ giống nhau trên tất cả các nền tảng Ví dụ: Windows, Linux, Mac OS, ...
- Khi một class được đánh dấu là `strictfp`, tất cả các method của class đó sẽ thực hiện phép toán số học theo chuẩn IEEE 754.
:::

#### Từ khóa assert trong Java là gì?
::: details Câu trả lời
Trong Java, từ khóa `assert` được sử dụng để kiểm tra điều kiện đúng hoặc sai. Nếu điều kiện là sai, chương trình sẽ ném ra một `AssertionError`.

- Cú pháp: `assert condition;`
- Nếu `condition` là `false`, chương trình sẽ ném ra một `AssertionError`.
- Bạn có thể sử dụng từ khóa `-ea` hoặc `-enableassertions` để bật `assert` khi chạy chương trình.
- Bạn có thể sử dụng từ khóa `-da` hoặc `-disableassertions` để tắt `assert` khi chạy chương trình.
- `assert` thường được sử dụng để kiểm tra điều kiện không thể xảy ra trong điều kiện bình thường.
- `assert` không nên được sử dụng để kiểm tra dữ liệu đầu vào từ người dùng hoặc dữ liệu từ bên ngoài.
- `assert` mặc định là không được bật trong Java, vì vậy nó không nên được sử dụng để kiểm tra lỗi trong chương trình.
- Thường sẽ dùng keywork này trong môi trường phát triển và test để kiểm tra điều kiện đúng hoặc sai.
:::
#### Từ khóa enum trong Java là gì?
::: details Câu trả lời
Trong Java, từ khóa `enum` được sử dụng để định nghĩa một kiểu dữ liệu liệt kê (enumeration). Một enum có thể chứa một hoặc nhiều hằng số.
:::

#### Từ khóa continue trong Java là gì?
::: details Câu trả lời
Trong Java, từ khóa `continue` được sử dụng để bỏ qua phần còn lại của vòng lặp hiện tại và tiếp tục vòng lặp tiếp theo.
:::

#### Từ khóa break trong Java là gì?
::: details Câu trả lời
Trong Java, từ khóa `break` được sử dụng để kết thúc vòng lặp hoặc switch case.
:::

#### Từ khóa default trong Java là gì?
::: details Câu trả lời
- Trong Java, từ khóa `default` được sử dụng trong switch case để xác định một hành động mặc định nếu không có case nào khớp với giá trị của biến.
- Hoặc trong interface, từ khóa `default` được sử dụng để cung cấp một phần thân cho method. Đây là một tính năng mới từ Java 8. Cung cấp một method mặc định trong interface giúp chúng ta thêm các method mới vào interface mà không cần phải thay đổi các class implement interface đó.
  - tất cả các class implement interface đó sẽ có method mặc định đó và có thể override nó nếu cần.
:::

#### Từ khóa  native trong Java là gì?
::: details Câu trả lời
Trong Java, từ khóa `native` được sử dụng để khai báo một method được triển khai bên ngoài Java bằng các ngôn ngữ khác như C, C++.
:::

#### Java Collection là gì?
::: details Câu trả lời
- Java Collection là một framework cung cấp một tập hợp các class và interface để lưu trữ và xử lý dữ liệu. Collection framework cung cấp các cấu trúc dữ liệu như List, Set, Queue, Stack, Map, ...
- Bởi vì array trong Java có kích thước cố định, nên Collection framework được sử dụng để lưu trữ và xử lý dữ liệu mà có thể thay đổi kích thước.
:::

#### Phân biệt List, Set và Map trong Java?
::: details Câu trả lời
 - **List**: List là một collection trong Java được sử dụng để lưu trữ dữ liệu theo thứ tự và cho phép lưu trữ các phần tử trùng lặp. Các class cơ bản của List là `ArrayList`, `LinkedList`, `Vector`, `Stack`.
 - **Set**: Set là một collection trong Java không cho phép lưu trữ các phần tử trùng lặp. Các class cơ bản của Set là `HashSet`, `LinkedHashSet`, `TreeSet`.
 - **Map**: Map là một collection trong Java được sử dụng để lưu trữ dữ liệu theo cặp key-value. Các class cơ bản của Map là `HashMap`, `LinkedHashMap`, `TreeMap`.
:::

#### Sự khác giữa HashMap và Hashtable trong Java?
::: details Câu trả lời

| HashMap                                               | Hashtable                                         |
|-------------------------------------------------------|---------------------------------------------------|
| HashMap không đồng bộ (non-synchronized)              | Hashtable đồng bộ (synchronized)                  |
| HashMap cho phép key hoặc value là null               | Hashtable không cho phép key hoặc value là null   |
| HashMap không hỗ trợ Enumeration                      | Hashtable không hỗ trợ Enumeration                |
| HashMap được sử dụng trong các ứng dụng không đồng bộ | Hashtable được sử dụng trong các ứng dụng đồng bộ |
| HashMap nhanh hơn Hashtable                           | Hashtable chậm hơn HashMap vì synchronized        |

:::

#### Generic type là gì trong Java?
::: details Câu trả lời
- Generic trong Java là một cơ chế cho phép bạn tạo một class hoặc method hoạt động trên nhiều kiểu dữ liệu khác nhau.
- Generic giúp bạn kiểm tra kiểu dữ liệu tại compile time và tránh lỗi ClassCastException tại runtime.
- Generic giúp tái sử dụng code và giảm lặp code.
- Ví dụ: `ArrayList<String> list = new ArrayList<String>();`
- Trong ví dụ trên, `ArrayList<String>` là một generic type. Nó chỉ chứa các phần tử kiểu `String`.
- Generic type được khai báo bằng cách sử dụng dấu `<>` và kiểu dữ liệu nằm trong dấu `<>`.
- Generic type có thể được sử dụng cho class, interface, method.
- Java Collection framework sử dụng generic type để đảm bảo kiểu dữ liệu của các phần tử trong collection.
- Java 5 đã giới thiệu generic type.
:::


#### Sự khác biệt giữa ArrayList và LinkedList trong Java?
::: details Câu trả lời
- **ArrayList**:
  - ArrayList được triển khai dưới dạng một mảng động.
  - ArrayList tốt cho việc truy cập ngẫu nhiên vào các phần tử bởi index.
  - ArrayList chậm hơn LinkedList khi thêm hoặc xóa phần tử ở giữa danh sách.
  - ArrayList tốt cho việc lưu trữ và truy cập dữ liệu.
  - ArrayList sử dụng ít bộ nhớ hơn LinkedList.
  - ArrayList không phải là thread-safe.
  - ArrayList hỗ trợ iterator và ListIterator.
- **LinkedList**:
  - LinkedList được triển khai dưới dạng danh sách liên kết, tức là mỗi phần tử sẽ lưu trữ tham chiếu đến phần tử tiếp theo và phần tử trước.
  - LinkedList tốt cho việc thêm hoặc xóa phần tử ở giữa danh sách.
  - LinkedList chậm hơn ArrayList khi truy cập ngẫu nhiên vào các phần tử bởi index.
  - LinkedList tốt cho việc thêm hoặc xóa phần tử ở đầu hoặc cuối danh sách.
  - LinkedList sử dụng nhiều bộ nhớ hơn ArrayList.
  - LinkedList không phải là thread-safe.
  - LinkedList hỗ trợ iterator, ListIterator và Deque.
:::

#### Khi nào nên sử dụng ArrayList và khi nào nên sử dụng LinkedList?
::: details Câu trả lời
- **ArrayList**:
  - Sử dụng ArrayList khi bạn cần truy cập ngẫu nhiên vào các phần tử bởi index.
  - Sử dụng ArrayList khi bạn cần lưu trữ và truy cập dữ liệu.
  - Sử dụng ArrayList khi bạn cần sử dụng ít bộ nhớ hơn.
- **LinkedList**:
  - Sử dụng LinkedList khi bạn cần thêm hoặc xóa phần tử ở giữa danh sách.
  - Sử dụng LinkedList khi bạn cần thêm hoặc xóa phần tử ở đầu hoặc cuối danh sách.
  - Sử dụng LinkedList khi bạn cần sử dụng nhiều bộ nhớ hơn.
:::

#### Trong java nếu thêm 10 triệu phần tử vào một ArrayList và LinkedList thì cái nào nhanh hơn?
::: details Câu trả lời
- Nếu thêm 10 triệu phần tử vào một ArrayList và LinkedList, thì ArrayList sẽ nhanh hơn LinkedList.
- ArrayList nhanh hơn LinkedList khi thêm phần tử vào cuối danh sách.
- LinkedList nhanh hơn ArrayList khi thêm hoặc xóa phần tử ở giữa danh sách.
:::

#### Sự khác biệt giữa Array vs ArrayList.
::: details Câu trả lời
- **Array**:
  - Array là một cấu trúc dữ liệu cố định, có kích thước cố định.
  - Array không thể thay đổi kích thước sau khi đã được khởi tạo.
  - Array có thể chứa các phần tử cùng kiểu dữ liệu.
  - Array không có method để thêm hoặc xóa phần tử.
  - Array không có method để thêm hoặc xóa phần tử.
  - Khi tạo một Array, hệ thống sẽ cấp phát một vùng nhớ liên tục trong bộ nhớ. Nếu không đủ bộ nhớ bộ nhớ liên tục thì sẽ báo lỗi `OutOfMemoryError`.
    - Mặc dù bộ nhớ vẫn thừa nhiều nhưng không còn liên tục để cấp phát.
- **ArrayList**:
  - ArrayList là một cấu trúc dữ liệu động, có kích thước thay đổi.
  - ArrayList có thể thay đổi kích thước sau khi đã được khởi tạo.
  - ArrayList có thể chứa các phần tử cùng hoặc khác kiểu dữ liệu.
  - ArrayList có method để thêm hoặc xóa phần tử.
  - ArrayList sử dụng một Array để lưu trữ dữ liệu. Khi Array đầy, ArrayList sẽ tạo một Array mới với kích thước lớn hơn và sao chép dữ liệu từ mảng cũ sang mảng mới.
  - Bởi vì core của ArrayList là Array nên ArrayList cũng sẽ gặp phải vấn đề `OutOfMemoryError` khi không còn đủ bộ nhớ liên tục để cấp phát.
:::

#### Khác biệt giữa LinkedHashMap và TreeMap trong Java?
::: details Câu trả lời
- **LinkedHashMap**:
  - LinkedHashMap lưu trữ các phần tử theo thứ tự chúng được thêm vào.
  - LinkedHashMap sử dụng một danh sách liên kết để lưu trữ thứ tự của các phần tử.
  - LinkedHashMap cho phép lưu trữ các phần tử có key hoặc value là null.
  - LinkedHashMap không phải là thread-safe.
- **TreeMap**:
  - TreeMap lưu trữ các phần tử theo thứ tự tăng dần của key.
  - TreeMap sử dụng một cây đỏ-đen để lưu trữ thứ tự của các phần tử.
  - TreeMap không cho phép lưu trữ các phần tử có key hoặc value là null.
  - TreeMap không phải là thread-safe.
:::

#### Vì sao ArrayList có thể set size ban đầu khi khởi tạo, còn LinkedList thì không?
::: details Câu trả lời
- ArrayList có thể set size ban đầu khi khởi tạo bởi vì ArrayList được triển khai dưới dạng một mảng động. Khi bạn set size ban đầu, ArrayList sẽ cấp phát một mảng với kích thước đã set.
- LinkedList không thể set size ban đầu khi khởi tạo bởi vì LinkedList được triển khai dưới dạng danh sách liên kết. LinkedList không cần cấp phát một mảng với kích thước cố định.
:::

#### Sự khác biệt giữa fail-fast và fail-safe iterator trong Java?
::: details Câu trả lời
- **Fail-fast iterator**:
  - Fail-fast iterator sẽ ném ra `ConcurrentModificationException` nếu collection được sửa đổi trong quá trình duyệt.
  - Fail-fast iterator được sử dụng trong các collection không đồng bộ như ArrayList, HashMap.
  - Fail-fast iterator sử dụng Iterator để duyệt collection.
- **Fail-safe iterator**:
  - Fail-safe iterator không ném ra `ConcurrentModificationException` nếu collection được sửa đổi trong quá trình duyệt.
  - Fail-safe iterator được sử dụng trong các collection đồng bộ như CopyOnWriteArrayList, ConcurrentHashMap.
  - Fail-safe iterator sử dụng một bản sao của collection để duyệt.
:::

#### Sự khác biệt giữa StringBuilder và StringBuffer trong Java?
::: details Câu trả lời
- **StringBuilder**:
  - StringBuilder trong Java được sử dụng để tạo và xử lý chuỗi mà không tạo ra các đối tượng mới mỗi lần thay đổi.
  - StringBuilder là một class mutable, nghĩa là bạn có thể thay đổi nội dung của chuỗi mà không tạo ra một đối tượng mới.
  - StringBuilder là không đồng bộ (non-synchronized) nên nó nhanh hơn StringBuffer.
  - StringBuilder là không đồng bộ (non-synchronized) nên nó nhanh hơn StringBuffer.
  - StringBuilder không đảm bảo an toàn đa luồng.
- **StringBuffer**:
  - StringBuffer trong Java cũng được sử dụng để tạo và xử lý chuỗi mà không tạo ra các đối tượng mới mỗi lần thay đổi.
  - StringBuffer là một class mutable, nghĩa là bạn có thể thay đổi nội dung của chuỗi mà không tạo ra một đối tượng mới.
  - StringBuffer là đồng bộ (synchronized) nên nó an toàn đa luồng.
  - StringBuffer là đồng bộ (synchronized) nên nó chậm hơn StringBuilder.
:::

#### Exception là gì trong Java?
::: details Câu trả lời
- Exception là một sự kiện xảy ra trong quá trình thực thi chương trình làm gián đoạn bình thường của chương trình.
- Exception có thể là một lỗi hoặc một sự kiện đặc biệt mà chương trình cần phải xử lý.
  :::

#### Các kiểu exception trong Java?
::: details Câu trả lời
Trong Java, có 2 loại exception:
 - **Checked exception (exception kiểm tra)**: Là các exception mà compiler buộc bạn phải xử lý bằng cách sử dụng try-catch hoặc throws tại thời điểm compile.
 - **Unchecked exception (exception không kiểm tra)**: Là các exception mà compiler không buộc bạn phải xử lý.
:::

####  Error và Exception trong Java khác gì nhau ?
::: details Câu trả lời
- **Error**:
  - Error là một sự kiện xảy ra trong quá trình thực thi chương trình làm gián đoạn nghiêm trọng của chương trình.
  - Error không thể xử lý và không nên xử lý.
  - Error thường xảy ra do các vấn đề nghiêm trọng như hết bộ nhớ, stack overflow, ...
- **Exception**:
  - Exception là một sự kiện xảy ra trong quá trình thực thi chương trình làm gián đoạn bình thường của chương trình.
  - Exception có thể xử lý bằng cách sử dụng try-catch hoặc throws.
  - Exception thường xảy ra do các vấn đề như nhập sai dữ liệu, mạng bị ngắt kết nối, ...
:::

### Java Advanced

#### JIT Compiler là gì?
::: details Câu trả lời
- JIT (Just-In-Time) Compiler là một phần của JVM được sử dụng để cải thiện hiệu suất của chương trình Java.
- JIT Compiler chuyển mã Java thành mã máy tại thời điểm chạy (runtime) thay vì tại thời điểm compile.
- JIT Compiler sẽ chuyển mã Java thành mã máy và lưu trữ mã máy đó trong bộ nhớ cache để sử dụng lại.
- JIT Compiler giúp cải thiện hiệu suất của chương trình Java bằng cách giảm thời gian khởi chạy và tăng tốc độ thực thi.
- Khi một method được gọi JIT sẽ thực hiện biên dịch các đoạn code trong  method này. Lần sau nếu gọi lại thì sẽ sử dụng lại đoạn code đã biên dịch
:::
#### JIT có được kích hoạt mặc định không?
::: details Câu trả lời
- JIT Compiler được kích hoạt mặc định trong JVM.
:::

#### Classloader là gì?
::: details Câu trả lời
- Classloader là một phần của JVM được sử dụng để tải class vào bộ nhớ JRE. Các class có thể là thư viện ứng dụng sử dụng bên ngoài hoặc các thành phần core của java từ JDK được biết bằng java.
- Classloader có thể load class từ file system hoặc mạng vào bộ nhớ.
- Classloader sẽ tải class khi class được sử dụng đầu tiên.
- Classloader sẽ tải class từ classpath.
:::
#### Các loại Classloader trong Java?
::: details Câu trả lời
Trong Java, có 3 loại Classloader:
 - **Bootstrap Classloader**: Là classloader mặc định của JVM, nó tải các class core của Java từ JDK.
 - **Extension Classloader**: Là classloader mở rộng của JVM, nó tải các class từ thư mục `jre/lib/ext`.
- **System Classloader**: Là classloader của ứng dụng Java, nó tải các class từ classpath.
:::

#### Thứ tự việc load class của classloader trong Java?
::: details Câu trả lời
- Khi một class được yêu cầu, JVM sẽ gọi method `loadClass` của Classloader để load class.
- https://github.com/solitarysp/Example_ClassLoader_From_ByteCode/blob/master/src/main/java/com/lethanh98/example/ExampleClassLoaderFromByteCode/ultils/CustomClassLoader.java
:::

#### Bộ nhớ stack và heap trong Java?
::: details Câu trả lời
- **Stack**: Là bộ nhớ được dùng để lưu các các biến local (Biến ở trong method) và thứ tự thực thị method.( bộ nhớ này có time sống ngắn )
   - Khi chúng ta tạo một biến mới là object ở trọng một method. Nó sẽ tạo mội object mới trên heap và trỏ đến object đó. Bộ nhớ stack sẽ lưu trữ địa chỉ ref của object đó trên heap.
   - Nếu chúng ta tạo biến truyên thủy trong method thì cả giá trị của biến cũng sẽ được lưu trong bộ nhớ stack
   - Bộ  nhớ stack cũng lưu stack của việc gọi  method. Ví dụ A gọi b. Stack sẽ là từ a đến b và khi b trả về sẽ trả về a.
   - Khi cạn bộ nhớ stack sẽ báo lỗi StackOverFlow
- **Heap**: Là bộ nhớ được dùng để lưu trữ các object và array. (bộ nhớ này có time sống dài)
   - Khi chúng ta tạo một object mới, nó sẽ được lưu trữ trên heap.
   - Khi một object không còn được sử dụng nữa, garbage collector sẽ thu hồi bộ nhớ của object đó.
   - Bộ nhớ heap được chia thành 3 phần: Young Generation, Old Generation, Permanent Generation.
   - Khi cạn bộ nhớ heap sẽ báo lỗi OutOfMemoryError.
:::  

#### Default dung lượng của heap và stack trong Java?
::: details Câu trả lời
- **Heap**: Dung lượng mặc định của heap phụ thuộc vào hệ điều hành và JVM. Thông thường, dung lượng heap mặc định tối thiểu là 1/64 và tối đa là 1/4 dung lượng RAM của máy tính.
  - `-Xms<size>`: Thiết lập kích thước heap ban đầu (ví dụ: -Xms256m cho 256 megabyte).
  - `-Xmx<size>`: Thiết lập kích thước heap tối đa (ví dụ: -Xmx1g cho 1 gigabyte).
- **Stack**: Dung lượng mặc định của stack phụ thuộc vào hệ điều hành và JVM. Thông thường, hệ thống 32-bit sẽ là từ 256kb đến 512kb. Hệ thống 64-bit sẽ là khoảng 1MB
  - `-Xss<size>`: Thiết lập kích thước stack (ví dụ: -Xss1m cho 1 megabyte).
:::

#### Shallow và Deep copy trong Java?
::: details Câu trả lời
- **Shallow copy**: Shallow copy là một phép copy chỉ copy giá trị của các biến primitive và địa chỉ của các biến reference. Nghĩa là nếu bạn thay đổi giá trị của biến reference trong bản copy, thì giá trị của biến reference trong bản gốc cũng sẽ thay đổi.
- **Deep copy**: Deep copy là một phép copy tạo ra một bản copy hoàn toàn mới của object. Nghĩa là nếu bạn thay đổi giá trị của biến reference trong bản copy, thì giá trị của biến reference trong bản gốc không thay đổi.
:::

#### Kỹ thuật Reflection trong Java là gì?
::: details Câu trả lời
- Reflection là một kỹ thuật cho phép bạn xem và thay đổi, call các field, method, constructor của một class tại thời điểm runtime.
- Các thư viện và framework như Spring, Hibernate, JUnit sử dụng reflection để cung cấp các tính năng mạnh mẽ.
:::


#### Garbage Collection trong Java là gì ?
::: details Câu trả lời
- Garbage Collection là một quá trình tự động thu hồi bộ nhớ của các object không còn được sử dụng nữa.
- Garbage Collector là một phần của JVM, nó sẽ quét bộ nhớ và thu hồi bộ nhớ của các object không còn được sử dụng.
- Garbage Collector sẽ chạy khi JVM cảm thấy cần thiết, không cần phải chờ đến khi bộ nhớ cạn kiệt.
- Chúng ta có thể chủ động yêu cầu Garbage Collector chạy bằng cách gọi method `System.gc()`.
:::

#### Cách hoạt động của Garbage Collection trong Java?
::: details Câu trả lời
 - Khi mới tạo một object, object sẽ được lưu trữ trên heap và lưu trên **Young Generation**. Đây là nơi lưu trữ các object mới và có thể có thời gian sống ngắn.
   - Bên trong **Young Generation** có 2 phần: **Eden Space** và **Survivor Space**.
     - Tất cả các object mới sẽ được lưu trữ trên **Eden Space**. Khi **Eden Space** đầy, Garbage Collector sẽ thực hiện GC trên Eden Space sau đó chuyển các object còn sống sang **Survivor Space**.
     - Survivor Space chứa các object đã sống qua một số lần GC. Có 2 Survivor Space: **From Space** và **To Space**. Khi một lần GC được thực hiện, object còn sống sẽ được chuyển từ **Eden Space** hoặc **From Space** sang **To Space**.
     - Mỗi lần chuyển thì sẽ có 1 bộ đếm của object được tăng. Khi bộ đếm đạt một giá trị nhất định thì object sẽ được chuyển sang **Old Generation**.
 - Bố nhớ **Old Generation** chứa các object có thời gian sống dài. Khi bộ nhớ **Old Generation** đầy hoặc theo 1 số thuật toán, config, Garbage Collector sẽ thực hiện GC trên **Old Generation**.
:::

#### Cách phân bổ bộ nhớ giữa Young Generation và Old Generation trong Java?
::: details Câu trả lời
 - Sử dụng flag XX:NewRatio để cấu hình tỉ lệ phân bổ bộ nhớ giữa Young Generation và Old Generation.
    - Giá trị này là tỉ lệ của Old Generation gấp bao nhiêu lần Young Generation.
 - Ví dụ:
   - Nếu bằng 1 tức 50% cho Young Generation và 50% cho Old Generation.
   - Nếu bằng 2 thì 33% cho Young Generation và 66% cho Old Generation. Tức 1/3 cho Young Generation và 2/3 cho Old Generation.
   - Nếu bằng 3 thì 25% cho Young Generation và 75% cho Old Generation. Tức 1/4 cho Young Generation và 3/4 cho Old Generation.
:::

#### Các loại Garbage Collector trong Java?
::: details Câu trả lời
Trong Java, có 5 loại Garbage Collector:
 - **Serial Garbage Collector**: Sử dụng một luồng để thực hiện GC. Thích hợp cho các ứng dụng nhỏ hoặc không đòi hỏi hiệu suất cao.
 - **Parallel Garbage Collector**: Sử dụng nhiều luồng để thực hiện GC. Thích hợp cho các ứng dụng đòi hỏi hiệu suất cao.
 - **CMS (Concurrent Mark-Sweep) Garbage Collector**: Sử dụng nhiều luồng để thực hiện GC và thực hiện GC song song với ứng dụng. Thích hợp cho các ứng dụng đòi hỏi thời gian phản hồi ngắn.
 - **G1 (Garbage First) Garbage Collector**: Sử dụng nhiều luồng để thực hiện GC và chia bộ nhớ heap thành nhiều vùng. Thích hợp cho các ứng dụng đòi hỏi hiệu suất cao và thời gian phản hồi ngắn.
   - Giảm thời gian dừng của ứng dụng bằng cách chia bộ nhớ heap thành nhiều vùng và thực hiện GC trên từng vùng.
 - **Z Garbage Collector**: Sử dụng nhiều luồng để thực hiện GC và thực hiện GC song song với ứng dụng. Thích hợp cho các ứng dụng đòi hỏi thời gian phản hồi ngắn.
   - Với ZGC bạn sẽ tốn nhiều tài nguyên CPU hơn nhưng giảm thời gian dừng của ứng dụng.
:::

#### Sự khác biệt giữa Serial Garbage Collector và Parallel Garbage Collector?
::: details Câu trả lời
- **Serial Garbage Collector**:
  - Serial Garbage Collector sử dụng một luồng để thực hiện GC.
  - Serial Garbage Collector thích hợp cho các ứng dụng nhỏ hoặc không đòi hỏi hiệu suất cao.
- **Parallel Garbage Collector**:
  - Parallel Garbage Collector sử dụng nhiều luồng để thực hiện GC.
  - Parallel Garbage Collector thích hợp cho các ứng dụng đòi hỏi hiệu suất cao.
:::

#### Thread là gì trong Java?
::: details Câu trả lời
- Thread là một luồng thực thi của chương trình Java. Mỗi chương trình Java đều chạy ít nhất một thread là main thread. Bạn có thể tạo thêm thread bằng cách kế thừa class Thread hoặc implement interface Runnable.
- Thread giúp chương trình Java chạy đa luồng, nghĩa là chạy nhiều công việc cùng một lúc. Ví dụ: bạn có thể chạy một thread để tải dữ liệu từ mạng và một thread khác để hiển thị dữ liệu lên giao diện.
- Thread giúp tận dụng tối đa CPU và giảm thời gian chờ đợi.
- Khi tạo mới một Thread, JVM sẽ gửi yêu cầu tạo một thread mới trong OS và cấp phát bộ nhớ cho thread đó.
:::

#### Sự khác biệt giữa process và thread?
::: details Câu trả lời
- **Thread** là một luồng thực thi của chương trình, trong khi process là một chương trình đang chạy trong bộ nhớ.
  - Một Process có thể chứa nhiều thread. Các thread trong cùng một process chia sẻ bộ nhớ và tài nguyên của process đó.
  - Các thread trong cùng một process có thể giao tiếp với nhau thông qua shared memory.
  - Một thread có thể tạo ra nhiều thread khác, nhưng không thể tạo ra process mới.
  - Thread có chi phí tạo thấp hơn process, vì thread chia sẻ bộ nhớ và tài nguyên của process.
  - Một Process sẽ có ít nhất một thread là main thread.
- **Process** là một chương trình đang chạy trong bộ nhớ. Mỗi process có không gian bộ nhớ riêng và không thể chia sẻ bộ nhớ với các process khác.
  - Mỗi khi bạn thực hiện chạy một trương trình, ít nhất sẽ tạo ra một process mới.
  - Các process là đông lập với nhau, nghĩa là một process không thể ảnh hưởng đến các process khác.
  - Khi tạo mới một process, hệ điều hành sẽ cấp phát bộ nhớ cho process đó và tạo một không gian bộ nhớ riêng cho process. Vì vậy chi phí tạo sẽ nhiều hơn tạo Thread.
  - Các process có thể giao tiếp với nhau thông qua IPC (Inter-Process Communication) như socket, pipe, message queue, shared memory.
```plantuml
@startuml Process vs Thread

skinparam backgroundColor #FEFEFE
skinparam roundCorner 20
skinparam componentStyle rectangle
skinparam defaultTextAlignment center
skinparam noteBackgroundColor #FFE552
skinparam noteBorderColor #888888
skinparam ArrowColor #2C3E50
skinparam shadowing true

' Định nghĩa màu sắc
!$processColor = "#3498DB"
!$threadColor = "#2ECC71"
!$memoryColor = "#E74C3C"
!$cpuColor = "#9B59B6"
!$sharedColor = "#F39C12"
!$privateColor = "#1ABC9C"

' Tiêu đề
title <color:#2C3E50><size:24><b>Process vs Thread: Kiến Trúc & Đặc Điểm</b></size></color>

' Hệ điều hành
rectangle "Hệ Điều Hành" as OS #F8F9F9 {
  ' Process 1
  rectangle "<color:$processColor><b>Process 1</b></color>" as P1 #E8F8FF {
    rectangle "<color:$privateColor><b>[RAM] Không gian bộ nhớ riêng</b></color>" as M1 #E8F8FF
    
    rectangle "<color:$threadColor><b>Thread 1.1</b></color>" as T11 #E8FFE8 {
      rectangle "<color:$privateColor><b>[STACK] Stack riêng</b></color>" as S11 #E8FFE8
      rectangle "<color:$privateColor><b>[CPU] Registers riêng</b></color>" as R11 #E8FFE8
    }
    
    rectangle "<color:$threadColor><b>Thread 1.2</b></color>" as T12 #E8FFE8 {
      rectangle "<color:$privateColor><b>[STACK] Stack riêng</b></color>" as S12 #E8FFE8
      rectangle "<color:$privateColor><b>[CPU] Registers riêng</b></color>" as R12 #E8FFE8
    }
    
    rectangle "<color:$sharedColor><b>[HEAP] Heap (Shared)</b></color>" as H1 #FFF5E8
    rectangle "<color:$sharedColor><b>[DATA] Data (Shared)</b></color>" as D1 #FFF5E8
    rectangle "<color:$sharedColor><b>[CODE] Code (Shared)</b></color>" as C1 #FFF5E8
  }
  
  ' Process 2
  rectangle "<color:$processColor><b>Process 2</b></color>" as P2 #E8F8FF {
    rectangle "<color:$privateColor><b>[RAM] Không gian bộ nhớ riêng</b></color>" as M2 #E8F8FF
    
    rectangle "<color:$threadColor><b>Thread 2.1</b></color>" as T21 #E8FFE8 {
      rectangle "<color:$privateColor><b>[STACK] Stack riêng</b></color>" as S21 #E8FFE8
      rectangle "<color:$privateColor><b>[CPU] Registers riêng</b></color>" as R21 #E8FFE8
    }
    
    rectangle "<color:$sharedColor><b>[HEAP] Heap (Shared)</b></color>" as H2 #FFF5E8
    rectangle "<color:$sharedColor><b>[DATA] Data (Shared)</b></color>" as D2 #FFF5E8
    rectangle "<color:$sharedColor><b>[CODE] Code (Shared)</b></color>" as C2 #FFF5E8
  }
  
  ' CPU
  rectangle "<color:$cpuColor><b>[CPU] Central Processing Unit</b></color>" as CPU #F5E8FF
}

' Mối quan hệ
T11 -[#green]-> CPU : "<color:green><b>1. Thực thi</b></color>"
T12 -[#green]-> CPU : "<color:green><b>2. Thực thi</b></color>"
T21 -[#green]-> CPU : "<color:green><b>3. Thực thi</b></color>"

T11 -[#orange]-> H1 : "<color:orange><b>4. Truy cập</b></color>"
T12 -[#orange]-> H1 : "<color:orange><b>5. Truy cập</b></color>"
T21 -[#orange]-> H2 : "<color:orange><b>6. Truy cập</b></color>"

' Ghi chú
note right of P1
  <color:#D35400><b>Process:</b></color>
  1. Đơn vị cơ bản của tài nguyên hệ thống
  2. Không gian địa chỉ riêng biệt
  3. Tài nguyên riêng (file handles, sockets)
  4. Cô lập với các process khác
  5. Tốn nhiều tài nguyên khi tạo mới
endnote

note right of T11
  <color:#27AE60><b>Thread:</b></color>
  1. Đơn vị cơ bản của CPU execution
  2. Chia sẻ không gian địa chỉ trong process
  3. Chia sẻ tài nguyên của process
  4. Dễ dàng giao tiếp trong cùng process
  5. Nhẹ hơn, tạo nhanh hơn process
endnote

note bottom of OS
  <color:#2C3E50><b>So sánh Process vs Thread:</b></color>
  
  <b>7. Giao tiếp:</b>
  - <color:$processColor>Process</color>: IPC (pipes, sockets, shared memory) - phức tạp, chậm
  - <color:$threadColor>Thread</color>: Truy cập trực tiếp vào bộ nhớ chung - đơn giản, nhanh
  
  <b>8. Lỗi & Ổn định:</b>
  - <color:$processColor>Process</color>: Lỗi trong một process không ảnh hưởng đến process khác
  - <color:$threadColor>Thread</color>: Lỗi trong một thread có thể làm sập toàn bộ process
  
  <b>9. Chuyển đổi ngữ cảnh:</b>
  - <color:$processColor>Process</color>: Tốn kém hơn (thay đổi không gian địa chỉ, TLB flush)
  - <color:$threadColor>Thread</color>: Nhanh hơn (giữ nguyên không gian địa chỉ)
endnote

@enduml
```


:::

#### Priority của Thread trong Java là gì?
::: details Câu trả lời
- Priority của Thread trong Java là mức độ ưu tiên của thread so với các thread khác. Mức độ ưu tiên của thread được xác định bởi một số nguyên từ 1 đến 10.
- Thông thường Thread của java sẽ được đăng ký với OS và OS sẽ quyết định thread nào được chạy trước dựa trên priority. Bởi vì OS sử dụng swiching context và scheduling để quyết định thread nào được chạy trước.
- Mặc định, mức độ ưu tiên của thread là 5. Mức độ ưu tiên cao nhất là 10 và thấp nhất là 1.
- Các phiên bản Java mới có giới thiệu Virtual Threads (Project Loom.
  - Virtual threads là các lightweight threads được quản lý bởi JVM (Java Virtual Machine) . Nhiều virtual threads cùng chia sẻ và chạy trên một số thread thực sự.
  - JVM sẽ quản lý việc chuyển đổi giữa các virtual threads và các thread thực sự chạy.
  - Việc quản lý các virtual threads giúp giảm overhead của việc tạo và quản lý thread trên OS.
:::

#### Sự khác biệt giữa start() và run() method trong Thread của java.
::: details Câu trả lời
- **start()**: start() method được sử dụng để bắt đầu một thread mới. Khi bạn gọi start() method, JVM sẽ tạo một thread mới và gọi run() method của thread đó.
- **run()**: run() method chứa code của thread. Khi bạn gọi run() method, code trong run() method sẽ được thực thi trên thread hiện tại, không phải trên một thread mới.
:::

#### Sự khác biệt giữa wait() và sleep() method trong Java?
::: details Câu trả lời
- **wait()**: wait() method là một method của class Object, nó được sử dụng để đưa thread vào trạng thái chờ (waiting) cho đến khi một thread khác gọi notify() hoặc notifyAll() method.
- **sleep()**: sleep() method là một static method của class Thread, nó được sử dụng để đưa thread vào trạng thái sleep (ngủ) trong một khoảng thời gian nhất định.
:::

#### Thread pool là gì trong Java?
::: details Câu trả lời
- Thread pool là một pool chứa một số lượng thread đã được tạo sẵn và sẵn sàng để thực thi các task.
- Thread pool giúp tối ưu hóa việc tạo và quản lý thread, giảm thời gian tạo thread mới và giảm overhead của việc tạo thread.
- Thread pool giúp giảm tải cho hệ thống và tăng hiệu suất của ứng dụng bằng cách tái sử dụng các thread đã được tạo sẵn.
:::

#### Sự khác biệt giữa Callable và Runnable trong Java?
::: details Câu trả lời
- **Runnable**:
  - Runnable là một interface trong Java được sử dụng để tạo một thread mới.
  - Runnable có một method là run() chứa code của thread.
  - Runnable không trả về kết quả.
-  **Callable**:
  - Callable là một interface trong Java được sử dụng để tạo một thread mới.
  - Callable có một method là call() chứa code của thread.
  - Callable trả về kết quả.
:::

#### Sự khác biệt giữa synchronized và ReentrantLock trong Java?
::: details Câu trả lời
- **synchronized**:
  - synchronized là một từ khóa trong Java được sử dụng để đồng bộ hóa các block code hoặc method.
  - synchronized sử dụng monitor để đồng bộ hóa.
  - synchronized không hỗ trợ thời gian chờ (timeout).
  - synchronized không hỗ trợ thực hiện các thao tác khác như thời gian chờ, thực hiện thử và thời gian chờ.
- **ReentrantLock**: 
  - ReentrantLock là một class trong Java được sử dụng để đồng bộ hóa các block code hoặc method.
  - ReentrantLock sử dụng lock để đồng bộ hóa.
  - ReentrantLock hỗ trợ thời gian chờ (timeout).
  - ReentrantLock hỗ trợ thực hiện các thao tác khác như thời gian chờ, thực hiện thử và thời gian chờ.
:::

#### Deadlock là gì ?
::: details Câu trả lời
 - Deadlock là một tình huống mà hai hoặc nhiều thread đang chờ đợi lẫn nhau để giải phóng lock và không thể tiếp tục thực thi. Cả 2 Thread sẽ bị chờ đợi mãi mãi.
 - Deadlock xảy ra khi một thread giữ một lock và cố gắng lấy lock khác mà đã được giữ bởi một thread khác, trong khi thread đó cũng đang cố gắng lấy lock mà đã được giữ bởi thread đầu tiên.
 - VD : Chúng ta cần lấy tài nguyên ở 2 file A và B
   - Thread 1 chiếm tài nguyên A => Thread 2 chiến tài nguyên B => Thread 2 đợi tài nguyễn A giải phóng để đọc => Thread 1 đợi tài nguyên B giải phóng để đọc.
   - Khi đó 2 thread này sẽ chờ nhau 1 cách vô hạn vì không ai nhường ai cả
:::

#### Làm thế nào để tránh Deadlock trong Java?
::: details Câu trả lời
- Để tránh Deadlock trong Java, bạn có thể thực hiện các cách sau:
  - **Tránh sử dụng nhiều lock**: Sử dụng ít lock nhất có thể.
  - **Tránh sử dụng nested lock**: Tránh sử dụng nested lock, nếu không thì sắp xếp lock theo thứ tự cố định.
  - **Sử dụng timeout**: Sử dụng timeout khi lấy lock và giải phóng lock.
  - **Sử dụng ReentrantLock**: Sử dụng ReentrantLock thay vì synchronized.
  - **Sử dụng wait() và notify()**: Sử dụng wait() và notify() để giải phóng lock.
:::

#### Starvation là gì ?
::: details Câu trả lời
- Starvation là một tình huống mà một thread không thể thực thi vì không có đủ tài nguyên hoặc bị ưu tiên thấp hơn các thread khác.
:::

#### Làm thế nào để tránh Starvation trong Java?

::: details Câu trả lời
- Để tránh Starvation trong Java, bạn có thể thực hiện các cách sau:
  - **Sử dụng Fairness**: Sử dụng ReentrantLock với fairness để đảm bảo rằng thread sẽ được chạy theo thứ tự.
  - **Sử dụng Priority**: Sử dụng priority để ưu tiên các thread quan trọng hơn.
  - **Sử dụng Timeout**: Sử dụng timeout để giải phóng tài nguyên.
  - **Sử dụng Wait() và Notify()**: Sử dụng wait() và notify() để giải phóng tài nguyên.
::: 

#### Live lock là gì ?
::: details Câu trả lời
 - Live lock là một tình huống mà các thread không thể tiếp tục thực thi vì chúng đang chờ đợi lẫn nhau. Thực tế chúng không bị block nhưng chúng không thể tiếp tục logic để hoàn thành nghiệm vụ.
 - Ví dụ: Hãy tưởng tượng hai người đang đi bộ trên một con đường hẹp và đối mặt với nhau. Cả hai đều muốn nhường đường cho người kia.
     - Người thứ nhất bước sang trái.
     - Người thứ hai thấy vậy cũng bước sang trái để nhường đường.
     - Bây giờ họ lại đứng đối diện nhau.
     - Người thứ nhất lại bước sang phải.
     - Người thứ hai thấy vậy cũng bước sang phải.
     - Họ lại đứng đối diện nhau.
:::

#### Concurrency và parallelism  là gì ?
::: details Câu trả lời
- **Concurrency**:
  - Concurrency là khả năng của một hệ thống xử lý nhiều tác vụ dường như cùng một lúc.
  - Trong concurrency, các tác vụ không nhất thiết phải được thực hiện đồng thời tại cùng một thời điểm. Thay vào đó, CPU sẽ chuyển đổi nhanh chóng giữa các tác vụ, tạo ra ảo giác rằng chúng đang chạy song song.
- **Parallelism**:
  - Parallelism là khả năng của một hệ thống thực hiện nhiều tác vụ cùng một lúc.
  - Trong parallelism, các tác vụ được thực hiện đồng thời tại cùng một thời điểm.
:::
