import openWeatherMapAPI from "../../services/open-weather-map-api";
import Weather from "../weather";
import ForecastChart from "../forecast-chart";
import Forecast from "../forecast";
import UnitsFormat from "../units-format";
import DOM from "../../services/dom";
import CitiesStorage from "../../services/cities-storage";

class SearchForm {
    static async handleClick(event) {
        event.preventDefault();

        const citiesStorage = new CitiesStorage();

        if (citiesStorage.length >= 4) {
            console.log(citiesStorage.length);
            alert("You can't add more than 5 forecasts to page");
        } else {
            const city = document.querySelector(".search-form__input").value;
            const unitsFormat = UnitsFormat.getCurrentUnitsFormat();
            console.log(citiesStorage.length);
            try {
                const weatherResponse = await openWeatherMapAPI.getWeatherByCityName(
                    city,
                    unitsFormat,
                );
                const forecastResponse = await openWeatherMapAPI.getForecastByCityName(
                    city,
                    unitsFormat,
                );

                const currentWeather = new Weather(weatherResponse.data);
                const forecastChart = new ForecastChart(forecastResponse.data);
                const forecastBlock = new Forecast(
                    currentWeather,
                    forecastChart,
                );

                forecastBlock.render();

                citiesStorage.addCity(city);
            } catch (err) {
                console.log(`ERROR: ${err.message}`);
                alert("An error has occurred! We apologize");
            }
        }
    }

    static template() {
        return `<input class="search-form__input" placeholder="city">
                <button class="search-form__button" type="button">Add</button>`;
    }

    static render(
        parentElement = document.querySelector(".options-container"),
    ) {
        const form = DOM.createDomElement("form", "search-form");

        form.innerHTML = SearchForm.template();
        form.querySelector(".search-form__button").addEventListener("click", SearchForm.handleClick);
        
        parentElement.appendChild(form);
    }
}

export default SearchForm;
