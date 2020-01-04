import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateNewBlog from './components/CreateNewBlog'
import './app.css'
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification'
import { useField } from './hooks'
import { createNotification } from './reducers/notificationReducer'
import { addBlog } from './reducers/blogsReducer'
import { connect } from 'react-redux'




const App = (props) => {
  const [user, setUser] = useState(null)

  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    blogService.getAll()
      .then(blogs => {
        props.addBlog(blogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      props.createNotification(`${user.name} logged in`)

    } catch (error) {
      props.createNotification(`failed to log in`)
    }

    setTimeout(() => {
      props.createNotification(null)
    }, 2000);
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogUser')
  }

  const blogsList = () => {
    return (
      <div>

        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>

        <Togglable buttonLabel='new blog'>
          <CreateNewBlog
            blogService={blogService}
            user={user}
          />
        </Togglable >

        {props.blogs
          .sort((b1, b2) => b2.likes - b1.likes)
          .map(blog =>
            <Blog key={blog.id}
              blog={blog}
              blogService={blogService}
              user={user}
            />)
        }
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <h1>Blogs</h1>

      {user === null ?
        <LoginForm
          username={username}
          password={password}
          handleSubmit={handleLogin} />
        :
        blogsList()
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  createNotification,
  addBlog
}

const ConnectedApp = connect(mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp