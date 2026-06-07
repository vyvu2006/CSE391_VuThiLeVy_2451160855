# 📋 PHIẾU BÀI TẬP 10

# **ASYNC JAVASCRIPT & API INTEGRATION**

> **Tài liệu tham chiếu:** `tuan_5_javascript_dom_async/20_ajax_async.md` + `21_professional_dev_process.md`

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

### Câu A1 (5đ) — Sync vs Async

- Thứ tự output =

1 - Start

4 - End

3 - Promise

6 - Promise 2

2 - Timeout 0ms

7 - Nested timeout

5 - Timeout 100ms

- Giải thích Event Loop, Microtask Queue, Macrotask Queue.
  Even Loop: Giống như một người bảo vệ liên tục quan sát Call Stack (nơi chứa code đang chạy). Nếu Call Stack trống, nó sẽ lấy các tác vụ đang chờ trong hàng đợi (Queues) đẩy vào Call Stack để chạy tiếp.

Microtask Queue(Hàng đợi ưu tiên cao):Nơi chứa các đoạn code callback của Promise (.then, .catch). Ngay khi Call Stack trống, Event Loop sẽ ưu tiên dọn dẹp toàn bộ Microtask Queue trước tiên.

Macrotask Queue(Hàng đợi ưu tiên thấp):Nơi chứa các callback của setTimeout, setInterval, hoặc các sự kiện DOM. Event Loop chỉ lấy 1 tác vụ trong Macrotask Queue ra chạy khi Microtask Queue đã hoàn toàn trống rỗng.

Diễn biến code:

1.Chạy code đồng bộ (Sync): Trình duyệt đọc code từ trên xuống dưới.

Chạy console.log("1 - Start") -> In ra 1.

Gặp setTimeout 0ms: Bỏ callback của nó vào Macrotask Queue.

Gặp Promise 1: Lời hứa hoàn thành ngay, bỏ callback .then() vào Microtask Queue.

Chạy console.log("4 - End") -> In ra 4.

Gặp setTimeout 100ms: Nhờ Web API đếm ngược 100ms, sau đó mới bỏ vào Macrotask Queue.

Gặp Promise 2: Bỏ callback .then() vào Microtask Queue.

2.Xử lý Microtask Queue (Các Promise): Lúc này Call Stack đã trống (chạy xong code Sync). Event Loop ưu tiên kiểm tra hàng đợi Promise.

Chạy callback Promise 1 -> In ra 3.

Chạy callback Promise 2 -> In ra 6. Trong lúc chạy, nó phát hiện một setTimeout mới (Nested timeout) và đẩy cái này vào cuối Macrotask Queue.

3.Xử lý Macrotask Queue (Các Timeout): Sau khi hàng đợi Promise đã trống trơn, Event Loop mới chuyển sang hàng đợi Timeout.

Chạy setTimeout 0ms (bị đẩy vào từ lúc đầu) -> In ra 2.

Chạy setTimeout lồng (bị đẩy vào từ bước Promise 2) -> In ra 7.

4.Chờ và xử lý Timeout còn lại:

Sau 100ms, Web API đếm xong và đẩy setTimeout 100ms vào Macrotask Queue. Event Loop lấy ra chạy -> In ra 5 (kết thúc chương trình).

### Câu A2 (5đ) — Fetch API

1. await fetch(...) — fetch trả về gì? Tại sao cần await?

   fetch trả về một Promise ("lời hứa" sẽ có dữ liệu từ server) với các trạng thái như Pending, Fulfilled, hoặc Rejected.

   Cần dùng await để "chờ" (unwrap) Promise đó hoàn thành (giải quyết) thay vì phải viết .then() dài dòng. Nó giúp bạn đọc code bất đồng bộ dễ dàng từ trên xuống dưới như code đồng bộ.

2. response.ok — Khi nào false? Liệt kê 3 status codes tương ứng.

   response.ok sẽ false khi server trả về các mã lỗi HTTP 4xx hoặc 5xx.

   3 status codes ví dụ tương ứng là: 404 (Not Found), 403 (Forbidden), và 500 (Internal Server Error).

3. response.json() — Tại sao cần await lần nữa?

   Cần await lần nữa vì bản thân hàm response.json() cũng là một quá trình xử lý bất đồng bộ và nó trả về một Promise. Cần dùng lệnh await response.json() để chờ quá trình bóc tách và chuyển đổi dữ liệu hoàn tất trước khi gán vào biến data.

4. try...catch — Catch những lỗi gì? (Network error? 404? JSON parse error?)

Khối try...catch bắt các lỗi:
Network error (Lỗi mạng): Bắt được tự động. fetch sẽ tự động reject (throw error) khi gặp các lỗi như mất mạng (offline), lỗi CORS, hoặc hỏng DNS.

Lỗi 404, 500, 403 (HTTP Errors): fetch không tự động throw error khi gặp HTTP 4xx hay 5xx, nó vẫn coi đó là kết nối thành công (resolve). Đoạn code trên chỉ bắt được lỗi 404 vì lập trình viên đã chủ động kiểm tra if (!response.ok) và dùng lệnh throw new Error(...) để ném lỗi xuống khối catch.

### Câu A3 (5đ) — Promise States

```
               Promise Created
                      │
                      ▼
               ⏳ PENDING
              (Đang chờ xử lý)
                 /         \
                /           \
               ▼             ▼
        FULFILLED          REJECTED
       (Thành công)       (Thất bại)
```

- Callback Hell là tình trạng:

Callback lồng callback quá nhiều tầng, làm code khó đọc, khó bảo trì, khó debug.

Code bị lệch phải như “kim tự tháp”.

Hay gặp khi xử lý async trước thời Promise/async-await.

- Ví dụ 4 cấp callback hell → Refactor thành async/await:

```
getUser(userId, function(user) {

    getOrders(user.id, function(orders) {

        getProduct(orders[0].productId, function(product) {

            getReviews(product.id, function(reviews) {

                console.log(user);
                console.log(orders);
                console.log(product);
                console.log(reviews);

            });

        });

    });

});
```

Refactor thành async/await:

```
async function loadData() {
    try {

        const user = await getUser(userId);

        const orders = await getOrders(user.id);

        const product = await getProduct(
            orders[0].productId
        );

        const reviews = await getReviews(
            product.id
        );

        console.log(user);
        console.log(orders);
        console.log(product);
        console.log(reviews);

    } catch (error) {
        console.error(error);
    }
}
```

---

## PHẦN C — PHÂN TÍCH (20 điểm)

### Câu C1 (10đ) — Error Handling Strategy

Trong ứng dụng E-Commerce, app gọi nhiều APIs như:

API sản phẩm
API giỏ hàng
API thanh toán
API user profile

Nếu xử lý lỗi kém → app dễ crash hoặc trải nghiệm người dùng rất tệ.

1. Network Errors (mất mạng giữa chừng)
   Tình huống:

Ví dụ:
mất Wi-Fi,
mất 4G,
server không kết nối được,
DNS lỗi

fetch() sẽ throw error → nhảy vào catch.

Chiến lược xử lý:
Hiển thị thông báo thân thiện\
Cho phép user Retry\
Cache dữ liệu cũ nếu có\
Disable nút checkout khi offline\

Code:

```
async function getProducts() {
try {
const response = await fetch("/api/products");

        const data = await response.json();

        return data;

    } catch (error) {

        console.error("Network error:", error);

        alert(
            "Không có kết nối mạng. Vui lòng thử lại."
        );

        return [];
    }

}
```

Giải thích

Nếu:

`Internet disconnected`

thì:

`fetch()`

bị reject → catch.

App không crash mà hiển thị lỗi cho user.

2. API Errors (500, 404, 429)

fetch() KHÔNG tự throw error khi:

```
404
500
429
```

nên phải kiểm tra:

```
response.ok
```

404 — Not Found
Ý nghĩa: Resource không tồn tại.

Ví dụ:

`/api/product/9999`

không có sản phẩm.

Xử lý:

Hiển thị “Không tìm thấy”

Redirect về trang sản phẩm

Code:

```
if (response.status === 404) {
throw new Error(
"Sản phẩm không tồn tại"
);
}
```

500 — Internal Server Error

Ý nghĩa: Lỗi phía server.

Xử lý:

Không đổ lỗi cho user

Hiển thị:

Hệ thống đang bảo trì

Log lỗi

Code:

```
if (response.status === 500) {
throw new Error(
"Server đang gặp sự cố"
);
}
```

429 — Too Many Requests

Ý nghĩa: Gửi request quá nhiều.

Ví dụ:

`spam search API.`

Xử lý:

Chờ vài giây rồi thử lại

Disable button tạm thời

Debounce search

Code:

```
if (response.status === 429) {
throw new Error(
"Quá nhiều request. Hãy thử lại sau."
);
}
```

Full API Error Handling

```
async function getProduct(id) {
try {

        const response =
            await fetch(`/api/product/${id}`);

        if (response.status === 404) {
            throw new Error(
                "Product not found"
            );
        }

        if (response.status === 500) {
            throw new Error(
                "Server error"
            );
        }

        if (response.status === 429) {
            throw new Error(
                "Too many requests"
            );
        }

        const data =
            await response.json();

        return data;

    } catch (error) {

        console.error(error.message);

        return null;
    }

}
```

3.  Timeout (>10 giây)
    Vấn đề: API quá chậm:

`Loading mãi...`

User nghĩ app bị treo.

Chiến lược xử lý:

Timeout sau 10 giây

Hủy request

Hiển thị retry button

Code fetchWithTimeout(url, ms)

```
async function fetchWithTimeout(
url,
ms = 10000
) {

    const controller =
        new AbortController();

    const timeoutId = setTimeout(() => {
        controller.abort();
    }, ms);

    try {

        const response = await fetch(url, {
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        return response;

    } catch (error) {

        if (error.name === "AbortError") {
            throw new Error(
                "Request timeout"
            );
        }

        throw error;
    }

}
```

Cách dùng

```
try {

    const response =
        await fetchWithTimeout(
            "/api/products",
            10000
        );

} catch (error) {

    console.log(error.message);

}
```

Giải thích:

Sau:

`10 giây`

nếu API chưa phản hồi:

`controller.abort()`

→ hủy request.

4. Retry Logic (thử lại 3 lần)
   Tình huống

Mạng chập chờn.

Request fail lần đầu nhưng lần 2 thành công.

Chiến lược xử lý
Retry tối đa 3 lần
Chỉ retry network errors
Không retry:

```
404
401
403
```

vì retry vô ích.

Code fetchWithRetry(url, maxRetries)

```
async function fetchWithRetry(
url,
maxRetries = 3
) {

    for (
        let attempt = 1;
        attempt <= maxRetries;
        attempt++
    ) {

        try {

            const response =
                await fetch(url);

            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}`
                );
            }

            return response;

        } catch (error) {

            console.log(
                `Retry ${attempt}/${maxRetries}`
            );

            if (attempt === maxRetries) {
                throw error;
            }

            await new Promise(resolve =>
                setTimeout(resolve, 1000)
            );
        }
    }

}
```

Giải thích Retry Logic

Nếu lần 1 fail:

`Retry 1/3`

đợi:

`1 giây`

rồi thử lại.

Nếu lần 2 fail:

`Retry 2/3`

Nếu lần 3 vẫn fail:

`throw error`

### Câu C2 (10đ) — Promise.all vs Promise.allSettled vs Promise.race

| Method          | Khi nào resolve?                                  | Khi nào reject?         | Use case                          |
| --------------- | ------------------------------------------------- | ----------------------- | --------------------------------- |
| `.all()`        | Khi tất cả Promise thành công                     | Chỉ cần 1 Promise fail  | Load nhiều API bắt buộc           |
| `.allSettled()` | Khi tất cả Promise hoàn thành (success hoặc fail) | Không reject            | Dashboard/API độc lập             |
| `.race()`       | Promise đầu tiên hoàn thành                       | Promise đầu tiên reject | Timeout, chọn response nhanh nhất |
| `.any()`        | Promise đầu tiên thành công                       | Khi tất cả fail         | Multi-server fallback             |

1. Promise.all()
   Hoạt động

Chờ tất cả Promise thành công.

Nếu 1 cái fail → fail toàn bộ.

Scenario thực tế — Trang Product Detail

E-Commerce mở trang sản phẩm cần:

API product\
API reviews\
API recommendations

Thiếu 1 cái → page không render đầy đủ

Code

```
async function loadProductPage(productId) {

    try {

        const [
            product,
            reviews,
            recommendations
        ] = await Promise.all([

            fetch(`/api/product/${productId}`)
                .then(res => res.json()),

            fetch(`/api/reviews/${productId}`)
                .then(res => res.json()),

            fetch(`/api/recommendations/${productId}`)
                .then(res => res.json())
        ]);

        console.log(product);
        console.log(reviews);
        console.log(recommendations);

    } catch (error) {

        console.error(
            "Failed to load page"
        );
    }
}
```

Giải thích

Nếu:

product ✅

reviews ✅

recommendations ❌

→ toàn bộ Promise.all reject

vì page cần đủ dữ liệu.

2. Promise.allSettled()
   Hoạt động: Chờ tất cả Promise xong dù success hay fail.

Không reject.

Trả:

```
[
 { status: "fulfilled" },
 { status: "rejected" }
]
```

Scenario thực tế — Dashboard Admin

Dashboard có:

sales statistics\
top products\
user analytics

Nếu analytics lỗi vẫn phải hiển thị phần còn lại.

Code

```
async function loadDashboard() {

    const results =
        await Promise.allSettled([

        fetch("/api/sales")
            .then(res => res.json()),

        fetch("/api/products")
            .then(res => res.json()),

        fetch("/api/analytics")
            .then(res => res.json())
    ]);

    results.forEach(result => {

        if (
            result.status === "fulfilled"
        ) {
            console.log(
                "Success:",
                result.value
            );
        } else {

            console.error(
                "Failed:",
                result.reason
            );
        }
    });
}
```

Giải thích

Ví dụ:

sales ✅

products ✅

analytics ❌

Dashboard vẫn chạy.

3. Promise.race()
   Hoạt động

Promise nào xong trước thì lấy kết quả đó.

Có thể:

resolve trước

reject trước

Scenario thực tế — API Timeout 10 giây

Nếu API quá chậm → timeout.

Code

```
async function fetchWithTimeout(
    url
) {

    const response =
        await Promise.race([

        fetch(url),

        new Promise((_, reject) =>

            setTimeout(() => {
                reject(
                    new Error(
                        "Timeout after 10s"
                    )
                );
            }, 10000)
        )
    ]);

    return response.json();
}
```

Giải thích

Nếu:

fetch API = 12 giây
timeout = 10 giây

→ timeout thắng race

→ reject ngay.

Nếu API phản hồi sau:

2 giây

→ fetch thắng.

Scenario thực tế khác — CDN nhanh nhất

Có nhiều server ảnh:

US server\
Asia server\
Europe server

Lấy server phản hồi nhanh nhất.

```
const image =
    await Promise.race([

    fetch(usCDN),

    fetch(asiaCDN),

    fetch(europeCDN)
]);
```

4. Promise.any()
   Hoạt động

Lấy Promise đầu tiên thành công.

Ignore reject.

Chỉ reject khi:

Tất cả fail

Scenario thực tế — Payment Gateway Fallback

Thanh toán có:

VNPay\
MoMo\
ZaloPay

Chỉ cần 1 gateway hoạt động.

Code

```
async function pay() {

    try {

        const result =
            await Promise.any([

            processVNPay(),

            processMoMo(),

            processZaloPay()
        ]);

        console.log(
            "Payment success:",
            result
        );

    } catch {

        console.error(
            "All payment gateways failed"
        );
    }
}
```

Giải thích

Ví dụ:

VNPay ❌

MoMo ❌

ZaloPay ✅

→ Promise.any()

resolve với ZaloPay

---

## 🎬 PHẦN D — VIDEO THỰC HÀNH OBS (25 điểm)

https://drive.google.com/file/d/1jpQspckPzWaYhrC4gdVq_D0iFQVmugfM/view?usp=drive_link

demo B1:
https://drive.google.com/file/d/1njW0vBKbrsijWfob5p3IV4kYAAUvRBBT/view?usp=drive_link
