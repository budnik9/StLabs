import storageConstants from "../../constants/cities-storage";

class CitiesStorage {
    constructor() {
        this.favoriteCities = JSON.parse(localStorage.getItem(storageConstants.FAVORITE_CITIES_KEY)) || [];
        this.currentGeolocationCity = localStorage.getItem(storageConstants.GEOLOCATION_CITY_KEY);
    }

    setCurrentGeolocationCity(city) {
        try {
            localStorage.setItem(storageConstants.GEOLOCATION_CITY_KEY, city);
            this.currentGeolocationCity = city;
        } catch (e) {
            console.log(e.message);
        }
    }

    getCurrentGeolocationCity() {
        return this.currentGeolocationCity || "";
    }

    static getMaxLength() {
        return storageConstants.MAX_LENGTH;
    }

    getLength() {
        return this.currentGeolocationCity ? this.favoriteCities.length + 1 : this.favoriteCities.length;
    }

    getAllCities() {
        if (this.currentGeolocationCity) {
            return [].concat(localStorage.getItem(storageConstants.GEOLOCATION_CITY_KEY), this.favoriteCities);
        }

        return this.getFavoriteCities();
    }

    getFavoriteCities() {
        return this.favoriteCities;
    }

    addCity(city) {
        this.favoriteCities.push(city);

        localStorage.setItem(storageConstants.FAVORITE_CITIES_KEY, JSON.stringify(this.favoriteCities));

        return this.favoriteCities;
    }

    includes(city) {
        return this.getAllCities().includes(city);
    }

    removeCityFromFavorites(city) {
        const index = this.favoriteCities.indexOf(city);

        this.favoriteCities.splice(index, 1);

        localStorage.setItem(storageConstants.FAVORITE_CITIES_KEY, JSON.stringify(this.favoriteCities));
    }
}

export default CitiesStorage;
