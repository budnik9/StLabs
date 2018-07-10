class Forecast {
    constructor(data) {
        this.city = data.city;
        this.forecastData = data.list;
        this.currentWeather = data.list[0];
    }

    render(parentSelector = ".main-content") {

        let weatherInfo = document.createElement("section");
        weatherInfo.className = "weather-info";

        let highchart = document.createElement("section");
        highchart.className = "highchart";

        let city = document.createElement("span");
        city.className = "weather-info__city";
        city.innerText = this.city.name;
        weatherInfo.appendChild(city);

        let temperature = document.createElement("span");
        temperature.className = "weather-info__temperature";
        temperature.innerText = `${Math.floor(this.currentWeather.main.temp)} \u00B0C`;
        weatherInfo.appendChild(temperature);

        let wind = document.createElement("span");
        wind.className = "weather-info__wind";
        wind.innerText = `${this.currentWeather.wind.speed} m/s`;
        weatherInfo.appendChild(wind);
        
        let forecast = document.createElement("section");
        forecast.className = "forecast main-content__forecast";
        forecast.appendChild(weatherInfo);
        forecast.appendChild(highchart);

        document.querySelector(parentSelector).appendChild(forecast);
    }
}

export default Forecast;