import { Navigate } from "react-router"
import { useAuth } from "./authProvider"

export const RequireAuth = ({children}) => {
    const auth = useAuth()
    console.log(auth)

    if(!auth.user){
        return <Navigate to='/' />
    }

    return children
}