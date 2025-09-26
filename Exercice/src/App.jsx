import { useState, useEffect } from 'react'
import './index.css'
import axios from 'axios'
// import PersonForm from './components/PersonForm'
// import personService from './services/persons.js'
// import Notification from './components/Notification.jsx'

/* 
========================================
 CÓDIGO ORIGINAL (Agenda Telefónica)
========================================

const Filter = ({ filter, onFilterChange }) => (
  <div>
    Filtro enseña con: <input value={filter} onChange={onFilterChange} />
  </div>
)

const Person = ({ person , handleDelete}) => (
  <li>
    {person.name} - {person.number}
    <button onClick={() => handleDelete(person)}>delete</button>
  </li>
)

const Persons = ({ personsToShow, handleDelete }) => (
  <ul>
    {personsToShow.map(person => (
      <Person 
        key={person.id} 
        person={person}
        handleDelete ={handleDelete} />
    ))}
  </ul>
)

export default function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null })

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleFilterChange = (e) => setFilter(e.target.value)

  const showNotification = (message, type) => {
    setNotification({ message,type })
    setTimeout(() => {
        setNotification({ message: null, type: null })
    }, 5000)
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        showNotification(`Error al cargar los contactos: ${error.message}`, 'error')
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = { name: newName, number: newNumber }
    const existing = persons.find(p => p.name === newName)

    if (existing) {
      if (window.confirm(`${newName} ya existe. ¿Quieres actualizar el número?`)) {
        personService
          .updated(existing.id, {...personObject, id: existing.id})
          .then(returnedPerson => {
            setPersons(persons.map(p =>
              p.id !== existing.id ? p : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
            showNotification(`Se actualizó el numero de ${newName}`, 'success')
          })
          .catch(error => {
            showNotification(`El contacto '${existing.name}' ya fue eliminado del servidor`, 'error')
            setPersons(persons.filter(p => p.id !== existing.id))
          })
      }
      return
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        showNotification(`Se añadió ${newName}`, 'success')
      })
      .catch(error => {
        showNotification(`Error al crear el contacto: ${error.message}`, 'error')
      })
  }

  const handleDelete = (person) => {
    if (window.confirm(`¿Eliminar ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          showNotification(`Se eliminó ${person.name}`, 'success')
        })
        .catch(error => {
          showNotification(`El contacto '${person.name}' ya fue eliminado del servidor`, 'error')
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  const personsToShow = persons.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Lista de teléfonos</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter filter={filter} onFilterChange={handleFilterChange} />

      <h3>Agregar uno nuevo</h3>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h3>Números</h3>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}
*/

/* 
========================================
 NUEVO CÓDIGO (Ejercicio 2.18 - Países)
========================================
*/

const CountryList = ({ countries, onShow }) => (
  <ul>
    {countries.map(c => (
      <li key={c.cca3}>
        {c.name.common}{' '}
        <button onClick={() => onShow(c)}>show</button>
      </li>
    ))}
  </ul>
)

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    if (!country.capital) return
    const capital = country.capital[0]
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`)
      .then(res => setWeather(res.data))
      .catch(err => console.error(err))
  }, [country, api_key])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Área: {country.area} km²</p>
      <h3>Idiomas:</h3>
      <ul>
        {Object.values(country.languages || {}).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={`Bandera de ${country.name.common}`}
        style={{ width: '150px', border: '1px solid #ccc' }}
      />

      {weather && (
        <div>
          <h3>Clima en {country.capital[0]}</h3>
          <p>Temperatura: {weather.main.temp} °C</p>
          <p>Viento: {weather.wind.speed} m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null) 

  useEffect(() => {
    if (query.trim() === '') {
      setCountries([])
      setSelectedCountry(null)
      return
    }

    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const filtered = response.data.filter(c =>
          c.name.common.toLowerCase().includes(query.toLowerCase())
        )
        setCountries(filtered)
        setSelectedCountry(null)
      })
  }, [query])

  return (
    <div>
      <h1>Buscar países</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Introduce el nombre de un país"
      />

      {countries.length > 10 && <p>Demasiados resultados, especifica mejor</p>}

      {countries.length <= 10 && countries.length > 1 && !selectedCountry && (
        <CountryList countries={countries} onShow={setSelectedCountry} />
      )}

      {countries.length === 1 && (
        <CountryDetail country={countries[0]} />
      )}

      {selectedCountry && <CountryDetail country={selectedCountry} />}
    </div>
  )
}
