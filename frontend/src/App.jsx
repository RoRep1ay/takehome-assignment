import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Products } from './pages/Products'
import { DummyPage } from './pages/DummyPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { MainLayout } from './components/MainLayout'
import './i18n'

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <DummyPage title="Home" />
            </MainLayout>
          }
        />
        <Route
          path="/order"
          element={
            <MainLayout>
              <DummyPage title="Order" />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <DummyPage title="About Us" />
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            <MainLayout>
              <Login />
            </MainLayout>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Products />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
