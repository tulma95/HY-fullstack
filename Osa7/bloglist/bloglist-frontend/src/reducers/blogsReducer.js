

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BLOG': {
      const newState = state.concat(action.data.content)
      return newState
    }
    case 'REMOVE_BLOG': {
      const filteredState = state.filter(b => b.id !== action.data.content.id)
      return filteredState
    }
    case 'UPDATE_LIKES':
      return state.map(b => b.id === action.data.content.id ? action.data.content : b)
    case 'UPDATE_COMMENTS':
      return state.map(b => b.id === action.data.content.id ? action.data.content : b)

    default:
      return state
  }
}

export const updateLikes = (blog) => {
  return {
    type: 'UPDATE_LIKES',
    data: {
      content: blog
    }
  }
}

export const updateComments = (blog) => {
  return {
    type: 'UPDATE_COMMENTS',
    data: {
      content: blog
    }
  }
}

export const addBlog = (blog) => {
  return {
    type: 'ADD_BLOG',
    data: {
      content: blog
    }
  }
}

export const removeBlog = (blog) => {
  return {
    type: 'REMOVE_BLOG',
    data: {
      content: blog,
    }
  }
}

export default blogsReducer