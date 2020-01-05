import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
} from "react-router-dom";

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer
})

const store = createStore(reducer)


ReactDOM.render(
  <Provider store={store}>
    <Router >
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
