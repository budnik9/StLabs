import DOM from "../../services/dom";

class DeleteSection {
    constructor(itemsText) {
        this.itemsText = itemsText;
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

            fragment.appendChild(item);
        });

        deleteSection.appendChild(fragment);
        parentElement.appendChild(deleteSection);

        return deleteSection;
    }
}

export default DeleteSection;
