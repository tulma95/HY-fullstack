import React, { useState } from 'react'
import { useApolloClient } from '@apollo/react-hooks'



const Authors = (props) => {
  const [birthyear, setBirthyear] = useState('')
  const [selection, setSelection] = useState('')

  if (!props.show) {
    return null
  }


  if (props.result.loading) {
    return <div>loading...</div>
  }

  const submit = async (e) => {
    e.preventDefault()

    await props.editAuthor({
      variables: { name: selection, setBornTo: Number(birthyear) }
    })

  }

  const handleSelection = (event) => {
    setSelection(event.target.value)
  }

  const authors = props.result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={selection} onChange={handleSelection}>
            {authors.map(author =>
              <option value={author.name}>{author.name}</option>
            )}
          </select>
        </div>
        <div>
          born
          <input type="text"
            value={birthyear}
            onChange={({ target }) => setBirthyear(target.value)}
          />
        </div>
        <button type={'submit'}>update birthyear</button>
      </form>
    </div>
  )
}

export default Authors