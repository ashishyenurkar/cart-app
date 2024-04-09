import React, { Fragment, useRef, useState } from 'react';
import "./LoginSignUp.css";

import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from '../Actions/User';

function LoginSignup() {

    const dispatch = useDispatch();

    const { error, loading, isAuthenticated } = useSelector((state) => state.user);

    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    });

    const [registerFormData, setRegisterFormData] = useState({
        name: '',
        email: '',
        password: '',
        avatar: null // For file upload
    });

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const switchTabs = (tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };

    const handleLoginInputChange = (e) => {
        const { name, value } = e.target;
        setLoginFormData({
            ...loginFormData,
            [name]: value
        });
    };

    const handleRegisterInputChange = (e) => {
        const { name, value } = e.target;
        setRegisterFormData({
            ...registerFormData,
            [name]: value
        });
    };

    const handleRegisterFileChange = (e) => {
        const file = e.target.files[0];
        setRegisterFormData({
            ...registerFormData,
            avatar: file
        });
    };

    const handleLoginSubmit = (e) => {
          e.preventDefault();
        // Dispatch the loginUser action with loginFormData
        dispatch(loginUser(loginFormData.email, loginFormData.password));
       
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        // Send registerFormData to backend
        console.log("Register form data:", registerFormData);
        dispatch(registerUser(registerFormData.name, registerFormData.email, registerFormData.password));
    };
    

    return (
        <Fragment>
            <div className='LoginSignUpContainer'>
                <div className='LoginSignUpBox'>
                    <div>
                        <div className='login_signUp_toggle'>
                            <p onClick={() => switchTabs("login")}>LOGIN</p>
                            <p onClick={() => switchTabs("register")}>REGISTER</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>
                    <form className='loginForm' ref={loginTab} onSubmit={handleLoginSubmit}>
                        <div className='loginEmail'>
                            <MailOutlinedIcon />
                            <input type="email" placeholder='Email' required name="email" value={loginFormData.email} onChange={handleLoginInputChange} />
                        </div>
                        <div className='loginPassword'>
                            <LockOpenIcon />
                            <input type="password" placeholder='Password' required name="password" value={loginFormData.password} onChange={handleLoginInputChange} />
                        </div>
                        <input type="submit" value="Login" className='loginBtn' />
                    </form>
                    {/* Registration Form */}
                    <form className="signUpForm" ref={registerTab} encType="multipart/form-data" onSubmit={handleRegisterSubmit}>
                        <div className="signUpName">
                            <FaceIcon />
                            <input type="text" placeholder="Name" required name="name" value={registerFormData.name} onChange={handleRegisterInputChange} />
                        </div>
                        <div className="signUpEmail">
                            <MailOutlinedIcon />
                            <input type="email" placeholder="Email" required name="email" value={registerFormData.email} onChange={handleRegisterInputChange} />
                        </div>
                        <div className="signUpPassword">
                            <LockOpenIcon />
                            <input type="password" placeholder="Password" required name="password" value={registerFormData.password} onChange={handleRegisterInputChange} />
                        </div>
                        <div id="registerImage">
                            <img src="" alt="Avatar Preview" />
                            <input type="file" name="avatar" accept="image/*" onChange={handleRegisterFileChange} />
                        </div>
                        <input type="submit" value="Register" className="signUpBtn" />
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default LoginSignup;
