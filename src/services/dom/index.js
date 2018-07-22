function createDomElement(type, className, textContent) {
    const element = document.createElement(type);

    if (className) element.className = className;
    if (textContent) element.textContent = textContent;

    return element;
}

export default {
    createDomElement,
};
