import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredList, setFilteredList] = useState(persons)

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(res => {
      setPersons(res.data)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} on jo luettelossa`)
    } else {
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    const filteredList = persons
      .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    setFilteredList(filteredList)

  }



  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter filter={filter} onChange={handleFilterChange} />
      <h3>Lisää uusi</h3>
      <PersonForm addPerson={addPerson}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numerot</h3>
      <Persons filter={filter} filteredList={filteredList} persons={persons} />
    </div>
  )

}
ReactDOM.render(<App />, document.getElementById('root'));
