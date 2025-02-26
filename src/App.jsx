import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonFolder'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState('some error happaned...')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('response fulfilled')
        setPersons(response)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const found = persons.find((person) => person.name === newName)

    if (!found) {
      const person = {
        name: newName,
        number: newNumber
      }
      personService
        .create(person)
        .then(response => {
          setPersons(persons.concat(response))
        })
      setErrorMessage(`Added ${newName}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    else if (found.number === newNumber) {
      setErrorMessage(`${newName} is already added to phonebook`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } else if (found.number !== newNumber) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        found.number = newNumber
        personService
          .update(found)
          .then(response => setPersons(persons.map(p => {
            if (p.id === found.id) return found
            else return p
          })))
          .catch(error => {
            setErrorMessage(`${newName} is already removed from the server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    }
  }


  const byFilterField = p => p.name.toLowerCase().includes(newSearch.toLowerCase())

  const personsToShow = newSearch ? persons.filter(byFilterField) : persons

  const handleSearchChange = (event) => {

    setNewSearch(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const del = (props) => {
    console.log(props)
    if (window.confirm(`Delete ${props.name}?`)) {
      personService
        .remove(props.id)
        .then(response => setPersons(persons.filter(p => p.id !== props.id)))
        .catch(error => {
          setErrorMessage(`${newName} is already removed from the server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} del={del} />
    </div>
  )
}

export default App