const PersonForm = ({ onSubmit, nameValue, onNameChange, numberValue, onNumberChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      nombre: <input value={nameValue} onChange={onNameChange} />
    </div>
    <div>
      número: <input value={numberValue} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">agregar</button>
    </div>
  </form>
)

export default PersonForm