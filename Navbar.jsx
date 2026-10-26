import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/reservation', label: 'Reservation' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false) // mobile drawer state
  const { count } = useCart()
  const { user } = useAuth()
  const close = () => setOpen(false)

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="brand" aria-label="Brew and Bean home" onClick={close}>
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9z" />
              <path d="M16 10h2.5a2.5 2.5 0 0 1 0 5H16" />
              <path d="M7 2c-.5 1 .5 2 0 3M11 2c-.5 1 .5 2 0 3" />
            </svg>
          </span>
          <span className="brand-text">Brew &amp; Bean</span>
        </Link>

        <nav className={`nav-links${open ? ' open' : ''}`} id="navLinks" aria-label="Primary navigation">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} onClick={close}>{l.label}</NavLink>
          ))}
          <NavLink to={user ? '/account' : '/login'} onClick={close}>
            {user ? `Hi, ${user.name.split(' ')[0]}` : 'Login'}
          </NavLink>
        </nav>

        <div className="nav-actions">
          {/* key={count} restarts the pulse animation every time the count changes */}
          <Link to="/cart" className="cart-link" aria-label="View cart" onClick={close}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" />
              <path d="M2 3h2.2l2 12.5a2 2 0 0 0 2 1.5h8.6a2 2 0 0 0 2-1.6L21 7H5.2" />
            </svg>
            <span key={count} className={`cart-badge${count ? ' pulse' : ''}`}>{count}</span>
          </Link>
          <button
            className={`hamburger${open ? ' active' : ''}`}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="navLinks"
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}
