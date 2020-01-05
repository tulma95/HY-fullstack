import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'
import { Button, Checkbox, Form } from 'semantic-ui-react'


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
      <Form onSubmit={handleNewBlogSubmit}>
        <Form.Field>
          <label>Title</label>
          <input type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Author</label>
          <input type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)} />
        </Form.Field>
        <Form.Field>
          <label>url</label>
          <input type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)} />
        </Form.Field>
        <Button>create</Button>
      </Form>
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