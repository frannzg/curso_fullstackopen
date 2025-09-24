import { useState } from 'react'


const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = all === 0 ? 0 : (good - bad) / all
  const positive = all === 0 ? 0 : (good / all) * 100

  if (all === 0) {
    return <p>No feedback given</p>
  }

  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive.toFixed(1)} %</p>
    </div>
  )

}

const Button = ({ handleClick, text }) => (
  <button onClick ={handleClick}>{text}</button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
    
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={ () => setGood(good + 1)} text="good" />
      <Button handleClick={ () => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={ () => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App