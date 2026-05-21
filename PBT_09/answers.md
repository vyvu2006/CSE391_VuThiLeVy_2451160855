# 📋 PHIẾU BÀI TẬP 09

# **DOM MANIPULATION & EVENTS**

> **Tài liệu tham chiếu:** `tuan_5_javascript_dom_async/19_dom_manipulation.md`

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

### Câu A1 (5đ) — DOM Tree

1. DOM Tree (Sơ đồ cây)

```
   div#app
   ├── header
   │ ├── h1
   │ │ └── "Todo App"
   │ └── nav
   │ ├── a.active
   │ │ └── "All"
   │ ├── a
   │ │ └── "Active"
   │ └── a
   │ └── "Completed"
   │
   └── main
   ├── form#todoForm
   │ ├── input#todoInput[type="text"]
   │ └── button[type="submit"]
   │ └── "Add"
   │
   └── ul#todoList
   ├── li.todo-item
   │ └── "Learn HTML"
   └── li.todo-item.completed
   └── "Learn CSS"
```

2. Viết querySelector cho từng yêu cầu
   a. Chọn thẻ `<h1>`

```
document.querySelector("h1");
```

Hoặc cụ thể hơn:

```
document.querySelector("header h1");
```

b. Chọn input trong form

```
document.querySelector("#todoForm input");
```

Hoặc:

```
document.querySelector("#todoInput");
```

c. Chọn tất cả .todo-item

(Dùng querySelectorAll vì có nhiều phần tử)

```
document.querySelectorAll(".todo-item");
```

d. Chọn link đang active

```
document.querySelector("a.active");
```

Hoặc cụ thể trong nav:

```
document.querySelector("nav .active");
```

e. Chọn `<li>` đầu tiên trong #todoList

```
document.querySelector("#todoList li");
```

Hoặc dùng pseudo-class:

```

document.querySelector("#todoList li:first-child");

```

f. Chọn tất cả `<a>` bên trong `<nav>`

```
document.querySelectorAll("nav a");
```

### Câu A2 (5đ) — innerHTML vs textContent

1. Sự khác nhau
   |Tiêu chí |innerHTML| textContent|
   |-----------|---------|------------|
   |Xử lý HTML |Có đọc và render HTML |Không, chỉ coi là text|
   |Hiển thị thẻ HTML|Thẻ được trình duyệt hiểu |Hiển thị nguyên văn|
   |Bảo mật |Có thể nguy hiểm (XSS) |An toàn hơn|
   |Tốc độ |Chậm hơn (phải parse HTML)| Nhanh hơn|

2. Khi nào dùng mỗi cái?

- Dùng innerHTML khi muốn thêm HTML động vào trang.

Ví dụ:

```
<div id="box"></div>
```

```
document.querySelector("#box").innerHTML =
    "<h2>Hello</h2><p>Xin chào</p>";
```

Kết quả: trình duyệt render thành:

```
<h2>Hello</h2>
<p>Xin chào</p>
```

- Dùng textContent khi chỉ muốn hiển thị text thuần, đặc biệt là dữ liệu người dùng nhập.

Ví dụ:

```
<div id="box"></div>
```

```
document.querySelector("#box").textContent =
    "<h2>Hello</h2>";
```

Kết quả hiển thị trên màn hình:

```
<h2>Hello</h2>
```

(chữ thường, không biến thành thẻ HTML)

- Câu hỏi bảo mật — Vì sao innerHTML gây lỗ hổng XSS?
  XSS là gì?

Cross-site scripting (XSS) là lỗ hổng cho phép hacker chèn mã độc (thường là JavaScript) vào website.

innerHTML nguy hiểm vì nó render nội dung như HTML thật. Nếu user nhập code độc thì trình duyệt sẽ chạy nó.

Ví dụ nguy hiểm

User nhập:

```
<img src=x onerror="alert('Hacked!')">
```

Code:

```
const userInput =
document.querySelector("#search").value;

document.querySelector("#result").innerHTML =
userInput; // ← Nguy hiểm
```

Khi render:

```
<img src=x onerror="alert('Hacked!')">
```

Do ảnh lỗi (src=x không tồn tại), onerror chạy → popup "Hacked!" xuất hiện.

Đây là XSS attack vì attacker đã inject JavaScript vào trang.

Cách sửa an toàn: Dùng textContent thay vì innerHTML.

```
const userInput =
document.querySelector("#search").value;

document.querySelector("#result").textContent =
userInput; // ← An toàn
```

Kết quả:

Trình duyệt sẽ hiển thị:

```
<img src=x onerror="alert('Hacked!')">
```

### Câu A3 (5đ) — Event Bubbling

- Khi click button::
  BUTTON
  INNER
  OUTER
  Giải thích:
  Click xảy ra ở button trước → "BUTTON"
  Event nổi bọt (bubble) lên inner → "INNER"
  Tiếp tục lên outer → "OUTER"

- Nếu uncomment stopPropagation(),output=:
  BUTTON
  Giải thích:
  e.stopPropagation() sẽ chặn event bubbling, nên event không lan lên inner và outer.

---

## PHẦN C — DEBUG & PHÂN TÍCH (15 điểm)

### Câu C1 (8đ) — Debug DOM Code

1. Sai event "onclick"
   Lỗi:

```
   addEventListener("onclick", function()
```

addEventListener() dùng "click" chứ không phải "onclick".

Sửa:

```
document.querySelector("#decrementBtn")
.addEventListener("click", function() {
```

2. countDisplay = count sai
   Lỗi:

```
countDisplay = count;
```

countDisplay là DOM element, không thể gán thành số.

Sửa:

```
countDisplay.textContent = count;
```

hoặc:

```
countDisplay.innerHTML = count;
```

3. const countDisplay không được gán lại

Do đoạn này:

```
countDisplay = count;
```

đang cố ghi đè biến const → gây lỗi runtime.

Sửa bằng:

```
countDisplay.textContent = count;
```

4. historyList.innerHTML = null
   Lỗi:

```
historyList.innerHTML = null;
```

null sẽ hiển thị thành chữ "null" trong DOM.

Sửa:

```
historyList.innerHTML = "";
```

5. item.remove thiếu ()
   Lỗi:

```
item.remove;
```

Đây chỉ là tham chiếu function, không chạy.

Sửa:

```
item.remove();
```

6. Không load lại history từ localStorage
   Lỗi:

Code save:

```
localStorage.setItem("history", historyList.innerHTML);
```

Nhưng lúc load lại không restore history.

Sửa:

```
historyList.innerHTML =
localStorage.getItem("history") || "";
```

7. count từ localStorage là string
   Lỗi:

```
count = localStorage.getItem("count");
```

localStorage luôn trả về string.

Ví dụ:

count = "5"
click increment → "5" + 1 = "51"
Sửa:

```
count = Number(localStorage.getItem("count")) || 0;
```

8. Dùng innerHTML không cần thiết
   Đoạn:

```
countDisplay.innerHTML = count;
```

Vì chỉ hiển thị text nên nên dùng:

```
countDisplay.textContent = count;
```

(an toàn và tối ưu hơn)

9. Sau khi load history, click delete có thể không hoạt động

Vì event listener được gắn lúc tạo li, nhưng khi restore bằng:

```
historyList.innerHTML = savedHistory;
```

listener cũ mất.

Sửa:

Gắn lại listener:

```
historyList.querySelectorAll("li").forEach(li => {
li.addEventListener("click", function() {
deleteHistory(this);
});
});
```

Code hoàn chỉnh:

```
// App: Counter with history
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

// Increment
document.querySelector("#incrementBtn")
.addEventListener("click", function () {
    count++;
    countDisplay.textContent = count;

    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;

    li.addEventListener("click", function () {
        deleteHistory(this);
    });

    historyList.append(li);
});

// Decrement
document.querySelector("#decrementBtn")
.addEventListener("click", function () {
    count--;
    countDisplay.textContent = count;
});

// Reset
document.querySelector("#resetBtn")
.addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count;
    historyList.innerHTML = "";
});

// Delete history item
function deleteHistory(element) {
    element.parentNode.removeChild(element);
}

// Clear all history
document.querySelector("#clearHistory")
.addEventListener("click", () => {
    const items =
        historyList.querySelectorAll("li");

    items.forEach(item => {
        item.remove();
    });
});

// Save to localStorage
window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem(
        "history",
        historyList.innerHTML
    );
});

// Load from localStorage
window.addEventListener("load", () => {
    count =
        Number(localStorage.getItem("count")) || 0;

    countDisplay.textContent = count;

    historyList.innerHTML =
        localStorage.getItem("history") || "";

    // Re-bind click event
    historyList.querySelectorAll("li")
    .forEach(li => {
        li.addEventListener("click", function () {
            deleteHistory(this);
        });
    });
});
```

### Câu C2 (7đ) — Performance

1. Giải thích: Tại sao bind event lên 1000 elements riêng lẻ là BAD PRACTICE? Event Delegation giải quyết thế nào?
   Ví dụ không tốt:

```
const items = document.querySelectorAll(".item");

items.forEach(item => {
    item.addEventListener("click", () => {
        console.log(item.textContent);
    });
});
```

Nếu có 1000 elements:\
+Tạo 1000 event listeners\
+Tốn memory\
+Browser phải quản lý nhiều listeners\
+Performance giảm khi DOM lớn\
+Khi thêm element mới phải bind lại event

=> Không tối ưu.

- Event Delegation giải quyết thế nào?

Thay vì gắn event cho từng phần tử con, ta gắn 1 event listener lên phần tử cha.

Do Event Bubbling, click ở con sẽ nổi bọt lên cha.

Ví dụ tối ưu:

```
document.body.addEventListener("click", (e) => {
    if (e.target.matches("div")) {
        console.log(e.target.textContent);
    }
});
```

Lợi ích:\
Chỉ có 1 listener thay vì 1000\
Tiết kiệm memory\
Nhanh hơn\
Element tạo động vẫn hoạt động, không cần bind lại

=> Đây gọi là Event Delegation.

2. Cho code:

```
for (let i = 0; i < 1000; i++) {
const div = document.createElement("div");
div.textContent = `Item ${i}`;
document.body.appendChild(div); // ← 1000 lần reflow!
}
```

Vấn đề:

```
document.body.appendChild(div);
```

chạy 1000 lần.

Mỗi lần append:

DOM update
Browser phải tính lại layout (reflow)
repaint lại giao diện

=> gây 1000 lần reflow, rất tốn hiệu năng.

Refactor dùng DocumentFragment để chỉ gây 1 lần reflow. Giải thích tại sao nhanh hơn.
Refactor dùng DocumentFragment
Code tối ưu:

```
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
const div = document.createElement("div");
div.textContent = `Item ${i}`;

    fragment.appendChild(div);

}

document.body.appendChild(fragment);
```

- Tại sao nhanh hơn?

DocumentFragment là một DOM tạm trong bộ nhớ, chưa render lên màn hình.

Quá trình:

Tạo 1000 elements trong fragment
→ chưa ảnh hưởng DOM thật
Sau khi xong:

```
document.body.appendChild(fragment);
```

→ append 1 lần duy nhất

Kết quả:\
1 reflow thay vì 1000 reflow\
Giảm repaint\
Browser render hiệu quả hơn\
App mượt hơn

---

## 🎬 PHẦN D — VIDEO THỰC HÀNH OBS (25 điểm)

https://drive.google.com/file/d/1rRoo1GNDUdv7XKEReMIuY-8t1Kgcvg9E/view?usp=drive_link
