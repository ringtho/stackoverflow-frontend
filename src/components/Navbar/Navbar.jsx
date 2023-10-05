import { Link } from 'react-router-dom'
import './Navbar.scss'

const Navbar = () => {
  const { token } = JSON.parse(localStorage.getItem('stackUser'))
  return (
    <nav className="nav__container">
        <div className='logo'>
            <h3>StackOverflow</h3>
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
