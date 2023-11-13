import { useState } from 'react'
import { loginUser } from '../../api'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import './Login.scss'

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

  const onSubmit = async () => {
    // e.preventDefault()
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
  
  const { register, formState: { errors }, handleSubmit } = useForm()

  return (
    <section className="auth__container">
      <h1>StackOverflow</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && <p className="errors">{error.data.msg}</p>}
        <h3>Login</h3>
        <label>Email</label>
        <input
          {...register('email', {
            required: 'Email is required',
            validate: {
              matchPattern: (v) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                'Please provide a valid email address',
            },
          })}
          type="email"
          placeholder="eg john@google.com"
          name="email"
          id="email"
          value={user.email}
          onChange={handleOnChange}
        />
        {errors?.email?.message && (
          <small className="errors">{errors.email.message}</small>
        )}
        <label htmlFor="password">Password</label>
        <input
          {...register('password', { required: 'Password is required' })}
          type="password"
          placeholder="********"
          name="password"
          id="password"
          value={user.password}
          onChange={handleOnChange}
        />
        {errors?.password?.message && (
          <small className="errors">{errors.password.message}</small>
        )}
        <Link to="/register">
          <p className="new_user">New User? Sign Up</p>
        </Link>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'SUBMITTING' : 'SUBMIT'}
        </button>
      </form>
    </section>
  )
}

export default Login
