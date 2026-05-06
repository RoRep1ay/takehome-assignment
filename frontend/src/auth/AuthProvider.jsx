import { AuthContext } from './AuthContext'
import { useAuthenticated } from '../hooks/useAuthenticated'

export const AuthProvider = ({ children }) => {
  const { status } = useAuthenticated()

  return (
    <AuthContext.Provider
      value={{
        status,
        isAuthenticated: status === 'authenticated',
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
