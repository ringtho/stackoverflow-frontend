import { useState } from 'react'
import './Register.scss'
import { registerUser } from '../../api'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

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

  const onSubmit = async () => {
    setIsSubmitting(true)
    try {
      const { data } = await registerUser(user)
      localStorage.setItem('stackUser', JSON.stringify(data))
      navigate('/login', 
      { state: { message: 'Thanks for creating an account. Login to continue' }})
    } catch (error) {
      setError(error.response)
    } finally {
      setIsSubmitting(false)
    }
  }

  const { register, handleSubmit, formState: { errors }} = useForm()

  return (
    <section className="auth__container">
      <h1>StackOverflow</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && <p className="errors">{error.data.msg}</p>}
        <h3>Register</h3>
        <label htmlFor="name">Full Name</label>
        <input
          {...register('name', { required: 'Please provide a name' })}
          type="text"
          id="name"
          name="name"
          placeholder="eg John Doe"
          value={user.name}
          onChange={handleOnChange}
        />
        {errors?.name?.message && (
          <small className="errors">{errors.name.message}</small>
        )}
        <label htmlFor="email">Email</label>
        <input
          {...register('email', {
            required: 'Please provide an email',
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
          {...register('password', { required: 'Please provide a password' })}
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
        <Link to="/login">
          <p className="new_user">Already a member? Login</p>
        </Link>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'SUBMITTING' : 'SUBMIT'}
        </button>
      </form>
    </section>
  )
}

export default Register