import axios from "axios";
import conf from "../../config/config.js";
import unitsFormat from "../../constants/unitsFormat.js";

const confServer = conf.server;

const axiosAPI = {
    getForecastByCityName(cityName = "Minsk", units) {
        let unitsForm = units === unitsFormat.STANDARD ? "" : `&units=${units}`;
        return axios.get(`${confServer.url}forecast?q=${cityName}&APPID=${confServer.key}${unitsForm}`);
    },
    getForecastByGeographicCoordinates(lat, lon, units) {
        let unitsForm = units === unitsFormat.STANDARD ? "" : `&units=${units}`;
        return axios.get(`${confServer.url}forecast?lat=${lat}&lon=${lon}&APPID=${confServer.key}${unitsForm}`);
    },
    getWeatherByCityName(cityName = "Minsk", units) {
        let unitsForm = units === unitsFormat.STANDARD ? "" : `&units=${units}`;
        return axios.get(`${confServer.url}weather?q=${cityName}&APPID=${confServer.key}${unitsForm}`);
    },
    getWeatherByGeographicCoordinates(lat, lon, units) {
        let unitsForm = units === unitsFormat.STANDARD ? "" : `&units=${units}`;
        return axios.get(`${confServer.url}weather?lat=${lat}&lon=${lon}&APPID=${confServer.key}${unitsForm}`);
    }
};

export default axiosAPI;