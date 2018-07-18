import DOM from "../../services/dom";

class MainContent {
    static render(parentElement) {
        const main = DOM.createDomElement("main", "main-content");

        parentElement.appendChild(main);

        return main;
    }
}

export default MainContent;
