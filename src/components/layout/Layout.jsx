import Departments from '../departments/Departments';
import Courses from '../courses/Courses'

export function Layout({ title }) {
  return (
    <section>
        <h2>{title}</h2>
        <Departments title='Deildir'/>
        <Courses title='Námskeið'/>
    </section>
  )
}
