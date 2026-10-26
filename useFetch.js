import { useState, useEffect, useCallback } from 'react'

// Custom hook: fetch + loading / error state + manual refetch + automatic retry.
export default function useFetch(url, { retries = 2 } = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tick, setTick] = useState(0)

  const refetch = useCallback(() => setTick((t) => t + 1), [])

  useEffect(() => {
    const controller = new AbortController()
    let cancelled = false

    const run = async () => {
      setLoading(true)
      setError(null)
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          const res = await fetch(url, { signal: controller.signal })
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          const json = await res.json()
          if (!cancelled) { setData(json); setLoading(false) }
          return
        } catch (err) {
          if (err.name === 'AbortError') return
          if (attempt === retries && !cancelled) {
            setError(err.message)
            setLoading(false)
          }
        }
      }
    }
    run()

    return () => { cancelled = true; controller.abort() }
  }, [url, retries, tick])

  return { data, loading, error, refetch }
}
