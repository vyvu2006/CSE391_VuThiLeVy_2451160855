const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherResult = document.getElementById("weatherResult");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");

const historyList = document.getElementById("historyList");

// Hàm lấy dữ liệu thời tiết
async function getWeather(city) {
  loading.classList.remove("hidden");
  weatherResult.classList.add("hidden");
  error.classList.add("hidden");

  try {
    const response = await fetch(`https://wttr.in/${city}?format=j1`);

    if (!response.ok) {
      throw new Error("Không tìm thấy thành phố");
    }

    const data = await response.json();

    const current = data.current_condition[0];

    cityName.textContent = city;
    temperature.textContent = current.temp_C;
    humidity.textContent = current.humidity;
    description.textContent = current.weatherDesc[0].value;

    weatherIcon.src = current.weatherIconUrl[0].value;

    weatherResult.classList.remove("hidden");

    saveHistory(city);
  } catch (err) {
    error.textContent = "Lỗi: Thành phố không tồn tại hoặc mất mạng!";
    error.classList.remove("hidden");
  } finally {
    loading.classList.add("hidden");
  }
}

// Click nút tìm
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (city) {
    getWeather(city);
  }
});

// Enter để tìm
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

// Lưu LocalStorage
function saveHistory(city) {
  let history = JSON.parse(localStorage.getItem("history")) || [];

  history = history.filter((item) => item !== city);

  history.unshift(city);

  if (history.length > 5) {
    history = history.slice(0, 5);
  }

  localStorage.setItem("history", JSON.stringify(history));

  renderHistory();
}

// Hiển thị lịch sử
function renderHistory() {
  const history = JSON.parse(localStorage.getItem("history")) || [];

  historyList.innerHTML = "";

  history.forEach((city) => {
    const li = document.createElement("li");

    li.textContent = city;

    li.addEventListener("click", () => {
      getWeather(city);
    });

    historyList.appendChild(li);
  });
}

renderHistory();
