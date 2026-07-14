import { useState } from "react"

import Country from "./Country"

const CountryLi = ({ country_name }) => {
    const [show, setShow] = useState(false)

    const buttonClick = () => {
        setShow(!show)
    }
    return (
        <div>
            <li>{country_name} <button onClick={buttonClick}>{show ? 'Hide' : 'Show'}</button></li>
            {show && <Country country_name={country_name} />}
        </div>
    )
}

export default CountryLi