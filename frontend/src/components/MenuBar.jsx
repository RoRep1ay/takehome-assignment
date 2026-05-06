import { useState, useRef, useEffect } from 'react'
import './MenuBar.css'
import diamond from '../assets/diamond.png'
import hamburger from '../assets/hamburger.svg'
import seFlag from '../assets/SE.png'
import gbFlag from '../assets/GB.png'
import { useTranslation } from 'react-i18next'

export const MenuBar = () => {
  const [open, setOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const { t, i18n } = useTranslation()
  const language = i18n.language || 'en'
  const currentFlag = language === 'sv' ? seFlag : gbFlag

  const menuRef = useRef(null)
  const languageMenuRef = useRef(null)

  useEffect(() => {
    if (!open) {
      return
    }
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  useEffect(() => {
    if (!languageOpen) {
      return
    }
    const handleClickOutside = (event) => {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target)
      ) {
        setLanguageOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [languageOpen])

  const handleLanguageChange = (nextLanguage) => {
    i18n.changeLanguage(nextLanguage)
    setLanguageOpen(false)
  }

  const handleMenuClose = () => {
    setOpen(false)
    setLanguageOpen(false)
  }

  return (
    <div className="menu-bar__navigation">
      <div className="menu-bar__navigation-menu" ref={menuRef}>
        <div className="menu-bar__image-container">
          <img className="menu-bar__image" src={diamond} alt="" />
        </div>

        <button
          type="button"
          className="menu-bar__toggle"
          onClick={() => setOpen((currentOpen) => !currentOpen)}
        >
          <img src={hamburger} className="menu-bar__toggle-icon" alt="" />
        </button>

        <ul className={`menu-bar__list ${open ? 'menu-bar__list--open' : ''}`}>
          <li className="menu-bar__item">
            <a href="#" onClick={handleMenuClose}>
              {t(`home`)}
            </a>
          </li>
          <li className="menu-bar__item">
            <a href="#" onClick={handleMenuClose}>
              {t(`order`)}
            </a>
          </li>
          <li className="menu-bar__item">
            <a href="#" onClick={handleMenuClose}>
              {t(`our_customers`)}
            </a>
          </li>
          <li className="menu-bar__item">
            <a href="#" onClick={handleMenuClose}>
              {t(`about_us`)}
            </a>
          </li>
          <li className="menu-bar__item">
            <a href="#" onClick={handleMenuClose}>
              {t(`contact_us`)}
            </a>
          </li>
        </ul>
      </div>

      <div className="menu-bar__language-wrap" ref={languageMenuRef}>
        <button
          type="button"
          className="menu-bar__language-button"
          onClick={() => setLanguageOpen((currentOpen) => !currentOpen)}
          aria-haspopup="true"
          aria-expanded={languageOpen}
        >
          <span>{language === 'sv' ? 'Svenska' : 'English'}</span>
          <img
            className="menu-bar__flag"
            src={currentFlag}
            alt={language === 'sv' ? 'Swedish flag' : 'British flag'}
          />
        </button>

        {languageOpen ? (
          <div className="menu-bar__language-menu">
            <button
              type="button"
              className="menu-bar__language-option"
              onClick={() => handleLanguageChange('sv')}
            >
              <span>Svenska</span>
              <img className="menu-bar__flag" src={seFlag} alt="Swedish flag" />
            </button>
            <button
              type="button"
              className="menu-bar__language-option"
              onClick={() => handleLanguageChange('en')}
            >
              <span>English</span>
              <img className="menu-bar__flag" src={gbFlag} alt="British flag" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
