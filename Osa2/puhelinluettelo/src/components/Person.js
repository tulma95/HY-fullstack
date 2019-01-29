import React from 'react'

const Person = ({ person, handleDelete }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td><button onClick={() => handleDelete(person.id)}>delete</button></td>
    </tr>
  )
}

export default Person