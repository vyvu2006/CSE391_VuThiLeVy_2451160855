# 📋 PHIẾU BÀI TẬP 07

# **JAVASCRIPT BASICS — Variables, Data Types, Control Structures**

> **Tài liệu tham chiếu:** `tuan_4_javascript_basics/01_basics_introduction.md` → `04_control_structures.md`

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)

### Câu A1 (5đ) — var / let / const

- Đoạn 1

```
console.log(x);
var x = 5;
```

Dự đoán output:

```
undefined
```

Giải thích: var có cơ chế hoisting (được kéo lên đầu phạm vi).

JavaScript hiểu gần như:

```
var x;
console.log(x);
x = 5;
```

Nên x tồn tại nhưng chưa có giá trị, vì vậy in ra:
undefined

- Đoạn 2

```
console.log(y);
let y = 10;
```

Dự đoán output: Lỗi

```
ReferenceError: Cannot access 'y' before initialization
```

Giải thích:

let cũng được hoisting nhưng nằm trong Temporal Dead Zone (TDZ).\
Nghĩa là biến đã tồn tại nhưng không được phép dùng trước khi khai báo.\
Khác với var:\
var → undefined\
let → lỗi ReferenceError

- Đoạn 3

```
const z = 15;
z = 20;
console.log(z);
```

Dự đoán output: Lỗi

```
TypeError: Assignment to constant variable.
```

Giải thích:
const nghĩa là không được gán lại giá trị sau khi khởi tạo.

```
const z = 15;
```

Sau đó:

```
z = 20;
```

→ lỗi ngay, nên:

```
console.log(z);
```

không chạy tới.

- Đoạn 4

```
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
```

Dự đoán output:

```
[1, 2, 3, 4]
```

Giải thích: Đây là chỗ dễ gây nhầm.\
const không cho đổi tham chiếu, nhưng được phép thay đổi nội dung object/array.

Ví dụ: Hợp lệ:

```
arr.push(4);
```

Không hợp lệ:

```
arr = [5, 6];
```

Vì đang gán lại mảng mới.

- Đoạn 5

```
let a = 1;
{
let a = 2;
console.log("Trong block:", a);
}
console.log("Ngoài block:", a);
```

Dự đoán output:
Trong block: 2
Ngoài block: 1
Giải thích: let có block scope (phạm vi khối {}).\
Biến a bên trong block:

```
{
let a = 2;
}
```

là biến khác hoàn toàn với:

```
let a = 1;
```

Nên:\
Trong block → 2\
Ngoài block → vẫn là 1

### Câu A2 (5đ) — Data Types & Coercion

Dự đoán kết quả:

1

```
console.log(typeof null);
```

->Kết quả:

```
"object"
```

2

```
console.log(typeof undefined);
```

->Kết quả:

```
"undefined"
```

3

```
console.log(typeof NaN);
```

->Kết quả:

```
"number"
```

4

```
console.log("5" + 3);
```

->Kết quả:

```
"53"
```

5

```
console.log("5" - 3);
```

->Kết quả:

```
2
```

6

```
console.log("5" * "3");
```

->Kết quả:

```
15
```

7

```
console.log(true + true);
```

->Kết quả:

```
2
```

8

```
console.log([] + []);
```

Kết quả:

```
""
```

9

```
console.log([] + {});
```

->Kết quả:

```
"[object Object]"
```

10

```
console.log({} + []);
```

->Kết quả:

```
0
```

Hoặc đôi khi:

```
"[object Object]"
```

```
console.log(typeof null); // "object"
console.log(typeof undefined); // "undefined"
console.log(typeof NaN); // "number"
console.log("5" + 3); // "53
console.log("5" - 3); // 2
console.log("5" \* "3"); // 15
console.log(true + true); // 2
console.log([] + []); // ""
console.log([] + {}); // "[object object]"
console.log({} + []); // 0 (đa số console)
```

---

- Vì sao "5" + 3 và "5" - 3 khác nhau?
  "5" + 3

Toán tử + có 2 chức năng:
Cộng số\
Nối chuỗi

Vì có "5" là string nên JS chọn nối chuỗi:

```
"5" + 3
↓
"5" + "3"
↓
"53"
```

"5" - 3

Toán tử - chỉ dùng để tính toán.

JS buộc phải ép kiểu:

```
"5" → 5
```

Nên:

```
5 - 3 = 2
```

### Câu A3 (5đ) — So sánh == vs ===

Câu A3 (5đ) — So sánh == vs ===
Dự đoán true hay false:

```
console.log(5 == "5");                // true
console.log(5 === "5");               // false
console.log(null == undefined);       // true
console.log(null === undefined);      // false
console.log(NaN == NaN);             // false
console.log(0 == false);             // true
console.log(0 === false);            // false
console.log("" == false);            // true
```

Quy tắc: Từ giờ trở đi, bạn nên dùng == hay ===? Tại sao?\
-Nên dùng ===\
-Vì === không ép kiểu ngầm, nên ít bug và dễ đoán hơn.

### Câu A4 (5đ) — Truthy & Falsy

- Tất cả giá trị Falsy trong JavaScript:

```
false
0
-0
0n
""
null
undefined
NaN
```

```
if ("0") console.log("A");           // Có, in ra A
if ("") console.log("B");            // Không in
if ([]) console.log("C");            // Có, in ra C
if ({}) console.log("D");            // Có, in ra D
if (null) console.log("E");          // Không in
if (0) console.log("F");             // Không in
if (-1) console.log("G");            // Có, in ra G
if (" ") console.log("H");           // CÓ, in ra H
```

### Câu A5 (5đ) — Template Literals

- 3 cách nối chuỗi sau bằng template literal (backtick):
  Cách 1:

```
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
```

Cách 2:

```
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;
```

Cách 3:

```
var html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;
```

## PHẦN C — SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Debug JavaScript

```
function tinhGiaGiamGia(giaBan, phanTramGiam) {

    // Kiểm tra input có phải số không
    if (
        typeof giaBan !== "number" ||
        typeof phanTramGiam !== "number" ||
        isNaN(giaBan) ||
        isNaN(phanTramGiam)
    ) {
        return "Input không hợp lệ";
    }

    // Kiểm tra phần trăm giảm
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ";
    }

    let giamGia = giaBan * phanTramGiam / 100;
    let giaSauGiam = giaBan - giamGia;

    // So sánh đúng
    if (giaSauGiam === 0) {
        console.log("Sản phẩm miễn phí!");
    }

    return giaSauGiam;

}

// Test
const gia = tinhGiaGiamGia(100000, 20);
console.log("Giá sau giảm: " + gia + "đ");

const gia2 = tinhGiaGiamGia(50000, 110);
console.log("Giá: " + gia2);

// Fix lỗi var trong loop
for (let i = 0; i < 5; i++) {
setTimeout(function () {
console.log("Item " + i);
}, 1000);
}
```

1. Thiếu dấu ; (semicolon)
   Code lỗi:
   ```
   return "Phần trăm giảm không hợp lệ"
   ```
   Sửa:
   ```
   return "Phần trăm giảm không hợp lệ";
   ```
   Giải thích: JS vẫn chạy được do Automatic Semicolon Insertion, nhưng dễ gây bug.

Nên luôn viết ;.

2. giaBan truyền vào là string
   Code lỗi:
   ```
   const gia = tinhGiaGiamGia("100000", 20)
   ```
   Vấn đề: "100000" là string, không phải number.\
   Dù JS có ép kiểu ngầm:

```
"100000" * 20
```

vẫn chạy, nhưng là code không an toàn.

Sửa:

```
const gia = tinhGiaGiamGia(100000, 20);
```

hoặc validate input trong function.

3. Thiếu validate input
   Code lỗi:

Không kiểm tra:

```
abc
undefined
null
NaN
```

Sửa:

```
typeof giaBan !== "number"
```

và:

```
isNaN()
```

Vì sao?

Case này:

```
tinhGiaGiamGia("abc", 20)
```

sẽ cho:

```
NaN
```

→ không mong muốn.

4. Sai toán tử trong if
   Code lỗi:
   ```
   if (giaSauGiam = 0)
   ```
   -> Đây là gán giá trị, không phải so sánh.

JS hiểu là:

```
giaSauGiam = 0
```

→ luôn trả 0 (Falsy)

nên block không chạy.

Sửa:

```
if (giaSauGiam === 0)
```

Giải thích:
= → gán
== → so sánh lỏng
=== → so sánh chặt 5. Dùng var không cần thiết
Code:

```
var giamGia
```

Sửa:

```
let giamGia
```

Vì sao?

var có function scope và hoisting dễ gây bug.

let an toàn hơn vì block scope.

6. Lỗi ẩn với var trong vòng lặp setTimeout
   Code lỗi:
   ```
   for (var i = 0; i < 5; i++) {
   setTimeout(function() {
   console.log("Item " + i)
   }, 1000)
   }
   ```
   Nhiều người nghĩ output là:
   ```
   Item 0
   Item 1
   Item 2
   Item 3
   Item 4
   ```
   ❌ Sai.

Output thật:

```
Item 5
Item 5
Item 5
Item 5
Item 5
```

Vì sao?

var có function scope, không phải block scope.

Sau vòng lặp:

```
i = 5
```

setTimeout() chạy sau 1 giây, lúc đó vòng lặp kết thúc rồi.

Tất cả callback đều dùng chung biến:

i = 5
Cách sửa bằng let

```
for (let i = 0; i < 5; i++) {
setTimeout(function () {
console.log("Item " + i);
}, 1000);
}
```

Output đúng:

```
Item 0
Item 1
Item 2
Item 3
Item 4
```

Vì sao let sửa được?

let có block scope.

Mỗi vòng lặp tạo một bản sao riêng của i.

Ví dụ:

```
i = 0
i = 1
i = 2
```

không dùng chung nữa.

---

## 🎬 PHẦN D — VIDEO THỰC HÀNH OBS (25 điểm)

https://drive.google.com/file/d/1YEySlKj-dSPYQlA_7y0_r8nQTY5oF-eg/view?usp=drive_link
