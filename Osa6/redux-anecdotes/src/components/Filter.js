import React from 'react'
import { changeFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {

  const handleChange = (event) => {
    props.changeFilter(event.target.value)
  }

  return (
    <div>
      <input type="text"
        value={props.filter}
        onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  changeFilter
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    filter: state.filter
  }
}

const connectedFilter = connect(
  mapStateToProps, mapDispatchToProps
)(Filter)

export default connectedFilter