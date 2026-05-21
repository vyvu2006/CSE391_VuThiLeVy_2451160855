const form = document.getElementById("registerForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");
const phoneInput = document.getElementById("phone");

const submitBtn = document.getElementById("submitBtn");

const nameIcon = document.getElementById("nameIcon");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const confirmError = document.getElementById("confirmError");
const phoneError = document.getElementById("phoneError");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

const modal = document.getElementById("modal");
const userInfo = document.getElementById("userInfo");

let isNameValid = false;
let isEmailValid = false;
let isPasswordValid = false;
let isConfirmValid = false;
let isPhoneValid = false;

/* NAME VALIDATION */

nameInput.addEventListener("input", () => {
  const value = nameInput.value.trim();

  if (value.length >= 2 && value.length <= 50) {
    isNameValid = true;

    nameIcon.textContent = "✅";

    nameError.textContent = "";
  } else {
    isNameValid = false;

    nameIcon.textContent = "❌";

    nameError.textContent = "Tên phải từ 2-50 ký tự";
  }

  checkFormValid();
});

/* EMAIL VALIDATION */

emailInput.addEventListener("input", () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailInput.value.trim() === "") {
    isEmailValid = false;

    emailError.textContent = "Email không được để trống";
  } else if (!emailRegex.test(emailInput.value)) {
    isEmailValid = false;

    emailError.textContent = "Email không đúng định dạng";
  } else {
    isEmailValid = true;

    emailError.textContent = "";
  }

  checkFormValid();
});

/* PASSWORD STRENGTH */

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;

  let strength = 0;

  if (password.length >= 8) strength++;

  if (/[A-Za-z]/.test(password) && /\d/.test(password)) {
    strength++;
  }

  if (
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*]/.test(password)
  ) {
    strength++;
  }

  switch (strength) {
    case 1:
      strengthBar.style.width = "33%";
      strengthBar.style.background = "red";
      strengthText.textContent = "Yếu";
      isPasswordValid = false;
      break;

    case 2:
      strengthBar.style.width = "66%";
      strengthBar.style.background = "orange";
      strengthText.textContent = "Trung bình";
      isPasswordValid = true;
      break;

    case 3:
      strengthBar.style.width = "100%";
      strengthBar.style.background = "green";
      strengthText.textContent = "Mạnh";
      isPasswordValid = true;
      break;

    default:
      strengthBar.style.width = "0%";
      strengthText.textContent = "";
      isPasswordValid = false;
  }

  validateConfirmPassword();

  checkFormValid();
});

/* CONFIRM PASSWORD */

confirmInput.addEventListener("input", () => {
  validateConfirmPassword();

  checkFormValid();
});

function validateConfirmPassword() {
  if (confirmInput.value === passwordInput.value && confirmInput.value !== "") {
    isConfirmValid = true;

    confirmError.textContent = "";
  } else {
    isConfirmValid = false;

    confirmError.textContent = "Password không khớp";
  }
}

/* PHONE FORMAT */

phoneInput.addEventListener("input", () => {
  let value = phoneInput.value.replace(/\D/g, "");

  value = value.substring(0, 10);

  if (value.length > 4 && value.length <= 7) {
    value = value.replace(/(\d{4})(\d+)/, "$1-$2");
  } else if (value.length > 7) {
    value = value.replace(/(\d{4})(\d{3})(\d+)/, "$1-$2-$3");
  }

  phoneInput.value = value;

  const numbers = value.replace(/\D/g, "");

  if (numbers.length === 10) {
    isPhoneValid = true;

    phoneError.textContent = "";
  } else {
    isPhoneValid = false;

    phoneError.textContent = "Số điện thoại phải có 10 số";
  }

  checkFormValid();
});

/* ENABLE SUBMIT */

function checkFormValid() {
  if (
    isNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmValid &&
    isPhoneValid
  ) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

/* SUBMIT */

form.addEventListener("submit", (e) => {
  e.preventDefault();

  userInfo.innerHTML = `
        <p><strong>Name:</strong>
        ${nameInput.value}</p>

        <p><strong>Email:</strong>
        ${emailInput.value}</p>

        <p><strong>Phone:</strong>
        ${phoneInput.value}</p>
    `;

  modal.classList.remove("hidden");
});

/* CLOSE MODAL */

document.getElementById("closeModal").addEventListener("click", () => {
  modal.classList.add("hidden");
});
