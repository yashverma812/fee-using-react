import { createContext, useContext, useMemo, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

// Wishlist = array of menu item ids, saved in localStorage.
const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [ids, setIds] = useLocalStorage('brewbean_wishlist', [])

  const toggle = useCallback(
    (id) => setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    [setIds],
  )
  const has = useCallback((id) => ids.includes(id), [ids])

  const value = useMemo(() => ({ ids, toggle, has }), [ids, toggle, has])
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used inside <WishlistProvider>')
  return ctx
}
