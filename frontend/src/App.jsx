import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Products } from './pages/Products'
import { ProtectedRoute } from './components/ProtectedRoute'
import { MainLayout } from './components/MainLayout'

function App() {
  return <>
    <Routes>
      <Route path='/' element={<Navigate to='/products' replace />} />
      <Route path="/login" element={<Login />} />
      <Route path='/products' element={
        <ProtectedRoute>
          <MainLayout>
            <Products />
          </MainLayout>
        </ProtectedRoute>
      } />
    </Routes>
  </>
}

export default App
