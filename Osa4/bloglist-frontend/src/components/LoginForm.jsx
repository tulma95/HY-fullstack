import React from 'react'

const Input = (props) => {
  return (
    <input type={props.type}
      value={props.value}
      onChange={props.onChange} />
  )
}

const LoginForm = ({
  username, password, handleSubmit
}) => {

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          käyttäjätunnus
          <Input {...username} />
        </div>
        <div>
          salasana
          <Input {...password} />
        </div>
        <button type='submit'>kirjaudu</button>
      </form>
    </div>
  )
}
export default LoginForm