import { useState } from 'react'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'

const STATS = [
  { n: '10+', l: 'Years Brewing' }, { n: '25+', l: 'Coffee Varieties' },
  { n: '50K+', l: 'Happy Customers' }, { n: '4.9', l: 'Average Rating' },
]
const VALUES = [
  { t: 'Quality First', p: 'We never cut corners. Fresh beans, real milk, and pastries baked the same morning.' },
  { t: 'Warm Hospitality', p: 'Everyone is a regular after their first visit. We learn your name and your order.' },
  { t: 'Sustainable Sourcing', p: 'We partner with farms that pay fair wages and farm with care for the land.' },
]
const DIFFERENCE = [
  { t: 'Roasted In-House', p: 'Fresher beans mean a better cup. We roast every week, not every year.', icon: <path d="M20 6 9 17l-5-5" /> },
  { t: 'Local & Loved', p: "A neighbourhood café that's become a city favourite, one cup at a time.", icon: <><path d="M12 21s-7-4.5-7-11a7 7 0 0 1 14 0c0 6.5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></> },
  { t: 'Always Fresh', p: 'Pastry shelves are refilled twice a day. Nothing sits overnight.', icon: <><circle cx="12" cy="12" r="9" /><path d="M8 12h8M12 8v8" /></> },
  { t: 'Made With Care', p: 'Every drink is made to order by baristas who love the craft.', icon: <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5z" /> },
]

// Tabbed "Our Journey" timeline — tabs are driven by a single piece of state.
const JOURNEY = {
  2015: 'Two friends and a second-hand espresso machine open a tiny corner café in Bandra.',
  2018: 'We start roasting our own beans in-house and launch the fresh-pastry counter.',
  2021: 'Cold-brew line and online table reservations arrive; the team doubles in size.',
  2025: 'Ten years in: 50K+ happy guests and a brand-new digital front door.',
}

export default function About() {
  const years = Object.keys(JOURNEY)
  const [year, setYear] = useState(years[0])

  return (
    <>
      <PageHero title="About Brew & Bean" subtitle="A decade of brewing comfort, one cup at a time." crumbs={[{ label: 'About' }]} />

      <section className="section">
        <div className="container">
          <div className="about-grid">
            <Reveal>
              <span className="eyebrow" style={{ color: 'var(--accent)', fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', fontSize: '.8rem' }}>Our Story</span>
              <h2>It Started With One Espresso Machine</h2>
              <p>In 2015, two friends and a second-hand espresso machine opened a tiny corner café with one belief: coffee should feel like a warm welcome. Ten years later, Brew &amp; Bean is still that place — only with more seats, more beans, and a lot more regulars.</p>
              <p>We roast our own beans, bake our own pastries, and remember your usual order. Everything we do is about slowing down for a moment that matters.</p>
            </Reveal>
            <Reveal as="img" src="https://images.pexels.com/photos/32132452/pexels-photo-32132452.jpeg?auto=compress&cs=tinysrgb&h=800&w=900" alt="Warm vintage style coffee shop interior" />
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <Reveal className="section-head"><span className="eyebrow">By the Numbers</span><h2>A Decade of Brewing</h2></Reveal>
          <div className="stats-grid">
            {STATS.map((s) => (
              <Reveal className="stat-card" key={s.l}><div className="stat-number">{s.n}</div><div className="stat-label">{s.l}</div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <div className="about-grid reverse">
            <Reveal>
              <span className="eyebrow" style={{ color: 'var(--accent)', fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', fontSize: '.8rem' }}>Our Coffee</span>
              <h2>Beans We&apos;re Proud Of</h2>
              <p>We source single-origin beans from small farms across India and beyond, then roast them in-house in small batches. From bright, fruity pour-overs to chocolatey espresso blends — every cup tells a story.</p>
              <p>Our baristas train for months before they pull their first shot for a guest. The craft matters, and you can taste it.</p>
            </Reveal>
            <Reveal as="img" src="https://images.pexels.com/photos/5151354/pexels-photo-5151354.jpeg?auto=compress&cs=tinysrgb&h=800&w=900" alt="Barista pouring latte art into a cup" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head"><span className="eyebrow">What We Stand For</span><h2>Our Values</h2><p>The principles behind every brew, every bake, and every welcome.</p></Reveal>
          <div className="values-grid">
            {VALUES.map((v) => <Reveal as="article" className="value-card" key={v.t}><h3>{v.t}</h3><p>{v.p}</p></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <Reveal className="section-head"><span className="eyebrow">Our Journey</span><h2>From Corner Café to City Favourite</h2></Reveal>
          <div className="tabs" role="tablist">
            {years.map((y) => (
              <button key={y} role="tab" aria-selected={y === year} className={`filter-btn${y === year ? ' active' : ''}`} onClick={() => setYear(y)}>{y}</button>
            ))}
          </div>
          <div className="tab-panel" role="tabpanel"><h3>{year}</h3><p>{JOURNEY[year]}</p></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head"><span className="eyebrow">Why Choose Us</span><h2>The Brew &amp; Bean Difference</h2></Reveal>
          <div className="feature-grid">
            {DIFFERENCE.map((d) => (
              <Reveal as="article" className="feature-card" key={d.t}>
                <div className="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{d.icon}</svg></div>
                <h3>{d.t}</h3><p>{d.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
