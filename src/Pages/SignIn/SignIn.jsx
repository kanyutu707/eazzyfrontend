import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import './SignIn.css';

const SignIn = () => {
    const navigation = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        "email": "",
        "password": ""
    });

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const response = await fetch("https://eazzybackend-production.up.railway.app/authenticate/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
            
            if (!response.ok) {
                throw new Error(`Network response was not ok, ${response}`);
            }
            
            const data = await response.json();
            const jwtToken = data.token;
            const parts = jwtToken.split('.');
            const payload = JSON.parse(atob(parts[1]));
            
            sessionStorage.setItem("email", payload.sub);
            sessionStorage.setItem('token', jwtToken);
            sessionStorage.setItem('role', payload.role);
            sessionStorage.setItem('id', payload.id);
            sessionStorage.setItem('firstName', payload.firstName);
            sessionStorage.setItem('lastName', payload.lastName);
            
            if (jwtToken) {
                if (payload.role === "ADMIN") {
                    navigation('../ADMIN/');
                } else if (payload.role === "USER") {
                    navigation('../CLIENT/');
                }
            } else {
                window.alert("USER CREDENTIALS DO NOT EXIST");
            }
        } catch (error) {
            window.alert(`There was a problem with your sign in: ${error}`);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='signinform'>
            <form onSubmit={handleSubmit}>
                <header>SIGN IN FORM</header>
                <span className="input_group">
                    <label htmlFor="email">EMAIL</label>
                    <input 
                        type="email" 
                        id="email"
                        placeholder='EMAIL' 
                        onChange={handleChange} 
                        name='email' 
                        value={formData.email}
                        disabled={isLoading}
                    />
                </span>
                <span className="input_group">
                    <label htmlFor="password">PASSWORD</label>
                    <input 
                        type="password" 
                        id="password"
                        placeholder='PASSWORD' 
                        onChange={handleChange} 
                        name='password' 
                        value={formData.password}
                        disabled={isLoading}
                    />
                </span>
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="signin-button"
                >
                    {isLoading ? (
                        <span className="button-content">
                            <Loader className="spinner" size={16} />
                            Signing In...
                        </span>
                    ) : (
                        'SIGN IN'
                    )}
                </button>
                <span className="signup-link">
                    DO NOT HAVE AN ACCOUNT <Link to='../signup'>SIGN UP</Link>
                </span>
            </form>
        </div>
    );
}

export default SignIn;