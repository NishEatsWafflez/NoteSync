import React, { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from './context/authProvider';
import { useNavigate, useParams } from 'react-router-dom';
import axios from './api/axios';
// import { Button, ButtonProps } from '@mantine/core';
const CLASS_URL = 'http://localhost:8080/api/routes/class/';
const GENRATE_URL = 'http://localhost:8080/api/routes/generate';

// Gonna need to verify this path b/c its from backend

const ClassSummary = () => {
    const navigate = useNavigate
    const { id } = useParams();
    const [currentNote, changeNoteView] = useState(null);
    const [bulletPoints, addPoints] = useState("")
    const ClassItem = (props) => {
        const handleItemClick = () => {
            changeNoteView(props.itemDetails)
            console.log(currentNote);
        };
        return (
            <div onClick={handleItemClick}>
                <p className='text-left'>{props.name}</p>
            </div>
        )
    };
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();
    const [error, setError] = useState(false);
    const [errorReg, setErrorReg] = useState(false);
    const [notes, setNotes] = useState(["cheese"]);

    const [user, setUser] = useState('');
    const [password, setPassword] = useState(null);
    const [className, setClassName] = useState('');
    const [passwordR, setPasswordR] = useState('');
    const [errMess, setErrMess] = useState('');
    const [succ, setSucc] = useState(false);
    useEffect(() => {
        try {
            // classId
            console.log(CLASS_URL + id);
            fetch(CLASS_URL + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    return ({ "error": "error" });
                }
            }).then(data => {
                console.log(data.data.classes.notes);
                setNotes(data.data.classes.notes);
            })
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }, [])

    useEffect(() => {
        setErrMess('');
    }, [user, password])
    const handleItemClick = (itemId) => {
        changeNoteView(null);
        addPoints(null);
    };
    const generatePoints = async (e) => {
        e.preventDefault()
        let data = {
            "title": user,
            "text": password
        }
        console.log(data)
        fetch(GENRATE_URL, {
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
                return ({ "error": "error" });
            }
        }).then(data => {
            console.log(data);
            addPoints(data);
        })

    };
    return (
        <>

            <div className='flex flex-row flex-between w-auto content-center text-2xl mt-[50px]'>
                <div className='w-[400px] flex flex-col content-center mx-auto border-solid border-2 h-[500px] p-[20px]'>
                    <div onClick={handleItemClick} className='h-[25px] w-full'>Create new note</div>
                    {notes.map((item, index) => (
                        <ClassItem key={index} name={item.title} id={item._id} itemDetails={item} onItemClick={handleItemClick} />
                    ))}
                </div>
                <div className='w-[400px] flex flex-col content-center mx-auto border-solid border-2 h-[500px] p-[20px]'>
                    {currentNote != null ?
                        (
                            <div className='overflow-y-auto'>
                                {currentNote.title}
                                <br />
                                <div className='text-left'>{currentNote.text}</div>
                            </div>
                        ) :
                        <div className='h-full overflow-y-auto'>
                            <form className='w-2/4 md:w-full flex-col flex h-full'>
                                {/* <label htmlFor="Title" className='mt-auto mb-2'>Username:</label> */}
                                <input type="text" id="username" className="border-b-2 border-black w-7/8 mb-auto h-[50px] rounded mx-auto" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} required />

                                <textarea onChange={(e) => setPassword(e.target.value)} className="rounded w-7/8 mx-auto border-t-2 align-text-top top-0 h-full mt-[5px] border-black whitespace-break-spaces resize-none" value={password} required />
                                <button>Save Note</button>
                                <button onClick={generatePoints} className='h-[10%]'>Generate</button>
                            </form>
                            <div>
                                {bulletPoints?.message}
                            </div>
                        </div>
                    }
                </div>
            </div>



        </>
    )
}

export default ClassSummary
