import storageConstants from "../../constants/cities-storage";

class CitiesStorage {
    constructor() {
        this.favoriteCities = localStorage.getItem(storageConstants.FAVORITE_CITIES_KEY) || [];
        this.length = this.favoriteCities.length || 0;
    }

    static setGeolocationCity(city) {
        try {
            localStorage.setItem(storageConstants.GEOLOCATION_CITY_KEY, city);
        } catch (e) {
            console.log(e.message);
        }
    }

    static getMaxLength() {
        return storageConstants.MAX_LENGTH;
    }

    getAllCities() {
        return [].concat(
            localStorage.getItem(storageConstants.GEOLOCATION_CITY_KEY),
            this.favoriteCities,
        );
    }

    addCity(city) {
        this.favoriteCities.push(city);
        this.length += 1;

        localStorage.setItem(storageConstants.FAVORITE_CITIES_KEY, this.favoriteCities);
    }
}

export default CitiesStorage;
