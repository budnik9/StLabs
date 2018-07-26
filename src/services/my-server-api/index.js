import axios from "axios";
import configServer from "../../config/config-server";

const ServerAPI = {
    getFavoriteCities() {
        return axios.get(`${configServer.URL}/favorites/`);
    },

    addCityToFavorites(city) {
        return axios.post(`${configServer.URL}/favorites/`, { city });
    },

    removeCityFromFavorites(city) {
        return axios.delete(`${configServer.URL}/favorites/`, { data: { city } });
    },
};

export default ServerAPI;
