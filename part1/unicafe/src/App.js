import { useState } from 'react'

const FeedbackButton = (props) =>
  <button onClick={props.handler}>{props.text}</button>

const AnectodeButton = (props) => {
  const [anecdote, setAnecdote] = useState("")
  const [points,   setPoints]   = useState(props.points)

  const findIndex = (anecdote) => {
    props.anecdotes.findIndex((x) => x === anecdote)
  }


  return (<div>
    <button onClick={() => setAnecdote(props.handler)}>Random anectode!</button>
    <p>{anecdote}</p>
    </div>
  )
}


const Statistics = (props) => {
  const total = props.good + props.bad + props.neutral

  if (total === 0)
    return (
      <div>
        <p>No feedback</p>
        <p>No feedback</p>
      </div>
    )
  else
    return (
      <div>
        <p>Avarage: {100 * (props.good - props.bad) / total}</p>
        <p>Positive: {100 * (props.good) / total}</p>
      </div>
    )
}

const StatisticsLine = (props) => 
<p>{props.text}: {props.f(props.good, props.bad, props.neutral)}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const randomAnectode = () => anecdotes[Math.abs(Math.trunc(Math.random() * anecdotes.length) - 1)]
  const points = Array(anecdotes.length).fill(0)

  const avarage = (pos, neg, neu) => {
    const total = pos + neg + neu
    return ((total == 0) ? 0 : (100 * (pos - neg) / total).toFixed(2))
  }
   
  const positive = (pos, neg, neu) => {
    const total = pos + neg + neu
    return ((total == 0) ? 0 : (100 * (pos) / total).toFixed(2))
  }
  
  return (
    <div>
      <h3>Please give us feedback!</h3>
      <FeedbackButton text="good" handler={() => setGood(good + 1)} />
      <FeedbackButton text="neutral" handler={() => setNeutral(neutral + 1)} />
      <FeedbackButton text="bad" handler={() => setBad(bad + 1)} />
      <br></br>
      <h3>Statistics</h3>
      <StatisticsLine text="Good" f={(pos, neg, neu) => pos} good={good} bad={bad} neutral={neutral} />
      <StatisticsLine text="Bad" f={(pos, neg, neu) => neg} good={good} bad={bad} neutral={neutral} />
      <StatisticsLine text="Neutral" f={(pos, neg, neu) => neu} good={good} bad={bad} neutral={neutral} />
      <StatisticsLine text={"Avarage"} f={avarage} good={good} bad={bad} neutral={neutral} />
      <StatisticsLine text={"Positive"} f={positive} good={good} bad={bad} neutral={neutral} />
    </div>

  )
}

export default App