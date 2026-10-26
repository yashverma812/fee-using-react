import { createContext, useContext, useReducer, useEffect, useMemo } from 'react'
import { findMenuItem } from '../data/menu'

// Context API + useReducer: one global cart for the whole app.
const CartContext = createContext(null)
const CART_KEY = 'brewbean_cart'
export const TAX_RATE = 0.05

const loadInitial = () => {
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

// Pure reducer — state is an array of { id, qty }.
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const exists = state.find((i) => i.id === action.id)
      return exists
        ? state.map((i) => (i.id === action.id ? { ...i, qty: i.qty + 1 } : i))
        : [...state, { id: action.id, qty: 1 }]
    }
    case 'CHANGE_QTY':
      return state
        .map((i) => (i.id === action.id ? { ...i, qty: i.qty + action.delta } : i))
        .filter((i) => i.qty > 0)
    case 'REMOVE':
      return state.filter((i) => i.id !== action.id)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, undefined, loadInitial)

  // Persist to localStorage on every change.
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  // Derived values are memoised so they only recompute when the cart changes.
  const value = useMemo(() => {
    const lines = cart
      .map((entry) => ({ ...entry, item: findMenuItem(entry.id) }))
      .filter((l) => l.item)
    const count = lines.reduce((sum, l) => sum + l.qty, 0)
    const subtotal = lines.reduce((sum, l) => sum + l.item.price * l.qty, 0)
    const tax = Math.round(subtotal * TAX_RATE)
    return {
      lines, count, subtotal, tax, total: subtotal + tax,
      addToCart: (id) => dispatch({ type: 'ADD', id }),
      changeQty: (id, delta) => dispatch({ type: 'CHANGE_QTY', id, delta }),
      removeFromCart: (id) => dispatch({ type: 'REMOVE', id }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
    }
  }, [cart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
