import { useEffect, useMemo, useState } from 'react'
import { useProductsApi } from '../hooks/useProductsApi'
import { useUpdateProductApi } from '../hooks/useUpdateProductApi'
import { useTranslation } from 'react-i18next'
import addButtonIcon from '../assets/add-button-icon.svg'
import printIcon from '../assets/print-icon.svg'
import searchIcon from '../assets/search-icon.svg'
import toggleLeftIcon from '../assets/toggle-left-icon.svg'
import rightArrowIcon from '../assets/right-arrow-icon.svg'
import moreIcon from '../assets/more-icon.svg'
import { productsMenuItems } from '../utils/productsMenuItems'
import './Products.css'

const SearchField = ({ value, onChange, placeholder }) => {
  return (
    <div className="products__search-field">
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="products__search-input"
      />
      <button
        type="button"
        className="products__search-button"
        aria-label="Search"
      >
        <img
          src={searchIcon}
          alt=""
          className="products__icon products__search-icon"
        />
      </button>
    </div>
  )
}

const ToolButton = ({ type, label }) => {
  const icon =
    type === 'add'
      ? addButtonIcon
      : type === 'print'
        ? printIcon
        : toggleLeftIcon

  return (
    <button type="button" className="products__action-button">
      <span className="products__action-content">
        <span className="products__action-label">{label}</span>
        <img
          src={icon}
          alt=""
          className={`products__icon products__action-icon products__action-icon--${type}`}
        />
      </span>
    </button>
  )
}

const ProductRow = ({
  item,
  isActive,
  onActivate,
  onChange,
  onSaveSuccess,
  onSaveError,
  saveError,
}) => {
  const { updateProduct, error } = useUpdateProductApi(item.id)
  const fieldErrors = saveError?.data || error?.data || {}

  const handleSave = async () => {
    try {
      const updatedProduct = await updateProduct({
        article_no: item.article_no,
        name: item.name,
        price: item.price,
        in_stock: item.in_stock,
        unit: item.unit,
        description: item.description,
      })

      if (updatedProduct) {
        onSaveSuccess(updatedProduct)
      }
    } catch (saveError) {
      onSaveError(item.id, saveError)
    }
  }

  const rowClassName = isActive
    ? 'products__row products__row--active'
    : 'products__row'

  return (
    <>
      <div className={rowClassName}>
        <div className="products__marker">
          {isActive ? (
            <img
              src={rightArrowIcon}
              className="products__marker-icon"
              alt=""
            />
          ) : (
            ''
          )}
        </div>

        <div className="products__article">
          <input
            value={item.article_no || ''}
            onFocus={() => onActivate(item.id)}
            onChange={(event) =>
              onChange(item.id, 'article_no', event.target.value)
            }
            onBlur={handleSave}
          />
        </div>

        <div className="products__name">
          <input
            value={item.name}
            onFocus={() => onActivate(item.id)}
            onChange={(event) => onChange(item.id, 'name', event.target.value)}
            onBlur={handleSave}
          />
        </div>

        <div className="products__price">
          <input
            value={item.price}
            onFocus={() => onActivate(item.id)}
            onChange={(event) => onChange(item.id, 'price', event.target.value)}
            onBlur={handleSave}
          />
        </div>

        <div className="products__stock products__column--desktop-only">
          <input
            value={item.in_stock || ''}
            onFocus={() => onActivate(item.id)}
            onChange={(event) =>
              onChange(item.id, 'in_stock', event.target.value)
            }
            onBlur={handleSave}
          />
        </div>

        <div className="products__unit products__column--desktop-only">
          <input
            value={item.unit || ''}
            onFocus={() => onActivate(item.id)}
            onChange={(event) => onChange(item.id, 'unit', event.target.value)}
            onBlur={handleSave}
          />
        </div>

        <div className="products__description products__column--xl-only">
          <input
            value={item.description || ''}
            onFocus={() => onActivate(item.id)}
            onChange={(event) =>
              onChange(item.id, 'description', event.target.value)
            }
            onBlur={handleSave}
          />
        </div>

        <button type="button" className="products__more">
          <img src={moreIcon} className="products__more-icon" alt="" />
        </button>
      </div>

      {fieldErrors.article_no ||
      fieldErrors.name ||
      fieldErrors.price ||
      fieldErrors.in_stock ||
      fieldErrors.unit ||
      fieldErrors.description ? (
        <div className="products__note products__error-text">
          {fieldErrors.article_no ? <p>{fieldErrors.article_no}</p> : null}
          {fieldErrors.name ? <p>{fieldErrors.name}</p> : null}
          {fieldErrors.price ? <p>{fieldErrors.price}</p> : null}
          {fieldErrors.in_stock ? <p>{fieldErrors.in_stock}</p> : null}
          {fieldErrors.unit ? <p>{fieldErrors.unit}</p> : null}
          {fieldErrors.description ? <p>{fieldErrors.description}</p> : null}
        </div>
      ) : null}
    </>
  )
}

export const Products = () => {
  const { data, isLoading, error } = useProductsApi()
  const { t } = useTranslation()
  const [products, setProducts] = useState([])
  const [articleText, setArticleText] = useState('')
  const [nameText, setNameText] = useState('')
  const [saveErrors, setSaveErrors] = useState({})
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    document.body.classList.add('products-page')

    return () => {
      document.body.classList.remove('products-page')
    }
  }, [])

  useEffect(() => {
    if (data) {
      setProducts(data)

      if (data[0]) {
        setActiveId(data[0].id)
      }
    }
  }, [data])

  const shownProducts = useMemo(() => {
    return products.filter((item) => {
      const articleMatch =
        !articleText ||
        (item.article_no || '')
          .toLowerCase()
          .includes(articleText.toLowerCase())
      const nameMatch =
        !nameText || item.name.toLowerCase().includes(nameText.toLowerCase())
      return articleMatch && nameMatch
    })
  }, [products, articleText, nameText])

  const handleChange = (id, field, value) => {
    setProducts((currentProducts) => {
      return currentProducts.map((item) => {
        if (item.id !== id) {
          return item
        }

        return {
          ...item,
          [field]: value,
        }
      })
    })
  }

  const handleSaveSuccess = (updatedProduct) => {
    setProducts((currentProducts) => {
      return currentProducts.map((item) => {
        if (item.id !== updatedProduct.id) {
          return item
        }

        return updatedProduct
      })
    })

    setSaveErrors((currentSaveErrors) => {
      const nextSaveErrors = { ...currentSaveErrors }
      delete nextSaveErrors[updatedProduct.id]
      return nextSaveErrors
    })
  }

  const handleSaveError = (id, error) => {
    setSaveErrors((currentSaveErrors) => {
      return {
        ...currentSaveErrors,
        [id]: error,
      }
    })
  }

  if (isLoading) {
    return <div className="products__loading">{t(`loading`)}</div>
  }

  if (error) {
    return <p className="products__error-text">{error.message}</p>
  }

  return (
    <section className="products">
      <div className="products__sidebar">
        <div className="products__sidebar-title">Menu</div>
        <div className="products__sidebar-rule"></div>

        <ul className="products__sidebar-list">
          {productsMenuItems.map((item) => {
            const sidebarItemClassName = [
              'products__sidebar-item',
              item.isActive ? 'products__sidebar-item--active' : '',
              item.isDisabled ? 'products__sidebar-item--disabled' : '',
            ]
              .filter(Boolean)
              .join(' ')

            return (
              <li key={item.label} className={sidebarItemClassName}>
                <span className="products__sidebar-dot"></span>
                <span>{item.label}</span>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="products__main">
        <div className="products__toolbar">
          <div className="products__search">
            <SearchField
              value={articleText}
              onChange={(event) => setArticleText(event.target.value)}
              placeholder={t(`search_article_no`)}
            />

            <SearchField
              value={nameText}
              onChange={(event) => setNameText(event.target.value)}
              placeholder={t(`search_product`)}
            />
          </div>

          <div className="products__actions">
            <ToolButton type="add" label="New Product" />
            <ToolButton type="print" label="Print List" />
            <ToolButton type="toggle" label="Advanced mode" />
          </div>
        </div>

        <div className="products__header products__header--desktop">
          <div className="products__marker"></div>
          <div className="products__article">{t(`article_no`)}</div>
          <div className="products__name">{t(`product_service`)}</div>
          <div className="products__price">{t(`price`)}</div>
          <div className="products__stock">{t(`in_stock`)}</div>
          <div className="products__unit">{t(`unit`)}</div>
          <div className="products__description products__column--xl-only">
            Description
          </div>
          <div className="products__more"></div>
        </div>

        <div className="products__header products__header--compact">
          <div className="products__marker"></div>
          <div className="products__article products__column--compact-hidden">
            {t(`article_no`)}
          </div>
          <div className="products__name">{t(`product_service`)}</div>
          <div className="products__price">{t(`price`)}</div>
          <div className="products__more products__more--compact-hidden"></div>
        </div>

        <div className="products__list">
          {shownProducts.map((item) => {
            return (
              <ProductRow
                key={item.id}
                item={item}
                isActive={activeId === item.id}
                onActivate={setActiveId}
                onChange={handleChange}
                onSaveSuccess={handleSaveSuccess}
                onSaveError={handleSaveError}
                saveError={saveErrors[item.id]}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
