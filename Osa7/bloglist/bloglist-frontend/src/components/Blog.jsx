import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addBlog, removeBlog, updateLikes, updateComments } from '../reducers/blogsReducer'


const Blog = (props) => {

  const [comment, setComment] = useState('')
  const onChange = (e) => {
    setComment(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    props.blog.comments = [...props.blog.comments, comment]
    await props.blogService.addComment(props.blog.id, comment)
    props.updateComments(props.blog)
    setComment('')
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
    <div className="ui card">
      <div className="content">
        <h2>{props.blog.title} by {props.blog.author}</h2>
        <div className="header">{props.blog.url}</div>

        <div className="ui right labeled button" role="button" tabIndex="0">
          <button className="ui red button" onClick={handleLikeClick}>
            <i aria-hidden="true" className="heart icon"></i>
            like
          </button>
          <a className="ui red left pointing basic label">{`${props.blog.likes} likes`}</a>
        </div>

        <div>{`added by ${props.blog.user.name}`}</div>
        {props.user.username === props.blog.user.username && <button className="ui button" onClick={handleRemove}>remove</button>}

        <form onSubmit={handleSubmit} className="ui form">

          <div className="field">
            <label>New comment</label>
            <input id='comment' type="text" value={comment} onChange={onChange} />
          </div>
          <button className="ui button" type="submit">add comment</button>
        </form>


        {props.blog.comments.map((comment, i) => (
          <div key={i} className="ui comments">{comment}</div>
        ))}

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
  addBlog, removeBlog, updateLikes, updateComments
}

const ConnectedBlog = connect(mapStateToProps,
  mapDispatchToProps
)(Blog)

export default ConnectedBlog
