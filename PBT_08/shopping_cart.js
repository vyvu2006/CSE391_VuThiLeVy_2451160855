function createCart() {
  // Private data
  let items = [];
  let discount = {
    type: null,
    value: 0,
  };

  return {
    // Thêm sản phẩm
    addItem(product, quantity = 1) {
      const existingItem = items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        items.push({
          ...product,
          quantity,
        });
      }
    },

    // Xóa sản phẩm theo id
    removeItem(productId) {
      items = items.filter((item) => item.id !== productId);
    },

    // Cập nhật số lượng
    updateQuantity(productId, newQuantity) {
      const item = items.find((item) => item.id === productId);

      if (!item) return;

      if (newQuantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = newQuantity;
      }
    },

    // Tính tổng tiền
    getTotal() {
      const subtotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );

      if (discount.type === "percent") {
        return subtotal * (1 - discount.value);
      }

      if (discount.type === "fixed") {
        return Math.max(subtotal - discount.value, 0);
      }

      return subtotal;
    },

    // Áp dụng mã giảm giá
    applyDiscount(code) {
      const coupons = {
        SALE10: {
          type: "percent",
          value: 0.1,
        },
        SALE20: {
          type: "percent",
          value: 0.2,
        },
        FREESHIP: {
          type: "fixed",
          value: 30000,
        },
      };

      if (coupons[code]) {
        discount = coupons[code];
        console.log(`Áp dụng mã ${code} thành công!`);
      } else {
        console.log("Mã giảm giá không hợp lệ!");
      }
    },

    // In giỏ hàng dạng bảng
    printCart() {
      const tableData = items.map((item, index) => ({
        "#": index + 1,
        "Sản phẩm": item.name,
        SL: item.quantity,
        "Đơn giá": item.price.toLocaleString("vi-VN") + "đ",
        Tổng: (item.price * item.quantity).toLocaleString("vi-VN") + "đ",
      }));

      console.table(tableData);

      console.log("Tổng cộng:", this.getTotal().toLocaleString("vi-VN") + "đ");
    },

    // Lấy tổng số sản phẩm
    getItemCount() {
      return items.reduce((total, item) => total + item.quantity, 0);
    },

    // Xóa toàn bộ giỏ
    clearCart() {
      items = [];
      discount = {
        type: null,
        value: 0,
      };

      console.log("Đã xóa toàn bộ giỏ hàng!");
    },
  };
}

// ================= TEST =================

const cart = createCart();

cart.addItem(
  {
    id: 1,
    name: "iPhone 16",
    price: 25990000,
  },
  1,
);

cart.addItem(
  {
    id: 3,
    name: "AirPods Pro",
    price: 6990000,
  },
  2,
);

// Thêm lại iPhone → tăng quantity
cart.addItem(
  {
    id: 1,
    name: "iPhone 16",
    price: 25990000,
  },
  1,
);

console.log("=== GIỎ HÀNG ===");
cart.printCart();

cart.applyDiscount("SALE10");

console.log("\n=== SAU GIẢM GIÁ ===");
cart.printCart();

console.log("\nSố SP:", cart.getItemCount());

cart.removeItem(3);

console.log("Sau xóa:", cart.getItemCount());
