import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        
        try {
            const newUser = { fullName, email, phoneNumber, password };

            const response = await axios.get('http://localhost:3001/users');
            const users = response.data;

            if (users.find(user => user.email === email)) {
                alert("User with this email already exists.");
                return;
            }

            await axios.post('http://localhost:3001/users', newUser);
            navigate('/login');
        } catch (error) {
            console.error("Error registering user:", error);
            alert("There was an error creating your account.");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Sign up <span className="or">or <button onClick={() => navigate('/login')} className="link-button">login your account</button></span></h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Your full name*"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email Address*"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number*"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password*"
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
                    <div className="password-container">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password*"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <span
                            className="password-toggle"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? '🙈' : '👁️'}
                        </span>
                    </div>
                    <button type="submit" className="register-btn">REGISTER</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
