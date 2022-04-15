import { useState, useEffect } from 'react'
import axios from 'axios'
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
    .map(person => <p key={person.name}>{person.name}: {person.number}</p>)
)

const App = () => {
  const [persons, setPersons] = useState([])

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
      axios
        .post("http://localhost:3001/persons",
          {
            name: newName,
            number: newPhone
          })
        .then(response => setPersons(persons.concat(response.data)))
    }
  }

  const handleNameChange = (event) =>
    setNewName(event.target.value);
  const handlePhoneChange = (event) =>
    setNewPhone(event.target.value);
  const handleSearch = (event) => {
    setNewSearch(event.target.value);
  };


  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
      })
  }, [])


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
