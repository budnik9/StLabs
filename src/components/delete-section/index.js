import DOM from "../../services/dom";
import CurrentUnitsFormat from "../units-format/current-units-format";
import CitiesStorage from "../../services/cities-storage";
import TemperaturesChart from "../temperatures-chart";
import deleteIcon from "../../../public/images/delete-icon.png";

class DeleteSection {
    constructor(textItems) {
        this.textItems = textItems;
    }

    handleClick(event) {
        event.preventDefault();

        const [textItem, icon] = this.children;

        if (event.target === icon) {
            const citiesStorage = new CitiesStorage();
            const city = textItem.textContent;

            citiesStorage.removeCityFromFavorites(city);

            const unitsFormat = CurrentUnitsFormat.getCurrentUnitsFormat();

            replaceTemperaturesChart(citiesStorage, unitsFormat)
                .then(() => addNewDeleteSection(citiesStorage));
        }
    }

    render(parentElement) {
        const deleteSection = DOM.createDomElement("section", "delete-section temperatures-chart__delete-section");

        const fragment = new DocumentFragment();

        this.textItems.forEach((textItem) => {
            const item = DOM.createDomElement("div", "delete-section__item");
            const text = DOM.createDomElement("span", "delete-section__text", textItem);
            const icon = DOM.createDomElement("img", "delete-section__icon");

            icon.setAttribute("src", `${deleteIcon}`);
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

    if ((citiesStorage.getLength() > 1 && citiesStorage.hasCurrentGeolocationCity())
        || (citiesStorage.getLength() >= 1 && !citiesStorage.hasCurrentGeolocationCity())) {

        const cities = citiesStorage.getAllCities();
        const newTemperaturesChart = new TemperaturesChart(cities, unitsFormat);

        return newTemperaturesChart.render(mainContent);
    }

    return Promise.resolve();
}

function addNewDeleteSection(citiesStorage) {
    const mainContent = document.querySelector(".main-content");

    if ((citiesStorage.getLength() > 1 && citiesStorage.hasCurrentGeolocationCity())
        || (citiesStorage.getLength() >= 1 && !citiesStorage.hasCurrentGeolocationCity())) {

        const newDeleteSection = new DeleteSection(citiesStorage.getFavoriteCities());

        newDeleteSection.render(mainContent);
    }
}

export default DeleteSection;
