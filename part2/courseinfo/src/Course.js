const Header = (props) => <h1>{props.name}</h1>

const Content = (props) => props.parts.map(
  (item) => <Part key={item.id} item={item} />
)

const Part = (props) => <p>{props.item.name} {props.item.exercises}</p>

const Total = (props) => (
  "Total number: " + props.parts.reduce((prev, curr) => prev + curr.exercises, 0)
)

const Course = (props) => props.course.map((course) =>
  <div key={course.id}>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course