import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'
import { getAuthenticatedUser } from '../../api'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../reduxSlice/usersSlice'

const Navbar = () => {
  const data = JSON.parse(localStorage.getItem('stackUser'))
  const token = data?.token
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await getAuthenticatedUser()
      dispatch(setUser(user))
    }
    getUser()
  }, [dispatch])

  const username = user?.name?.split(' ')
  const initials = username && (username[0][0] + username[1][0])

  return (
    <nav className="nav__container">
        <div className='logo'>
            <h3>
              <Link to='/'>StackOverflow</Link>
            </h3>
        </div>
        <div>
            { !token 
              ? <div>
                  <Link to='/login'>Login</Link>
                </div>
              : <div>
                  <div className='avatar'>{initials}</div>
                  <Link to='/login'>Logout</Link>
                </div>
            }
        </div>
    </nav>
  )
}

export default Navbar
