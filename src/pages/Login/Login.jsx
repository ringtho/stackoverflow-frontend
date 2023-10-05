import { useState } from 'react'
import { loginUser } from '../../api'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const handleOnChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const { data } = await loginUser(user)
      console.log(data)
      localStorage.setItem('stackUser', JSON.stringify(data))
      navigate('/')
    } catch (error) {
      setError(error.response)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth__container">
      <h1>StackOverflow</h1>
      <form onSubmit={handleSubmit}>
        {error && <div>{error.data.msg}</div>}
        <h3>Login</h3>
        <label>Email</label>
        <input
          type="email"
          placeholder="eg john@google.com"
          name="email"
          id="email"
          value={user.email}
          onChange={handleOnChange}
          required
        />
        <label htmlFor='password'>Password</label>
        <input
          type="password"
          placeholder="********"
          name="password"
          id="password"
          value={user.password}
          onChange={handleOnChange}
          required
        />
        <button disabled={isSubmitting}>
          {isSubmitting ? 'SUBMITTING' : 'SUBMIT'}
        </button>
      </form>
    </div>
  )
}

export default Login
