import { Navigate } from "react-router"
import { useAuth } from "./authProvider"

export const RequireAuth = ({children}) => {
    const auth = useAuth()

    if(!auth.user){
        return <Navigate to='/' />
    }

    return children
}