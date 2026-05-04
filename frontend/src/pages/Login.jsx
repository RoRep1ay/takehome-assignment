import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSWRConfig } from 'swr'
import { useLoginApi } from '../hooks/useLoginApi'
import './Login.css'
import { useGetMeApi, GETME_ENDPOINT } from '../hooks/useGetMeApi'
import { useTranslation } from 'react-i18next'

export const Login = () => {
  const navigate = useNavigate()
  const { mutate } = useSWRConfig()
  const { login, isLoading, error } = useLoginApi()
  const { t } = useTranslation()
  const { data } = useGetMeApi()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    document.body.classList.add('login-page')

    return () => {
      document.body.classList.remove('login-page')
    }
  }, [])

  // useEffect(() => {
  //   if (data) {
  //     navigate('/products', { replace: true })
  //   }
  // }, [data, navigate])

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
    await mutate(GETME_ENDPOINT)
    navigate('/products', { replace: true })
  }

  return (
    <div className='parent-container'>
      <div className='flex flex-col' id='login-container'>
        <div id='login-label'>{t(`login`)}</div>
        <form onSubmit={handleSubmit} className='flex flex-col' id='login-form'>
          <label htmlFor='email'>{t(`email`)}</label>
          <input
            id='email'
            name='email'
            type='email'
            value={form.email}
            onChange={handleChange}
            autoComplete='email'
            required
          />

          <label htmlFor='password'>{t(`password`)}</label>
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

          <div className='flex justify-center'>
            <button type='submit' disabled={isLoading} >
              {isLoading ? 'Logging in...' : t(`login`)}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
