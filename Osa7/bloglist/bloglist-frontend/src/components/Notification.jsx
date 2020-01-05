import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  return <div>{props.notification && <p className='notification'>{props.notification}</p>}</div>
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification