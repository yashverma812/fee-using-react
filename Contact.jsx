import { useState } from 'react'
import PageHero from '../components/PageHero'
import Input from '../components/Input'
import Reveal from '../components/Reveal'
import useForm from '../hooks/useForm'
import { minLen, email, optionalPhone } from '../hooks/validators'

const validators = {
  name: minLen(2, 'Please enter your name.'),
  email,
  phone: optionalPhone,
  subject: minLen(3, 'Please add a subject.'),
  message: minLen(10, 'Your message is a little short.'),
}

const icon = (d) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{d}</svg>

export default function Contact() {
  const { field, validateAll, reset } = useForm({ name: '', email: '', phone: '', subject: '', message: '' }, validators)
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    if (validateAll()) setSent(true)
  }
  const again = () => { reset(); setSent(false) }

  return (
    <>
      <PageHero title="Get in Touch" subtitle="Questions, feedback, or just want to say hi? We'd love to hear from you." crumbs={[{ label: 'Contact' }]} />
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <Reveal>
              <div className="info-card"><h3>{icon(<><path d="M12 21s-7-4.5-7-11a7 7 0 0 1 14 0c0 6.5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>)} Visit Us</h3><p>42, Coffee Lane, Bandra West,<br />Mumbai 400050, Maharashtra, India</p></div>
              <div className="info-card"><h3>{icon(<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />)} Call &amp; Email</h3><p>+91 98765 43210<br />hello@brewandbean.in</p></div>
              <div className="info-card"><h3>{icon(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>)} Opening Hours</h3><p>Monday – Friday: 7:00 AM – 10:00 PM<br />Saturday – Sunday: 8:00 AM – 11:00 PM</p></div>
              <div className="info-card"><h3>Follow Us</h3><p>Tag your coffee moments with #BrewAndBean.</p>
                <div className="socials"><a href="#" aria-label="Instagram">IG</a><a href="#" aria-label="Facebook">FB</a><a href="#" aria-label="Twitter">TW</a></div></div>
            </Reveal>

            <Reveal>
              {sent ? (
                <div className="form-success show" role="status" aria-live="polite">
                  <div className="check" aria-hidden="true">✓</div>
                  <h2>Message Sent!</h2>
                  <p>Thanks for reaching out. We&apos;ll reply within 24 hours.</p>
                  <button className="btn btn-outline" onClick={again}>Send Another</button>
                </div>
              ) : (
                <form className="form-card" onSubmit={onSubmit} noValidate>
                  <div className="form-grid">
                    <Input label="Name" required full autoComplete="name" {...field('name')} />
                    <Input label="Email" type="email" required autoComplete="email" {...field('email')} />
                    <Input label="Phone" type="tel" autoComplete="tel" placeholder="Optional" {...field('phone')} />
                    <Input label="Subject" required full {...field('subject')} />
                    <Input label="Message" textarea required full placeholder="Tell us how we can help…" {...field('message')} />
                  </div>
                  <div className="center-actions"><button type="submit" className="btn btn-primary">Send Message</button></div>
                </form>
              )}
              <div className="map-placeholder" style={{ marginTop: 'var(--sp-3)' }} aria-label="Map placeholder">
                <div><strong>Find us on the map</strong><p>42, Coffee Lane, Bandra West, Mumbai</p></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
