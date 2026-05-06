import useSWR from 'swr'
import { fetchRequest } from '../utils/request'

export const GETME_ENDPOINT = '/api/auth/me/'

const getMeRequest = async (key) => {
  return fetchRequest(key, { method: 'GET', auth: true })
}

export const useGetMeApi = () => {
  const { data, error, isLoading } = useSWR(GETME_ENDPOINT, getMeRequest, {
    // revalidateOnFocus: false,
    // revalidateOnReconnect: false,
    // shouldRetryOnError: false,
  })

  return {
    data,
    error,
    isLoading,
  }
}
