import "./index.less";
import openWeatherMapAPI from "./services/open-weather-map-api";
import MainContent from "./components/main-content";
import Weather from "./components/weather";
import ForecastChart from "./components/forecast-chart";
import TemperaturesChart from "./components/temperatures-chart";
import Forecast from "./components/forecast";
import Header from "./components/header";
import Logo from "./components/logo";
import Menu from "./components/menu";
import OptionsContainer from "./components/options-container";
import DateComponent from "./components/date";
import UnitsFormatComponent from "./components/units-format";
import SearchForm from "./components/search-form";
import DeleteSection from "./components/delete-section";
import unitsFormat from "./constants/units-format";
import geolocation from "./services/geolocation";
import CitiesStorage from "./services/cities-storage";


const root = document.querySelector("#root");
const header = Header.render(root);
const mainContent = MainContent.render(root);

Logo.render(header);
Menu.render(header);

const optionsContainer = OptionsContainer.render(header);

DateComponent.render(optionsContainer);
SearchForm.render(optionsContainer);
UnitsFormatComponent.render(optionsContainer);

async function renderCurrentGeolocationForecast(lat, lon) {
    const weatherResponse = await openWeatherMapAPI.getWeatherByGeographicCoordinates(lat, lon, unitsFormat.METRIC);
    const forecastResponse = await openWeatherMapAPI.getForecastByGeographicCoordinates(lat, lon, unitsFormat.METRIC);

    const currentWeather = new Weather(weatherResponse.data);
    const forecastChart = new ForecastChart(forecastResponse.data);
    const forecastBlock = new Forecast(currentWeather, forecastChart);

    forecastBlock.render(mainContent);

    const citiesStorage = new CitiesStorage();
    citiesStorage.setCurrentGeolocationCity(currentWeather.city);
}

function renderAllForecasts(lat, lon) {
    try {
        renderCurrentGeolocationForecast(lat, lon);

        const citiesStorage = new CitiesStorage();

        if (citiesStorage.getLength() > 1) {
            const cities = citiesStorage.getAllCities();
            const temperaturesChart = new TemperaturesChart(cities, unitsFormat.Metric);

            temperaturesChart.render(mainContent)
                .then(() => {
                    const deleteSection = new DeleteSection(citiesStorage.getFavoriteCities());

                    deleteSection.render(mainContent);
                });
        }
    } catch (err) {
        const citiesStorage = new CitiesStorage();

        const cities = citiesStorage.getAllCities();
        const temperaturesChart = new TemperaturesChart(cities, unitsFormat.Metric);
        
        temperaturesChart.render(mainContent)
            .then(() => {
                const deleteSection = new DeleteSection(citiesStorage.getFavoriteCities());

                deleteSection.render(mainContent);
            });

        console.log(`ERROR: ${err.message}`);
        alert("An error has occurred! We apologize");
    }
}

function getGeolocation(position) {
    const { coords } = position;
    renderAllForecasts(coords.latitude, coords.longitude);
}

function errGeolocation(err) {
    console.log(`ERROR: ${err.message}`);

    const citiesStorage = new CitiesStorage();

    if (citiesStorage.getLength()) {
        const cities = citiesStorage.getFavoriteCities();
        const temperaturesChart = new TemperaturesChart(cities, unitsFormat.Metric);
        
        temperaturesChart.render(mainContent)
            .then(() => {
                const deleteSection = new DeleteSection(citiesStorage.getFavoriteCities());

                deleteSection.render(mainContent);
            });
    }
}

geolocation(getGeolocation, errGeolocation);
