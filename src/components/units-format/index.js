import citiesSet from "../../collections/cities";
import openWeatherMapAPI from "../../services/open-weather-map-api";
import Weather from "../weather";
import Forecast from "../forecast";
import ForecastChart from "../forecast-chart";

function createButton(type, className, textContent, value) {
    const button = document.createElement("button");

    button.className = className;
    button.setAttribute("type", type);
    button.setAttribute("value", value);
    button.textContent = textContent;

    return button;
}

function toggleActiveButton(targetEvent) {

    const buttons = document.querySelectorAll(".units-format button");

    for (let i = 0; i < buttons.length; i += 1) {
        if (buttons[i].className.includes("_active")) {
            buttons[i].className = buttons[i].classList["0"];
        }
    }

    targetEvent.className = `${targetEvent.className} ${targetEvent.className}_active`;
}

function clickHandler(event) {
    event.preventDefault();

    const mainContent = document.querySelector(".main-content");
    const unitsFormat = event.target.value;

    mainContent.innerHTML = "";

    citiesSet.forEach(async (city) => {
        const weatherResponse = await openWeatherMapAPI.getWeatherByCityName(city, unitsFormat);
        const forecastResponse = await openWeatherMapAPI.getForecastByCityName(city, unitsFormat);

        const currentWeather = new Weather(weatherResponse.data, unitsFormat);
        const forecastChart = new ForecastChart(forecastResponse.data, unitsFormat);
        const forecastBlock = new Forecast(currentWeather, forecastChart);

        forecastBlock.render();
    });

    toggleActiveButton(event.target);
}

class UnitsFormat {
    static render(parentElement = document.querySelector(".options-container")) {
        const unitsFormat = document.createElement("div");

        unitsFormat.className = "units-format";

        const fahrenheitButton = createButton("button", "units-format__fahrenheit", "°F", "imperial");
        unitsFormat.appendChild(fahrenheitButton);

        const celsiusButton = createButton("button", "units-format__celsius units-format__celsius_active", "°C", "metric");
        unitsFormat.appendChild(celsiusButton);

        const kelvinButton = createButton("button", "units-format__kelvin", "K", "standard");
        unitsFormat.appendChild(kelvinButton);

        unitsFormat.addEventListener("click", clickHandler);
        parentElement.appendChild(unitsFormat);
    }
}

export default UnitsFormat;
