import useSWR from 'swr'
import { fetchRequest } from '../utils/request'

const getProductsRequest = (key) => {
  return fetchRequest(key, {
    auth: true,
    method: 'GET',
  })
}

export const useProductsApi = () => {
  const PRODUCTS_ENDPOINT = '/products/'
  const { data, error, isLoading } = useSWR(
    PRODUCTS_ENDPOINT,
    getProductsRequest
  )
  return {
    data,
    error,
    isLoading,
  }
}
