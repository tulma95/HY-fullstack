import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux'

const AnecdoteList = (props) => {

  const handleVoteClick = (id) => () => {
    console.log('vote', id)

    const anecdote = props.visibleAnecdotes.find(e => e.id === id)

    props.vote(anecdote)
    props.setNotification(`you voted '${anecdote.content}'`, 5)
  }

  return (
    <div>
      {props.visibleAnecdotes.sort((e1, e2) => e2.votes - e1.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={handleVoteClick(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  return anecdotes.filter(e => e.content.includes(filter))
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  vote, setNotification, removeNotification
}

const connectedAnecdotes = connect(
  mapStateToProps, mapDispatchToProps
)(AnecdoteList)

export default connectedAnecdotes