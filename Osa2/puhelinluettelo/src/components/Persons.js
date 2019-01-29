import React from 'react'
import Person from '../components/Person'

const Persons = (props) => {
  return (
    <table>
      <tbody>
        {props.filteredList
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