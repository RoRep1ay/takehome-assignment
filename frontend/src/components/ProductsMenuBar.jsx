import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import hamburger from '../assets/hamburger.svg'
import seFlag from '../assets/SE.png'
import gbFlag from '../assets/GB.png'
import { productsMenuItems } from '../utils/productsMenuItems'
import './ProductsMenuBar.css'
import { useEffect, useRef } from 'react'

export const ProductsMenuBar = () => {
  const [open, setOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const { i18n } = useTranslation()
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

  return (
    <div className="products-menu">
      <div className="products-menu__section" ref={menuRef}>
        <button
          type="button"
          className="products-menu__toggle"
          onClick={() => setOpen((currentOpen) => !currentOpen)}
          aria-label="Open products menu"
        >
          <img src={hamburger} className="products-menu__toggle-icon" alt="" />
        </button>

        <ul
          className={`products-menu__list ${open ? 'products-menu__list--open' : ''}`}
        >
          {productsMenuItems.map((item) => {
            const itemClassName = [
              'products-menu__item',
              item.isActive ? 'products-menu__item--active' : '',
              item.isDisabled ? 'products-menu__item--disabled' : '',
            ]
              .filter(Boolean)
              .join(' ')

            return (
              <li key={item.label} className={itemClassName}>
                <span className="products-menu__dot"></span>
                <span>{item.label}</span>
              </li>
            )
          })}
        </ul>
      </div>

      <div
        className="products-menu__section products-menu__section--language"
        ref={languageMenuRef}
      >
        <button
          type="button"
          className="products-menu__language-button"
          onClick={() => setLanguageOpen((currentOpen) => !currentOpen)}
          aria-haspopup="true"
          aria-expanded={languageOpen}
        >
          <span>{language === 'sv' ? 'Svenska' : 'English'}</span>
          <img
            className="products-menu__flag"
            src={currentFlag}
            alt={language === 'sv' ? 'Swedish flag' : 'British flag'}
          />
        </button>

        {languageOpen ? (
          <div className="products-menu__language-menu">
            <button
              type="button"
              className="products-menu__language-option"
              onClick={() => handleLanguageChange('sv')}
            >
              <span>Svenska</span>
              <img
                className="products-menu__flag"
                src={seFlag}
                alt="Swedish flag"
              />
            </button>
            <button
              type="button"
              className="products-menu__language-option"
              onClick={() => handleLanguageChange('en')}
            >
              <span>English</span>
              <img
                className="products-menu__flag"
                src={gbFlag}
                alt="British flag"
              />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
