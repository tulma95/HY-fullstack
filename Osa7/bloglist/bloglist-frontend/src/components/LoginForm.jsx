import React from 'react'

const Input = (props) => {
  return (
    <input id={props.id} type={props.type}
      value={props.value}
      onChange={props.onChange} />
  )
}

const LoginForm = ({
  username, password, handleSubmit
}) => {

  return (
    <div className="ui form">
      <h2 className="ui header">log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Username
          <Input id='username'{...username} />
        </div>
        <div>
          Password
          <Input id='password' {...password} />
        </div>
        <button className="ui button" type='submit'>Login</button>
      </form>
    </div>
  )
}
export default LoginForm