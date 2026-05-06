import { useLocation } from 'react-router-dom'
import { MenuBar } from './MenuBar'
import { ProductsMenuBar } from './ProductsMenuBar'

export const MainLayout = ({ children }) => {
  const location = useLocation()
  const isProductsPage = location.pathname === '/products'

  return (
    <>
      {isProductsPage ? <ProductsMenuBar /> : <MenuBar />}

      <div>{children}</div>
    </>
  )
}
