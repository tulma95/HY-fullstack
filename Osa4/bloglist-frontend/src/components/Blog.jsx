import React, { useState } from 'react'

const Blog = ({ blog, blogService, blogs, setBlogs, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showAll, setShowAll] = useState(false)

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  const handleLikeClick = async () => {
    blog.likes++
    await blogService.update(blog)

    setBlogs(
      blogs.map(b => b.id === blog.id ? blog : b)
    )
  }

  const handleRemove = async () => {
    if (window.confirm(`remove blog ${blog.title}`)) {
      await blogService.remove(blog)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  const title = (
    <div onClick={toggleShowAll}>
      {blog.title} {blog.author}
    </div>
  )

  const all = (
    <div>
      <div onClick={toggleShowAll}>{blog.title} {blog.author}</div>
      <div>{blog.url}</div>
      <div>{`${blog.likes} likes`} <button onClick={handleLikeClick}>like</button></div>
      <div>{`added by ${blog.user.username}`}</div>
      {user.id === blog.user.id && <button onClick={handleRemove}>remove</button>}
    </div>
  )


  return (
    <div style={blogStyle}>
      <div >
        {showAll ? all : title}
      </div>
    </div>
  )
}
export default Blog