import "./index.less";
import openWeatherMapAPI from "./services/open-weather-map-api";
import Weather from "./components/weather";
import ForecastChart from "./components/forecast-chart";
import Forecast from "./components/forecast";
import DateComponent from "./components/date";
import UnitsFormatComponent from "./components/units-format";
import SearchForm from "./components/search-form";
import unitsFormat from "./constants/units-format";
import geolocation from "./services/geolocation";
import CitiesStorage from "./services/cities-storage";

setTimeout(() => {
    const optionsContainer = document.createElement("div");

    optionsContainer.className = "options-container";

    DateComponent.render(optionsContainer);
    SearchForm.render(optionsContainer);
    UnitsFormatComponent.render(optionsContainer);

    document.querySelector(".header").appendChild(optionsContainer);
}, 50);

async function addForecastToPage(city) {
    const weatherResponse = await openWeatherMapAPI.getWeatherByCityName(city, unitsFormat);
    const forecastResponse = await openWeatherMapAPI.getForecastByCityName(city, unitsFormat);

    const currentWeather = new Weather(weatherResponse.data, unitsFormat);
    const forecastChart = new ForecastChart(forecastResponse.data, unitsFormat);
    const forecastBlock = new Forecast(currentWeather, forecastChart);

    forecastBlock.render();
}

async function renderCurrentGeolocationForecast(lat, lon) {
    const weatherResponse = await openWeatherMapAPI.getWeatherByGeographicCoordinates(lat, lon, unitsFormat.METRIC);
    const forecastResponse = await openWeatherMapAPI.getForecastByGeographicCoordinates(lat, lon, unitsFormat.METRIC);

    const currentWeather = new Weather(weatherResponse.data);
    const forecastChart = new ForecastChart(forecastResponse.data);
    const forecastBlock = new Forecast(currentWeather, forecastChart);

    forecastBlock.render();

    CitiesStorage.setCurrentGeolocationCity(currentWeather.city);
}

function renderAllForecasts(lat, lon) {
    try {
        renderCurrentGeolocationForecast(lat, lon);

        const citiesStorage = new CitiesStorage();

        citiesStorage.getFavoriteCities().forEach(addForecastToPage);

    } catch (err) {
        console.log(`ERROR: ${err.message}`);
        alert("An error has occurred! We apologize");
    }
}

geolocation((position) => {
    const { coords } = position;
    renderAllForecasts(coords.latitude, coords.longitude);
});
