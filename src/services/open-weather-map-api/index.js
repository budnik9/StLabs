import axios from "axios";
import configServer from "../../config/config-server";
import unitsFormat from "../../constants/units-format";
import DefaultOptions from "../../constants/default-options";

const openWeatherMapAPI = {
    getForecastByCityName(cityName = DefaultOptions.CITY_NAME, units) {
        const unitsForm = units === unitsFormat.STANDARD ? "" : `&units=${units}`;

        return axios.get(`${configServer.URL}forecast?q=${cityName}&APPID=${configServer.KEY}${unitsForm}`);
    },
    getForecastByGeographicCoordinates(lat, lon, units) {
        const unitsForm = units === unitsFormat.STANDARD ? "" : `&units=${units}`;

        return axios.get(`${configServer.URL}forecast?lat=${lat}&lon=${lon}&APPID=${configServer.KEY}${unitsForm}`);
    },
    getWeatherByCityName(cityName = DefaultOptions.CITY_NAME, units) {
        const unitsForm = units === unitsFormat.STANDARD ? "" : `&units=${units}`;

        return axios.get(`${configServer.URL}weather?q=${cityName}&APPID=${configServer.KEY}${unitsForm}`);
    },
    getWeatherByGeographicCoordinates(lat, lon, units) {
        const unitsForm = units === unitsFormat.STANDARD ? "" : `&units=${units}`;
        
        return axios.get(`${configServer.URL}weather?lat=${lat}&lon=${lon}&APPID=${configServer.KEY}${unitsForm}`);
    },
};

export default openWeatherMapAPI;
