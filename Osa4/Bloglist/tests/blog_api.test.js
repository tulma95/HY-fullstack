const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async() => {
  await Blog.remove({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(note => note.save())
  await Promise.all(promiseArray)
})

test('/api/blogs GET return right amount of blogs', async() => {
  const result = await api
    .get('/api/blogs')

  expect(result.body.length).toBe(6)
})

test('returned blogs have id, not _id', async() => {
  const resultBlog = await api.get('/api/blogs/')
  const id = resultBlog.body[0].id
  expect(id).toBeDefined()
})

describe('POST', () => {
  test('adding new blog works', async() => {
    const newBlog = {
      author: "kalle",
      likes: 10,
      url: "www.fi",
      title: "testi"
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const blogsDB = await helper.blogsInDb()
    expect(blogsDB.length).toBe(helper.initialBlogs.length + 1)
  })

  test('blog likes default value is 0', async() => {
    const newBlog = {
      author: "kalle",
      url: "www.fi",
      title: "testi"
    }

    const savedBlog = await api.post('/api/blogs')
      .send(newBlog)

    expect(savedBlog.body.likes).toBe(0)
  })

  test('cannot post blog without URL', async() => {
    const newBlog = {
      author: "kalle",
      title: "testi"
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('cannot post blog without Title', async() => {
    const newBlog = {
      url: "kalle",
      author: "testi"
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('DELETE', () => {
  test('delete works', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)
    const titles = blogsAtEnd.map(e => e.title)

    expect(titles).not.toContain(blogToDelete.title)

  })
})

afterAll(() => {
  mongoose.connection.close()
})