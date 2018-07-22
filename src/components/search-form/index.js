import toastr from "toastr";
import { TOASTR_OPTIONS } from "../../constants/toastr-options";
import CurrentUnitsFormat from "../units-format/current-units-format";
import DOM from "../../services/dom";
import CitiesStorage from "../../services/cities-storage";
import { REG_EXP_CITY_NAME } from "../../constants/reg-exp";
import TemperaturesChart from "../temperatures-chart";
import DeleteSection from "../delete-section";

toastr.options = TOASTR_OPTIONS;

function addDeleteSection(parentElement, citiesStorage) {
    const newDeleteSection = new DeleteSection(citiesStorage.getFavoriteCities());

    newDeleteSection.render(parentElement);
}

function replaceTemperaturesChart(citiesStorage, newCity, unitsFormat) {
    const mainContent = document.querySelector(".main-content");

    const cities = citiesStorage.getAllCities();

    if (citiesStorage.getLength() >= 1) {
        const temperaturesChart = mainContent.querySelector(".temperatures-chart");
        const deleteSection = document.querySelector(".delete-section");

        if (deleteSection) mainContent.removeChild(deleteSection);
        if (temperaturesChart) mainContent.removeChild(temperaturesChart);
    }

    const newTemperaturesChart = new TemperaturesChart(cities, newCity, unitsFormat);

    newTemperaturesChart.render(mainContent)
        .then(() => {
            citiesStorage.addCity(newCity);

            addDeleteSection(mainContent, citiesStorage);
        });
}

function isValid(value) {
    return REG_EXP_CITY_NAME.test(value.trim());
}

function handleClick(event) {
    event.preventDefault();

    const citiesStorage = new CitiesStorage();

    if (citiesStorage.getLength() >= CitiesStorage.getMaxLength()) {
        toastr.info("You can't add more than 5 forecasts to page!");

        return;
    }

    const input = document.querySelector(".search-form__input");
    const correctCityName = input.value[0].toUpperCase() + input.value.slice(1);

    if (!isValid(correctCityName) || citiesStorage.includes(correctCityName)) {
        input.value = "";
        toastr.warning("You entered an incorrect city name!");

        return;
    }

    const unitsFormat = CurrentUnitsFormat.getCurrentUnitsFormat();

    replaceTemperaturesChart(citiesStorage, correctCityName, unitsFormat);

    input.value = "";
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
