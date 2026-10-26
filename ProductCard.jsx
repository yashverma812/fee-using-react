import { useState, useEffect, memo } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import { formatPrice } from '../data/menu'
import Stars from './Stars'

// Props: item, onQuickView (optional). React.memo skips re-render if props are unchanged.
function ProductCard({ item, onQuickView }) {
  const { addToCart } = useCart()
  const { has, toggle } = useWishlist()
  const { showToast } = useToast()
  const [added, setAdded] = useState(false)
  const liked = has(item.id)

  // Reset the "Added ✓" label after 1.2s; cleanup avoids a stale timer.
  useEffect(() => {
    if (!added) return
    const t = setTimeout(() => setAdded(false), 1200)
    return () => clearTimeout(t)
  }, [added])

  const handleAdd = () => {
    addToCart(item.id)
    setAdded(true)
    showToast(`${item.name} added to cart`)
  }

  const handleLike = () => {
    toggle(item.id)
    showToast(liked ? 'Removed from wishlist' : 'Saved to wishlist ♥', liked ? 'info' : 'success')
  }

  return (
    <article className="product-card">
      <div className="product-media">
        <Link to={`/menu/${item.id}`}>
          <img src={item.image} alt={item.name} loading="lazy" />
        </Link>
        <span className="product-cat">{item.category}</span>
        <button
          className={`wish-btn${liked ? ' active' : ''}`}
          onClick={handleLike}
          aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={liked}
        >
          {liked ? '♥' : '♡'}
        </button>
      </div>
      <div className="product-body">
        <h3><Link to={`/menu/${item.id}`}>{item.name}</Link></h3>
        <p className="product-desc">{item.description}</p>
        <div className="product-foot">
          <div className="product-meta">
            <span className="product-price">{formatPrice(item.price)}</span>
            <span className="product-rating" aria-label={`Rated ${item.rating} out of 5`}>
              <Stars rating={item.rating} /> {item.rating}
            </span>
          </div>
          <div className="card-actions">
            {onQuickView && (
              <button className="btn btn-ghost btn-sm" onClick={() => onQuickView(item)}>Quick view</button>
            )}
            <button className="btn btn-primary btn-sm" onClick={handleAdd}>
              {added ? 'Added ✓' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default memo(ProductCard)
