import { useState, useEffect } from 'react'

// Custom hook: returns `value` only after the user stops changing it for `delay` ms.
export default function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t) // cleanup on every change
  }, [value, delay])
  return debounced
}
