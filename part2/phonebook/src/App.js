import { useState, useEffect } from 'react'
import personsService from './services/persons'
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
    .map(person => <p key={person.name}>
      {person.name}: {person.number}
      <DeleteButton clickHandler={() => props.handleDelete(person.id)} />
    </p>)
)


const DeleteButton = (props) => (
  <button onClick={props.clickHandler}>Delete</button>
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
      const id = persons.find(person => person.name === newName).id
      updateHandler({
        id: id,
        name: newName,
        number: newPhone
      })
    } else {
      personsService.savePerson(
        {
          name: newName,
          number: newPhone
        })
        .then(data => setPersons(persons.concat(data)))
    }
  }


  const handleNameChange = (event) =>
    setNewName(event.target.value);
  const handlePhoneChange = (event) =>
    setNewPhone(event.target.value);
  const handleSearch = (event) => {
    setNewSearch(event.target.value);
  };

  const deleteHandler = (id) => {
    if (window.confirm("Do you really want to delete?"))
      return personsService
        .deletePerson(id)
        .then(() => setPersons(persons.filter(person => person.id !== id)));
  }

  const updateHandler = (p) => {
    if (window.confirm("Name exists, would you like to edit the number?"))
    return personsService
      .updatePerson(p)
      .then((data) => setPersons(persons.map(person => person.id === p.id ? data : person)));
  }


  useEffect(() => {
    personsService.getPersons().then(data => setPersons(data))
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

      <Persons persons={persons}
        searchFilter={newSearch}
        handleDelete={deleteHandler}
        handleUpdate={updateHandler} />

    </div>
  )
}
export default App;
