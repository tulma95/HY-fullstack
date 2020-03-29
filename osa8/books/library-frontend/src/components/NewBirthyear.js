import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const NewBirthyear = ({ authors }) => {
  const [birthyear, setBirthyear] = useState('')
  const [selection, setSelection] = useState('')

  const [changeBorn] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = event => {
    event.preventDefault()
    changeBorn({
      variables: {
        name: selection,
        setBornTo: Number(birthyear)
      }
    })
    setBirthyear('')
  }

  const createSelection = author => {
    return (
      <option key={author.name} value={author.name}>
        {' '}
        {author.name}
      </option>
    )
  }

  return (
    <div>
      <h1>Set birthyear</h1>
      <form onSubmit={submit}>
        <div>
          name
          <select
            value={selection}
            onChange={e => setSelection(e.target.value)}
          >
            {authors.map(createSelection)}
          </select>
        </div>
        <div>
          born
          <input
            type='number'
            value={birthyear}
            onChange={e => setBirthyear(e.target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default NewBirthyear
