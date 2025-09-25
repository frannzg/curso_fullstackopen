import { useState } from 'react'

// Componente para el filtro de búsqueda
const Filter = ({ filter, onFilterChange }) => {
  return (
    <div>
      filter shown with: <input value={filter} onChange={onFilterChange} />
    </div>
  )
}

// Formulario para añadir una nueva persona
const PersonForm = ({ onSubmit, nameValue, onNameChange, numberValue, onNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameValue} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={numberValue} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

// Componente para mostrar una única persona
const Person = ({ person }) => (
  <li>
    {person.name} — {person.number}
  </li>
)

// Componente que renderiza la lista de personas visibles
const Persons = ({ personsToShow }) => (
  <ul>
    {personsToShow.map(person => (
      <Person key={person.id} person={person} />
    ))}
  </ul>
)

// Componente raíz de la aplicación (estado y handlers aquí)
export default function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleFilterChange = (e) => setFilter(e.target.value)

  const addPerson = (event) => {
    event.preventDefault()

    // Evitar duplicados por nombre
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: Date.now()
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  // Filtrado case-insensitive
  const personsToShow = persons.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} onFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}
