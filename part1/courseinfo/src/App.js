
const Header = (props) => <h1>{props.content.name}</h1>

const Content = (props) => props.content.parts.map(
  (item) => <Part key={item.id} item={item} />
)

const Part = (props) => <p>{props.item.name} {props.item.exercises}</p>

const Total = (props) => props.content.parts.length

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        id: 1,
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        id: 2,
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        id: 3,
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header content={course} />
      <Content content={course} />
      <Total content={course} />      
    </div>
  )
}

export default App