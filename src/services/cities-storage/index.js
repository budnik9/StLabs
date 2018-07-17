import storageConstants from "../../constants/cities-storage";

class CitiesStorage {
    constructor() {
        this.favoriteCities = JSON.parse(localStorage.getItem(storageConstants.FAVORITE_CITIES_KEY)) || [];
    }

    static setCurrentGeolocationCity(city) {
        try {
            localStorage.setItem(storageConstants.GEOLOCATION_CITY_KEY, city);
        } catch (e) {
            console.log(e.message);
        }
    }

    static getMaxLength() {
        return storageConstants.MAX_LENGTH;
    }

    getLength() {
        return this.favoriteCities.length + 1;
    }

    getAllCities() {
        return [].concat(
            localStorage.getItem(storageConstants.GEOLOCATION_CITY_KEY),
            this.favoriteCities,
        );
    }

    getFavoriteCities() {
        return this.favoriteCities;
    }

    addCity(city) {
        this.favoriteCities.push(city);

        localStorage.setItem(storageConstants.FAVORITE_CITIES_KEY, JSON.stringify(this.favoriteCities));
    }
}

export default CitiesStorage;
