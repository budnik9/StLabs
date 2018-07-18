import openWeatherMapAPI from "../../services/open-weather-map-api";
import Weather from "../weather";
import ForecastChart from "../forecast-chart";
import Forecast from "../forecast";
import UnitsFormat from "../units-format";
import DOM from "../../services/dom";
import CitiesStorage from "../../services/cities-storage";
import RegExp from "../../constants/reg-exp";

class SearchForm {
    static async handleClick(event) {
        event.preventDefault();

        const citiesStorage = new CitiesStorage();

        if (citiesStorage.getLength() >= CitiesStorage.getMaxLength()) {
            console.log(citiesStorage.getLength());
            alert("You can't add more than 5 forecasts to page");

        } else {
            const input = document.querySelector(".search-form__input");
            const unitsFormat = UnitsFormat.getCurrentUnitsFormat();

            if (!SearchForm.isValid(input.value)) {
                throw new Error("invalid city name");
            }
    
            try {
                const weatherResponse = await openWeatherMapAPI.getWeatherByCityName(input.value, unitsFormat);
                const forecastResponse = await openWeatherMapAPI.getForecastByCityName(input.value, unitsFormat);

                const currentWeather = new Weather(weatherResponse.data, unitsFormat);
                const forecastChart = new ForecastChart(forecastResponse.data, unitsFormat);
                const forecastBlock = new Forecast(currentWeather, forecastChart);

                forecastBlock.render();

                citiesStorage.addCity(input.value);
                input.value = "";
            } catch (err) {
                console.log(`ERROR: ${err.message}`);
                alert("An error has occurred! We apologize");
                input.value = "";
            }
        }
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

export default SearchForm;
