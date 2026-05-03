import useSWR from "swr"
import { fetchRequest } from "../utils/request"

const getMeRequest = async (key) => {
  return fetchRequest(key, { method: 'GET', auth: true })
}

export const useGetMeApi = () => {
  const GETME_ENDPOINT = '/api/auth/me/'
  const { data, error, isLoading } = useSWR(GETME_ENDPOINT, getMeRequest, {})

  return {
    data,
    error,
    isLoading,
    
  }
}
