import toastr from "toastr";
import { TOASTR_OPTIONS } from "../../constants/toastr-options";
import CurrentUnitsFormat from "../units-format/current-units-format";
import DOM from "../../services/dom";
import CitiesStorage from "../../services/cities-storage";
import { REG_EXP_CITY_NAME } from "../../constants/reg-exp";
import TemperaturesChart from "../temperatures-chart";
import DeleteSection from "../delete-section";
import statusCodes from "../../constants/http-status-codes";
import { ServerAPI } from "../../services";

toastr.options = TOASTR_OPTIONS;

function addDeleteSection(parentElement, citiesStorage) {
    const newDeleteSection = new DeleteSection(citiesStorage.getFavoriteCities());

    newDeleteSection.render(parentElement);
}

function replaceTemperaturesChart(citiesStorage, newCity, unitsFormat) {
    const mainContent = document.querySelector(".main-content");

    const cities = citiesStorage.getAllCities();

    const temperaturesChart = mainContent.querySelector(".temperatures-chart");
    const deleteSection = document.querySelector(".delete-section");

    if (citiesStorage.getLength() >= 1) {

        if (deleteSection) mainContent.removeChild(deleteSection);
        if (temperaturesChart) mainContent.removeChild(temperaturesChart);
    }

    const newTemperaturesChart = new TemperaturesChart(cities.concat(newCity), unitsFormat);

    newTemperaturesChart.render(mainContent)
        .then(async () => {
            const favoriteCities = await citiesStorage.addCity(newCity);

            if (favoriteCities) {
                addDeleteSection(mainContent, citiesStorage);
            }
        })
        .catch(() => {
            toastr.warning("We can't get weather forecast for this city. Please, check entered data");

            mainContent.appendChild(temperaturesChart);
            mainContent.appendChild(deleteSection);
        });
}

function isValid(value) {
    return REG_EXP_CITY_NAME.test(value.trim());
}

function handleClick(event) {
    event.preventDefault();

    ServerAPI.getFavoriteCities()
        .then((response) => {
            const { data: favoriteCities, message } = response.data;

            if (response.status !== statusCodes.OK) {
                toastr.error(message);
            }
            
            const citiesStorage = new CitiesStorage(favoriteCities);
            const input = document.querySelector(".search-form__input");

            if (citiesStorage.getLength() >= CitiesStorage.getMaxLength()) {
                toastr.info("You can't add more than 5 forecasts to page!");
                input.value = "";

                return;
            }

            let correctCityName = input.value[0].toUpperCase() + input.value.slice(1);
            correctCityName = correctCityName.trim();

            if (!isValid(correctCityName) || citiesStorage.includes(correctCityName)) {
                input.value = "";
                toastr.warning("You entered an incorrect city name!");

                return;
            }

            const unitsFormat = CurrentUnitsFormat.getCurrentUnitsFormat();

            replaceTemperaturesChart(citiesStorage, correctCityName, unitsFormat);

            input.value = "";
        })
        .catch((error) => {
            console.log(error);
            document.querySelector(".search-form__input").value = "";
        });
}

function template() {
    return `<input class="search-form__input" placeholder="city">
            <button class="search-form__button" type="button">Add</button>`;
}

function render(parentElement = document.querySelector(".options-container")) {
    const form = DOM.createDomElement("form", "search-form");

    form.innerHTML = template();
    form.querySelector(".search-form__button").addEventListener("click", handleClick);

    parentElement.appendChild(form);

    return form;
}

export default {
    render,
};
