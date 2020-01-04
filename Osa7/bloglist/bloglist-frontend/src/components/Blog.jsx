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

  if (props.blog === undefined) {
    return <div>loading</div>
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

  return (
    <div style={blogStyle}>
      <div >
        <h2>{props.blog.title} by {props.blog.author}</h2>
        <div>{props.blog.url}</div>
        <div>{`${props.blog.likes} likes`} <button onClick={handleLikeClick}>like</button></div>
        <div>{`added by ${props.blog.user.name}`}</div>
        {props.user.username === props.blog.user.username && <button onClick={handleRemove}>remove</button>}
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
