import openWeatherMapAPI from "../../services/open-weather-map-api";
import Weather from "../weather";
import ForecastChart from "../forecast-chart";
import Forecast from "../forecast";
import UnitsFormat from "../units-format";
import DOM from "../../services/dom";
import CitiesStorage from "../../services/cities-storage";
import RegExp from "../../constants/reg-exp";
import TemperaturesChart from "../temperatures-chart";

class SearchForm {
    static handleClick(event) {
        event.preventDefault();

        const citiesStorage = new CitiesStorage();

        if (citiesStorage.getLength() >= CitiesStorage.getMaxLength()) {
            alert("You can't add more than 5 forecasts to page");

            return;
        }

        replaceTemperaturesChart();
    }

    static isValid(value) {
        return RegExp.CITY_NAME.test(value);
    }

    static template() {
        return `<input class="search-form__input" placeholder="city">
                <button class="search-form__button" type="button">Add</button>`;
    }

    static render(parentElement = document.querySelector(".options-container")) {
        const form = DOM.createDomElement("form", "search-form");

        form.innerHTML = SearchForm.template();
        form.querySelector(".search-form__button").addEventListener("click", SearchForm.handleClick);
        
        parentElement.appendChild(form);

        return form;
    }
}

function replaceTemperaturesChart() {
    const input = document.querySelector(".search-form__input");
    const citiesStorage = new CitiesStorage();

    if (!SearchForm.isValid(input.value) || citiesStorage.includes(input.value)) {
        input.value = "";
        alert("invalid city name");

        return;
    }

    const unitsFormat = UnitsFormat.getCurrentUnitsFormat();
    const mainContent = document.querySelector(".main-content");

    let cities = citiesStorage.getAllCities();

    if (cities.length > 1) {
        const temperaturesChart = mainContent.querySelector(".temperatures-chart");
        mainContent.removeChild(temperaturesChart);
    }

    citiesStorage.addCity(input.value);
    cities = citiesStorage.getAllCities();

    const newTemperaturesChart = new TemperaturesChart(cities, unitsFormat);

    newTemperaturesChart.render(mainContent);

    input.value = "";
}

export default SearchForm;
