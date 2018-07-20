import DOM from "../../services/dom";

function render(parentElement) {
    const main = DOM.createDomElement("main", "main-content");

    parentElement.appendChild(main);

    return main;
}

export default {
    render,
};
