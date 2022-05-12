import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import './SignupFormModal.css';

function SignupForm() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(["Passwords must match."]);
    };

    return (
        <form className="main-user-signup" onSubmit={handleSubmit}>
            <div className='errors-list-signup'>
                <ul className='single-error'>
                    {errors.map((error, idx) => <li className='error' key={idx}>{error}</li>)}
                </ul>
            </div>
            <div>
                <div id="signup-titles">
                    <h2 className='form-title'>Signup</h2>
                </div>
            </div>
            <div>
                <label htmlFor="Email" className='email-label'>Email</label>
                <input
                    className="signup-inputs"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="username" className='username-label'>Username</label>
                <input
                    className="signup-inputs"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password" className='password-label'> Password</label>
                <input
                    className="signup-inputs"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="confirm-password" className='confirm-password-label'>Confirm Password</label>
                <input
                    className="signup-inputs"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div >
            <button id="signup" className='signup-button' type="submit">Sign Up</button>
        </form>
    );
}

export default SignupForm;
