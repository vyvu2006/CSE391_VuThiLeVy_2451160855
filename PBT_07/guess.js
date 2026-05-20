// Máy random số từ 1 → 100
const randomNumber = Math.floor(Math.random() * 100) + 1;

// Giới hạn số lần đoán
const maxAttempts = 7;

let attempts = 0;

// Lưu các số đã đoán
let guessedNumbers = [];

while (attempts < maxAttempts) {
  let input = prompt(`Lần ${attempts + 1}/${maxAttempts}\nNhập số từ 1 - 100:`);

  // User bấm Cancel
  if (input === null) {
    alert("Bạn đã thoát game!");
    break;
  }

  // Ép sang number
  let guess = Number(input);

  // Validate input
  if (isNaN(guess) || guess < 1 || guess > 100) {
    alert("Vui lòng nhập số từ 1 đến 100!");
    continue;
  }

  // Kiểm tra đoán trùng
  if (guessedNumbers.includes(guess)) {
    alert("Bạn đã đoán số này rồi!");
    continue;
  }

  // Lưu số đã đoán
  guessedNumbers.push(guess);

  // Tăng lượt đoán
  attempts++;

  // So sánh kết quả
  if (guess === randomNumber) {
    alert(`🎉 Đúng rồi!\nBạn đoán đúng sau ${attempts} lần!`);
    break;
  }

  if (guess < randomNumber) {
    alert("⬆️ Cao hơn");
  } else {
    alert("⬇️ Thấp hơn");
  }

  // Hết lượt
  if (attempts === maxAttempts) {
    alert(`❌ Bạn đã hết lượt!\nĐáp án là: ${randomNumber}`);
  }
}
