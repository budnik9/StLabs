function errLocation(err) {
    console.log(`ERROR: ${err.message}`);
}

const getGeolocation = (getLocation) => {
    navigator.geolocation.getCurrentPosition(getLocation, errLocation, {
        enableHighAccuracy: false,
        maximumAge: 3e5,
    });
};

export default getGeolocation;
