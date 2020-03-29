import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('user-token'))
  const result = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  const updateCacheWith = addedBook => {
    const includedIn = (set, object) => set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (includedIn(dataInStore.allBooks, addedBook)) {
      console.log('tää')
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
    }
  })

  if (result.loading) return <div>loading</div>
  const allBooks = result.data.allBooks

  const logOut = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && (
          <button onClick={() => setPage('recommendation')}>
            recommendation
          </button>
        )}
        {token ? (
          <button onClick={logOut}>logout</button>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} allBooks={allBooks} />

      <NewBook show={page === 'add'} />

      <Login show={page === 'login'} setToken={setToken} />

      <Recommendations show={page === 'recommendation'} allBooks={allBooks} />
    </div>
  )
}

export default App
