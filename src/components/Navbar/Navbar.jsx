import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'
import { getAuthenticatedUser } from '../../api'
import { useDispatch } from 'react-redux'
import { setUser } from '../../reduxSlice/usersSlice'

const Navbar = () => {
  const { token } = JSON.parse(localStorage.getItem('stackUser'))
  const dispatch = useDispatch()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await getAuthenticatedUser()
      dispatch(setUser(user))
    }
    getUser()
  }, [dispatch])

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
                  <Link to='/login'>Logout</Link>
                </div>
            }
        </div>
    </nav>
  )
}

export default Navbar
