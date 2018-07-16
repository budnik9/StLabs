class Forecast {
    constructor(weatherComponent, forecastChartComponent) {
        this.weatherComponent = weatherComponent;
        this.forecastChartComponent = forecastChartComponent;
    }

    render(parentElement = document.querySelector(".main-content")) {
        const forecastBlock = document.createElement("section");

        forecastBlock.className = "forecast main-content__forecast";

        this.weatherComponent.render(forecastBlock);
        this.forecastChartComponent.render(forecastBlock);

        parentElement.appendChild(forecastBlock);
    }
}

export default Forecast;
