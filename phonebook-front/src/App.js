import React, { useState, useEffect } from 'react'
import AddNewName from './components/AddNewName'
import ListNumbers from "./components/ListNumbers"
import Filter from "./components/Filter"
import numberService from './services/numbers'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="noti">
      {message}
    </div>
  )
}
const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newFilter, setNewFilter ] = useState('')
  const [filteredPersons, setNewFilteredPersons] =useState(persons)
  const [NotiMessage, setNotiMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    numberService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setNewFilteredPersons(response.data)
      })
  },[])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleNewFilter = (event) => {
    const temp = persons.filter(a => (a.name.toLowerCase()).includes(event.target.value.toLowerCase())) 
    setNewFilteredPersons(temp)
    setNewFilter(event.target.value)
  }
  const addNewNameToServer = (person) => {
    numberService
    .create(person)
    .then(response => {
      console.log(response)
    })
  }
  const addNewName = (event) => {
    event.preventDefault()
    const personsnames = persons.map(person => person.name)
    if(!personsnames.includes(newName)){
      const personObject = {name: newName, number: newNumber}
      addNewNameToServer(personObject)
      numberService
          .getAll()
          .then(response => {
            console.log('promise fulfilled')
            setPersons(response.data)
            const temp = response.data.filter(a => (a.name.toLowerCase()).includes(newFilter.toLowerCase())) 
            setNewFilteredPersons(temp)
            setNotiMessage(
              `${newName} has been added`
            )
            setTimeout(() => {
              setNotiMessage(null)
            }, 5000)
          })
      
    }
    else{
      window.alert(`${newName} is already added to phonebook`)
      const result = window.confirm("Want to replace the old number with a new one?")
      if(result){
        const person = persons.find(a => a.name === newName)
        console.log(person)
        const personObject = {name: person.name, number: newNumber, id: person.id}
        numberService
          .update(person.id, personObject)
          .then((response) =>{
            console.log(response)
            numberService
            .getAll()
            .then(response2 => {
              console.log('promise fulfilled')
              setPersons(response2.data)
              const temp = response2.data.filter(a => (a.name.toLowerCase()).includes(newFilter.toLowerCase())) 
              setNewFilteredPersons(temp)
            })
            setNotiMessage(
              `Number of '${newName}' has been changed`
            )
            setTimeout(() => {
              setNotiMessage(null)
            }, 5000)
          })
      }
    }
    setNewName("")
    setNewNumber('')
    //console.log(personsnames)
  }

  const deleteName = (person) => {
    const result = window.confirm(`Are you sure, you want to delete ${person.name}`)
    if(result){
      numberService
        .deleteId(person.id)
        .then((response) => {
          console.log(response)
          numberService
          .getAll()
          .then(response2 => {
            console.log('promise fulfilled')
            setPersons(response2.data)
            const temp = response2.data.filter(a => (a.name.toLowerCase()).includes(newFilter.toLowerCase())) 
            setNewFilteredPersons(temp)  
          })
          setNotiMessage(
            `${person.name} has been deleted`
          )
          setTimeout(() => {
            setNotiMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Name '${person.name}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    } 
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <ErrorNotification message={errorMessage}/>
      <Notification message={NotiMessage} />
      <Filter newFilter = {newFilter} handleNewFilter = {handleNewFilter}/>
      <h2>Add a new</h2>
      <AddNewName newName = {newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber = {handleNewNumber} addNewName = {addNewName}/>
      <h2>Numbers</h2>
      <ListNumbers filteredPersons = {filteredPersons} deleteName = {deleteName}/>
    </div>
  )

}

export default App
