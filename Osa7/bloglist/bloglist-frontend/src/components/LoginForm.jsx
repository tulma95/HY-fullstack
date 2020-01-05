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
    <div class="ui form">
      <h2 class="ui header">log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Username
          <Input {...username} />
        </div>
        <div>
          Password
          <Input {...password} />
        </div>
        <button class="ui button" type='submit'>Login</button>
      </form>
    </div>
  )
}
export default LoginForm