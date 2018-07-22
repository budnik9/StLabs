import DOM from "../../services/dom";
import img from "../../../public/images/logo.png";

function render(parentElement) {
    const logo = DOM.createDomElement("img", "logo logo_float_left");

    logo.setAttribute("alt", "logo");
    logo.setAttribute("src", `${img}`);

    parentElement.appendChild(logo);

    return logo;
}

export default {
    render,
};
