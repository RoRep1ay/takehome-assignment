import { useState } from "react"
import { NavLink, useNavigate } from 'react-router-dom'
import { useSWRConfig } from 'swr'
import './MenuBar.css'
import diamond from '../assets/diamond.png' 
import hamburger from '../assets/hamburger.svg'
import seFlag from '../assets/SE.png'
import gbFlag from '../assets/GB.png'
import { useTranslation } from "react-i18next"
import { GETME_ENDPOINT, useGetMeApi } from "../hooks/useGetMeApi"
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../utils/request'

export const MenuBar = () => {
  const [open, setOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const navigate = useNavigate()
  const { mutate } = useSWRConfig()

  const { data, error, isLoading } = useGetMeApi()

  const { t, i18n  } = useTranslation()
  const language = i18n.language || 'en'

  const currentFlag = language === 'sv' ? seFlag : gbFlag

  const handleLanguageChange = (nextLanguage) => {
    i18n.changeLanguage(nextLanguage)
    setLanguageOpen(false)
  }

  const handleMenuClose = () => {
    setOpen(false)
  }

  const handleLogout = async () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    await mutate(GETME_ENDPOINT, undefined, false)
    handleMenuClose()
    navigate('/login', { replace: true })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <div className="navigation">
    <div className="navigation-item" id="menu-container">
        <div className="img-brand-div"><img className="img-brand" src={diamond} /></div>

        <button
          type="button"
          id="hamburger-button"
          onClick={() => setOpen((currentOpen) => !currentOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="primary-navigation"
        >
          <img src={hamburger} id="hamburger"/>
        </button>

      <ul className={`menu-items ${open ? 'menu-items-open' : ''}`}>
        <li className='menu-item'><NavLink to='/' onClick={handleMenuClose}>{t(`home`)}</NavLink></li>
        <li className='menu-item'><NavLink to='/products' onClick={handleMenuClose}>{t(`products`)}</NavLink></li>
        <li className='menu-item'><NavLink to='/about' onClick={handleMenuClose}>{t(`aboutUs`)}</NavLink></li>
        {error ? <li className='menu-item'>
          <NavLink to='/login' onClick={handleMenuClose}>{t(`login`)}</NavLink></li> : 
          <li className='menu-item'><button type='button' className='menu-button' onClick={handleLogout}>Logout</button>

          </li>}
      </ul>
    </div>

    <div className="navigation-item" id="flag-container">
      <button
        type="button"
        id="language-button"
        onClick={() => setLanguageOpen((currentOpen) => !currentOpen)}
        aria-haspopup="true"
        aria-expanded={languageOpen}
      >
        <span>{language === 'sv' ? 'Svenska' : 'English'}</span>
        <img className="language-flag" src={currentFlag} alt={language === 'sv' ? 'Swedish flag' : 'British flag'} />
        <span className="language-caret">&#9662;</span>
      </button>

      {languageOpen ? (
        <div className="language-menu">
          <button type="button" className="language-option" onClick={() => handleLanguageChange('en')}>
            <img className="language-flag" src={gbFlag} alt="British flag" />
            <span>English</span>
          </button>
          <hr className="m-0" />
          <button type="button" className="language-option" onClick={() => handleLanguageChange('sv')}>
            <img className="language-flag" src={seFlag} alt="Swedish flag" />
            <span>Svenska</span>
          </button>
        </div>
      ) : null}
    </div>

  </div>
}
