import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom'
import PageHero from '../components/PageHero'
import ProductCard from '../components/ProductCard'
import { useAuth } from '../context/AuthContext'
import { useOrders } from '../context/OrdersContext'
import { useWishlist } from '../context/WishlistContext'
import { menuItems, formatPrice } from '../data/menu'

// Nested routes: /account (layout) → index (Profile), /account/orders, /account/wishlist.
export function AccountLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  return (
    <>
      <PageHero title="My Account" subtitle={`Signed in as ${user.email}`} crumbs={[{ label: 'Account' }]} />
      <section className="section">
        <div className="container">
          <div className="tabs">
            <NavLink to="/account" end className="filter-btn">Profile</NavLink>
            <NavLink to="/account/orders" className="filter-btn">Orders</NavLink>
            <NavLink to="/account/wishlist" className="filter-btn">Wishlist</NavLink>
            <button className="filter-btn" onClick={() => { logout(); navigate('/') }}>Log out</button>
          </div>
          <Outlet />
        </div>
      </section>
    </>
  )
}

export function Profile() {
  const { user } = useAuth()
  const { orders } = useOrders()
  const { ids } = useWishlist()
  return (
    <div className="stats-grid" style={{ marginTop: 'var(--sp-3)' }}>
      <div className="info-card"><h3>Name</h3><p>{user.name}</p></div>
      <div className="info-card"><h3>Email</h3><p>{user.email}</p></div>
      <div className="info-card"><h3>Orders</h3><p>{orders.length}</p></div>
      <div className="info-card"><h3>Wishlist</h3><p>{ids.length} item{ids.length === 1 ? '' : 's'}</p></div>
    </div>
  )
}

export function Orders() {
  const { orders } = useOrders()
  if (orders.length === 0) {
    return <div className="cart-empty"><div className="icon">🧾</div><h2>No orders yet</h2><Link to="/menu" className="btn btn-primary">Browse the Menu</Link></div>
  }
  return (
    <div className="cart-items" style={{ marginTop: 'var(--sp-3)' }}>
      {orders.map((o) => (
        <div className="info-card" key={o.id}>
          <h3>Order #{o.id} · {formatPrice(o.total)}</h3>
          <p className="muted">{new Date(o.date).toLocaleString('en-IN')}</p>
          <p>{o.items.map((i) => `${i.name} × ${i.qty}`).join(', ')}</p>
        </div>
      ))}
    </div>
  )
}

export function Wishlist() {
  const { ids } = useWishlist()
  const items = menuItems.filter((m) => ids.includes(m.id))
  if (items.length === 0) {
    return <div className="cart-empty"><div className="icon">♡</div><h2>Your wishlist is empty</h2><p>Tap the heart on any menu item to save it here.</p><Link to="/menu" className="btn btn-primary">Browse the Menu</Link></div>
  }
  return <div className="product-grid" style={{ marginTop: 'var(--sp-3)' }}>{items.map((i) => <ProductCard key={i.id} item={i} />)}</div>
}
