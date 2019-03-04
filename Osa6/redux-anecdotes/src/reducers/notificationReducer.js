const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET':
      state = action.notification
      return state
    case 'REMOVE':
      state = null
      return state
    default:
      return state
  }
}

export const setNotification = (notification, time) => {

  return async dispatch => {

    await setTimeout(() => {
      dispatch({
        type: 'SET',
        notification: ''
      })
    }, time * 1000);

    dispatch({
      type: 'SET',
      notification
    })
  }


}

export const removeNotification = () => {
  return {
    type: 'REMOVE',
  }
}

export default notificationReducer