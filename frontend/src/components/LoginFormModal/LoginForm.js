import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import Demo from "../DemoUser";
import './LoginFormModal.css'

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
    };

    return (
        <form className='main-user-login' onSubmit={handleSubmit}>
            <div className="errors-list-login ">
                <ul className='single-error'>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
            </div>
            <div>
                <label className='email-label' htmlFor='email'>Email </label>
                <input
                    className='login-inputs'
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor='password'>Password </label>
                <input
                    className='login-inputs'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="buttons-login-div">
                <button className='login-button' type="submit">Log In</button>
                <Demo />
            </div>
        </form >
    );
}

export default LoginForm;
