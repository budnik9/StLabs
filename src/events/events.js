import citiesSet from "../collections/cities";
import openWeatherMapAPI from "../services/open-weather-map-api";
import Weather from "../components/weather";
import ForecastChart from "../components/forecast-chart";


export default () => {
    document.querySelector(".units-format").addEventListener("click", (event) => {
        event.preventDefault();

        const mainContent = document.querySelector(".main-content");
        const unitsFormat = event.target.value;

        mainContent.innerHTML = "";

        citiesSet.forEach(async (city) => {
            const weatherResponse = await openWeatherMapAPI.getWeatherByCityName(city, unitsFormat);
            const forecastResponse = await openWeatherMapAPI.getForecastByCityName(city, unitsFormat);

            const forecastBlock = document.createElement("section");
            forecastBlock.className = "forecast main-content__forecast";

            const currentWeather = new Weather(weatherResponse.data, unitsFormat);
            currentWeather.render(forecastBlock);

            const forecastChart = new ForecastChart(forecastResponse.data, unitsFormat);
            forecastChart.render(forecastBlock);

            document.querySelector(".main-content").appendChild(forecastBlock);
        });
    });
};
