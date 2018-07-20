const getGeolocation = (getLocation, errLocation) => {
    navigator.geolocation.getCurrentPosition(getLocation, errLocation, {
        enableHighAccuracy: false,
        maximumAge: 3e5,
    });
};

export default getGeolocation;
