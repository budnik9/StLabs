import "./index.less";
import openWeatherMapAPI from "./services/open-weather-map-api";
import Weather from "./components/weather";
import ForecastChart from "./components/forecast-chart";
import Forecast from "./components/forecast";
import DateComponent from "./components/date";
import UnitsFormatComponent from "./components/units-format";
import SearchForm from "./components/search-form";
import unitsFormat from "./constants/units-format";
import citiesSet from "./collections/cities";
import geolocation from "./services/geolocation";

setTimeout(() => {
    const optionsContainer = document.createElement("div");

    optionsContainer.className = "options-container";

    DateComponent.render(optionsContainer);
    SearchForm.render(optionsContainer);
    UnitsFormatComponent.render(optionsContainer);

    document.querySelector(".header").appendChild(optionsContainer);
}, 20);

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
