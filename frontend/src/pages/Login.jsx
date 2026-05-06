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
      <div className="login">
        <div className="login__card">
          <div className="login__title">{t(`login`)}</div>

          <form onSubmit={handleSubmit} className="login__form">
            <div className="login__field">
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

            <div className="login__field">
              <label htmlFor="password">{t(`enter_password`)}</label>

              <div className="login__input-row">
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
                  className="login__password-toggle"
                  onClick={() =>
                    setShowPassword((currentValue) => !currentValue)
                  }
                >
                  <img
                    src={showPassword ? eyeOpenIcon : eyeCloseIcon}
                    className="login__password-toggle-icon"
                    alt=""
                  />
                </button>
              </div>
            </div>

            {errorMessage ? <p className="login__error">{errorMessage}</p> : null}

            <div className="login__actions">
              <button type="submit" disabled={isLoading} className="login__submit">
                {isLoading ? t(`logging_in`) : t(`login`)}
              </button>
            </div>

            <div className="login__links">
              <a href="#">{t(`register`)}</a>
              <a href="#">{t(`forgotten_password`)}</a>
            </div>
          </form>
        </div>

        <div className="login__footer">
          <div className="login__brand">123 Fakturera</div>

          <div className="login__footer-links">
            <a href="#">{t(`home`)}</a>
            <a href="#">{t(`order`)}</a>
            <a href="#">{t(`contact_us`)}</a>
          </div>

          <div className="login__footer-rule"></div>
          <div className="login__copyright">
            &copy; Lattfaktura, CRO no. 638537, 2025. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}
