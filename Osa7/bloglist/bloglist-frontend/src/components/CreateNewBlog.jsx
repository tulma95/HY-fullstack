import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'


const CreateNewBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlogSubmit = async (event) => {
    event.preventDefault()

    const newBlog = {
      author,
      title,
      url
    }

    try {
      const savedBlog = await props.blogService.create(newBlog)
      savedBlog.user = props.user
      props.addBlog(savedBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleNewBlogSubmit}>
        <div>
          title:
          <input type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author:
          <input type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url:
          <input type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}


const mapDispatchToProps = {
  addBlog
}

const ConnectedCreateNewBlog = connect(null,
  mapDispatchToProps
)(CreateNewBlog)



export default ConnectedCreateNewBlog