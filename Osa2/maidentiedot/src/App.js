import React, { useState, useEffect } from 'react';
import axios from 'axios'


const ShowCountries = (props) => {
  const listLength = props.list.length
  if (listLength === 1) {
    return (
      <Country country={props.list[0]} forecast={props.forecast} />
    )
  }
  return (
    listLength > 10
      ? <div>too many countries</div>
      : props.list.map(country =>
        <li key={country.name}>
          {country.name} <button onClick={() => props.handleClick(country.name)}>
            show
          </button>
        </li>)
  )
}

const Country = (props) => {
  const country = props.country
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      {country.languages.map(language => <li key={language}>{language}</li>)}
      <img src={country.flag} alt="flag" width="300" height="200" />

      <h2>Weather in {country.capital}</h2>
      <p>temperature: {props.forecast.temp}</p>
      <img src={props.forecast.icon} alt="weather" />
      <p>Wind: {props.forecast.wind}</p>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [forecast, setForecast] = useState({})

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        const newCountries = res.data.map(country => {
          return (
            {
              name: country.name,
              capital: country.capital,
              population: country.population,
              languages: country.languages.map(e => e.name),
              flag: country.flag
            }
          )
        })
        setCountries(newCountries)
        setFilteredCountries(newCountries)
      })
  }, [])

  const handleChange = (event) => {
    const value = event.target.value
    setFilter(value)
    const filteredList = countries
      .filter(country => country.name.toLowerCase().includes(value.toLowerCase()))
    setFilteredCountries(filteredList)
    getWeather(filteredList)
  }

  const getWeather = list => {
    if (list.length === 1 && (list[0].capital !== forecast.capital)) {
      axios.get(`http://api.apixu.com/v1/current.json?key=83d3c6aa4a4b46d4806165104192301&q=${list[0].capital}`)
        .then(res => {
          console.log('tää');
          const data = res.data.current
          const newForecast = {
            capital: res.data.location.name,
            temp: data.temp_c,
            icon: data.condition.icon,
            wind: data.wind_kph
          }
          setForecast(newForecast)
        })
    }
  }

  const handleClick = (name) => {
    setFilter(name)
    const filteredList = countries
      .filter(country => country.name.toLowerCase().includes(name.toLowerCase()))
    setFilteredCountries(filteredList)
    getWeather(filteredList)
  }

  return (
    <div>
      find countries<input value={filter} onChange={handleChange} />
      <ShowCountries list={filteredCountries} forecast={forecast} handleClick={handleClick} />
    </div>
  )
}

export default App;
