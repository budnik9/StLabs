import DOM from "../../services/dom";

class Menu {
    static template() {
        return `<li class="menu__item menu__item_active">Home</li>
                <li class="menu__item">Map</li>`;
    }

    static render(parentElement) {
        const menu = DOM.createDomElement("ul", "menu");

        menu.innerHTML = Menu.template();
        parentElement.appendChild(menu);

        return menu;
    }
}

export default Menu;
