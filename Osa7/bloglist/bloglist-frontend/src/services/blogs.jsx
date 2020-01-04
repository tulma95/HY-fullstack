import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (newBlog) => {
  const response = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog)
  return response.data
}

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${blog.id}`, config)
}

const addComment = async (id, comment) => {
  await axios.post(`${baseUrl}/${id}/comments`, { comment })
}

export default { getAll, create, setToken, update, remove, addComment }