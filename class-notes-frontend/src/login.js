import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from './context/authProvider';
import axios from './api/axios';
const LOGIN_URL = 'http://localhost:8080/api/routes/user/login';
// Gonna need to verify this path b/c its from backend

const Login = () => {
    const { setAuth } = useContext(AuthContext);
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


        const data = {
            "username": user,
            "password": password
        };

        try {
            console.log(data);
            console.log(LOGIN_URL);
            fetch(LOGIN_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }).then((response)=>{
                if (response.ok){
                    return response.json();
                }
                else{
                    return ({"error": "error"});
                }
            }).then(data=>{
                console.log(data);
            })
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
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
                    <p ref={errRef} className={errMess ? "errmess" :
                        "offscreen"} aria-live="assertive">{errMess}</p>

                    <h1>Sign In</h1>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} required />

                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} required />

                        <button>Sign In</button>
                    </form>
                </div>
            )}
        </>
    )
}

export default Login