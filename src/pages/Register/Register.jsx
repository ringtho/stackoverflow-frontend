import { useState } from 'react'
import './Register.scss'
import { registerUser } from '../../api'
import { useNavigate } from 'react-router-dom'


const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
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
      const { data } = await registerUser(user)
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
        {error && (
          <div>
            {error.data.msg}
          </div>
        )}
        <h3>Register</h3>
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="eg John Doe"
          value={user.name}
          onChange={handleOnChange}
          required
        />
        <label htmlFor='email'>Email</label>
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
          {isSubmitting? 'SUBMITTING' : 'SUBMIT'}
        </button>
      </form>
    </div>
  )
}

export default Register