import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addBlog, removeBlog, updateLikes } from '../reducers/blogsReducer'


const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  console.log(props.blog);

  const [showAll, setShowAll] = useState(false)

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  const handleLikeClick = async () => {
    props.blog.likes++
    await props.blogService.update(props.blog)
    props.updateLikes(props.blog)
  }

  const handleRemove = async () => {
    if (window.confirm(`remove blog ${props.blog.title}`)) {
      await props.blogService.remove(props.blog)
      props.removeBlog(props.blog)
    }
  }

  const title = (
    <div onClick={toggleShowAll}>
      {props.blog.title} {props.blog.author}
    </div>
  )

  const all = (
    < div >
      <div onClick={toggleShowAll}>{props.blog.title} {props.blog.author}</div>
      <div>{props.blog.url}</div>
      <div>{`${props.blog.likes} likes`} <button onClick={handleLikeClick}>like</button></div>
      <div>{`added by ${props.blog.user.name}`}</div>
      {props.user.username === props.blog.user.username && <button onClick={handleRemove}>remove</button>}
    </div >
  )
  return (
    <div style={blogStyle}>
      <div >
        {showAll ? all : title}
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  addBlog, removeBlog, updateLikes
}

const ConnectedBlog = connect(mapStateToProps,
  mapDispatchToProps
)(Blog)

export default ConnectedBlog
