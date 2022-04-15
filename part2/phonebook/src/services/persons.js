import axios from 'axios'
const baseUrl = "http://localhost:3001/persons"

const savePerson = (note) => {
    const request = axios.post(baseUrl, note)
    return request.then(response => response.data)
}

const getPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then((res) => res.data)
}

const updatePerson = (person) => {
    const request = axios.put(`${baseUrl}/${person.id}`, person)
    return request.then((res) => res.data)
}
export default { savePerson, getPersons, deletePerson, updatePerson }