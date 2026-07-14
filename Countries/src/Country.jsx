import { useState, useEffect } from "react"
import countryService from "./services/country"
import weatherService from "./services/weather"

const Country = ({ country_name }) => {
    const [country, setCountry] = useState({})
    const [weather, setWeather] = useState({})

    useEffect(() => {
        countryService.getCountryByName(country_name).then((result) => {
            const capital = result.capital

            setCountry(result)

            weatherService.getWeather(`${capital}`).then((result) => {
                setWeather(result)
            })
        })
    }, [])

    return (<>
        <h1>{country_name}</h1>
        {Object.keys(country).length > 0 &&
            <div>
                <p>Capital {country.capital}</p>
                <p>Area {country.area}</p>
                <p></p>
                <h2>Languages</h2>
                <ul>
                    {Object.values(country.languages).map((t) => <li key={t}>{t}</li>)}
                </ul>
                <img src={country.coatOfArms.png} />
                {Object.keys(weather).length &&
                    <div>
                        <h2>Weather in {country.capital}</h2>
                        <p>Temperature {weather.main.temp - 273.15} Celsius</p>
                        ,<img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="" />
                        <p>Wind {weather.wind.speed} m/s</p>
                    </div>
                }
            </div>
        }
    </>)
}

export default Country