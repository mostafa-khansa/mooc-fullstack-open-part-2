import Country from "./Country"
import CountryLi from "./CountryLi"

const CountryList = ({ countries }) => {
    if (countries.length === 0) {
        return null
    } else if (countries.length > 10) {
        return (
            <p>Too many matches, please specify another filter</p>
        )
    } else if (countries.length > 1) {
        return (<ul>
            {countries.map((country) => <CountryLi key={country.name.common} country_name={country.name.common} />)}
        </ul>)
    } else {
        return <Country country_name={countries[0].name.common} />
    }
}

export default CountryList