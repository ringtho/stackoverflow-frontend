import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Login, Register, Home, QuestionDetail } from './pages'
import Layout from './pages/Layout/Layout'
import Profile from './pages/Profile/Profile'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            index
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <ProtectedRoute>
                <QuestionDetail />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
