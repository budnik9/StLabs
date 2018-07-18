import DOM from "../../services/dom";

class Header {
    static render(parentElement) {
        const header = DOM.createDomElement("header", "header");

        parentElement.appendChild(header);

        return header;
    }
}

export default Header;
