document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeather = document.getElementById("get-weather-btn");

  const Weatherinfo = document.getElementById("weather-info");
  const cityName = document.getElementById("city-name");
  const temperatureDisp = document.getElementById("temperature");
  const descriptionDisp = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "2264d58f19e37d3408ea38ad34cb1782"; //env variables

  getWeather.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    // it may throw an error
    // server/database is always in another continent

    try {
      const weatherdata = await fetchWeatherData(city);
      displayWeatherData(weatherdata);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);

    console.log(typeof response);
    console.log("RESPONSE", response);

    if (!response.ok) {
      throw new Error("City Not found");
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    console.log(data);
    const { name, main, weather } = data;
    cityName.textContent = name;
    temperatureDisp.textContent = `Temperature : ${main.temp}`;
    descriptionDisp.textContent = `Weather : ${weather[0].description}`;

    // Unlock the display
    Weatherinfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    Weatherinfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
