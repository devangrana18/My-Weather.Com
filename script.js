const apiKey = "a35fede7d137dddaaee972c3f49eb962";

const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let isCelsius = true;

const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const weatherIcon = document.querySelector(".weather-icon");
const temperatureElement = document.querySelector(".temperature");
const errorElement = document.querySelector(".error");
const weatherElement = document.querySelector(".weather");

function getWeatherIcon(weatherCode) {
    if (weatherCode >= 200 && weatherCode < 300) {
        return "images/thunderstorm.png";
    } else if (weatherCode >= 300 && weatherCode < 400) {
        return "images/drizzle.png";
    } else if (weatherCode >= 500 && weatherCode < 600) {
        return "images/rain.png";
    } else if (weatherCode >= 600 && weatherCode < 700) {
        return "images/snow.png";
    } else if (weatherCode >= 700 && weatherCode < 800) {
        return "images/mist.png";
    } else if (weatherCode === 800) {
        return "images/clear.png";
    } else if (weatherCode >= 801 && weatherCode < 900) {
        return "images/clouds.png";
    } else {
        return "images/unknown.png";
    }
}

async function fetchWeather(location) {
    try {
        const response = await fetch(apiurl + location + `&appid=${apiKey}`);
        const data = await response.json();

        if (response.status === 404) {
            displayError();
        } else {
            displayWeather(data);
        }
    } catch (error) {
        displayError();
    }
}

function displayWeather(data) {
    const temperature = isCelsius ? `${Math.round(data.main.temp)}°C` : `${Math.round(data.main.temp * 9/5 + 32)}°F`;
    temperatureElement.textContent = temperature;
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
    document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;

    const weatherCode = data.weather[0].id;
    weatherIcon.src = getWeatherIcon(weatherCode);

    errorElement.style.display = "none";
    weatherElement.style.display = "block";
}

function displayError() {
    errorElement.style.display = "block";
    weatherElement.style.display = "none";
}

searchButton.addEventListener("click", () => {
    const location = locationInput.value;
    if (location.trim() !== "") {
        fetchWeather(location);
    }
});

document.getElementById("celsius").addEventListener("click", () => {
    isCelsius = true;
    fetchWeather(locationInput.value);
});

document.getElementById("fahrenheit").addEventListener("click", () => {
    isCelsius = false;
    fetchWeather(locationInput.value);
});























