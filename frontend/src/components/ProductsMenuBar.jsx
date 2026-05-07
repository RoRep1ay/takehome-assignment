import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import hamburger from '../assets/hamburger.svg'
import seFlag from '../assets/SE.png'
import gbFlag from '../assets/GB.png'
import userIcon from '../assets/user-icon.svg'
import { productsMenuItems } from '../utils/productsMenuItems'
import './ProductsMenuBar.css'
import { useEffect, useRef } from 'react'
import { useGetMeApi } from '../hooks/useGetMeApi'
import { useLogout } from '../hooks/useLogout'

export const ProductsMenuBar = () => {
  const [open, setOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const { i18n } = useTranslation()
  const language = i18n.language || 'en'
  const currentFlag = language === 'sv' ? seFlag : gbFlag
  const { data, isLoading } = useGetMeApi()
  const logout = useLogout()

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

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="products-menu">
      <div className="products-menu__section" ref={menuRef}>
        <button
          type="button"
          className="products-menu__toggle"
          onClick={() => setOpen((currentOpen) => !currentOpen)}
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

            if (item.label === 'Log out') {
              return (
                <li key={item.label} className={itemClassName} onClick={logout}>
                  <span className="products-menu__dot"></span>
                  <span>{item.label}</span>
                </li>
              )
            }

            return (
              <li key={item.label} className={itemClassName}>
                <span className="products-menu__dot"></span>
                <span>{item.label}</span>
              </li>
            )
          })}
        </ul>

        <div className="products-menu__profile-container">
          <div className="products-menu__image-div">
            <img src={userIcon} className="products-menu__user-icon"  />
          </div>
          <div>
            <div className="products-menu__user-name">{data?.username}</div>
            <div className="products-menu__user-email">{data?.email}</div>
          </div>
        </div>
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
