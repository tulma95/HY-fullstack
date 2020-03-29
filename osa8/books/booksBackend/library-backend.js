const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql,
  PubSub
} = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const pubsub = new PubSub()
require('dotenv').config()

const URI = process.env.MONGO_URI
const JWT_SECRET = process.env.JWT_SECRET

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  })
  .then(() => {
    console.log('connected to MONGODB')
  })
  .catch(error => {
    console.log('error', error.message)
  })

const resolvers = {
  Query: {
    allBooks: (root, args) => {
      const { genre } = args
      return genre
        ? Book.find({ genres: { $in: genre } }).populate('author')
        : Book.find({}).populate('author')
    },
    allAuthors: async () => Author.find({}),
    bookCount: async () => {
      const books = await Book.find({})
      return books.length
    },
    authorCount: async () => {
      const authors = await Author.find({})
      return authors.length
    },
    me: (root, args, context) => context.currentUser
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const { title, author, published, genres } = args
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      try {
        const authorObject = await Author.findOneAndUpdate(
          { name: author },
          {},
          { upsert: true, new: true }
        )
        const newBook = await Book.create({
          title,
          author: authorObject.id,
          published,
          genres
        })
        const book = await newBook.populate('author').execPopulate()
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const { name, setBornTo } = args
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      return Author.findOneAndUpdate(
        { name },
        { born: setBornTo },
        { new: true }
      )
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })
      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'salasana') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  },
  Author: {
    bookCount: async root => {
      const books = await Book.find({ author: root.id })
      return books.length
    }
  }
}

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Subscription {
    bookAdded: Book!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: [String]): [Book]!
    allAuthors: [Author]!
    me: User
  }
`

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
