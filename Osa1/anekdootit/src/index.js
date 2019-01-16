import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const MostVotes = ({ votes, anecdotes }) => {
  const max = Math.max(...votes)
  const indexOfMax = votes.indexOf(max)
  const anecdote = anecdotes[indexOfMax]

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdote}</p>
      <p>has {max} votes</p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))

  const handleClickNext = () => {
    const number = Math.floor(Math.random() * anecdotes.length)
    setSelected(number)
  }

  const handleClickVote = () => {
    const votesCopy = [...votes]
    votesCopy[selected]++
    setVotes(votesCopy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <p>
        <button onClick={handleClickVote}>vote</button>
        <button onClick={handleClickNext}>next anecdote</button>
      </p>
      <p>has {votes[selected]} votes</p>

      <MostVotes votes = {votes} anecdotes = {props.anecdotes}/>


    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)