import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Login, Register, Home, QuestionDetail, AskQuestion } from './pages'
import Layout from './pages/Layout/Layout'
import EditQuestion from './components/EditQuestion/EditQuestion'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route index path="/questions/ask" element={<AskQuestion />} />
          <Route path=":id" element={<QuestionDetail />} />
          <Route path=":id/edit" element={<EditQuestion />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
