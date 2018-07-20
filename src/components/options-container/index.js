import DOM from "../../services/dom";

function render(parentElement) {
    const optionsContainer = DOM.createDomElement("div", "options-container");

    parentElement.appendChild(optionsContainer);

    return optionsContainer;
}

export default {
    render,
};
