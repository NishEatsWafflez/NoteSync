import {useRef, useState, useEffect, useContext} from 'react';
import AuthContext from './context/authProvider';
import axios from './api/axios';
const LOGIN_URL =  '/auth';
// Gonna need to verify this path b/c its from backend

const Login = () => {
    const {setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errMess, setErrMess] = useState('');
    const [succ, setSucc] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMess('');
    }, [user, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({user, password}), 
            {
                headers: {'Content-Type': 'application/json'}, withCredentials: true
            }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            // Backend request.
            const roles = response?.data?.roles;
            // This is array from backend, so subject to change.
            setAuth({user, password, roles, accessToken});
            setUser('');
            setPassword('');
            setSucc(true);
            
        } catch (error) {
            if (!error?.response){
                setErrMess('Server not Responding.');
            }
            else if (error.response?.status === 400){
                setErrMess('Missing Either Username or Password.');
            }
            else if (error.response?.status === 401){
                setErrMess('Unauthorized.');
            }
            else{
                setErrMess('Login Failed.');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {succ ? (
                <div>
                    <h1>Logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </div>
            ) : (

        <div>
            <p ref = {errRef} className={errMess ? "errmess" :
            "offscreen"} aria-live="assertive">{errMess}</p>

            <h1>Sign In</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>      
                <input type="text" id ="username" ref = {userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} required/>

                <label htmlFor="password">Password:</label>      
                <input type="password" id ="password" onChange={(e) => setPassword(e.target.value)} value={password} required/>

                <button>Sign In</button>
            </form>
        </div>
            )}
        </>
    )
}

export default Login