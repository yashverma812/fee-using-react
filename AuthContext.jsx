import { createContext, useContext, useMemo, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

// Demo auth (no backend): the "user" is stored in localStorage via our custom hook.
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('brewbean_user', null)

  const login = useCallback((name, email) => setUser({ name, email }), [setUser])
  const logout = useCallback(() => setUser(null), [setUser])

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
