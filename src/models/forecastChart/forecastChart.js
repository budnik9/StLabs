import Highcharts from "highcharts";
import Exporting from "highcharts/modules/exporting";

Exporting(Highcharts);

class ForecastChart {
    constructor(data) {
        this.city = data.city.name;
        this.country = data.city.country;
        this.forecast = data.list.slice(0, 10);
    }

    getTemperatureForecast() {
        return this.forecast.map(item => {
            return item.main.temp;
        });
    }

    getPressureForecast() {
        return this.forecast.map(item => {
            return item.main.pressure;
        });
    }

    getPrecipitationForecast() {
        return this.forecast.map(item => {
            return item.rain["3h"] || 0;
        });
    }

    render(parentElement = document.querySelector(".main-content")) {

        let chart = document.createElement("section");
        chart.className = "chart";
        
        Highcharts.chart(chart, {
            chart: {
                zoomType: "xy"
            },
            title: {
                text: `Current weather and forecasts in ${this.city}, ${this.country}`
            },
            xAxis: [{
                categories: ["1", "2", "3", "4", "5", "6",
                    "7", "8", "9", "10"],
                crosshair: true
            }],
            yAxis: [{                // Temperature yAxis
                labels: {
                    format: "{value}°C",
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                title: {
                    text: "Temperature",
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                opposite: true
        
            }, {                                    // Precipitation yAxis
                gridLineWidth: 0,
                title: {
                    text: "Precipitation",
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    format: "{value} mm",
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                }
        
            }, {                                    // Pressure yAxis
                gridLineWidth: 0,
                title: {
                    text: "Pressure",
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                labels: {
                    format: "{value} hpa",
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                opposite: true
            }],
            tooltip: {
                shared: true
            },
            legend: {
                layout: "vertical",
                align: "left",
                x: 80,
                verticalAlign: "top",
                y: 55,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || "#FFFFFF"
            },
            series: [{
                name: "Precipitation",
                type: "column",
                yAxis: 1,
                data: this.getPrecipitationForecast(),
                tooltip: {
                    valueSuffix: " mm"
                }
        
            }, {
                name: "Pressure",
                type: "spline",
                yAxis: 2,
                data: this.getPressureForecast(),
                marker: {
                    enabled: false
                },
                dashStyle: "shortdot",
                tooltip: {
                    valueSuffix: " hpa"
                }
        
            }, {
                name: "Temperature",
                type: "spline",
                data: this.getTemperatureForecast(),
                tooltip: {
                    valueSuffix: " °C"
                }
            }]
        });

        parentElement.appendChild(chart);
    }
}

export default ForecastChart;