import UnitsFormat from "../units-format";
import DOM from "../../services/dom";
import CitiesStorage from "../../services/cities-storage";
import RegExp from "../../constants/reg-exp";
import TemperaturesChart from "../temperatures-chart";
import DeleteSection from "../delete-section";

function addNewDeleteSection(parentElement, citiesStorage) {
    const newDeleteSection = new DeleteSection(citiesStorage.getFavoriteCities());

    newDeleteSection.render(parentElement);
}

function replaceTemperaturesChart(citiesStorage, newCity, unitsFormat) {
    const mainContent = document.querySelector(".main-content");

    let cities = citiesStorage.getAllCities();

    if (cities.length > 1) {
        const temperaturesChart = mainContent.querySelector(".temperatures-chart");
        const deleteSection = document.querySelector(".delete-section");

        if (deleteSection) mainContent.removeChild(deleteSection);
        mainContent.removeChild(temperaturesChart);
    }

    citiesStorage.addCity(newCity);
    cities = citiesStorage.getAllCities();

    const newTemperaturesChart = new TemperaturesChart(cities, unitsFormat);

    newTemperaturesChart.render(mainContent)
        .then(() => {
            addNewDeleteSection(mainContent, citiesStorage);
        });
}


class SearchForm {
    static handleClick(event) {
        event.preventDefault();

        const citiesStorage = new CitiesStorage();

        if (citiesStorage.getLength() >= CitiesStorage.getMaxLength()) {
            alert("You can't add more than 5 forecasts to page");

            return;
        }

        const input = document.querySelector(".search-form__input");

        if (!SearchForm.isValid(input.value) || citiesStorage.includes(input.value)) {
            input.value = "";
            alert("invalid city name");

            return;
        }

        const unitsFormat = UnitsFormat.getCurrentUnitsFormat();

        replaceTemperaturesChart(citiesStorage, input.value, unitsFormat);

        input.value = "";
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
