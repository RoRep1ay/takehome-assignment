import useSWRMutation from 'swr/mutation'
import { fetchRequest } from '../utils/request'

const updateProductRequest = (key, { arg }) => {
  return fetchRequest(key, {
    method: 'PATCH',
    auth: true,
    body: arg,
  })
}

export const useUpdateProductApi = (id) => {
  const ENDPOINT = `/products/${id}/`
  const { data, trigger, isMutating, error } = useSWRMutation(
    ENDPOINT,
    updateProductRequest
  )

  const updateProduct = (body) => {
    return trigger(body)
  }

  return {
    data,
    updateProduct,
    isLoading: isMutating,
    error,
  }
}
