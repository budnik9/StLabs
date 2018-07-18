import Highcharts from "highcharts";
import Exporting from "highcharts/modules/exporting";
import DOM from "../../services/dom";
import openWeatherMapAPI from "../../services/open-weather-map-api";
import UnitsFormat from "../units-format";
import UnitsFormatConstants from "../../constants/units-format";
import ChartOptions from "../../constants/chart-options";

Exporting(Highcharts);

class TemperaturesChart {
    constructor(cities) {
        this.cities = cities;
    }

    getAllSeries() {
        const unitsFormat = UnitsFormat.getCurrentUnitsFormat();

        return Promise.all(this.cities.map(city => openWeatherMapAPI.getForecastByCityName(city, unitsFormat)))
            .then(forecasts => forecasts.map((forecast) => {
                const temperatures = forecast.data.list.slice(0, 10).map(item => Math.round(item.main.temp * 10) / 10);
                const city = forecast.data.city.name;

                return {
                    name: city,
                    data: temperatures,
                    tooltip: {
                        valueSuffix: ` ${TemperaturesChart.getUnitsFormat()}`,
                    },
                };
            }))
            .catch(err => console.log(err));
    }

    async getTimeForForecastValues() {
        const unitsFormat = UnitsFormat.getCurrentUnitsFormat();
        const forecast = await openWeatherMapAPI.getForecastByCityName(this.cities[0], unitsFormat);

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

    static getUnitsFormat() {
        switch (UnitsFormat.getCurrentUnitsFormat()) {
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
                    text: `Temperature ${TemperaturesChart.getUnitsFormat()}`,
                    style: {
                        fontSize: "18px",
                    },
                },
                labels: {
                    format: `{value} ${TemperaturesChart.getUnitsFormat()}`,
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
                        maxWidth: 500,
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

        return temperaturesChart;
    }
}

export default TemperaturesChart;
