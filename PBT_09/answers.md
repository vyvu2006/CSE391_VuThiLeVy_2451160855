# 📋 PHIẾU BÀI TẬP 09

# **DOM MANIPULATION & EVENTS**

> **Tài liệu tham chiếu:** `tuan_5_javascript_dom_async/19_dom_manipulation.md`

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

### Câu A1 (5đ) — DOM Tree

### Câu A2 (5đ) — innerHTML vs textContent

### Câu A3 (5đ) — Event Bubbling

---

## PHẦN C — DEBUG & PHÂN TÍCH (15 điểm)

### Câu C1 (8đ) — Debug DOM Code

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

```

document.querySelector("#todoList li:first-child");

```

f. Chọn tất cả <a> bên trong <nav>

```

document.querySelectorAll("nav a");

```

### Câu C2 (7đ) — Performance

Giải thích: Tại sao bind event lên 1000 elements riêng lẻ là BAD PRACTICE? Event Delegation giải quyết thế nào?

Cho code:

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    document.body.appendChild(div);   // ← 1000 lần reflow!
}
Refactor dùng DocumentFragment để chỉ gây 1 lần reflow. Giải thích tại sao nhanh hơn.
---

## 🎬 PHẦN D — VIDEO THỰC HÀNH OBS (25 điểm)
https://drive.google.com/file/d/1rRoo1GNDUdv7XKEReMIuY-8t1Kgcvg9E/view?usp=drive_link
```
