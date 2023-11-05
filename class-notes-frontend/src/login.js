import React, { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from './context/authProvider';
import axios from './api/axios';
import { useHistory } from 'react-router-dom';
// import { Button, ButtonProps } from '@mantine/core';
const LOGIN_URL = 'http://10.0.0.7:8080/api/routes/user/login';
const REGISTER_URL = 'http://10.0.0.7:8080/api/routes/user/register';

// Gonna need to verify this path b/c its from backend

const Login = () => {
    const history = useHistory();
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();
    const [error, setError] = useState(false);
    const [errorReg, setErrorReg] = useState(false);

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [userR, setUserR] = useState('');
    const [passwordR, setPasswordR] = useState('');
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
            }).then((response) => {
                if (response.ok) {
                    setSucc(true);
                    return response.json();
                }
                else {
                    setError(true)
                    return ({ "error": "error" });
                }
            }).then(data => {
            	if (succ) {
            	    history.push('/classes');
            	}
                console.log(data);
            })
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    const handleRegister = async (e) => {
        e.preventDefault();


        const data = {
            "username": userR,
            "password": passwordR
        };

        try {
            console.log(data);
            console.log(REGISTER_URL);
            fetch(REGISTER_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }).then((response) => {
                if (response.ok) {
                    setSucc(true);
                    return response.json();
                }
                else {
                    setErrorReg(true)
                    return ({ "error": "error" });
                }
            }).then(data => {
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
		<div className ='w-full h-screen bg-gray-500'>
		        <div className='flex flex-row flex-between w-auto h-full content-center text-2xl bg-gray-500'>
		            <div className='w-[500px] flex flex-col content-center mx-auto border-solid border-2 h-[600px] p-[30px] bg-zinc-400 rounded-xl mt-[5%]'>
		                <p ref={errRef} className={errMess ? "errmess" :
		                    "offscreen"} aria-live="assertive">{errMess}</p>

		                <h1 className='text-4xl mb-[20px]'>Sign In</h1>

		                <form onSubmit={handleSubmit} className='w-2/4 md:w-full flex-col flex h-[300px]'>
		                    <label htmlFor="username" className='mt-auto mb-2'>Username:</label>
		                    <input type="text" id="username" className= "border-2 border-black w-7/8 mb-auto h-[50px] rounded mx-auto" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} required />

		                    <label htmlFor="password" className='mt-auto mb-2'>Password:</label>
		                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} className= "rounded w-7/8 mx-auto border-2 h-[50px] mb-auto  border-black" value={password} required />

		                    <button>Sign In</button>
		                </form>
		                {error? 
		                <p>Invalid login credentials</p>:
		                <null></null>
		                }
		                <p ref={errRef} className={errMess ? "errmess" :
		                    "offscreen"} aria-live="assertive">{errMess}</p>
		            </div>
		            <div className='w-[500px] flex flex-col content-center mx-auto border-solid border-2 h-[600px] p-[30px] bg-zinc-400 rounded-xl mt-[5%]'>
		                <p ref={errRef} className={errMess ? "errmess" :
		                    "offscreen"} aria-live="assertive">{errMess}</p>

		                <h1 className='text-4xl mb-[20px]'>Register</h1>

		                <form onSubmit={handleRegister} className='w-2/4 md:w-full flex-col flex h-[300px]'>
		                    <label htmlFor="username" className='mt-auto mb-2'>Username:</label>
		                    <input type="text" id="username" className= "border-2 border-black w-7/8 mb-auto h-[50px] rounded mx-auto" ref={userRef} autoComplete="off" onChange={(e) => setUserR(e.target.value)} value={userR} required />

		                    <label htmlFor="password" className='mt-auto mb-2'>Password:</label>
		                    <input type="password" id="password" onChange={(e) => setPasswordR(e.target.value)} className= "rounded w-7/8 mx-auto border-2 h-[50px] mb-auto  border-black" value={passwordR} required />

		                    <button>Register</button>
		                </form>
		                {errorReg? 
		                <p>An account already exists with this username</p>:
		                <null></null>
		                }
		                <p ref={errRef} className={errMess ? "errmess" :
		                    "offscreen"} aria-live="assertive">{errMess}</p>
		            </div>
		        </div>
		</div>

            )}
        </>
    )
}

export default Login
