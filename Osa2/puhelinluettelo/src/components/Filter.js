import React from 'react'


const Filter = (props) => {
  return (
    <div>
      rajaa näytettäviä <input value={props.filter} onChange={props.onChange} />
    </div>
  )
}

export default Filter