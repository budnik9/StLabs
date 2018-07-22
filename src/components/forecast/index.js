import DOM from "../../services/dom";
import Spinner from "../spinner";

class Forecast {
    constructor(weatherComponent, forecastChart) {
        this.weatherComponent = weatherComponent;
        this.forecastChart = forecastChart;

        this.spinner = new Spinner();
        this.spinner.spin();
    }

    render(parentElement = document.querySelector(".main-content")) {
        const forecastBlock = DOM.createDomElement(
            "section",
            "forecast main-content__forecast",
        );

        this.weatherComponent.render(forecastBlock);
        this.forecastChart.render(forecastBlock);

        this.spinner.stop();

        parentElement.prepend(forecastBlock);

        return forecastBlock;
    }
}

export default Forecast;
