import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.updateLikes(anecdote)
    dispatch({
      type: 'VOTE',
      data: newAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: anecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}


const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const newAnecdote = action.data
      return state.map(e => e.id === newAnecdote.id ? newAnecdote : e)
    case 'CREATE':
      //const newAnecdote = asObject(action.data.content)
      return state.concat(action.data)

    case 'INIT_ANECDOTES':
      return action.data

    default:
      return state
  }

}

export default reducer