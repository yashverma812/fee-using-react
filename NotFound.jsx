import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

// 404 page — rendered by the catch-all route `*`.
export default function NotFound({ message = "The page you're looking for doesn't exist." }) {
  return (
    <>
      <PageHero title="404 — Lost in the Beans" subtitle={message} crumbs={[{ label: '404' }]} />
      <section className="section">
        <div className="container">
          <div className="cart-empty">
            <div className="icon" aria-hidden="true">☕</div>
            <h2>Nothing brewing here</h2>
            <p>Let&apos;s get you back to something delicious.</p>
            <Link to="/" className="btn btn-primary">Back to Home</Link>
          </div>
        </div>
      </section>
    </>
  )
}
