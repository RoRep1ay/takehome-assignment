import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginApi } from '../hooks/useLoginApi'

export const Login = () => {
  const navigate = useNavigate()
  const { login, isLoading, error } = useLoginApi()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await login(form)
    navigate('/products', { replace: true })
  }

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          name='email'
          type='email'
          value={form.email}
          onChange={handleChange}
          autoComplete='email'
          required
        />

        <label htmlFor='password'>Password</label>
        <input
          id='password'
          name='password'
          type='password'
          value={form.password}
          onChange={handleChange}
          autoComplete='current-password'
          required
        />

        {error ? <p>{error.message}</p> : null}

        <button type='submit' disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </main>
  )
}
