# 📋 PHIẾU BÀI TẬP 06

# **CSS FRAMEWORKS — Bootstrap 5 / TailwindCSS**

> **Tài liệu tham chiếu:** `tuan_4_css_frameworks/bootstrap/` hoặc `tuan_4_css_frameworks/tailwindcss/`

---

## 🅱️ TRACK A — BOOTSTRAP 5

### PHẦN A — ĐỌC HIỂU (20 điểm)

#### Câu A1 (10đ) — Grid System

| Kích thước | < 768px                                                 | 768px - 991px                                          | ≥ 992px                                                         |
| ---------- | ------------------------------------------------------- | ------------------------------------------------------ | --------------------------------------------------------------- |
| Số cột     | 1 cột                                                   | 2 cột                                                  | 4 cột                                                           |
| Box layout | 4 hàng, mỗi hàng 1 box (xếp chồng dọc 100% chiều rộng). | 2 hàng, mỗi hàng 2 box (mỗi box chiếm 50% chiều rộng). | 1 hàng, chứa cả 4 box nằm ngang (mỗi box chiếm 25% chiều rộng). |

- col-md-6 nghĩa là: chỉ định rằng từ kích thước màn hình Medium (Tablet, min-width: 768px) trở lên, phần tử sẽ chiếm 6/12 phần (tương đương 50% chiều rộng của hàng/row).

- Không cần viết col-sm-12 vì:\
  Nó thừa thãi. Bootstrap tuân theo nguyên lý Mobile-First (thiết kế cho màn hình nhỏ nhất trước, sau đó mở rộng dần lên).\
   Giải thích: \
   Khi bạn khai báo col-12 (mặc định không có tiền tố breakpoint), nó sẽ áp dụng độ rộng 100% bắt đầu từ thiết bị nhỏ nhất (Extra small, < 576px) và tự động kế thừa cho tất cả các kích thước lớn hơn (bao gồm cả mức Small sm ≥ 576px). Nó sẽ tiếp tục duy trì giao diện 1 cột 12 phần cho đến khi gặp điểm neo (breakpoint) tiếp theo có chỉ định khác — trong trường hợp này là col-md-6 ở mốc 768px.

#### Câu A2 (10đ) — Utilities & Components

- class d-none d-md-block. Element này hiển thị khi nào, ẩn khi nào?\
  Trong Bootstrap:\
  d-none → ẩn element hoàn toàn (display: none)\
  d-md-block → từ breakpoint md trở lên thì hiển thị dạng block

Breakpoint md của Bootstrap là ≥ 768px

Kích thước màn hình Hiển thị?\
Mobile (<768px) ❌ Ẩn\
Tablet/Desktop (≥768px)

Liệt kê 5 spacing utilities (margin/padding) và giải thích. VD: mt-3, px-4, mb-auto

1. mt-3\
   m = margin\
   t = top (phía trên)\
   3 = mức khoảng cách\
   → Thêm margin-top\
   Áp dụng margin-top với khoảng cách cấp 3. Theo hệ cơ số của Bootstrap, cấp 3 tương đương với 1rem hoặc 16px

2. px-4\
   p = padding\
   x = trục ngang (left + right)\
   4 = mức khoảng cách

→ Thêm padding trái và phải\
Áp dụng padding theo trục X (trái và phải). Kích thước cấp 4 tương đương với 1.5rem hoặc 24px

3. mb-auto\
   m = margin\
   b = bottom\
   auto = tự động

→ Margin-bottom tự động

Thường dùng trong Flexbox để căn chỉnh khoảng cách linh hoạt.\
Set margin-bottom là auto. Trong Flexbox container, giá trị auto này thường dùng để hấp thụ mọi khoảng trống còn lại, qua đó "đẩy" các phần tử lân cận lên trên (tương tự như cách pattern mt-auto đẩy nút bấm sát xuống phần đáy của thẻ Card)

4. py-2\
   p = padding\
   y = top + bottom\
   2 = mức khoảng cách\
   → Thêm padding trên và dưới

5. ms-5\
    m = margin\
    s = start (trái trong ngôn ngữ trái → phải)\
    5 = mức khoảng cách\
   →Thêm margin bên trái

- Sự khác nhau giữa .container, .container-fluid, .container-md:\
  .container: Có max-width cố định theo breakpoint, căn giữa trang\
  .container-fluid: Chiếm 100% chiều rộng màn hình ở mọi kích thước\
  .container-md: Full width ở mobile, từ md (≥768px) trở lên mới có max-width

### PHẦN C — PHÂN TÍCH (20 điểm)

#### Câu C1 (10đ) — Tùy biến Bootstrap

1. Đổi màu $primary từ xanh mặc định sang #E63946

Trong Bootstrap, màu mặc định được quản lý bằng SASS variables. Để đổi màu primary, ta nên sửa biến $primary rồi build lại Bootstrap.

Công cụ cần có:\
Node.js (để cài package)\
npm (đi kèm Node.js)\
Bootstrap source (SCSS)\
SASS compiler

Quy trình thực hiện:\
Bước 1: Tạo project\
Mở terminal:\

```
npm init -y
```

Bước 2: Cài Bootstrap + Sass

```
npm install bootstrap sass
```

Bước 3: Tạo file custom SCSS\
Ví dụ tạo file:

```
scss/custom.scss
```

Nội dung:

```
// Override biến trước khi import Bootstrap
$primary: #E63946;

// Import Bootstrap
@import "../node_modules/bootstrap/scss/bootstrap";
```

Quan trọng:
Phải sửa biến trước khi import Bootstrap.

Bước 4: Compile SCSS → CSS

Chạy lệnh:

```
sass scss/custom.scss css/style.css
```

Sau khi compile sẽ tạo:

css/style.css
Bước 5: Link CSS mới vào HTML

Thay vì CDN Bootstrap:

```
<link rel="stylesheet" href="css/style.css">
```

Lúc này:

btn-primary\
bg-primary\
text-primary\
border-primary\
navbar primary

… sẽ tự động đổi sang màu #E63946.

2. Tại sao KHÔNG nên override trực tiếp?

Ví dụ cách không nên làm:

```
.btn-primary {
background: red;
}
```

Vì sao không tốt?

1. Chỉ sửa được một component
   Đoạn này chỉ ảnh hưởng:

```
<button class="btn btn-primary">
```

Nhưng các class khác vẫn xanh mặc định:

bg-primary\
text-primary\
border-primary\
alert-primary

-> Theme bị không đồng bộ.

2. Dễ bị xung đột CSS

Bootstrap có nhiều state:

hover\
focus\
active\
disabled

Nếu override thủ công:

```
.btn-primary {
background: red;
}
```

Hover có thể vẫn xanh vì Bootstrap còn:

```
.btn-primary:hover
```

-> Phải sửa rất nhiều CSS phụ.

3. Khó maintain khi project lớn

Nếu sau này muốn đổi màu từ đỏ → tím:

Override CSS → sửa nhiều nơi
SASS variable → sửa 1 dòng
$primary: purple;

Rồi compile lại.

4. Bootstrap được thiết kế theo Design System

Bootstrap dùng biến:

$primary\
$success\
$danger\
$warning

Khi đổi $primary, toàn bộ hệ thống màu sẽ cập nhật tự động.

Ví dụ:

$primary: #E63946;

sẽ cập nhật cho:

buttons\
links\
alerts\
badges\
forms\
navbars

-> Nhất quán toàn bộ UI

#### Câu C2 (10đ) — So sánh

```
<nav class="navbar">
    <div class="logo">ShopNow</div>

    <ul class="menu">
        <li><a href="#">Trang chủ</a></li>
        <li><a href="#">Sản phẩm</a></li>
        <li><a href="#">Liên hệ</a></li>
    </ul>
</nav>

<section class="products">
    <div class="product-card">
        <img src="https://picsum.photos/300/200"
            alt="product">

        <h3>Áo Hoodie</h3>

        <p>499.000đ</p>

        <button>Mua ngay</button>
    </div>
</section>
```

css thuần:

```
/* Navbar */
.navbar{
    display:flex;
    justify-content:space-between;
    align-items:center;
    background:#222;
    padding:15px 30px;
}

.logo{
    color:white;
    font-size:24px;
    font-weight:bold;
}

.menu{
    display:flex;
    list-style:none;
    gap:20px;
}

.menu a{
    color:white;
    text-decoration:none;
}

/* Product Card */
.products{
    display:flex;
    justify-content:center;
    margin-top:40px;
}

.product-card{
    width:300px;
    border:1px solid #ddd;
    border-radius:10px;
    padding:20px;
    text-align:center;
    box-shadow:0 2px 8px rgba(0,0,0,.2);
}

.product-card img{
    width:100%;
    border-radius:10px;
}

.product-card button{
    background:#0d6efd;
    color:white;
    border:none;
    padding:10px 20px;
    border-radius:5px;
}

/* Responsive */
@media(max-width:768px){
    .navbar{
        flex-direction:column;
    }

    .menu{
        flex-direction:column;
        margin-top:10px;
    }
}
```

2. Bootstrap version
   Navbar responsive

```
<nav class="navbar navbar-expand-lg bg-dark navbar-dark px-4">

    <a class="navbar-brand" href="#">
        ShopNow
    </a>

    <button class="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#menu">

        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="menu">

        <ul class="navbar-nav ms-auto">
            <li class="nav-item">
                <a class="nav-link" href="#">
                    Trang chủ
                </a>
            </li>
        </ul>

    </div>
</nav>
```

Product card

```
<div class="card shadow" style="width:300px;">
    <img src="https://picsum.photos/300/200"
        class="card-img-top">

    <div class="card-body text-center">

        <h5 class="card-title">
            Áo Hoodie
        </h5>

        <p class="card-text">
            499.000đ
        </p>

        <button class="btn btn-primary">
            Mua ngay
        </button>

    </div>
</div>
```

- So sánh CSS thuần vs Bootstrap

| Tiêu chí             | CSS thuần            | Bootstrap                |
| -------------------- | -------------------- | ------------------------ |
| Số dòng CSS          | Nhiều (30–100+ dòng) | Rất ít hoặc gần như 0    |
| Thời gian phát triển | Chậm hơn             | Nhanh hơn                |
| Responsive           | Tự viết media query  | Có sẵn grid & breakpoint |
| Tùy biến giao diện   | Rất linh hoạt        | Có giới hạn framework    |
| Code lặp lại         | Nhiều                | Ít                       |

- Khi nào NÊN dùng Bootstrap?
  NÊN dùng khi:\
  Làm landing page nhanh\
  Dashboard admin\
  Prototype / deadline gấp\
  Team cần UI đồng bộ\
  Người mới học web

Ví dụ:\
website bán hàng\
admin panel\
form hệ thống

- Khi nào KHÔNG NÊN dùng Bootstrap?
  KHÔNG nên khi:\
  Thiết kế UI quá riêng biệt\
  Website cần performance cực tối ưu\
  Muốn pixel-perfect design\
  Làm web có animation phức tạp

Ví dụ:
portfolio độc đáo\
game web\
website thương hiệu lớn có design riêng

---

## 🎬 PHẦN D — VIDEO THỰC HÀNH OBS (25 điểm)

### Đề bài Video (chọn 1 theo Track):

#### 🅱️ Track A — Bootstrap: Code-along "Product Card + Modal"

https://drive.google.com/file/d/1J215Z1qs9Mji1ucoUQywXN5DLwtvPweF/view?usp=drive_link
