// ===============================
// 1. pipe() — Nối chuỗi functions
// ===============================
function pipe(...fns) {
  return function (value) {
    return fns.reduce((result, fn) => fn(result), value);
  };
}

const process = pipe(
  (x) => x * 2, // 5 → 10
  (x) => x + 10, // 10 → 20
  (x) => x.toString(), // 20 → "20"
  (x) => "Kết quả: " + x,
);

console.log(process(5));
// → "Kết quả: 20"

// ===============================
// 2. memoize() — Cache kết quả
// ===============================
function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache[key] !== undefined) {
      console.log("Lấy từ cache!");
      return cache[key];
    }

    const result = fn(...args);
    cache[key] = result;

    return result;
  };
}

const expensiveCalc = memoize((n) => {
  console.log("Đang tính...");

  let result = 0;

  for (let i = 0; i < n; i++) {
    result += i;
  }

  return result;
});

console.log(expensiveCalc(1000000));
// → "Đang tính..."
// → 499999500000

console.log(expensiveCalc(1000000));
// → "Lấy từ cache!"
// → 499999500000

// ============================================
// 3. debounce() — Chờ user ngừng gõ mới chạy
// ============================================
function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const search = debounce((query) => {
  console.log("Searching:", query);
}, 500);

// Test debounce
search("i");
search("ip");
search("iph");
search("iphone");

// Chỉ in:
// Searching: iphone

// ===============================
// 4. retry() — Thử lại nếu lỗi
// ===============================
async function retry(fn, maxAttempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`Thử lần ${attempt}...`);

      return await fn();
    } catch (error) {
      lastError = error;

      console.log(`Lỗi lần ${attempt}:`, error.message);
    }
  }

  throw new Error(`Thất bại sau ${maxAttempts} lần thử.`);
}

// ===============================
// TEST retry()
// ===============================
let count = 0;

const unstableAPI = async () => {
  count++;

  if (count < 3) {
    throw new Error("Server bận!");
  }

  return "Lấy dữ liệu thành công!";
};

retry(unstableAPI).then(console.log).catch(console.error);
