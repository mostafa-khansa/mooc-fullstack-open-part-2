import { useEffect, useState } from 'react'
import Filter from './Filter'
import Persons from './Persons'
import PersonForm from './PersonForm'

import phonebookService from './services/phonebook.js'
import phonebook from './services/phonebook.js'

import Notification from './Notification.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const [search, setSearch] = useState('')

  const [msg, setMsg] = useState(null)

  const [msgType, setMsgType] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    const isFound = persons.filter((p) => p.name === newName)

    if (isFound.length) {
      if (confirm((`${newName} is already added to phonebook, replace the old number with the new one ?`))) {
        const updatedPerson = isFound[0]

        updatedPerson.phone = newPhone

        phonebook.update(updatedPerson).then((result) => {
          setPersons(persons.map((p) => p.id !== result.id ? p : result))
          setNewPhone('')
          setNewName('')
        }).catch((err) => {

          setMsg(`Information of ${updatedPerson.name} has already been deleted from server`)
          setMsgType('danger')

          setTimeout(() => {
            setMsg(null)
            setMsgType(null)
          }, 3000)
        })

      }
      return false;
    }

    const newData = { name: newName, phone: newPhone };

    phonebookService.create(newData).then((data) => {
      setPersons(persons.concat(data))

      setMsg(`Added ${newName}`)
      setMsgType('success')

      setNewPhone('')
      setNewName('')


      setTimeout(() => {
        setMsg(null)
        setMsgType(null)
      }, 3000)

    })


  }

  const handleNameChange = (e) => {
    const value = e.target.value

    setNewName(value)
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value

    setNewPhone(value)
  }

  const handleSearch = (e) => {
    const value = e.target.value

    setSearch(value)
  }

  (useEffect(() => {
    phonebookService.getAll().then((data) => {
      setPersons(data);
    })
  }, []))

  const deletePhone = (id) => {
    const personToDelete = persons.find((p) => p.id === id)

    if (confirm(`delete ${personToDelete.name} ?`)) {
      phonebookService.remove(id).then((result) => {

        const newPersons = persons.filter((p) => p.id !== id)
        setPersons(newPersons)

      }).catch((err) => {
        setMsg(`could not delete ${personToDelete.name}`)
        setMsgType('danger')

        setTimeout(() => {
          setMsg(null)
          setMsgType(null)
        }, 3000)
      })
    }
  }

  const personsResult = !search ? persons : persons.filter((p) => p.name.toLowerCase().includes(search))

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={msg} type={msgType} />

      <Filter search={search} handleSearch={handleSearch} />

      <h3>add a new</h3>

      <PersonForm handleSubmit={handleSubmit} newName={newName} newPhone={newPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} />

      <h2>Numbers</h2>

      <Persons deleteHandler={deletePhone} people={personsResult} />
    </div>
  )
}

export default App