import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(res => res.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(res => res.data)
}

const deletePerson = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

const changeNumber = (newObject) => {
  const request = axios.put(`${baseUrl}/${newObject.id}`, newObject)
  return request.then(res => res.data)
}

export default { getAll, create, deletePerson, changeNumber }