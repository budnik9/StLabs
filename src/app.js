import "./index.less";

import openWeatherMapAPI from "./services/openWeatherMapAPI/openWeatherMapAPI";
import Weather from "./components/weather/weather";
import ForecastChart from "./components/forecastChart/forecastChart";
import unitsFormat from "./constants/unitsFormat";

async function getLocation(pos) {
    const { coords } = pos;

    try {
        const weatherResponse = await openWeatherMapAPI.getWeatherByGeographicCoordinates(coords.latitude, coords.longitude, unitsFormat.METRIC);
        const forecastResponse = await openWeatherMapAPI.getForecastByGeographicCoordinates(coords.latitude, coords.longitude, unitsFormat.METRIC);

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
