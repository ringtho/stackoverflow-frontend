import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Login, Register, Home, QuestionDetail } from './pages'
import Layout from './pages/Layout/Layout'
import Profile from './pages/Profile/Profile'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route index path="/profile/:id" element={<Profile />} />
          <Route path=":id" element={<QuestionDetail />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
