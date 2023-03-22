import { Departments } from '../departments/Departments';

export function Layout({ title }) {
  return (
    <section>
        <h2>{title}</h2>
        <Departments title='Deildir' />
    </section>
  )
}
