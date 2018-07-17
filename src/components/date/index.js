import DOM from "../../services/dom";

const dateOptions = Object.freeze({
    year: "numeric",
    month: "short",
    day: "numeric",
});

class DateComponent {
    static render(parentElement = document.querySelector(".options-container")) {
        const date = DOM.createDomElement(
            "span",
            "date",
            new Date().toLocaleDateString("en-US", dateOptions),
        );

        parentElement.appendChild(date);
    }
}

export default DateComponent;
