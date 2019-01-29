import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredList, setFilteredList] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilteredList(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        const updatedPerson = persons.find(e => e.name === newName)
        updatedPerson.number = newNumber
        personService.changeNumber(updatedPerson)
          .then(returnedPerson => {
            setPersons(persons
              .map(person => person.id !== updatedPerson.id ? person : returnedPerson))
            setNotificationMessage(`${returnedPerson.name}n numero vaihdettu`)
          }).catch(error => {
            setErrorMessage('Numeron vaihto epäonnistui')
          })
      }
    } else {
      personService.create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setFilteredList(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`Lisättiin ${newPerson.name}`)
        }).catch(error => {
          setErrorMessage('Henkilön luonti epäonnistui')
        })
    }
    setTimeout(() => {
      setNotificationMessage(null)
      setErrorMessage(null)
    }, 5000);
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const value = event.target.value
    setFilter(value)
    const filteredList = persons
      .filter(person => person.name.toLowerCase().includes(value.toLowerCase()))
    setFilteredList(filteredList)
  }

  const handleDelete = (id) => {
    personService.deletePerson(id)
      .then(() => {
        const newList = persons.filter(person => person.id !== id)
        setPersons(newList)
        setFilteredList(newList)
        setNotificationMessage(`Henkilö poistettu onnistuneesti`)
      })
      .catch(error => {
        setErrorMessage('Poisto epäonnistui')
      })
    setTimeout(() => {
      setNotificationMessage(null)
      setErrorMessage(null)
    }, 5000);
  }

  return (
    <div>

      <Notification message={notificationMessage} />
      <ErrorNotification message={errorMessage} />

      <h2>Puhelinluettelo</h2>
      <Filter filter={filter} onChange={handleFilterChange} />
      <h3>Lisää uusi</h3>
      <PersonForm addPerson={addPerson}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numerot</h3>
      <Persons filter={filter}
        filteredList={filteredList}
        persons={persons}
        handleDelete={handleDelete} />
    </div>
  )

}
ReactDOM.render(<App />, document.getElementById('root'));
