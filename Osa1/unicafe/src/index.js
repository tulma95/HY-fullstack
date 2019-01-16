import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Buttons = ({ good, neutral, bad }) => {
  return (
    <div>
      <Button name='hyvä' handleClick={good[0]} amount={good[1] + 1} />
      <Button name='neutraali' handleClick={neutral[0]} amount={neutral[1] + 1} />
      <Button name='huono' handleClick={bad[0]} amount={bad[1] + 1} />

    </div>
  )
}

const Button = ({ handleClick, name, amount }) => {
  return (
    <button onClick={() => handleClick(amount)}> {name}</button>
  )
}

const Statistics = ({ good, neutral, bad }) => {

  const totalAmount = good + neutral + bad
  const points = good - bad

  if (totalAmount > 0) {
    return (
      <div>
        <table>
          <tbody>
            <Statistic name='hyvä' amount={good} />
            <Statistic name='neutral' amount={neutral} />
            <Statistic name='huono' amount={bad} />
            <Statistic name='yhteensä' amount={totalAmount} />
            <Statistic name='keskiarvo' amount={points / totalAmount} />
            <Statistic name='positiivisia' amount={good / totalAmount} />
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>Ei yhtään palautetta annettu</div>
  )
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.amount}</td>
    </tr>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>anna palautetta</h1>

      <Buttons good={[setGood, good]}
        neutral={[setNeutral, neutral]}
        bad={[setBad, bad]} />

      <h1>statistiikka</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)