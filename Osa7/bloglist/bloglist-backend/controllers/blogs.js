const blogsRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    id: 1,
    username: 1,
    name: 1
  })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async(request, response, next) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog.toJSON())
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async(request, response, next) => {
  const id = request.params.id
  const token = jwt.verify(request.token, process.env.SECRET)
  console.log(token);
  try {

    const blog = await Blog.findById(id)

    if (blog.user.toString() === token.id) {
      await Blog.findByIdAndRemove(blog.id)
      response.status(204).end()
    } else {
      response.status(401).json({
        error: 'not authorized'
      })
    }

  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async(request, response, next) => {
  const id = request.params.id
  const { author, title, url, likes } = request.body

  const blog = {
    author,
    title,
    url,
    likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
    new: true
  })
  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter