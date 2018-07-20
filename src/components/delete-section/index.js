import DOM from "../../services/dom";
import CurrentUnitsFormat from "../units-format/current-units-format";
import CitiesStorage from "../../services/cities-storage";
import TemperaturesChart from "../temperatures-chart";

class DeleteSection {
    constructor(itemsText) {
        this.itemsText = itemsText;
    }

    handleClick(event) {
        event.preventDefault();

        const [text, icon] = this.children;

        if (event.target === icon) {
            const citiesStorage = new CitiesStorage();
            const city = text.textContent;

            citiesStorage.removeCityFromFavorites(city);

            const unitsFormat = CurrentUnitsFormat.getCurrentUnitsFormat();

            replaceTemperaturesChart(citiesStorage, unitsFormat)
                .then(() => addNewDeleteSection(citiesStorage));
        }
    }

    render(parentElement) {
        const deleteSection = DOM.createDomElement("section", "delete-section temperatures-chart__delete-section");

        const fragment = new DocumentFragment();

        this.itemsText.forEach((itemText) => {
            const item = DOM.createDomElement("div", "delete-section__item");
            const text = DOM.createDomElement("span", "delete-section__text", itemText);
            const icon = DOM.createDomElement("img", "delete-section__icon");

            icon.setAttribute("src", "https://api.icons8.com/download/4f06af3f885810b1e70dcfb158a672d42cebee11/Color/PNG/512/Editing/delete-512.png");
            icon.setAttribute("alt", "press to delete");

            item.appendChild(text);
            item.appendChild(icon);

            item.addEventListener("click", this.handleClick);

            fragment.appendChild(item);
        });

        deleteSection.appendChild(fragment);
        parentElement.appendChild(deleteSection);

        return deleteSection;
    }
}


function replaceTemperaturesChart(citiesStorage, unitsFormat) {
    const mainContent = document.querySelector(".main-content");
    const temperaturesChart = mainContent.querySelector(".temperatures-chart");
    const deleteSection = mainContent.querySelector(".delete-section");

    mainContent.removeChild(deleteSection);
    mainContent.removeChild(temperaturesChart);

    if ((citiesStorage.getLength() > 1 && citiesStorage.getCurrentGeolocationCity())
        || (citiesStorage.getLength() >= 1 && !citiesStorage.getCurrentGeolocationCity())) {
            
        const cities = citiesStorage.getAllCities();
        const newTemperaturesChart = new TemperaturesChart(cities, unitsFormat);

        return newTemperaturesChart.render(mainContent);
    }

    return Promise.resolve();
}

function addNewDeleteSection(citiesStorage) {
    const mainContent = document.querySelector(".main-content");

    if ((citiesStorage.getLength() > 1 && citiesStorage.getCurrentGeolocationCity())
        || (citiesStorage.getLength() >= 1 && !citiesStorage.getCurrentGeolocationCity())) {

        const newDeleteSection = new DeleteSection(citiesStorage.getFavoriteCities());

        newDeleteSection.render(mainContent);
    }
}

export default DeleteSection;
