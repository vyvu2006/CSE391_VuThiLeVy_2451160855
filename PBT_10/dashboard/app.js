const usersWidget = document.getElementById("usersWidget");

const weatherWidget = document.getElementById("weatherWidget");

const dogWidget = document.getElementById("dogWidget");

const refreshBtn = document.getElementById("refreshBtn");

const globalLoading = document.getElementById("globalLoading");

const loadTime = document.getElementById("loadTime");

// ======================
// Widget states
// ======================

function setLoading() {
  usersWidget.innerHTML = `<p class="loading">
            Loading users...
        </p>`;

  weatherWidget.innerHTML = `<p class="loading">
            Loading weather...
        </p>`;

  dogWidget.innerHTML = `<p class="loading">
            Loading dog...
        </p>`;
}

function renderWidget(index, data) {
  switch (index) {
    // USERS
    case 0:
      usersWidget.innerHTML = data
        .slice(0, 5)
        .map(
          (user) => `
                    <p>
                        ${user.name}
                    </p>
                `,
        )
        .join("");

      break;

    // WEATHER
    case 1:
      weatherWidget.innerHTML = `
                <h3>
                    Hà Nội
                </h3>

                <p>
                    🌡
                    ${data.current_weather.temperature}°C
                </p>
            `;

      break;

    // DOG
    case 2:
      dogWidget.innerHTML = `
                <img
                    src="${data.message}"
                    alt="dog"
                >
            `;

      break;
  }
}

function renderWidgetError(index, message) {
  const html = `
        <p class="error">
            ❌ ${message}
        </p>
    `;

  switch (index) {
    case 0:
      usersWidget.innerHTML = html;
      break;

    case 1:
      weatherWidget.innerHTML = html;
      break;

    case 2:
      dogWidget.innerHTML = html;
      break;
  }
}

// ======================
// LOAD DASHBOARD
// ======================

async function loadDashboard() {
  const startTime = Date.now();

  globalLoading.style.display = "block";

  setLoading();

  const results = await Promise.allSettled([
    fetch("https://jsonplaceholder.typicode.com/users").then((r) => r.json()),

    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true",
    ).then((r) => r.json()),

    fetch("https://dog.ceo/api/breeds/image/random").then((r) => r.json()),
  ]);

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      renderWidget(index, result.value);
    } else {
      renderWidgetError(index, result.reason.message);
    }
  });

  const time = Date.now() - startTime;

  loadTime.innerHTML = `
        Data loaded in
        ${time} ms
        `;

  globalLoading.style.display = "none";
}

// ======================
// REFRESH
// ======================

refreshBtn.addEventListener("click", loadDashboard);

// Load lần đầu
loadDashboard();
