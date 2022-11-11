import { useRef, useState, useEffect, useContext } from 'react';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import axios from 'axios';
import AuthContext from '../context/Auth';


const Login = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [ success, setSuccess ] = useState( false );
    
    const [ showPass, setShowPass ] = useState( true);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/login',
            JSON.stringify({ email:user, password:pwd }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );
            // console.log(JSON.stringify(response?.data));
            // //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            setAuth( { user, pwd, accessToken } );
            
            setUser('');
            setPwd('');
            setSuccess( true );
        } catch (err) {
            // if (!err?.response) {
            //     setErrMsg('No Server Response');
            // } else if (err.response?.status === 400) {
            //     setErrMsg('Missing Username or Password');
            // } else if (err.response?.status === 401) {
            //     setErrMsg('Unauthorized');
            // } else {
            //     setErrMsg('Login Failed');
            // }
            setErrMsg(err.response.data)
            errRef.current.focus();
        }
    }


    // useEffect( () => {
    //     console.log(auth)
    // }, [auth])

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Email:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            className='input'
                        />

                        <label htmlFor="password">Password:</label>
                        <div
                                className='pwd-div'
                                
                            >
                        <input
                            type={showPass ? 'text' : 'password'}
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            className='pwd-input'
                        />
                         <div onClick={() => setShowPass(!showPass)}>
                                {
                                
                                    showPass ? <FontAwesomeIcon icon={faEyeSlash} className='icon' /> : <FontAwesomeIcon icon={faEye} className='icon'/>
                                }
                                </div>
                             
                            
                            </div>
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="/">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Login