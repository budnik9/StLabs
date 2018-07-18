import DOM from "../../services/dom";

class OptionsContainer {
    static render(parentElement) {
        const optionsContainer = DOM.createDomElement("div", "options-container");

        parentElement.appendChild(optionsContainer);

        return optionsContainer;
    }
}

export default OptionsContainer;
