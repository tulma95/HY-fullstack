import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN, {
    onError: error => {
      console.log(error)
    }
  })
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('user-token', token)
      setUsername('')
      setPassword('')
    }
  }, [result.data]) // eslint-disable-line

  if (!props.show) return null

  const handleLogin = event => {
    event.preventDefault()
    login({
      variables: {
        username,
        password
      }
    })
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            type='text'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login
