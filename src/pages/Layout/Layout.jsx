import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import './Layout.scss'

const Layout = () => {
  return (
    <main className='layout__container'>
        <Navbar />
        <Outlet />
    </main>
  )
}

export default Layout