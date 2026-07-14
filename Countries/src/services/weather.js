import axios from "axios";

const api_key = import.meta.env.VITE_OPEN_WEATHER_API

const getWeather = (city) => {
    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${api_key}`
    const request = axios.get(api_url)
    return request.then((response) => response.data)
}

export default { getWeather }