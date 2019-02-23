import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateNewBlog from './components/CreateNewBlog'
import './app.css'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [notification, setNotification] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
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

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          käyttäjätunnus
          <input type='text'
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          salasana
          <input type='text'
            value={password}
            name='password'
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type='submit'>kirjaudu</button>
      </form>
    </div>
  )

  const blogsList = () => (
    <div>
      <h2>blogs</h2>

      <p>{user.name} logged in</p>
      <p><button onClick={handleLogout}>logout</button></p>
      <CreateNewBlog blogs={blogs} setBlogs={setBlogs} blogService={blogService} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      {notification && <p className='notification'>{notification} </p>}
      {user === null ? loginForm() : blogsList()}
    </div>
  )
}

export default App