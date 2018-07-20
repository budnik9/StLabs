import DOM from "../../services/dom";

function render(parentElement) {
    const logo = DOM.createDomElement("img", "logo logo_float_left");

    logo.setAttribute("alt", "logo");
    logo.setAttribute("src", "http://www.pngmart.com/files/3/Weather-Transparent-Background.png");

    parentElement.appendChild(logo);

    return logo;
}

export default {
    render,
};
