import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Input from '../components/Input'
import useForm from '../hooks/useForm'
import { minLen, email } from '../hooks/validators'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const validators = {
  name: minLen(2, 'Please enter your name.'),
  email,
  password: minLen(6, 'Password must be at least 6 characters.'),
}

export default function Login() {
  const { user, login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/account' // where ProtectedRoute sent us from
  const { field, validateAll } = useForm({ name: '', email: '', password: '' }, validators)

  if (user) return <Navigate to={from} replace />

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validateAll()) return
    const f = new FormData(e.target)
    login(f.get('name').trim(), f.get('email').trim())
    showToast('Welcome to Brew & Bean ☕')
    navigate(from, { replace: true })
  }

  return (
    <>
      <PageHero title="Welcome Back" subtitle="Log in to check out, view your orders and keep your wishlist." crumbs={[{ label: 'Login' }]} />
      <section className="section">
        <div className="container">
          <form className="form-card" style={{ maxWidth: 520, margin: '0 auto' }} onSubmit={onSubmit} noValidate>
            <div className="form-grid">
              <Input label="Name" required full autoComplete="name" {...field('name')} />
              <Input label="Email" type="email" required full autoComplete="email" {...field('email')} />
              <Input label="Password" type="password" required full autoComplete="current-password" {...field('password')} />
            </div>
            <p className="muted text-center" style={{ fontSize: '.85rem' }}>Demo login — any name, valid email and 6+ character password works.</p>
            <div className="center-actions"><button type="submit" className="btn btn-primary">Log In</button></div>
          </form>
        </div>
      </section>
    </>
  )
}
