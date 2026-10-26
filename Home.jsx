import { useState } from 'react'
import { Link } from 'react-router-dom'
import { menuItems, testimonials } from '../data/menu'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import Stars from '../components/Stars'
import useFetch from '../hooks/useFetch'
import useForm from '../hooks/useForm'
import { email } from '../hooks/validators'

const FEATURES = [
  { title: 'Freshly Roasted', text: 'Beans roasted in small batches every morning for peak flavour.', icon: <><path d="M12 2S7 6 7 11a5 5 0 0 0 10 0c0-5-5-9-5-9z" /><path d="M12 11v4" /></> },
  { title: 'Handcrafted Coffee', text: 'Every drink is made by trained baristas who care about the craft.', icon: <><path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9z" /><path d="M16 10h2.5a2.5 2.5 0 0 1 0 5H16" /></> },
  { title: 'Cozy Atmosphere', text: 'Warm lighting, soft music, and comfy corners made for lingering.', icon: <><path d="M3 21h18" /><path d="M5 21V10l7-5 7 5v11" /><path d="M9 21v-6h6v6" /></> },
  { title: 'Fresh Daily Pastries', text: 'Baked in-house every morning by our own pastry chefs.', icon: <><path d="M4 8h16l-1 12H5L4 8z" /><path d="M8 8V6a4 4 0 0 1 8 0v2" /></> },
]

const FALLBACK_QUOTE = { quote: 'Coffee is a hug in a mug.', author: 'Brew & Bean' }

function QuoteBox() {
  // Custom hook handles loading, error, retry (x2) and manual refetch.
  const { data, loading, error, refetch } = useFetch('https://dummyjson.com/quotes/random')
  const q = error || !data ? FALLBACK_QUOTE : data // graceful fallback

  return (
    <Reveal className="quote-box">
      {loading ? (
        <div className="quote-loading" style={{ display: 'block' }}>Brewing your quote</div>
      ) : (
        <div className="quote-content">
          <p className="quote-text">&ldquo;{q.quote}&rdquo;</p>
          <p className="quote-author">— {q.author}</p>
        </div>
      )}
      <button className="quote-refresh" onClick={refetch} disabled={loading}>Refresh quote</button>
    </Reveal>
  )
}

function Newsletter() {
  const [msg, setMsg] = useState({ text: '', ok: false })
  const { field, validateAll, reset } = useForm({ email: '' }, { email })

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validateAll()) {
      setMsg({ text: 'Please enter a valid email address.', ok: false })
      return
    }
    setMsg({ text: 'Thank you for subscribing! Check your inbox for a welcome treat.', ok: true })
    reset()
  }

  const f = field('email')
  return (
    <Reveal className="newsletter">
      <h2>Join the Brew Club</h2>
      <p>Subscribe for seasonal specials, new menu drops, and a free pastry on your birthday.</p>
      <form className="newsletter-form" onSubmit={onSubmit} noValidate>
        <label htmlFor="newsEmail" style={{ position: 'absolute', left: -9999 }}>Email address</label>
        <input id="newsEmail" type="email" placeholder="you@example.com" name={f.name} value={f.value} onChange={f.onChange} />
        <button type="submit" className="btn btn-primary">Subscribe</button>
      </form>
      <p className={`form-msg ${msg.text ? (msg.ok ? 'success' : 'error') : ''}`} role="status" aria-live="polite">{msg.text}</p>
    </Reveal>
  )
}

export default function Home() {
  const popular = menuItems.slice(0, 6)

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <Reveal className="hero-copy">
            <span className="hero-badge"><span className="dot" /> Open now · Freshly brewed</span>
            <h1>Your Daily Cup of Comfort.</h1>
            <p className="lead">Handcrafted coffee, fresh pastries, and warm moments — brewed just for you.</p>
            <div className="hero-actions">
              <Link to="/menu" className="btn btn-primary">Explore Menu</Link>
              <Link to="/reservation" className="btn btn-secondary">Book a Table</Link>
            </div>
          </Reveal>
          <Reveal className="hero-art">
            <img src="https://images.pexels.com/photos/15801079/pexels-photo-15801079.jpeg?auto=compress&cs=tinysrgb&h=900&w=900" alt="Barista pouring latte art into a cup" />
          </Reveal>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Why Brew &amp; Bean</span>
            <h2>A Little Love in Every Cup</h2>
            <p>From bean to brew, we obsess over the details so you can savour the moment.</p>
          </Reveal>
          <div className="feature-grid">
            {FEATURES.map((f) => (
              <Reveal as="article" className="feature-card" key={f.title}>
                <div className="feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
                </div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Most Loved</span>
            <h2>Popular Picks on the Menu</h2>
            <p>A taste of what&apos;s brewing. See the full menu for everything we serve.</p>
          </Reveal>
          <div className="product-grid">
            {popular.map((item) => <ProductCard key={item.id} item={item} />)}
          </div>
          <div className="center-actions">
            <Link to="/menu" className="btn btn-outline">View Full Menu</Link>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Kind Words</span>
            <h2>What Our Guests Say</h2>
            <p>Thousands of regulars keep coming back. Here&apos;s why.</p>
          </Reveal>
          <div className="testimonial-grid">
            {testimonials.map((t) => (
              <article className="testimonial-card" key={t.id}>
                <div className="quote-mark" aria-hidden="true">&ldquo;</div>
                <div className="stars" aria-label={`Rated ${t.rating} out of 5`}><Stars rating={t.rating} /></div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="avatar">{t.name.charAt(0)}</div>
                  <div><strong>{t.name}</strong><span>{t.role}</span></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Coffee Inspiration</span>
            <h2>Quote of the Moment</h2>
            <p>A little wisdom to sip along with your coffee — fetched live from the web.</p>
          </Reveal>
          <QuoteBox />
        </div>
      </section>

      <section className="section">
        <div className="container"><Newsletter /></div>
      </section>
    </>
  )
}
