import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login = ({ setLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Fetch users from the backend
            const response = await axios.get('http://localhost:3001/users');
            const users = response.data;

            // Find matching user
            const user = users.find((user) => user.email === email && user.password === password);

            if (user) {
                // Successfully logged in
                setLoggedIn(true);
                navigate('/home'); // Navigate to homepage
            } else {
                setErrorMessage("Invalid email or password.");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            setErrorMessage("There was an error logging in.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login <span className="or">or <button onClick={() => navigate('/signup')} className="link-button">create an account</button></span></h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Enter your Email"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                    <div className="password-container">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                        <span 
                            className="password-toggle" 
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </span>
                    </div>
                    <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
                    <button type="submit" className="login-btn">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
