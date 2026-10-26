import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-col footer-brand">
          <span className="brand-text">Brew &amp; Bean</span>
          <p>Crafted Coffee. Cozy Moments. Brewed with love since 2015.</p>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/about">About</Link>
          <Link to="/reservation">Reservation</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-col">
          <h4>Visit Us</h4>
          <p>42, Coffee Lane,<br />Bandra West, Mumbai 400050</p>
          <p>+91 98765 43210<br />hello@brewandbean.in</p>
        </div>
        <div className="footer-col">
          <h4>Opening Hours</h4>
          <p>Mon – Fri: 7:00 AM – 10:00 PM<br />Sat – Sun: 8:00 AM – 11:00 PM</p>
          <div className="socials" aria-label="Social media">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="Twitter">TW</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Brew &amp; Bean. Brewed for a college frontend project.</p>
      </div>
    </footer>
  )
}
