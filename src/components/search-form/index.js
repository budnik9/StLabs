function createDomElement(elementType, className, textContent) {
    const element = document.createElement(elementType);

    if (className) element.className = className;
    if (textContent) element.textContent = textContent;

    return element;
}

class SearchFrom {
    static render(parentElement = document.querySelector(".options-container")) {
        const form = createDomElement("form", "search-form");

        const inputTxt = createDomElement("input", "search-form__input");

        inputTxt.setAttribute("placeholder", "city");
        form.appendChild(inputTxt);

        const button = createDomElement("button", "search-form__button");

        button.textContent = "Add";
        button.setAttribute("type", "button");
        form.appendChild(button);

        parentElement.appendChild(form);
    }
}

export default SearchFrom;
