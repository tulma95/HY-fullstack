import React from 'react'

const ErrorNotification = ({ message }) => {
  const notificationStyle = {
    color: 'red',
    background: 'lightgrey',
    width: '100%',
    fontSize: 30,
    borderStyle: 'solid',
    padding: 20
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default ErrorNotification