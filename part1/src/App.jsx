 const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

const Header = ({ course }) => {
  return <h1>{course.name}</h1>
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
        <Part key={index} name={course.parts[index].name} exercises={course.parts[index].exercises} />
      ))}
    </div>
  )
}

const Total = () => {
  const totalExercises = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
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
      <Content parts={course.parts} />
      <Total parts={course.parts.exercises} />
    </div>
  )
}

export default App
