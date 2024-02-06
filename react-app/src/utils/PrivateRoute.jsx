import { useContext } from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

const PrivateRoute = () => {
    let {user} = useContext(AuthContext)
    return user ? <Outlet /> : <Navigate to="/login" />
}

export const AuthRoute = () => {
    let {user} = useContext(AuthContext)
    return !user ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoute
