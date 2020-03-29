import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = props => {
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const [chosenGenre, setChosenGenre] = useState(null)

  useEffect(() => {
    const fetchData = genre => {
      genre ? getBooks({ variables: { genre } }) : getBooks()
    }
    fetchData(chosenGenre)
  }, [chosenGenre])

  if (!props.show) return null
  if (result.loading) return <div>Loading...</div>

  const genres = [
    ...new Set(props.allBooks.map(book => book.genres).flat(Infinity))
  ]
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map(genre => {
        return (
          <button key={genre} onClick={() => setChosenGenre(genre)}>
            {genre}
          </button>
        )
      })}
      <button onClick={() => setChosenGenre(null)}>all books</button>
    </div>
  )
}

export default Books
