// Presentational component — renders 5 stars, `rating` of them filled.
export default function Stars({ rating }) {
  const full = Math.round(rating)
  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className={i < full ? 'star full' : 'star'}>★</span>
      ))}
    </>
  )
}
