import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.scss'
import { getAuthenticatedUser } from '../../api'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../reduxSlice/usersSlice'

const Navbar = () => {
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await getAuthenticatedUser()
      dispatch(setUser(user))
    }
    getUser()
  }, [dispatch])

  const username = user?.name?.split(' ')
  const initials = username && (username[0][0] + username[1][0])

  const handleLogout = () => {
    localStorage.removeItem('stackUser')
    navigate('/login', { replace: true })
  }

  return (
    <nav className="nav__container">
        <div className='logo'>
            <h3>
              <Link to='/'>StackOverflow</Link>
            </h3>
        </div>
        <div>
            <div>
              <div className='avatar'>{initials}</div>
              <p onClick={handleLogout} className='logout__btn'>Logout</p>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
