const _ = require('lodash')

const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((favBlog, blog) => {
    return favBlog.likes > blog.likes ? favBlog : blog
  }, {})
}

const mostBlogs = (blogs) => {
  return _(blogs)
    .groupBy('author')
    .map((item, author) => ({ author, blogs: item.length }))
    .maxBy('blogs')
}

const mostLikes = (blogs) => {
  const tulos = _(blogs)
    .groupBy('author')
    .map((blogs, author) => {
      const likes = blogs.reduce((sum, nextBlog) => sum + nextBlog.likes, 0)
      return ({ author, likes })
    })
    .maxBy('likes')
  return tulos
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}