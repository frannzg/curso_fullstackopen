import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'

const Filter = ({ filter, onFilterChange }) => (
  <div>
    Filtro enseña con: <input value={filter} onChange={onFilterChange} />
  </div>
)

const Person = ({ person }) => (
  <li>
    {person.name} - {person.number}
  </li>
)

const Persons = ({ personsToShow }) => (
  <ul>
    {personsToShow.map(person => (
      <Person key={person.id} person={person} />
    ))}
  </ul>
)

export default function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // Cargar datos iniciales
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
      .catch(error => {
        alert(`Error al cargar los contactos: ${error.message}`)
      })
  }, [])

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleFilterChange = (e) => setFilter(e.target.value)

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    const existing = persons.find(p => p.name === newName)

    if (existing) {
      if (window.confirm(`${newName} ya existe. ¿Quieres actualizar el número?`)) {
        axios
          .put(`http://localhost:3001/persons/${existing.id}`, personObject)
          .then(response => {
            setPersons(persons.map(p => 
              p.id !== existing.id ? p : response.data
            ))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            alert(`Error al actualizar el contacto: ${error.message}`)
          })
      }
      return
    }

    axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        alert(`Error al crear el contacto: ${error.message}`)
      })
  }

  const personsToShow = persons.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Lista de teléfonos</h2>
      
      <Filter 
        filter={filter} 
        onFilterChange={handleFilterChange} 
      />

      <h3>Agregar uno nuevo</h3>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h3>Números</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}