import Header from "./Header"
import Content from "./Content"

const Course = ({ course }) => {
    
    const total = course.parts.reduce((previous, current) => {
        return previous + current.exercises
    },0)

    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <p>Total of {total} exercises </p>
        </div>
    )
}

export default Course