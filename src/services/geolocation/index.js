function errLocation(err) {
    console.log(`ERROR: ${err.message}`);
}

export default (getLocation) => {
    navigator.geolocation.getCurrentPosition(getLocation, errLocation, { enableHighAccuracy: false, maximumAge: 3e5 });
};
