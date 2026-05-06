import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSWRConfig } from 'swr'
import { useLoginApi } from '../hooks/useLoginApi'
import './Login.css'
import { useGetMeApi, GETME_ENDPOINT } from '../hooks/useGetMeApi'
import { useTranslation } from 'react-i18next'
import eyeOpenIcon from '../assets/eye-open-icon.svg'
import eyeCloseIcon from '../assets/eye-close-icon.svg'

export const Login = () => {
  const navigate = useNavigate()
  const { mutate } = useSWRConfig()
  const { login, isLoading } = useLoginApi()
  const { t } = useTranslation()
  useGetMeApi()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [errorMessage, setErrorMessage] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    document.body.classList.add('login-page')

    return () => {
      document.body.classList.remove('login-page')
    }
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await login(form)
      await mutate(GETME_ENDPOINT)
      navigate('/products', { replace: true })
    } catch (error) {
      console.log('Login failed:', error)
      setErrorMessage(t(`login_failed`))
    }
  }

  return (
    <div>
      <div className="main">
        <div className="box">
          <div className="title">{t(`login`)}</div>

          <form onSubmit={handleSubmit} className="form">
            <div className="field">
              <label htmlFor="email">{t(`enter_email_address`)}</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder={t(`email_address`)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="password">{t(`enter_password`)}</label>

              <div className="input-row">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  placeholder={t(`password`)}
                  required
                />

                <button
                  type="button"
                  className="eye"
                  onClick={() =>
                    setShowPassword((currentValue) => !currentValue)
                  }
                >
                  <img
                    src={showPassword ? eyeOpenIcon : eyeCloseIcon}
                    className="eye-icon"
                  />
                </button>
              </div>
            </div>

            {errorMessage ? <p className="error">{errorMessage}</p> : null}

            <div className="actions">
              <button type="submit" disabled={isLoading} className="submit">
                {isLoading ? t(`logging_in`) : t(`login`)}
              </button>
            </div>

            <div className="links">
              <a href="#">{t(`register`)}</a>
              <a href="#">{t(`forgotten_password`)}</a>
            </div>
          </form>
        </div>

        <div className="footer">
          <div className="brand">123 Fakturera</div>

          <div className="bottom-links">
            <a href="#">{t(`home`)}</a>
            <a href="#">{t(`order`)}</a>
            <a href="#">{t(`contact_us`)}</a>
          </div>

          <div className="line"></div>
          <div className="copy">
            &copy; Lattfaktura, CRO no. 638537, 2025. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}
