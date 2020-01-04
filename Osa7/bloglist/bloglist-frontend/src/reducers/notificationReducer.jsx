const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return action.data.content
    default:
      return state
  }
}

export const createNotification = (notification) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: {
      content: notification,
    }
  }
}


export default notificationReducer