import Highcharts from "highcharts";
import Exporting from "highcharts/modules/exporting";
import DOM from "../../services/dom";
import openWeatherMapAPI from "../../services/open-weather-map-api";
import UnitsFormatConstants from "../../constants/units-format";
import ChartOptions from "../../constants/chart-options";
import Spinner from "../spinner";

Exporting(Highcharts);

class TemperaturesChart {
    constructor(cities, unitsFormat = UnitsFormatConstants.METRIC) {
        this.cities = cities;
        this.unitsFormat = unitsFormat;

        this.spinner = new Spinner();
        this.spinner.spin();
    }

    getAllSeries() {

        return Promise.all(this.cities.map(city => openWeatherMapAPI.getForecastByCityName(city, this.unitsFormat)))
            .then(forecasts => forecasts.map((forecast) => {
                const temperatures = forecast.data.list.slice(0, 10).map(item => Math.round(item.main.temp * 10) / 10);
                const city = forecast.data.city.name;

                return {
                    name: city,
                    data: temperatures,
                    tooltip: {
                        valueSuffix: ` ${this.transformUnitsFormat()}`,
                    },
                };
            }))
            .catch(err => console.log(err));
    }

    async getTimeForForecastValues() {
        const forecast = await openWeatherMapAPI.getForecastByCityName(this.cities[0], this.unitsFormat);

        return forecast.data.list.slice(0, 10).map((item) => {
            const year = parseInt(item.dt_txt.slice(0, 4), 10);
            const month = parseInt(item.dt_txt.slice(5, 7), 10) - 1;
            const day = parseInt(item.dt_txt.slice(8, 11), 10);
            const hour = parseInt(item.dt_txt.slice(-8, -6), 10);
            const minutes = parseInt(item.dt_txt.slice(-5, -3), 10);
            const seconds = parseInt(item.dt_txt.slice(-2), 10);

            const date = new Date(year, month, day, hour, minutes, seconds);

            return date.toLocaleString("en-US", ChartOptions.DATE_OPTIONS);
        });
    }

    transformUnitsFormat() {
        switch (this.unitsFormat) {
        case UnitsFormatConstants.STANDARD:
            return "K";
        case UnitsFormatConstants.METRIC:
            return "°C";
        default:
            return "°F";
        }
    }

    async render(parentElement) {
        const temperaturesChart = DOM.createDomElement("section", "temperatures-chart forecast__temperatures-chart");

        const allSeries = await this.getAllSeries();
        const timeForForecastValues = await this.getTimeForForecastValues();

        Highcharts.chart(temperaturesChart, {

            chart: {
                zoomType: "xy",
                height: 500,
            },

            title: {
                text: "Temperatures chart",
                style: {
                    fontWeight: "bold",
                    fontSize: "32px",
                },
            },

            xAxis: [
                {
                    categories: timeForForecastValues,
                    crosshair: true,
                },
            ],

            yAxis: {
                title: {
                    text: `Temperature ${this.transformUnitsFormat()}`,
                    style: {
                        fontSize: "18px",
                    },
                },
                labels: {
                    format: `{value} ${this.transformUnitsFormat()}`,
                },
            },

            tooltip: {
                shared: true,
            },

            legend: {
                layout: "vertical",
                align: "right",
                verticalAlign: "middle",
            },

            series: allSeries,

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 800,
                    },
                    chartOptions: {
                        legend: {
                            layout: "horizontal",
                            align: "center",
                            verticalAlign: "bottom",
                        },
                    },
                }],
            },

        });

        parentElement.appendChild(temperaturesChart);

        this.spinner.stop();

        return temperaturesChart;
    }
}

export default TemperaturesChart;
