import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const addAnecdote = async event => {
    event.preventDefault()
    event.persist()
    const content = event.target.anecdote.value
    props.createAnecdote(content)
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = {
  createAnecdote
}

const connectedForm = connect(mapStateToProps, mapDispatchToProps
)(AnecdoteForm)


export default connectedForm