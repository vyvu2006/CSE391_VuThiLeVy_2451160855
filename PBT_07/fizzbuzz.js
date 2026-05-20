// =========================
// Version 1: Classic FizzBuzz
// =========================

console.log("=== Classic FizzBuzz ===");

for (let i = 1; i <= 100; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}

// =========================
// Version 2: Custom FizzBuzz
// =========================

function customFizzBuzz(n, rules) {
  for (let i = 1; i <= n; i++) {
    let result = "";

    // Duyệt từng rule
    for (let j = 0; j < rules.length; j++) {
      if (i % rules[j].divisor === 0) {
        result += rules[j].word;
      }
    }

    // Nếu không khớp rule nào
    if (result === "") {
      console.log(i);
    } else {
      console.log(i + " = " + result);
    }
  }
}

// Test
console.log("\n=== Custom FizzBuzz ===");

customFizzBuzz(30, [
  { divisor: 3, word: "Fizz" },
  { divisor: 5, word: "Buzz" },
  { divisor: 7, word: "Jazz" },
]);
