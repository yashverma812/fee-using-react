import { useState, useEffect } from 'react'

// Custom hook: useState that is mirrored into localStorage as JSON.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.error('localStorage write failed:', err)
    }
  }, [key, value])

  return [value, setValue]
}
