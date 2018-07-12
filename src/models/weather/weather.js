import config from "../../config/config";

const serverConfig = config.server;

class Weather {
    constructor(data) {
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
        this.weatherDescription = this.weatherDescription.charAt(0).toUpperCase() + this.weatherDescription.slice(1);
        this.windSpeed = data.wind.speed;
        this.pressure = data.main.pressure;
        this.humidity = data.main.humidity;
        this.sunrise = new Date(data.sys.sunrise);
        this.sunset = new Date(data.sys.sunset);
    }

    render(parentElement = document.querySelector(".main-content")) {

        const weatherInfo = document.createElement("section");
        weatherInfo.className = "weather-info";

        const city = document.createElement("span");
        city.className = "weather-info__city";
        city.textContent = `${this.city}, ${this.country}`;
        weatherInfo.appendChild(city);

        const icon = document.createElement("img");
        icon.setAttribute("src", `${serverConfig.iconsUrl}${this.iconCode}.png`);
        icon.className = "weather-info__icon";
        weatherInfo.appendChild(icon);

        const temperature = document.createElement("span");
        temperature.className = "weather-info__temperature";
        temperature.textContent = `${this.temperature} \u00B0C`;
        weatherInfo.appendChild(temperature);

        const weatherDescription = document.createElement("span");
        weatherDescription.className = "weather-info__description";
        weatherDescription.textContent = `${this.weatherDescription}`;
        weatherInfo.appendChild(weatherDescription);

        const wind = document.createElement("span");
        wind.className = "weather-info__wind";
        wind.textContent = `Wind: ${this.windSpeed} m/s`;
        weatherInfo.appendChild(wind);

        const pressure = document.createElement("span");
        pressure.className = "weather-info__pressure";
        pressure.textContent = `Pressure: ${this.pressure} hpa`;
        weatherInfo.appendChild(pressure);

        const humidity = document.createElement("span");
        humidity.className = "weather-info__humidity";
        humidity.textContent = `Humidity: ${this.humidity} %`;
        weatherInfo.appendChild(humidity);

        const sunrise = document.createElement("span");
        sunrise.className = "weather-info__sunrise";
        sunrise.textContent = `Sunrise:   ${this.sunrise.getHours()}:${this.sunrise.getMinutes()}`;
        weatherInfo.appendChild(sunrise);

        const sunset = document.createElement("span");
        sunset.className = "weather-info__sunset";
        sunset.textContent = `Sunset:   ${this.sunset.getHours()}:${this.sunset.getMinutes()}`;
        weatherInfo.appendChild(sunset);

        const geoCoords = document.createElement("span");
        geoCoords.className = "weather-info__coordinates";
        geoCoords.textContent = `Geo coordinates: [${this.cityCoords.lat}, ${this.cityCoords.lon}]`;
        weatherInfo.appendChild(geoCoords);

        parentElement.appendChild(weatherInfo);
    }
}

export default Weather;
