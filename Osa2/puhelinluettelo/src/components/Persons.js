import React from 'react'
import Person from '../components/Person'

const Persons = (props) => {
  const filteredList = props.persons
    .filter(e => e.name.toLowerCase().includes(props.filter.toLowerCase()))
  return (
    <table>
      <tbody>
        {filteredList
          .map(e =>
            <Person key={e.id}
              person={e}
              handleDelete={props.handleDelete} />
          )}
      </tbody>
    </table>

  )
}


export default Persons