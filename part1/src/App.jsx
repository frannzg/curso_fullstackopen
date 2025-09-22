const course = 'Half Stack application development'

const parts = [
  { name: 'Fundamentals of React', exercises: 10 },
  { name: 'Using props to pass data', exercises: 7 },
  { name: 'State of a component', exercises: 14 }
]

const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <Part key={index} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  )
}

const Total = ({ parts }) => {
  const totalExercises = parts[0].exercises + parts[1].exercises + parts[2].exercises
  return (
    <p>
      Number of exercises <b>{totalExercises}</b>
    </p>
  )
}

const App = () => {
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
