import { useGetMeApi } from './useGetMeApi'

export const useAuthenticated = () => {
  const { isLoading, error } = useGetMeApi()
  if (isLoading) {
    return {
      status: 'checking',
    }
  }

  if (error) {
    return {
      status: 'unauthenticated',
    }
  }

  return {
    status: 'authenticated',
  }
}
