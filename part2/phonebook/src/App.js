import { useState } from 'react'
import './App.css';


const Filter = (props) =>
  <div>
    search: name: <input value={props.searchText} onChange={props.searchHandler} />
  </div>

const PhoneForm = (props) =>
  <form onSubmit={props.formSubmitHandler}>
    <div>
      name: <input value={props.name} onChange={props.nameHandler} />
    </div>
    <div>
      phone: <input value={props.phone} onChange={props.phoneHandler} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

const Persons = (props) => (
  props.persons
    .filter(person => person.name.toLowerCase().startsWith(props.searchFilter))
    .map(person => <p key={person.name}>{person.name}: {person.phone}</p>)
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const personsInclude = (name) => (
    !persons.reduce((prev, curr) => {
      if (curr.name === name) {
        return prev && false
      } else {
        return prev && true
      }
    }, true)
  )

  const addPhone = (event) => {
    event.preventDefault()
    if (personsInclude(newName)) {
      alert(`${newName} already in the list!`)
    } else {
      setPersons(persons.concat({
        name: newName,
        phone: newPhone
      }))
    }
  }

  const handleNameChange = (event) =>
    setNewName(event.target.value);
  const handlePhoneChange = (event) =>
    setNewPhone(event.target.value);

  const handleSearch = (event) => {
    setNewSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchText={newSearch} searchHandler={handleSearch} />

      <PhoneForm
        formSubmitHandler={addPhone}
        name={newName} nameHandler={handleNameChange}
        phone={newPhone} phoneHandler={handlePhoneChange} />


      <h2>Numbers</h2>

      <Persons persons={persons} searchFilter={newSearch} />
      
    </div>
  )
}
export default App;
