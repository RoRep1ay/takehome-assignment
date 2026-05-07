import useSWRMutation from 'swr/mutation'
import { fetchRequest } from '../utils/request'

const LOGIN_ENDPOINT = `/auth/login/`
const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

const loginRequest = async (key, { arg }) => {
  return fetchRequest(key, {
    method: 'POST',
    body: arg,
  })
}

export const useLoginApi = () => {
  const { trigger, isMutating, error, data } = useSWRMutation(
    LOGIN_ENDPOINT,
    loginRequest
  )

  const login = async (credentials) => {
    const result = await trigger(credentials)

    if (result?.access) {
      localStorage.setItem(ACCESS_TOKEN_KEY, result.access)
    }

    if (result?.refresh) {
      localStorage.setItem(REFRESH_TOKEN_KEY, result.refresh)
    }

    return result
  }

  return {
    login,
    isLoading: isMutating,
    error,
    data,
  }
}
