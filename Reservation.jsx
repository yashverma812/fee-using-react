import { useState, useRef, useEffect } from 'react'
import PageHero from '../components/PageHero'
import Input from '../components/Input'
import useForm from '../hooks/useForm'
import { required, minLen, email, phone } from '../hooks/validators'

const today = () => new Date().toISOString().split('T')[0]

const validators = {
  name: minLen(2, 'Please enter your full name.'),
  email,
  phone,
  guests: (v) => {
    const n = Number(v)
    if (!n || n < 1) return 'At least one guest is required.'
    if (n > 20) return 'For groups over 20, please call us directly.'
    return ''
  },
  date: (v) => (!v ? 'Please choose a date.' : v < today() ? 'Date cannot be in the past.' : ''),
  time: required('Please choose a time.'),
}

export default function Reservation() {
  const { values, field, validateAll, reset } = useForm(
    { name: '', email: '', phone: '', guests: 2, date: '', time: '', request: '' },
    validators,
  )
  const [booked, setBooked] = useState(null)
  const successRef = useRef(null)

  // Scroll the confirmation into view once it appears.
  useEffect(() => {
    if (booked) successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [booked])

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validateAll()) return
    const prettyDate = new Date(values.date).toLocaleDateString('en-IN', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    })
    setBooked(`Thank you, ${values.name.trim()}! Your table for ${values.guests} is reserved for ${prettyDate} at ${values.time}. We can't wait to host you.`)
  }

  const another = () => { reset(); setBooked(null) }

  return (
    <>
      <PageHero title="Book a Table" subtitle="Save your spot for a cozy moment. We'll have your table ready." crumbs={[{ label: 'Reservation' }]} />
      <section className="section">
        <div className="container">
          {booked ? (
            <div className="form-success show" ref={successRef} role="status" aria-live="polite">
              <div className="check" aria-hidden="true">✓</div>
              <h2>Table Reserved!</h2>
              <p>{booked}</p>
              <button className="btn btn-outline" onClick={another}>Book Another Table</button>
            </div>
          ) : (
            <form className="form-card" onSubmit={onSubmit} noValidate>
              <div className="form-grid">
                <Input label="Full Name" required autoComplete="name" {...field('name')} />
                <Input label="Email" type="email" required autoComplete="email" {...field('email')} />
                <Input label="Phone Number" type="tel" required autoComplete="tel" placeholder="10-digit mobile number" {...field('phone')} />
                <Input label="Number of Guests" type="number" min="1" max="20" required {...field('guests')} />
                <Input label="Date" type="date" min={today()} required {...field('date')} />
                <Input label="Time" type="time" required {...field('time')} />
                <Input label="Special Request" textarea full placeholder="Window seat, birthday cake, high chair…" {...field('request')} />
              </div>
              <div className="center-actions"><button type="submit" className="btn btn-primary">Confirm Reservation</button></div>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
