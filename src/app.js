import "./index.less";

import axiosAPI from "./services/axiosAPI/axiosAPI";
import Weather from "./models/weather/weather";
import ForecastChart from "./models/forecastChart/forecastChart"; 

async function getLocation(pos) { 
    let {coords} = pos; 
    console.log(`${coords.latitude} ${coords.longitude}`); 

    try {
        let response = await axiosAPI.getWeatherByGeographicCoordinates(coords.latitude, coords.longitude, "metric");
        console.log(response);

        let forecastBlock = document.createElement("section");
        forecastBlock.className = "forecast main-content__forecast";
        
        let currentWeather = new Weather(response.data);
        currentWeather.render(forecastBlock);

        let forecastChart = new ForecastChart();
        forecastChart.render(forecastBlock);

        document.querySelector(".main-content").appendChild(forecastBlock);
    } catch(err) {
        console.log(`ERROR: ${err.message}`);
    }   
} 

function errLocation(err) { 
    console.log(`ERROR: ${err.message}`); 
} 

navigator.geolocation.getCurrentPosition(getLocation, errLocation, { enableHighAccuracy: false, maximumAge: 3e5 });