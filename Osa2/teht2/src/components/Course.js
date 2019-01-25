import React from 'react'

const Course = (props) => {
  return (
    props.courses.map((course, i) => {
      return (
        <div key={i}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )
    }
    )
  )
}


const Header = (props) => {
  return (
    <h1 key={props.key}>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map((e, i) => <Part key={i} part={e.name} exercises={e.exercises} />)}
    </div>
  )
}

const Total = (props) => {
  return (
    props.parts.map(e => e.exercises)
      .reduce((total, amount) => total + amount)
  )
}

export default Course