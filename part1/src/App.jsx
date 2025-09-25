import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const personObject = { name: newName }
    setPersons(persons.concat(personObject)) // agregamos al array
    setNewName('') // limpiamos el input
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value) // actualiza el estado con lo que escribe el usuario
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      {/* debug temporal */}
      <div>debug: {newName}</div>

      <h2>Numbers</h2>
      <ul>
        {persons.map((person, i) => (
          <li key={i}>{person.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
