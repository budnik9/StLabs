import UnitsFormat from "../../constants/units-format";
import DOM from "../../services/dom";

class Weather {
    constructor(data, unitsFormat = UnitsFormat.METRIC) {
        this.city = data.name;
        this.country = data.sys.country;
        this.cityCoords = {
            lat: data.coord.lat,
            lon: data.coord.lon,
        };
        this.iconCode = data.weather[0].icon;
        this.temperature = data.main.temp;
        this.weatherDescription = data.weather[0].description;
        this.weatherDescription = this.weatherDescription.charAt(0).toUpperCase()
            + this.weatherDescription.slice(1);

        this.windSpeed = data.wind.speed;
        this.pressure = data.main.pressure;
        this.humidity = data.main.humidity;
        this.sunrise = new Date(data.sys.sunrise * 1000);
        this.sunset = new Date(data.sys.sunset * 1000);
        this.unitsFormat = unitsFormat;
    }

    template() {
        const sunriseTimeTxt = this.getSunriseTimeTxt();
        const sunsetTimeTxt = this.getSunsetTimeTxt();

        return `<span class="weather-info__city">${this.city}, ${this.country}</span>
                <img class="weather-info__icon" src="${require(`../../../public/images/${this.iconCode}.png`)}">
                <span class="weather-info__temperature">${this.temperature} ${this.transformUnitsFormat()}</span>
                <span class="weather-info__description">${this.weatherDescription}</span>
                <span class="weather-info__wind">Wind: ${this.windSpeed} ${this.transformUnitsFormat() === "°F" ? "m/h" : "m/s"}</span>
                <span class="weather-info__pressure">Pressure: ${this.pressure} hpa</span>
                <span class="weather-info__humidity">Humidity: ${this.humidity} %</span>
                <span class="weather-info__sunrise">Sunrise: ${sunriseTimeTxt.hours.padStart(2, "0")}:${sunriseTimeTxt.minutes.padStart(2, "0")}</span>
                <span class="weather-info__sunset">Sunset: ${sunsetTimeTxt.hours.padStart(2, "0")}:${sunsetTimeTxt.minutes.padStart(2, "0")}</span>
                <span class="weather-info__coordinates">Geo coordinates: [${this.cityCoords.lat}, ${this.cityCoords.lon}]</span>`;
    }

    transformUnitsFormat() {
        switch (this.unitsFormat) {
        case UnitsFormat.STANDARD:
            return "K";
        case UnitsFormat.METRIC:
            return "°C";
        default:
            return "°F";
        }
    }

    getSunsetTimeTxt() {
        return {
            hours: this.sunset.getHours().toString(),
            minutes: this.sunset.getMinutes().toString(),
        };
    }

    getSunriseTimeTxt() {
        return {
            hours: this.sunrise.getHours().toString(),
            minutes: this.sunrise.getMinutes().toString(),
        };
    }

    render(parentElement = document.querySelector(".main-content")) {
        const weatherInfo = DOM.createDomElement("section", "weather-info");

        weatherInfo.innerHTML = this.template();
        parentElement.appendChild(weatherInfo);
        
        return weatherInfo;
    }
}

export default Weather;
