import DOM from "../../services/dom";

function render(parentElement) {
    const header = DOM.createDomElement("header", "header");

    parentElement.appendChild(header);

    return header;
}

export default {
    render,
};
