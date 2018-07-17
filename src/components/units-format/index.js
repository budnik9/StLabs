import openWeatherMapAPI from "../../services/open-weather-map-api";
import Weather from "../weather";
import Forecast from "../forecast";
import ForecastChart from "../forecast-chart";
import CitiesStorage from "../../services/cities-storage";
import unitsFormatConstants from "../../constants/units-format";
import DOM from "../../services/dom";

function toggleActiveButton(targetEvent) {
    const buttons = document.querySelectorAll(".units-format button");

    for (let i = 0; i < buttons.length; i += 1) {
        if (buttons[i].className.includes("_active")) {
            buttons[i].className = buttons[i].classList["0"];
        }
    }

    targetEvent.className = `${targetEvent.className} ${targetEvent.className}_active`;
}

class UnitsFormat {
    static getCurrentUnitsFormat() {
        const buttons = document.querySelectorAll(".units-format button");

        for (let i = 0; i < buttons.length; i += 1) {
            if (buttons[i].className.includes("_active")) return buttons[i].value;

        }

        return unitsFormatConstants.METRIC;
    }

    static handleClick(event) {
        event.preventDefault();

        const mainContent = document.querySelector(".main-content");
        const unitsFormat = event.target.value;

        mainContent.innerHTML = "";

        const citiesStorage = new CitiesStorage();

        citiesStorage.getAllCities().forEach(async (city) => {
            const weatherResponse = await openWeatherMapAPI.getWeatherByCityName(city, unitsFormat);
            const forecastResponse = await openWeatherMapAPI.getForecastByCityName(city, unitsFormat);

            const currentWeather = new Weather(weatherResponse.data, unitsFormat);
            const forecastChart = new ForecastChart(forecastResponse.data, unitsFormat);
            const forecastBlock = new Forecast(currentWeather, forecastChart);

            forecastBlock.render();
        });

        toggleActiveButton(event.target);
    }

    static template() {
        return `<button class="units-format__fahrenheit" type="button" value="imperial">°F</button>
                <button class="units-format__celsius units-format__celsius_active" type="button" value="metric">°C</button>
                <button class="units-format__kelvin" type="button" value="standard">K</button>`;
    }

    static render(
        parentElement = document.querySelector(".options-container"),
    ) {
        const unitsFormat = DOM.createDomElement("div", "units-format");

        unitsFormat.innerHTML = UnitsFormat.template();
        unitsFormat.addEventListener("click", UnitsFormat.handleClick);

        parentElement.appendChild(unitsFormat);
    }
}

export default UnitsFormat;
