import React from 'react'

const Persons = (props) => {
  return (
    <ul>
      {props.filter ? props.filteredList
        .map((e) => <li key={e.name}>{e.name} {e.number}</li>) :
        props.persons.map((e) => <li key={e.name}>{e.name} {e.number}</li>)}
    </ul>
  )
}


export default Persons