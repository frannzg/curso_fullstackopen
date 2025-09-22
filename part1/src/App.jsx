const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = (Part) => {
  return (
    <div>
      <p>
        {Part.name} {Part.exercises}
      </p>
    </div>
  )
}

const Content = () => {
  return (
    <div>
      <Part name="Fundamentals of React" exercises="10" />
      <Part name="Using props to pass data" exercises="7" />
      <Part name="State of a component" exercises="14" />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises <b>{props.exercises}</b>
    </p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content  />
      <Total exercises={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App