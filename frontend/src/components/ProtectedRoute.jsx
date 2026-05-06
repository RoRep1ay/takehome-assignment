import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export const ProtectedRoute = ({ children }) => {
  const { status, isAuthenticated } = useAuth()

  if (status === 'checking') {
    return <div>Loading</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
