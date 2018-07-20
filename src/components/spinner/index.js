import { Spinner } from "spin.js";
import spinnerOptions from "../../constants/spinner";
import DOM from "../../services/dom";

class MySpinner {
    constructor(parentElement = document.querySelector(".main-content")) {
        const container = DOM.createDomElement("div", "spinner-container");
        parentElement.appendChild(container);

        this.container = container;
        this.spinner = new Spinner(spinnerOptions.SPIN_OPTIONS);
    }

    spin() {
        this.spinner.spin(this.container);
    }

    stop() {
        this.spinner.stop();
    }
}

export default MySpinner;
