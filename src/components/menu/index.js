import DOM from "../../services/dom";

function template() {
    return `<li class="menu__item menu__item_active">Home</li>
            <li class="menu__item">Map</li>`;
}

function render(parentElement) {
    const menu = DOM.createDomElement("ul", "menu");

    menu.innerHTML = template();
    parentElement.appendChild(menu);

    return menu;
}

export default {
    render,
};
