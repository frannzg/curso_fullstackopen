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
  const [persons,setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleFilterChange = (e) => setFilter(e.target.value)

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length > 0 ? Math.max(...persons.map(p => p.id)) + 1 : 1
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = persons.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Lista de telefonos</h2>
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
      <Persons personsToShow={personsToShow} />
    </div>
  )
}