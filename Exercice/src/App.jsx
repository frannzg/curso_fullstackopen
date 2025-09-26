import { useState, useEffect } from 'react'
//import axios from 'axios'
import PersonForm from './components/PersonForm'
import personService from './services/persons.js'

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

  // Cargar datos iniciales
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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
        personService
        .updated(existing.id, {...personObject, id: existing.id})
        .then(returnedPerson => {
          setPersons(persons.map(p =>
            p.id !== existing.id ? p : returnedPerson
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

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        alert(`Error al crear el contacto: ${error.message}`)
      })
    }

    const handleDelete = (person) => {
      if (window.confirm(`¿Eliminar ${person.name}?`)) {
        personService
          .remove(person.id)
          .then(() => {
            setPersons(persons.filter(p => p.id !== person.id))
          })
          .catch(error => {
            alert(`Error al eliminar el contacto: ${error.message}`)
          })
      }
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
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}