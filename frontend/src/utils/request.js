export const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') ?? ''
export const ACCESS_TOKEN_KEY = 'accessToken'
export const REFRESH_TOKEN_KEY = 'refreshToken'

const clearAuthSession = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

const redirectToLogin = () => {
  if (window.location.pathname !== '/login') {
    window.location.replace('/login')
  }
}

export const fetchRequest = async (path, requestOptions) => {
  const { method = 'GET', auth = false, body, headers = {} } = requestOptions

  const requestHeaders = { ...headers }

  if (auth) {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY)

    if (!token) {
      clearAuthSession()
      redirectToLogin()

      throw {
        status: 401,
        message: 'Auth Failed',
      }
    }

    requestHeaders['Authorization'] = `Bearer ${token}`
  }

  requestHeaders['Content-Type'] = 'application/json'

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: requestHeaders,
    body: body ? JSON.stringify(body) : undefined, // fetch does not automatically stringify
  })

  const data = await response.json().catch(() => null)
  if (!response.ok) {
    if (response.status === 401 && auth) {
      clearAuthSession()
      redirectToLogin()
    }

    throw {
      status: response.status,
      message: 'Request failed',
      data,
    }
  }

  return data
}
