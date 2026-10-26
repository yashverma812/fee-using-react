import { Link, useParams, useNavigate } from 'react-router-dom'
import { findMenuItem, menuItems, formatPrice } from '../data/menu'
import PageHero from '../components/PageHero'
import ProductCard from '../components/ProductCard'
import Stars from '../components/Stars'
import NotFound from './NotFound'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

// Dynamic route: /menu/:id — useParams reads the id from the URL.
export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const item = findMenuItem(id)

  if (!item) return <NotFound message="That menu item doesn't exist." />

  const related = menuItems.filter((m) => m.category === item.category && m.id !== item.id).slice(0, 3)

  return (
    <>
      <PageHero title={item.name} subtitle={item.description} crumbs={[{ label: 'Menu', to: '/menu' }, { label: item.name }]} />
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <img src={item.image} alt={item.name} />
            <div>
              <span className="product-cat static">{item.category}</span>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p className="product-rating"><Stars rating={item.rating} /> {item.rating} / 5</p>
              <p className="quick-price">{formatPrice(item.price)}</p>
              <div className="card-actions">
                <button className="btn btn-primary" onClick={() => { addToCart(item.id); showToast(`${item.name} added to cart`) }}>Add to Cart</button>
                <button className="btn btn-outline" onClick={() => navigate(-1)}>← Back</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section-cream">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">You may also like</span>
              <h2>More from {item.category}</h2>
            </div>
            <div className="product-grid">
              {related.map((r) => <ProductCard key={r.id} item={r} />)}
            </div>
            <div className="center-actions"><Link to="/menu" className="btn btn-outline">Back to Menu</Link></div>
          </div>
        </section>
      )}
    </>
  )
}
