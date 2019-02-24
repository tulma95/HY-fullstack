import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateNewBlog from './components/CreateNewBlog'
import './app.css'
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll()
      .then(blogs => {
        setBlogs(blogs)
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
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification(`${user.name} logged in`)
    } catch (error) {
      setNotification(`failed to log in`)
    }
    setTimeout(() => {
      setNotification(null)
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
            blogs={blogs}
            setBlogs={setBlogs}
            blogService={blogService}
          />
        </Togglable >

        {blogs
          .sort((b1, b2) => b2.likes - b1.likes)
          .map(blog =>
            <Blog key={blog.id}
              blog={blog}
              blogService={blogService}
              blogs={blogs}
              setBlogs={setBlogs}
              user={user}
            />)
        }
      </div>
    )
  }

  return (
    <div>
      {notification && <p className='notification'>{notification} </p>}

      <h1>Blogs</h1>

      {user === null ?
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin} />
        :
        blogsList()
      }
    </div>
  )
}

export default App