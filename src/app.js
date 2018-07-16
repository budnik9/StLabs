import "./index.less";
import openWeatherMapAPI from "./services/open-weather-map-api";
import Weather from "./components/weather";
import ForecastChart from "./components/forecast-chart";
import Forecast from "./components/forecast";
import unitsFormat from "./constants/units-format";
import citiesSet from "./collections/cities";
import events from "./events/events";
import geolocation from "./services/geolocation";

events();

const date = new Date();
const dateOptions = Object.freeze({
    year: "numeric",
    month: "short",
    day: "numeric",
});

document.querySelector(".grid-container__date").textContent = date.toLocaleString("en-US", dateOptions);

geolocation(async (position) => {
    const { coords } = position;

    try {
        const weatherResponse = await openWeatherMapAPI.getWeatherByGeographicCoordinates(coords.latitude, coords.longitude, unitsFormat.METRIC);
        const forecastResponse = await openWeatherMapAPI.getForecastByGeographicCoordinates(coords.latitude, coords.longitude, unitsFormat.METRIC);

        const currentWeather = new Weather(weatherResponse.data);
        const forecastChart = new ForecastChart(forecastResponse.data);
        const forecastBlock = new Forecast(currentWeather, forecastChart);

        forecastBlock.render();

        citiesSet.add(weatherResponse.data.name);
    } catch (err) {
        console.log(`ERROR: ${err.message}`);
        alert("An error has occurred! We apologize");
    }
});
