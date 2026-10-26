import { useState, useMemo, useCallback, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { menuItems, CATEGORIES, formatPrice } from '../data/menu'
import ProductCard from '../components/ProductCard'
import PageHero from '../components/PageHero'
import Modal from '../components/Modal'
import Stars from '../components/Stars'
import useDebounce from '../hooks/useDebounce'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

const PAGE_SIZE = 6
const SORTS = {
  featured: { label: 'Featured', fn: () => 0 },
  priceAsc: { label: 'Price: Low → High', fn: (a, b) => a.price - b.price },
  priceDesc: { label: 'Price: High → Low', fn: (a, b) => b.price - a.price },
  rating: { label: 'Top Rated', fn: (a, b) => b.rating - a.rating },
}

export default function Menu() {
  // Filters live in the URL (?cat=Tea&q=chai) so they survive refresh and can be shared.
  const [params, setParams] = useSearchParams()
  const activeCategory = params.get('cat') || 'All'
  const [search, setSearch] = useState(params.get('q') || '')
  const [sort, setSort] = useState('featured')
  const [page, setPage] = useState(1)
  const [quick, setQuick] = useState(null) // item shown in the modal

  const debouncedSearch = useDebounce(search, 300)
  const { addToCart } = useCart()
  const { showToast } = useToast()

  const setCategory = (cat) => {
    const next = new URLSearchParams(params)
    cat === 'All' ? next.delete('cat') : next.set('cat', cat)
    setParams(next, { replace: true })
  }

  // Keep ?q= in sync with the debounced search value.
  useEffect(() => {
    const next = new URLSearchParams(params)
    debouncedSearch ? next.set('q', debouncedSearch) : next.delete('q')
    setParams(next, { replace: true })
    setPage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  useEffect(() => { setPage(1) }, [activeCategory, sort])

  // useMemo: re-filter / re-sort only when one of the inputs changes.
  const filtered = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase()
    return menuItems
      .filter((item) => {
        const okCat = activeCategory === 'All' || item.category === activeCategory
        const okSearch = !q || item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
        return okCat && okSearch
      })
      .sort(SORTS[sort].fn)
  }, [debouncedSearch, activeCategory, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const closeQuick = useCallback(() => setQuick(null), [])
  const openQuick = useCallback((item) => setQuick(item), [])

  return (
    <>
      <PageHero
        title="Our Menu"
        subtitle="Browse, search, and filter everything we brew and bake. Add your favourites to the cart as you go."
        crumbs={[{ label: 'Menu' }]}
      />
      <section className="section">
        <div className="container">
          <div className="menu-controls">
            <div className="search-bar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
              <input
                type="search"
                placeholder="Search for a drink or pastry…"
                aria-label="Search menu"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="filter-row" role="group" aria-label="Category filters">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-btn${cat === activeCategory ? ' active' : ''}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="menu-toolbar">
            <p className="menu-meta" aria-live="polite">
              {filtered.length} item{filtered.length === 1 ? '' : 's'} found
            </p>
            <label className="sort-select">
              Sort by
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {Object.entries(SORTS).map(([key, s]) => <option key={key} value={key}>{s.label}</option>)}
              </select>
            </label>
          </div>

          {filtered.length === 0 ? (
            <div className="no-items" style={{ display: 'block' }}>
              <div className="icon" aria-hidden="true">☕</div>
              <h3>No items found</h3>
              <p>Try a different search term or category.</p>
            </div>
          ) : (
            <div className="product-grid">
              {visible.map((item) => <ProductCard key={item.id} item={item} onQuickView={openQuick} />)}
            </div>
          )}

          {totalPages > 1 && (
            <nav className="pagination" aria-label="Menu pages">
              <button className="btn btn-ghost btn-sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>← Prev</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} className={`page-btn${page === i + 1 ? ' active' : ''}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
              ))}
              <button className="btn btn-ghost btn-sm" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>Next →</button>
            </nav>
          )}
        </div>
      </section>

      {/* Quick-view modal */}
      <Modal open={!!quick} onClose={closeQuick} title={quick?.name}>
        {quick && (
          <div className="quick-view">
            <img src={quick.image} alt={quick.name} />
            <div className="quick-body">
              <span className="product-cat static">{quick.category}</span>
              <h2>{quick.name}</h2>
              <p>{quick.description}</p>
              <p className="product-rating"><Stars rating={quick.rating} /> {quick.rating}</p>
              <p className="quick-price">{formatPrice(quick.price)}</p>
              <div className="card-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => { addToCart(quick.id); showToast(`${quick.name} added to cart`); closeQuick() }}
                >
                  Add to Cart
                </button>
                <Link className="btn btn-outline" to={`/menu/${quick.id}`} onClick={closeQuick}>Full details</Link>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
