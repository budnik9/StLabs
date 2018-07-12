import Highcharts from "highcharts";
import Exporting from "highcharts/modules/exporting";
import config from "../../config/config";
import dateOptions from "../../constants/dateOptions";

Exporting(Highcharts);
const configServer = config.server;

class ForecastChart {
    constructor(data) {
        this.city = data.city.name;
        this.country = data.city.country;
        this.forecast = data.list.slice(0, 10);
    }

    getTemperatureForecast() {
        return this.forecast.map(item => Math.round(item.main.temp * 10) / 10);
    }

    getIconCodes() {
        return this.forecast.map(item => item.weather[0].icon);
    }

    getTemperatureAxisData() {
        const temperatureForecast = this.getTemperatureForecast();
        const iconCodes = this.getIconCodes();

        const temperatureAxisData = [];

        for (let i = 0; i < iconCodes.length; i += 1) {
            temperatureAxisData.push({
                y: temperatureForecast[i],
                marker: {
                    symbol: `url(${configServer.iconsUrl}${iconCodes[i]}.png)`,
                },
            });
        }

        return temperatureAxisData;
    }

    getPressureForecast() {
        return this.forecast.map(item => Math.round(item.main.pressure * 10) / 10);
    }

    getPrecipitationForecast() {
        return this.forecast.map(item => (Math.round(item.rain["3h"] * 10) / 10) || 0);
    }

    getTimeForForecastValues() {
        return this.forecast.map((item) => {
            const year = parseInt(item.dt_txt.slice(0, 4), 10);
            const month = parseInt(item.dt_txt.slice(5, 7), 10) - 1;
            const day = parseInt(item.dt_txt.slice(9, 11), 10);
            const hour = parseInt(item.dt_txt.slice(-8, -6), 10);
            const minutes = parseInt(item.dt_txt.slice(-5, -3), 10);
            const seconds = parseInt(item.dt_txt.slice(-2), 10);

            const date = new Date(year, month, day, hour, minutes, seconds);

            return date.toLocaleString("en-US", dateOptions);
        });
    }

    render(parentElement = document.querySelector(".main-content")) {
        const chart = document.createElement("section");
        chart.className = "chart";

        Highcharts.chart(chart, {
            chart: {
                zoomType: "xy",
            },
            title: {
                text: `Current weather and forecasts in ${this.city}, ${this.country}`,
                style: {
                    fontWeight: "bold",
                    fontSize: "32px",
                },
            },
            xAxis: [{
                categories: this.getTimeForForecastValues(),
                crosshair: true,
            }],
            yAxis: [{ // Temperature yAxis
                labels: {
                    format: "{value}°C",
                    style: {
                        color: "#F00",
                    },
                },
                title: {
                    text: "Temperature",
                    style: {
                        color: "#F00",
                    },
                },
                opposite: true,

            }, { // Precipitation yAxis
                gridLineWidth: 0,
                title: {
                    text: "Precipitation",
                    style: {
                        color: "#6495ED",
                    },
                },
                labels: {
                    format: "{value} mm",
                    style: {
                        color: "#6495ED",
                    },
                },

            }, { // Pressure yAxis
                gridLineWidth: 0,
                title: {
                    text: "Pressure",
                    style: {
                        color: Highcharts.getOptions().colors[1],
                    },
                },
                labels: {
                    format: "{value} hpa",
                    style: {
                        color: Highcharts.getOptions().colors[1],
                    },
                },
                opposite: true,
            }],
            tooltip: {
                shared: true,
            },
            legend: {
                layout: "vertical",
                align: "left",
                x: 80,
                verticalAlign: "top",
                y: 55,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || "#FFFFFF",
            },
            series: [{
                name: "Precipitation",
                type: "column",
                yAxis: 1,
                data: this.getPrecipitationForecast(),
                tooltip: {
                    valueSuffix: " mm",
                },
                color: "#6495ED",

            }, {
                name: "Pressure",
                type: "spline",
                yAxis: 2,
                data: this.getPressureForecast(),
                marker: {
                    enabled: false,
                },
                dashStyle: "shortdot",
                tooltip: {
                    valueSuffix: " hpa",
                },
                color: "#000",

            }, {
                name: "Temperature",
                type: "spline",
                data: this.getTemperatureAxisData(),
                tooltip: {
                    valueSuffix: " °C",
                },
                color: "#F00",
            }],
        });

        parentElement.appendChild(chart);
    }
}

export default ForecastChart;
