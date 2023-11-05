import React, { useRef, useState, useEffect, useContext } from 'react';
import { useAuth } from './context/authProvider';
import axios from './api/axios';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// import { Button, ButtonProps } from '@mantine/core';
const CLASS_URL = 'http://localhost:8080/api/routes/class';
const REGISTER_URL = 'http://localhost:8080/api/routes/class/new';

// Gonna need to verify this path b/c its from backend

const Classes = () => {
    const navigate = useNavigate();

    const ClassItem = (props) => {
        const handleItemClick = () => {
            props.onItemClick(props.id);
          };
    return(
        <div onClick={handleItemClick}>
            <p className='text-left'>{props.name}</p>
        </div>
    )};
    const auth = useAuth();
    const userRef = useRef();
    const errRef = useRef();
    const [error, setError] = useState(false);
    const [errorReg, setErrorReg] = useState(false);
    const [classList, setClasses] = useState(["cheese"]);

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [className, setClassName] = useState('');
    const [passwordR, setPasswordR] = useState('');
    const [errMess, setErrMess] = useState('');
    const [succ, setSucc] = useState(false);
    useEffect(() => {
        userRef.current.focus();
        try {
            console.log(CLASS_URL);
            fetch(CLASS_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    // setError(true)
                    return ({ "error": "error" });
                }
            }).then(data => {
                console.log(data.data.classes);
                setClasses(data.data.classes);
            })
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }, [])

    useEffect(() => {
        setErrMess('');
    }, [user, password])
    const handleItemClick = (itemId) => {
        navigate(`/class/${itemId}`)
      };
    const handleNewClass = async (e) => {
        e.preventDefault();


        const data = {
            "name": className
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

            <div className='flex flex-row flex-between w-auto content-center text-2xl mt-[50px]'>
                <div className='w-[400px] flex flex-col content-center mx-auto border-solid border-2 h-[500px] p-[20px]'>
                    {classList.map((item, index) => (
                        <ClassItem key={index} name={item.name} id={item._id} onItemClick={handleItemClick} />
                    ))}
                </div>
                <div className='w-[400px] flex flex-col content-center mx-auto border-solid border-2 h-[500px] p-[20px]'>
                    <h1 className='text-4xl mb-[20px]'>Create a new class</h1>

                    <form onSubmit={handleNewClass} className='w-2/4 md:w-full flex-col flex h-[300px]'>
                        <label htmlFor="username" className='mt-auto mb-2'>Class Name:</label>
                        <input type="text" id="username" className="border-2 border-black w-7/8 mb-auto h-[50px] rounded mx-auto" ref={userRef} autoComplete="off" onChange={(e) => setClassName(e.target.value)} value={className} required />
                        <button>Create</button>
                    </form>
                </div>
            </div>



        </>
    )
}

export default Classes
