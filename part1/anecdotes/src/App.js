import { useState } from 'react'

const Button = (props) =>
  <button onClick={props.handleClick}>{props.text}</button>



const randomIndex = (index) => {
  const rand = Math.random() * index
  return Math.trunc(rand)
}

const adder = (arr, index) => {
  const newArr = [...arr]
  newArr[index] += 1
  return newArr
}

const maxIndex = (arr) => {
  const max = arr.reduce((prev, curr) => {
    console.log(prev, curr);
    if (curr > prev) {
      return curr
    } else {
      return prev
    }
  }, 0)
  return arr.indexOf(max)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  return (
    <div>
      <h3>Anecdote of the day</h3>
      <p>{anecdotes[selected]}</p>
      <p>Votes: {points[selected]}</p>
      <Button text="next anectode" handleClick={() => setSelected(randomIndex(anecdotes.length))} />
      <Button text="vote" handleClick={() => setPoints(adder(points, selected))} />

      <h3>Anecdote with most votes</h3>
      <p>{anecdotes[maxIndex(points)]}</p>
    </div>
  )
}

export default App