import "./index.less";

import axiosAPI from "./services/axiosAPI/axiosAPI";
import Weather from "./models/weather/weather";
import ForecastChart from "./models/forecastChart/forecastChart";

async function getLocation(pos) {
    const { coords } = pos;

    try {
        const weatherResponse = await axiosAPI.getWeatherByGeographicCoordinates(coords.latitude, coords.longitude, "metric");
        const forecastResponse = await axiosAPI.getForecastByGeographicCoordinates(coords.latitude, coords.longitude, "metric");

        const forecastBlock = document.createElement("section");
        forecastBlock.className = "forecast main-content__forecast";

        const currentWeather = new Weather(weatherResponse.data);
        currentWeather.render(forecastBlock);

        const forecastChart = new ForecastChart(forecastResponse.data);
        forecastChart.render(forecastBlock);

        document.querySelector(".main-content").appendChild(forecastBlock);
    } catch (err) {
        console.log(`ERROR: ${err.message}`);
        alert("An error has occurred! We apologize");
    }
}

function errLocation(err) {
    console.log(`ERROR: ${err.message}`);
}

navigator.geolocation.getCurrentPosition(getLocation, errLocation, { enableHighAccuracy: false, maximumAge: 3e5 });
