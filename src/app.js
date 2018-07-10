import "./index.less";

import axiosAPI from "./services/axiosAPI/axiosAPI";
import Forecast from "./models/forecast/forecast"; 

async function getLocation(pos) { 
    let {coords} = pos; 
    console.log(`${coords.latitude} ${coords.longitude}`); 

    try {
        let response = await axiosAPI.getForecastByGeographicCoordinates(coords.latitude, coords.longitude, "metric");
        console.log(response);
        
        let forecast = new Forecast(response.data);
        forecast.render();

    } catch(err) {
        console.log(`ERROR: ${err.message}`);
    }   
} 

function errLocation(err) { 
    console.log(`ERROR: ${err.message}`); 
} 

navigator.geolocation.getCurrentPosition(getLocation, errLocation, { enableHighAccuracy: false, maximumAge: 3e5 });