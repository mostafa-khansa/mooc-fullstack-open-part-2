import { useState, useEffect } from 'react'

import countryService from './services/country'
import Filter from './Filter'
import CountryList from './CountryList'

function App() {

  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  const handleSearch = (e) => {
    const value = e.target.value
    setSearch(value)

    if(value.length >0){
      const data = countries.filter((country) => country.name.common.toLowerCase().includes(value))
      setFilteredCountries(data)
    }else{
      setFilteredCountries([])
    }

  }

  useEffect(() => {
    countryService.getAllCountries().then((result) => {
      setCountries(result)

    }).catch((err) => {
      console.error(err)
      console.log('error happened check logs and retry again')
    });
  }, [])

  return (
    <>
      <Filter value={search} onChangeHandler={handleSearch} />
      <CountryList countries={filteredCountries} />
    </>
  )
}

export default App
