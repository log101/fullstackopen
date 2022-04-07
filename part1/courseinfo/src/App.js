
const Header = (props) => <h1>{props.header}</h1>

const Content = (props) => props.content.map(
  (item) => <Part key={item.id} item={item} />
)

const Part = (props) => <p>{props.item.part} {props.item.exercise}</p>

const Total = (props) => props.content.length

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const contents = [
    {
      id: 1,
      part: part1,
      exercise: exercises1
    },
    {
      id: 2,
      part: part2,
      exercise: exercises2
    },
    {
      id: 3,
      part: part3,
      exercise: exercises3
    }
  ]
  return (
    <div>
      <Header header={course} />
      <Content content={contents} />
      <Total content={contents} />      
    </div>
  )
}

export default App