import { createContext, useContext, useMemo, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

// Past orders, saved after checkout so the Account page can list them.
const OrdersContext = createContext(null)

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useLocalStorage('brewbean_orders', [])

  const addOrder = useCallback(
    (order) => {
      const full = { id: 'BB' + Date.now().toString().slice(-6), date: new Date().toISOString(), ...order }
      setOrders((prev) => [full, ...prev])
      return full
    },
    [setOrders],
  )

  const value = useMemo(() => ({ orders, addOrder }), [orders, addOrder])
  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
}

export const useOrders = () => {
  const ctx = useContext(OrdersContext)
  if (!ctx) throw new Error('useOrders must be used inside <OrdersProvider>')
  return ctx
}
