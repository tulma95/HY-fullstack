import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog';


test('renders content', () => {
  const blog = {
    title: 'testiblogi',
    likes: 10,
    author: 'rikke'
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'testiblogi'
  )
  expect(component.container).toHaveTextContent(
    'rikke'
  )
  expect(component.container).toHaveTextContent(
    '10'
  )
})

test('clicking button twice calls event handler twice', () => {
  const blog = {
    title: 'testiblogi',
    likes: 10,
    author: 'rikke'
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog
      blog={blog}
      onClick={mockHandler}
    />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)

})