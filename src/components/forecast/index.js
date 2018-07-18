import DOM from "../../services/dom";

class Forecast {
    constructor(weatherComponent, forecastChartComponent) {
        this.weatherComponent = weatherComponent;
        this.forecastChartComponent = forecastChartComponent;
    }

    render(parentElement = document.querySelector(".main-content")) {
        const forecastBlock = DOM.createDomElement(
            "section",
            "forecast main-content__forecast",
        );

        this.weatherComponent.render(forecastBlock);
        this.forecastChartComponent.render(forecastBlock);

        parentElement.prepend(forecastBlock);

        return forecastBlock;
    }
}

export default Forecast;
