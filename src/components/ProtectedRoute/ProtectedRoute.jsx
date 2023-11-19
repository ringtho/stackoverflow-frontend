import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProtectedRoute = ({ children }) => {
  const data = JSON.parse(localStorage.getItem('stackUser'))
  const token = data?.token
  if(!token) {
    return (<Navigate 
        to="/login" 
        state={{ message: 'Authentication is Required' }} 
        replace 
    />)
  }
  return children
}

ProtectedRoute.propTypes = {
    children: PropTypes.object
}

export default ProtectedRoute