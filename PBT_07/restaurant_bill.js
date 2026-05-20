const menu = [
  { name: "Phở bò", price: 65000, quantity: 2 },
  { name: "Trà đá", price: 5000, quantity: 3 },
  { name: "Bún chả", price: 55000, quantity: 1 },
];

// Optional tip
const hasTip = true;

// Giả lập ngày trong tuần
// Wednesday = thứ 3
const currentDay = "Wednesday";

let subtotal = 0;

// In header
console.log("╔══════════════════════════════════════════════╗");
console.log("║              HÓA ĐƠN NHÀ HÀNG              ║");
console.log("╠══════════════════════════════════════════════╣");

// In danh sách món
for (let i = 0; i < menu.length; i++) {
  let item = menu[i];
  let itemTotal = item.price * item.quantity;

  subtotal += itemTotal;

  console.log(
    `║ ${i + 1}. ${item.name.padEnd(12)} x${item.quantity} @${item.price / 1000}k = ${itemTotal / 1000}k ║`,
  );
}

// =====================
// Tính giảm giá
// =====================

let discountPercent = 0;

// Giảm theo tổng tiền
if (subtotal > 1000000) {
  discountPercent = 15;
} else if (subtotal > 500000) {
  discountPercent = 10;
}

// Wednesday giảm thêm 5%
if (currentDay === "Wednesday") {
  discountPercent += 5;
}

let discountAmount = (subtotal * discountPercent) / 100;

// Sau giảm giá
let afterDiscount = subtotal - discountAmount;

// VAT 8%
let vat = afterDiscount * 0.08;

// Tip 5%
let tip = 0;

if (hasTip) {
  tip = afterDiscount * 0.05;
}

// Tổng thanh toán
let finalTotal = afterDiscount + vat + tip;

// =====================
// In hóa đơn
// =====================

console.log("╠══════════════════════════════════════════════╣");

console.log(`║ Tổng cộng:          ${subtotal.toLocaleString()}đ`);

console.log(
  `║ Giảm giá (${discountPercent}%):    -${discountAmount.toLocaleString()}đ`,
);

console.log(`║ VAT (8%):            ${vat.toLocaleString()}đ`);

console.log(
  `║ Tip (${hasTip ? "5%" : "0%"}):           ${tip.toLocaleString()}đ`,
);

console.log("╠══════════════════════════════════════════════╣");

console.log(
  `║ THANH TOÁN:         ${Math.round(finalTotal).toLocaleString()}đ`,
);

console.log("╚══════════════════════════════════════════════╝");
