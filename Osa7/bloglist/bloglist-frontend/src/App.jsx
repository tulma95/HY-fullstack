import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import UserInfo from './components/UserInfo'
import CreateNewBlog from './components/CreateNewBlog'
import Users from './components/Users'
import './app.css'
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification'
import { useField } from './hooks'
import { createNotification } from './reducers/notificationReducer'
import { addBlog } from './reducers/blogsReducer'
import { connect } from 'react-redux'
import {
  Route,
  Link
} from "react-router-dom";



const App = (props) => {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])

  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    blogService.getAll()
      .then(blogs => {
        props.addBlog(blogs)
      })

    userService.getAll()
      .then(users => {
        setUsers(users)
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


  const BlogsList = ({ user, blogService }) => {
    return (
      <div>
        <Togglable buttonLabel='new blog'>
          <CreateNewBlog
            blogService={blogService}
            user={user}
          />
        </Togglable >

        {props.blogs
          .sort((b1, b2) => b2.likes - b1.likes)
          .map(blog => (
            <div key={blog.id} style={{ border: "solid 1px", padding: "5px" }}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </div>
          ))}
      </div>
    )
  }

  return (
    <div>
      <NavBar user={user} handleLogout={handleLogout} />
      <Notification />
      <h1>Blogs</h1>

      {user === null ?
        <LoginForm
          username={username}
          password={password}
          handleSubmit={handleLogin} />
        :
        <div>
          <Route exact path='/'>
            <BlogsList user={user} blogService={blogService} />
          </Route>

          <Route exact path='/users'>
            <Users users={users} />
          </Route>

          <Route exact path='/users/:id' render={({ match }) =>
            <UserInfo user={users.find(user => user.id === match.params.id)} />
          } />

          <Route exact path='/blogs/:id' render={({ match }) =>
            <Blog blog={props.blogs.find(blog => blog.id === match.params.id)}
              blogService={blogService} user={user} />
          } />

        </div>
      }
    </div>
  )
}

const NavBar = ({ user, handleLogout }) => {
  return (
    <div style={{ backgroundColor: "lightgrey", padding: "5px" }}>
      <Link to='/'><button>Home</button></Link>
      <Link to='/users'><button>Users</button></Link>
      {user ?
        <span>
          {user.name} logged in <button onClick={() => handleLogout()}>logout</button>
        </span>
        : <span>log in</span>}
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