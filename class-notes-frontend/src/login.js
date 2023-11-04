import {useRef, useState, useEffect} from 'react';

const Login = () => {
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
        console.log(user, password);
        setUser('');
        setPassword('');
        setSucc(true);
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