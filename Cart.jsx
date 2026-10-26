import { Link, useNavigate } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { formatPrice } from '../data/menu'

export default function Cart() {
  const { lines, subtotal, tax, total, changeQty, removeFromCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <>
      <PageHero title="Your Cart" subtitle="Review your picks and adjust quantities before you place your order." crumbs={[{ label: 'Cart' }]} />
      <section className="section">
        <div className="container">
          {lines.length === 0 ? (
            <div className="cart-empty">
              <div className="icon" aria-hidden="true">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven&apos;t added anything yet. Let&apos;s fix that!</p>
              <Link to="/menu" className="btn btn-primary">Browse the Menu</Link>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-items">
                {lines.map(({ item, qty }) => (
                  <div className="cart-row" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <div>
                      <h3><Link to={`/menu/${item.id}`}>{item.name}</Link></h3>
                      <span className="price">{formatPrice(item.price)}</span>
                      <div className="qty-control">
                        <button className="qty-btn" onClick={() => changeQty(item.id, -1)} aria-label="Decrease quantity">−</button>
                        <span className="qty-value">{qty}</span>
                        <button className="qty-btn" onClick={() => changeQty(item.id, 1)} aria-label="Increase quantity">+</button>
                      </div>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                    </div>
                    <div className="cart-actions-col"><span className="line-total">{formatPrice(item.price * qty)}</span></div>
                  </div>
                ))}
              </div>

              <aside className="cart-summary">
                <h3>Order Summary</h3>
                <div className="summary-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                <div className="summary-row"><span>Taxes (5%)</span><span>{formatPrice(tax)}</span></div>
                <div className="summary-row total"><span>Total</span><span>{formatPrice(total)}</span></div>
                {/* Checkout is a protected route — logged-out users are bounced to /login first. */}
                <button className="btn btn-primary btn-block" onClick={() => navigate('/checkout')}>
                  {user ? 'Proceed to Checkout' : 'Login to Checkout'}
                </button>
                <Link to="/menu" className="btn btn-ghost btn-block" style={{ marginTop: '0.5rem' }}>Continue Shopping</Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
