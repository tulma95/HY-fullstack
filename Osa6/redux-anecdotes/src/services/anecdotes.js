import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async data => {
  const object = {
    content: data,
    votes: 0
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateLikes = async anecdote => {
  const newAnecdote = {...anecdote, votes: anecdote.votes + 1 }
  const res = await axios.put(`${baseUrl}/${anecdote.id}`, newAnecdote)
  return res.data
}

export default {
  getAll,
  createNew,
  updateLikes
}