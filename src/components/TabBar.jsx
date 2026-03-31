import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', label: 'readme' },
  { to: '/projects', label: 'projects' },
  { to: '/blog', label: 'blog' },
  { to: '/consulting', label: 'consulting' },
  { to: '/contact', label: 'contact' },
]

const TabBar = () => {
  return (
    <nav className="terminal-nav">
      {tabs.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          {label}
        </NavLink>
      ))}
      <a
        href="/v1/"
        target="_blank"
        rel="noopener noreferrer"
        className="nav-external"
      >
        v1
      </a>
    </nav>
  )
}

export default TabBar
