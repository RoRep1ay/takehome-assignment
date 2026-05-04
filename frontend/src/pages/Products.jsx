import { useEffect, useState } from 'react'
import { useProductsApi } from '../hooks/useProductsApi'
import { useUpdateProductApi } from '../hooks/useUpdateProductApi'
import './Products.css'

const ProductRow = ({ item, handleChange, handleSaveSuccess, handleSaveError, saveError }) => {
  const { updateProduct, isLoading, error } = useUpdateProductApi(item.id)
  const fieldErrors = saveError?.data || error?.data || {}

  const handleSave = async () => {
    try {
      const updatedProduct = await updateProduct({
        name: item.name,
        in_price: item.in_price,
        price: item.price,
      })

      if (updatedProduct) {
        handleSaveSuccess(updatedProduct)
      }
    } catch (saveError) {
      handleSaveError(item.id, saveError)
    }
  }

  return <>
    <tr>
      <td>
        <input value={item.name} onChange={(event) => handleChange(item.id, 'name', event.target.value)} onBlur={handleSave} />
      </td>
      <td>
        <input value={item.in_price} onChange={(event) => handleChange(item.id, 'in_price', event.target.value)} onBlur={handleSave} />
      </td>
      <td>
        <input value={item.price} onChange={(event) => handleChange(item.id, 'price', event.target.value)} onBlur={handleSave} />
      </td>
    </tr>
    {fieldErrors.name || fieldErrors.in_price || fieldErrors.price ? <tr className='error-row'>
      <td colSpan='3'>
        {fieldErrors.name ? <p className='error-text row-error'>{fieldErrors.name}</p> : null}
        {fieldErrors.in_price ? <p className='error-text row-error'>{fieldErrors.in_price}</p> : null}
        {fieldErrors.price ? <p className='error-text row-error'>{fieldErrors.price}</p> : null}
      </td>
    </tr> : null}
  </>
}

export const Products = () => {
  const { data, isLoading, error } = useProductsApi()
  const [products, setProducts] = useState([])
  const [saveErrors, setSaveErrors] = useState({})

  useEffect(() => {
    if (data) {
      setProducts(data)
    }
  }, [data])

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
    return <div>Loading</div>
  }

  if (error) {
    return <p className='error-text'>{error.message}</p>
  }

  return <section id='product-container'>
    <h1 id='product-title'>Products</h1>

    <div className='table-wrapper'>
      <table id='product-table'>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>In Price</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => {
            return <ProductRow 
              key={item.id}
              item={item}
              handleChange={handleChange}
              handleSaveSuccess={handleSaveSuccess} 
              handleSaveError={handleSaveError}
              saveError={saveErrors[item.id]}
            />
          })}
        </tbody>
      </table>
    </div>
  </section>
}
