const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE':
      state = action.filter
      return state
    default:
      return state
  }
}

export const changeFilter = (filter) => {
  return {
    type: 'CHANGE',
    filter
  }
}

export default filterReducer