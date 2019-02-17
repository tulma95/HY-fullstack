const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const cors = require('cors')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true
})
mongoose.set('useCreateIndex', true);
app.use(cors())
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(middleware.errorHandler)

module.exports = app