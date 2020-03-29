import React from 'react'
import { useQuery } from '@apollo/client'
import { ME } from '../queries'

const Recommendations = props => {
  const userQuery = useQuery(ME)

  if (!props.show) return null
  if (userQuery.loading) return <div>loading</div>
  const bookList = props.allBooks
  const genre = userQuery.data.me.favoriteGenre

  return (
    <div>
      <h1>Recommendations</h1>
      <p>books in your favorite genre patterns</p>
      {props.allBooks
        .filter(book => book.genres.includes(genre))
        .map(book => {
          return <div key={book.title}>{book.title}</div>
        })}
    </div>
  )
}

export default Recommendations
