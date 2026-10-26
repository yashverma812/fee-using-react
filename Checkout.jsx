import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Input from '../components/Input'
import useForm from '../hooks/useForm'
import { minLen, phone } from '../hooks/validators'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useOrders } from '../context/OrdersContext'
import { useToast } from '../context/ToastContext'
import { formatPrice } from '../data/menu'

const validators = {
  name: minLen(2, 'Please enter your name.'),
  phone,
  address: minLen(8, 'Please enter a complete address.'),
}

export default function Checkout() {
  const { lines, subtotal, tax, total, count, clearCart } = useCart()
  const { user } = useAuth()
  const { addOrder } = useOrders()
  const { showToast } = useToast()
  const [placed, setPlaced] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const { field, validateAll } = useForm({ name: user?.name ?? '', phone: '', address: '' }, validators)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validateAll()) return
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 900)) // pretend to talk to a payment server
    const order = addOrder({
      items: lines.map((l) => ({ id: l.id, name: l.item.name, qty: l.qty, price: l.item.price })),
      total,
    })
    clearCart()
    setSubmitting(false)
    setPlaced(order)
    showToast('Order placed! ☕')
  }

  if (placed) {
    return (
      <>
        <PageHero title="Order Confirmed" crumbs={[{ label: 'Checkout' }]} />
        <section className="section"><div className="container">
          <div className="form-success show">
            <div className="check" aria-hidden="true">✓</div>
            <h2>Thank you, {user.name.split(' ')[0]}!</h2>
            <p>Order <strong>#{placed.id}</strong> for {formatPrice(placed.total)} has been placed. We&apos;ll have it ready shortly.</p>
            <Link to="/account/orders" className="btn btn-primary">View My Orders</Link>
          </div>
        </div></section>
      </>
    )
  }

  if (lines.length === 0) {
    return (
      <>
        <PageHero title="Checkout" crumbs={[{ label: 'Checkout' }]} />
        <section className="section"><div className="container">
          <div className="cart-empty"><div className="icon">🛒</div><h2>Nothing to check out</h2><Link to="/menu" className="btn btn-primary">Browse the Menu</Link></div>
        </div></section>
      </>
    )
  }

  return (
    <>
      <PageHero title="Checkout" subtitle="Almost there — tell us where to send your order." crumbs={[{ label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
      <section className="section">
        <div className="container">
          <div className="cart-layout">
            <form className="form-card" onSubmit={onSubmit} noValidate>
              <div className="form-grid">
                <Input label="Full Name" required full {...field('name')} />
                <Input label="Phone" type="tel" required full placeholder="10-digit mobile number" {...field('phone')} />
                <Input label="Delivery Address" textarea required full {...field('address')} />
              </div>
              <div className="center-actions">
                <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? 'Placing order…' : `Place Order · ${formatPrice(total)}`}</button>
              </div>
            </form>
            <aside className="cart-summary">
              <h3>Your Order ({count})</h3>
              {lines.map((l) => (
                <div className="summary-row" key={l.id}><span>{l.item.name} × {l.qty}</span><span>{formatPrice(l.item.price * l.qty)}</span></div>
              ))}
              <div className="summary-row"><span>Taxes (5%)</span><span>{formatPrice(tax)}</span></div>
              <div className="summary-row total"><span>Total</span><span>{formatPrice(total)}</span></div>
              <span className="muted" style={{ display: 'none' }}>{subtotal}</span>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
