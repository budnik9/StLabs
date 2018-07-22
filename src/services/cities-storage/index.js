import { MAX_LENGTH, FAVORITE_CITIES_KEY, GEOLOCATION_CITY_KEY } from "../../constants/cities-storage";

class CitiesStorage {
    constructor() {
        this.favoriteCities = JSON.parse(localStorage.getItem(FAVORITE_CITIES_KEY)) || [];
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
        this.favoriteCities.push(city);

        localStorage.setItem(FAVORITE_CITIES_KEY, JSON.stringify(this.favoriteCities));

        return this.favoriteCities;
    }

    includes(city) {
        return this.getAllCities().includes(city);
    }

    removeCityFromFavorites(city) {
        const index = this.favoriteCities.indexOf(city);

        this.favoriteCities.splice(index, 1);

        localStorage.setItem(FAVORITE_CITIES_KEY, JSON.stringify(this.favoriteCities));
    }
}

export default CitiesStorage;
