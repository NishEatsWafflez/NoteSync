import { Navigate } from "react-router"
import { useAuth } from "./authProvider"

export const RequireAuth = () => {
    const auth = useAuth()

    if(!auth.user){
        return <Navigate to='/' />
    }

    return children
}