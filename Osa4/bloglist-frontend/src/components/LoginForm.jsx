import React from 'react'

const LoginForm = ({
  handleSubmit,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange
}) => {
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          käyttäjätunnus
        <input
            value={username}
            onChange={handleUsernameChange} />
        </div>
        <div>
          salasana
        <input type='password'
            value={password}
            onChange={handlePasswordChange} />
        </div>
        <button type='submit'>kirjaudu</button>
      </form>
    </div>
  )
}
export default LoginForm