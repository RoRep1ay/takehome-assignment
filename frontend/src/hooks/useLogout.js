import { useNavigate } from "react-router-dom"
import { mutate } from "swr"
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../utils/request"

export const useLogout = () => {
  
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    mutate('/auth/me/', undefined, false) // Clear the SWR cache for the user data
    navigate('/login')
  }

  return handleLogout
}
