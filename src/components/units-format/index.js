import Weather from "../weather";
import openWeatherMapAPI from "../../services/open-weather-map-api";
import Forecast from "../forecast";
import ForecastChart from "../forecast-chart";
import TemperaturesChart from "../temperatures-chart";
import CitiesStorage from "../../services/cities-storage";
import DOM from "../../services/dom";
import DeleteSection from "../delete-section";

function toggleActiveButton(targetEvent) {
    const buttons = document.querySelectorAll(".units-format button");

    for (let i = 0; i < buttons.length; i += 1) {
        if (buttons[i].className.includes("_active")) {
            buttons[i].className = buttons[i].classList["0"];
        }
    }

    targetEvent.className = `${targetEvent.className} ${targetEvent.className}_active`;
}

async function renderCurrentGeolocationForecast(parentElement, city, unitsFormat) {
    const weatherResponse = await openWeatherMapAPI.getWeatherByCityName(
        city,
        unitsFormat,
    );
    const forecastResponse = await openWeatherMapAPI.getForecastByCityName(
        city,
        unitsFormat,
    );

    const currentWeather = new Weather(weatherResponse.data, unitsFormat);
    const forecastChart = new ForecastChart(forecastResponse.data, unitsFormat);
    const forecastBlock = new Forecast(currentWeather, forecastChart);

    forecastBlock.render(parentElement);
}

function handleClick(event) {
    event.preventDefault();

    const mainContent = document.querySelector(".main-content");
    const currentUnitsFormat = event.target.value;

    mainContent.innerHTML = "";

    const citiesStorage = new CitiesStorage();
    const city = citiesStorage.getCurrentGeolocationCity();

    if (city) {
        renderCurrentGeolocationForecast(mainContent, city, currentUnitsFormat);
    }

    if (citiesStorage.getFavoriteCities().length) {
        const cities = citiesStorage.getAllCities();

        const temperaturesChart = new TemperaturesChart(cities, currentUnitsFormat);
        temperaturesChart.render(mainContent).then(() => {
            const deleteSection = new DeleteSection(
                citiesStorage.getFavoriteCities(),
            );

            deleteSection.render(mainContent);
        });
    }

    toggleActiveButton(event.target);
}

function template() {
    return `<button class="units-format__fahrenheit" type="button" value="imperial">°F</button>
            <button class="units-format__celsius units-format__celsius_active" type="button" value="metric">°C</button>
            <button class="units-format__kelvin" type="button" value="standard">K</button>`;
}

function render(parentElement = document.querySelector(".options-container")) {
    const unitsFormat = DOM.createDomElement("div", "units-format");

    unitsFormat.innerHTML = template();
    unitsFormat.addEventListener("click", handleClick);

    parentElement.appendChild(unitsFormat);

    return unitsFormat;
}

export default {
    render,
};
