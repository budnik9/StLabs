class DOM {
    static createDomElement(elementType, className, textContent) {
        const element = document.createElement(elementType);

        if (className) element.className = className;
        if (textContent) element.textContent = textContent;

        return element;
    }
}

export default DOM;
