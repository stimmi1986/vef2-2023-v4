import './Layout.css';

export function Layout({ titleName, children, footer }) {

  return (
    <div className='layout'>
      <header className='layout__header'>
        <nav className="navbar">
          <h1>{titleName}</h1>
          <ul className="nav-list">
            <li className="nav-item">
              <a className="nav-link" href='/'>Deildir</a>
            </li>
          </ul>
        </nav>
      </header>
      <main className='layout__main'>
        {children}
      </main>
      <footer className='layout__footer'>
        {footer}
      </footer>
    </div>
  )
}