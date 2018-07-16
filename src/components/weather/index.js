import configServer from "../../config/config-server";
import UnitsFormat from "../../constants/units-format";

function createDomElement(elementType, className, textContent) {
    const element = document.createElement(elementType);

    if (className) element.className = className;
    if (textContent) element.textContent = textContent;

    return element;
}

class Weather {
    constructor(data, unitsFormat = UnitsFormat.METRIC) {
        this.city = data.name;
        this.country = data.sys.country;
        this.cityID = data.id;
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

    getUnitsFormat() {
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
        const weatherInfo = createDomElement("section", "weather-info");

        const city = createDomElement("span", "weather-info__city", `${this.city}, ${this.country}`);
        weatherInfo.appendChild(city);

        const icon = createDomElement("img", "weather-info__icon");

        icon.setAttribute("src", `${configServer.ICONS_URL}${this.iconCode}.png`);
        weatherInfo.appendChild(icon);

        const temperature = createDomElement("span", "weather-info__temperature", `${this.temperature} ${this.getUnitsFormat()}`);
        weatherInfo.appendChild(temperature);

        const weatherDescription = createDomElement("span", "weather-info__description", `${this.weatherDescription}`);
        weatherInfo.appendChild(weatherDescription);

        const wind = createDomElement("span", "weather-info__wind",
            `Wind: ${this.windSpeed} ${this.getUnitsFormat() === "°F" ? "m/h" : "m/s"}`);

        weatherInfo.appendChild(wind);

        const pressure = createDomElement("span", "weather-info__pressure", `Pressure: ${this.pressure} hpa`);
        weatherInfo.appendChild(pressure);

        const humidity = createDomElement("span", "weather-info__humidity", `Humidity: ${this.humidity} %`);
        weatherInfo.appendChild(humidity);

        const sunriseTimeTxt = this.getSunriseTimeTxt();
        const sunrise = createDomElement("span", "weather-info__sunrise",
            `Sunrise: ${sunriseTimeTxt.hours.padStart(2, "0")}:${sunriseTimeTxt.minutes.padStart(2, "0")}`);

        weatherInfo.appendChild(sunrise);

        const sunsetTimeTxt = this.getSunsetTimeTxt();
        const sunset = createDomElement("span", "weather-info__sunset",
            `Sunset: ${sunsetTimeTxt.hours.padStart(2, "0")}:${sunsetTimeTxt.minutes.padStart(2, "0")}`);

        weatherInfo.appendChild(sunset);

        const geoCoords = createDomElement("span", "weather-info__coordinates",
            `Geo coordinates: [${this.cityCoords.lat}, ${this.cityCoords.lon}]`);

        weatherInfo.appendChild(geoCoords);

        parentElement.appendChild(weatherInfo);
    }
}

export default Weather;
