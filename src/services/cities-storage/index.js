import { MAX_LENGTH, GEOLOCATION_CITY_KEY } from "../../constants/cities-storage";
import ServerAPI from "../my-server-api";

class CitiesStorage {
    constructor() {
        this.favoriteCities = ServerAPI.getFavoriteCities().then(cities => cities);
        this.currentGeolocationCity = localStorage.getItem(GEOLOCATION_CITY_KEY);
    }

    setCurrentGeolocationCity(city) {
        try {
            localStorage.setItem(GEOLOCATION_CITY_KEY, city);
            this.currentGeolocationCity = city;
        } catch (e) {
            console.log(e.message);
        }
    }

    getCurrentGeolocationCity() {
        return this.currentGeolocationCity || "";
    }

    hasCurrentGeolocationCity() {
        return !!this.currentGeolocationCity;
    }

    static getMaxLength() {
        return MAX_LENGTH;
    }

    getLength() {
        return this.hasCurrentGeolocationCity() ? this.favoriteCities.length + 1 : this.favoriteCities.length;
    }

    getAllCities() {
        if (this.hasCurrentGeolocationCity()) {
            return [].concat(localStorage.getItem(GEOLOCATION_CITY_KEY), this.favoriteCities);
        }

        return this.getFavoriteCities();
    }

    getFavoriteCities() {
        return this.favoriteCities;
    }

    addCity(city) {

        return ServerAPI.addCityToFavorites(city)
            .then(() => {
                this.favoriteCities.push(city);
                
                return this.favoriteCities;
            })
            .catch((err) => {
                console.log(err);

                return null;
            });
    }

    includes(city) {
        return this.getAllCities().includes(city);
    }

    removeCityFromFavorites(city) {

        return ServerAPI.removeCityFromFavorites(city)
            .then(() => {
                const index = this.favoriteCities.indexOf(city);
                this.favoriteCities.splice(index, 1);

                return true;
            })
            .catch((err) => {
                console.log(err);
                return false;
            });
    }
}

export default CitiesStorage;
