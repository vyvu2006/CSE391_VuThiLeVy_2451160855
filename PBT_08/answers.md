# 📋 PHIẾU BÀI TẬP 08

# **JAVASCRIPT FUNCTIONS, ARRAYS & OBJECTS**

> **Tài liệu tham chiếu:** `tuan_4_javascript_basics/05_functions.md` + `06_arrays_objects.md`

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

### Câu A1 (5đ) — Function Declaration vs Expression vs Arrow

1.  Function Declaration

```
    function tinhThueBaoHiem(luong) {
    let thue = 0;

        if (luong > 11000000) {
            thue = luong * 0.1;
        }

        return {
            thuong: thue,
            thuc_nhan: luong - thue
        };

    }

console.log(tinhThueBaoHiem(15000000));
```

Kết quả ví dụ:

```
{
thuong: 1500000,
thuc_nhan: 13500000
}
```

2. Function Expression

```
const tinhThueBaoHiem = function (luong) {
let thue = 0;

    if (luong > 11000000) {
        thue = luong * 0.1;
    }

    return {
        thuong: thue,
        thuc_nhan: luong - thue
    };

};

console.log(tinhThueBaoHiem(15000000));
```

3. Arrow Function

```
const tinhThueBaoHiem = (luong) => {
let thue = 0;

    if (luong > 11000000) {
        thue = luong * 0.1;
    }

    return {
        thuong: thue,
        thuc_nhan: luong - thue
    };

};

console.log(tinhThueBaoHiem(15000000));
```

- 3 cách này khác nhau về hoisting không?

Có, khác nhau.

1. Function Declaration → được hoisting hoàn toàn

Có thể gọi hàm trước khi khai báo.

```
console.log(tinhThueBaoHiem(15000000));

function tinhThueBaoHiem(luong) {
return {
thuong: luong > 11000000 ? luong _ 0.1 : 0,
thuc_nhan: luong > 11000000
? luong _ 0.9
: luong
};
}
```

-> Chạy bình thường

Vì sao?
JS sẽ đưa toàn bộ function declaration lên đầu bộ nhớ trước khi chạy chương trình.

JS hiểu gần giống như:

```
function tinhThueBaoHiem(luong) {
...
}

console.log(tinhThueBaoHiem(15000000));
```

2. Function Expression → không hoisting function

Nếu dùng trước sẽ lỗi.

```
console.log(tinhThueBaoHiem(15000000));

const tinhThueBaoHiem = function (luong) {
return {
thuong: luong > 11000000 ? luong _ 0.1 : 0,
thuc_nhan: luong > 11000000
? luong _ 0.9
: luong
};
};
```

-> Lỗi

```
ReferenceError: Cannot access 'tinhThueBaoHiem' before initialization
```

Vì sao?
Biến const tinhThueBaoHiem được hoisting nhưng rơi vào Temporal Dead Zone (TDZ) — chưa được khởi tạo nên chưa dùng được.

3. Arrow Function → giống Function Expression

```
   console.log(tinhThueBaoHiem(15000000));

const tinhThueBaoHiem = (luong) => {
return {
thuong: luong > 11000000 ? luong _ 0.1 : 0,
thuc_nhan: luong > 11000000
? luong _ 0.9
: luong
};
};
```

-> Lỗi tương tự

```
ReferenceError: Cannot access 'tinhThueBaoHiem' before initialization
```

Vì arrow function thực chất vẫn được gán vào biến const.

### Câu A2 (5đ) — Scope & Closure

- Đoạn 1: Closure + Counter
  Code:

```
function counter() {
    let count = 0;

    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}

const c = counter();

console.log(c.increment());
console.log(c.increment());
console.log(c.increment());
console.log(c.decrement());
console.log(c.getCount());
```

Dự đoán output:

```
1
2
3
2
2
```

- Đoạn 2: var vs let trong setTimeout
  Code:

```
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 100);
}

for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 200);
}
```

Output

Sau khoảng 100ms

```
var: 3
var: 3
var: 3
```

Sau khoảng 200ms

```
let: 0
let: 1
let: 2
```

Output đầy đủ

```
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2
```

Vì sao var và let cho kết quả khác nhau trong vòng lặp setTimeout?

1. var có function scope

var i chỉ có một biến i duy nhất cho cả vòng lặp.

JS hiểu gần giống:

```
var i;

for (i = 0; i < 3; i++) {
setTimeout(() => console.log(i), 100);
}
```

setTimeout() không chạy ngay.

Nó đợi 100ms.

Trong lúc đó vòng lặp đã chạy xong:

```
i = 3
```

Nên cả 3 callback đều nhìn vào cùng một biến i:

```
3
3
3
```

Closure ở đây đang giữ cùng một reference đến biến i.

2. let có block scope

Với:

```
for (let j = 0; j < 3; j++)
```

JS tạo một biến j mới cho mỗi vòng lặp.

Có thể tưởng tượng như:

```
{
let j = 0;
setTimeout(() => console.log(j), 200);
}

{
let j = 1;
setTimeout(() => console.log(j), 200);
}

{
let j = 2;
setTimeout(() => console.log(j), 200);
}
```

Mỗi callback nhớ một giá trị riêng.

Nên in ra:

```
0
1
2
```

### Câu A3 (5đ) — Array Methods

```
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
```

1. Lấy các số chẵn → [2, 4, 6, 8, 10]

```
const soChan = nums.filter(n => n % 2 === 0);
```

2. Nhân mỗi số với 3 → [3, 6, 9, ..., 30]

```
const nhanBa = nums.map(n => n * 3);
```

3. Tính tổng tất cả → 55

```
const tong = nums.reduce((sum, n) => sum + n, 0);
```

4. Tìm số đầu tiên > 7 → 8

```
const soDauTienLonHon7 = nums.find(n => n > 7);
```

5. Kiểm tra CÓ số > 10 không → false

```
const coSoLonHon10 = nums.some(n => n > 10);
```

6. Kiểm tra TẤT CẢ đều > 0 → true

```
const tatCaLonHon0 = nums.every(n => n > 0);
```

7. Tạo mảng "Số X là [chẵn/lẻ]"

```
const moTa = nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);
```

8. Đảo ngược mảng (không mutate gốc) → [10, 9, ..., 1]

```
const daoNguoc = [...nums].reverse();
```

### Câu A4 (5đ) — Object Destructuring & Spread

Code:

```
const product = {
name: "iPhone 16",
price: 25990000,
specs: { ram: 8, storage: 256, color: "Titan" }
};
```

1. Destructuring
   Code

```
const { name, price, specs: { ram, color } } = product;

console.log(name, price, ram, color);
console.log(specs);
```

Dự đoán output
Dòng 1

```
iPhone 16 25990000 8 Titan
```

Dòng 2

```
ReferenceError: specs is not defined
```

2. Spread
   Code

```
const updated = {
...product,
price: 23990000,
sale: true
};

console.log(updated.price);
console.log(updated.sale);
console.log(product.price);
```

Dự đoán output

```
23990000
true
25990000
```

Object gốc không đổi:

```
product.price === 25990000
```

vì spread tạo object mới.

3. Spread gotcha (bẫy)
   Code

```
const copy = { ...product };
copy.specs.ram = 16;
console.log(product.specs.ram);

```

Dự đoán output

```
16
```

Tại sao là 16 chứ không phải 8?

Vì:

```
{ ...product }
```

chỉ là shallow copy (copy nông).

Nó chỉ copy tầng đầu tiên.

Tưởng tượng:

```
product = {
name: "iPhone 16",
price: 25990000,
specs: <địa chỉ A>
}

copy = {
name: "iPhone 16",
price: 25990000,
specs: <địa chỉ A>
}
```

specs của cả hai cùng trỏ tới một object trong memory.

Nên:

```
copy.specs.ram = 16
```

thực chất sửa object chung.

Kết quả:

```
product.specs.ram === 16
```

Nếu muốn copy sâu (deep copy)?

Có thể:

```
const copy = {
...product,
specs: { ...product.specs }
};
```

Lúc này:

```
copy.specs.ram = 16;
```

→ không ảnh hưởng product.

product.specs.ram vẫn:

```
8
```

## PHẦN C — SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Refactor Code

```
const processOrders = orders =>
    orders
        .filter(({ status, total }) =>
            status === "completed" &&
            total > 100000
        )
        .map(({ id, customer, total }) => ({
            id,
            customer,
            total,
            discount: total * 0.1,
            finalTotal: total * 0.9
        }))
        .sort((a, b) =>
            b.finalTotal - a.finalTotal
        );
```

### Câu C2 (10đ) — Thiết kế API

```
const miniArray = {
    // Giống Array.prototype.map
    map(arr, fn) {
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            result.push(
                fn(arr[i], i, arr)
            );
        }

        return result;
    },

    // Giống Array.prototype.filter
    filter(arr, fn) {
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            if (
                fn(arr[i], i, arr)
            ) {
                result.push(arr[i]);
            }
        }

        return result;
    },

    // Giống Array.prototype.reduce
    reduce(
        arr,
        fn,
        initialValue
    ) {
        let accumulator =
            initialValue;

        let startIndex = 0;

        // Nếu không truyền initialValue
        if (
            accumulator === undefined
        ) {
            accumulator = arr[0];
            startIndex = 1;
        }

        for (
            let i = startIndex;
            i < arr.length;
            i++
        ) {
            accumulator = fn(
                accumulator,
                arr[i],
                i,
                arr
            );
        }

        return accumulator;
    }
};


// ================= TEST =================

console.log(
    miniArray.map(
        [1, 2, 3],
        x => x * 2
    )
);
// → [2, 4, 6]

console.log(
    miniArray.filter(
        [1, 2, 3, 4],
        x => x > 2
    )
);
// → [3, 4]

console.log(
    miniArray.reduce(
        [1, 2, 3, 4],
        (a, b) => a + b,
        0
    )
);
// → 10
```

---

## 🎬 PHẦN D — VIDEO THỰC HÀNH OBS (25 điểm)

https://drive.google.com/file/d/1jWGLQOvs1Mlw7wjtiOb4x4W5NmCxrs0Z/view?usp=drive_link
