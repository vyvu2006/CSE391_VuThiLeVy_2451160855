const students = [
  { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
  { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
  { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
  { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
  { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
  { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
  { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
  { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

// Đếm xếp loại
let gioi = 0;
let kha = 0;
let trungBinh = 0;
let yeu = 0;

// Tìm cao nhất / thấp nhất
let maxStudent = null;
let minStudent = null;

// Tổng điểm từng môn
let totalMath = 0;
let totalPhysics = 0;
let totalCS = 0;

// Bonus: theo giới tính
let maleTotal = 0;
let maleCount = 0;

let femaleTotal = 0;
let femaleCount = 0;

console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");

for (let i = 0; i < students.length; i++) {
  let student = students[i];

  // Tính điểm trung bình
  let avg = student.math * 0.4 + student.physics * 0.3 + student.cs * 0.3;

  avg = avg.toFixed(1);

  // Xếp loại
  let rank = "";

  if (avg >= 8.0) {
    rank = "Giỏi";
    gioi++;
  } else if (avg >= 6.5) {
    rank = "Khá";
    kha++;
  } else if (avg >= 5.0) {
    rank = "Trung bình";
    trungBinh++;
  } else {
    rank = "Yếu";
    yeu++;
  }

  // In bảng
  console.log(`| ${i + 1} | ${student.name} | ${avg} | ${rank} |`);

  // Tìm cao nhất / thấp nhất
  if (maxStudent === null || avg > maxStudent.avg) {
    maxStudent = {
      name: student.name,
      avg: avg,
    };
  }

  if (minStudent === null || avg < minStudent.avg) {
    minStudent = {
      name: student.name,
      avg: avg,
    };
  }

  // Tổng điểm từng môn
  totalMath += student.math;
  totalPhysics += student.physics;
  totalCS += student.cs;

  // Bonus: TB theo giới tính
  if (student.gender === "M") {
    maleTotal += Number(avg);
    maleCount++;
  } else {
    femaleTotal += Number(avg);
    femaleCount++;
  }
}

// Thống kê xếp loại
console.log("\n=== Số lượng sinh viên theo xếp loại ===");
console.log("Giỏi:", gioi);
console.log("Khá:", kha);
console.log("Trung bình:", trungBinh);
console.log("Yếu:", yeu);

// Cao nhất / thấp nhất
console.log("\n=== Sinh viên điểm cao nhất ===");
console.log(maxStudent.name, "-", maxStudent.avg);

console.log("\n=== Sinh viên điểm thấp nhất ===");
console.log(minStudent.name, "-", minStudent.avg);

// TB từng môn
console.log("\n=== Điểm trung bình toàn lớp ===");
console.log("Math:", (totalMath / students.length).toFixed(2));

console.log("Physics:", (totalPhysics / students.length).toFixed(2));

console.log("CS:", (totalCS / students.length).toFixed(2));

// Bonus
console.log("\n=== Điểm TB theo giới tính ===");

console.log("Nam:", (maleTotal / maleCount).toFixed(2));

console.log("Nữ:", (femaleTotal / femaleCount).toFixed(2));
