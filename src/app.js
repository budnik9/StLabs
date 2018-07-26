import "./index.less";
import toastr from "toastr";
import { TOASTR_OPTIONS } from "./constants/toastr-options";
import statusCodes from "./constants/http-status-codes";
import unitsFormat from "./constants/units-format";

import {
    OpenWeatherMapApi,
    Geolocation,
    CitiesStorage,
    ServerAPI,
} from "./services";

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
    try {
        const weatherResponse = await OpenWeatherMapApi.getWeatherByGeographicCoordinates(
            lat,
            lon,
            unitsFormat.METRIC,
        );
        const forecastResponse = await OpenWeatherMapApi.getForecastByGeographicCoordinates(
            lat,
            lon,
            unitsFormat.METRIC,
        );

        const currentWeather = new Weather(weatherResponse.data);
        const forecastChart = new ForecastChart(forecastResponse.data);
        const forecastBlock = new Forecast(currentWeather, forecastChart);

        forecastBlock.render(mainContent);

        const citiesStorage = new CitiesStorage();
        citiesStorage.setCurrentGeolocationCity(currentWeather.city);
    } catch (err) {
        toastr.error("We can't get your geolocation");

        return false;
    }

    return true;
}

function renderAllForecasts(lat, lon) {
    ServerAPI.getFavoriteCities()
        .then((response) => {
            const { data: favoriteCities, message } = response.data;

            if (response.status !== statusCodes.OK) {
                toastr.error(message);
            }

            const citiesStorage = new CitiesStorage(favoriteCities);

            if (!renderCurrentGeolocationForecast(lat, lon)) {
                const cities = citiesStorage.getAllCities();
                const temperaturesChart = new TemperaturesChart(
                    cities,
                    unitsFormat.Metric,
                );

                temperaturesChart.render(mainContent).then(() => {
                    const deleteSection = new DeleteSection(
                        citiesStorage.getFavoriteCities(),
                    );

                    deleteSection.render(mainContent);
                });

                return;
            }

            if (citiesStorage.getLength() > 1) {
                const cities = citiesStorage.getAllCities();
                const temperaturesChart = new TemperaturesChart(
                    cities,
                    unitsFormat.Metric,
                );

                temperaturesChart.render(mainContent).then(() => {
                    const deleteSection = new DeleteSection(
                        citiesStorage.getFavoriteCities(),
                    );

                    deleteSection.render(mainContent);
                });
            }
        })
        .catch(err => console.log(err));
}

function getGeolocation(position) {
    const { coords } = position;
    renderAllForecasts(coords.latitude, coords.longitude);
}

function errGeolocation(err) {
    console.log(`ERROR: ${err.message}`);

    ServerAPI.getFavoriteCities()
        .then((response) => {
            const { data: favoriteCities, message } = response.data;

            if (response.status !== statusCodes.OK) {
                toastr.error(message);
            }

            const citiesStorage = new CitiesStorage(favoriteCities);

            if (citiesStorage.getLength()) {
                const cities = citiesStorage.getFavoriteCities();
                const temperaturesChart = new TemperaturesChart(
                    cities,
                    unitsFormat.Metric,
                );

                temperaturesChart.render(mainContent).then(() => {
                    const deleteSection = new DeleteSection(
                        citiesStorage.getFavoriteCities(),
                    );

                    deleteSection.render(mainContent);
                });
            }
        })
        .catch(error => console.log(error));
}

Geolocation(getGeolocation, errGeolocation);
