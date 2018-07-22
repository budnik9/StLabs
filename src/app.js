import "./index.less";
import toastr from "toastr";
import { TOASTR_OPTIONS } from "./constants/toastr-options";
import unitsFormat from "./constants/units-format";
import { OpenWeatherMapApi, Geolocation, CitiesStorage } from "./services";
import {
    DateComponent,
    DeleteSection,
    Forecast,
    ForecastChart,
    Header,
    Logo,
    MainContent,
    Menu,
    OptionsContainer,
    SearchForm,
    TemperaturesChart,
    UnitsFormat,
    Weather,
} from "./components";

toastr.options = TOASTR_OPTIONS;


const root = document.querySelector("#root");
const header = Header.render(root);
const mainContent = MainContent.render(root);

Logo.render(header);
Menu.render(header);

const optionsContainer = OptionsContainer.render(header);

DateComponent.render(optionsContainer);
SearchForm.render(optionsContainer);
UnitsFormat.render(optionsContainer);

async function renderCurrentGeolocationForecast(lat, lon) {
    const weatherResponse = await OpenWeatherMapApi.getWeatherByGeographicCoordinates(lat, lon, unitsFormat.METRIC);
    const forecastResponse = await OpenWeatherMapApi.getForecastByGeographicCoordinates(lat, lon, unitsFormat.METRIC);

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
        toastr.error("We can't get your geolocation");

        const citiesStorage = new CitiesStorage();

        const cities = citiesStorage.getAllCities();
        const temperaturesChart = new TemperaturesChart(cities, unitsFormat.Metric);
        
        temperaturesChart.render(mainContent)
            .then(() => {
                const deleteSection = new DeleteSection(citiesStorage.getFavoriteCities());

                deleteSection.render(mainContent);
            });
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

Geolocation(getGeolocation, errGeolocation);
