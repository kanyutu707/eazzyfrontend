import React, { useState } from 'react'
import './SignUp.css'
import { Link, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';

const SignUp = () => {
    const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
    const navigate=useNavigate();
    const [isLoading, setIsLoading]=useState(false);
    const [errorMessage, setErrorMessage]=useState("");
    const [formData, setFormData]=useState({
        "firstName":"",
        "lastName":"",
        "email":"",
        "password":"",
        "role":"USER"
    });
    const handleChange=(e)=>{
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleSubmit=async(e)=>{
        setIsLoading(true);
        e.preventDefault();
        try {
            const response=await fetch(`${BASE_URL}/authenticate/register`, {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(formData),
            });
            if(!response.ok){
                throw new Error(`Network response was not ok, ${response}`);
            }
            setTimeout=(()=>{
                setIsLoading(false);
            }, 5000)
            const data=await response.json();

            if (data){
                    navigate('../signin')
            }
        } catch (error) {
            setErrorMessage("Unable to register")
             throw new Error(`There was a problem with your fetch operation, ${error}`);
        }
    }
    const signup=(
        <div className='signupform'>
        <form onSubmit={handleSubmit}>
            <header>SIGN UP FORM</header>
            <span className="input_group">
                <label htmlFor="">FIRST NAME</label>
                <input type="text" placeholder='FIRST NAME' onChange={handleChange} value={formData.firstName} name='firstName'/>
            </span>
            <span className="input_group">
                <label htmlFor="">LAST NAME</label>
                <input type="text" placeholder='LAST NAME' onChange={handleChange} value={formData.lastName} name='lastName' />
            </span>
            <span className="input_group">
                <label htmlFor="">EMAIL</label>
                <input type="email" placeholder='EMAIL' onChange={handleChange} value={formData.email} name='email'/>
            </span>
            <span className="input_group">
                <label htmlFor="">PASSWORD</label>
                <input type="password" placeholder='PASSWORD' onChange={handleChange} value={formData.password} name='password'/>
            </span>
            <button>SIGN UP</button>
            <span>ALREADY HAVE AN ACCOUNT <Link to='../signin'>SIGN IN</Link></span>
        </form>
        </div>
    )
  return (
    <>
        {isLoading?<LoadingSpinner/>:signup}
        {errorMessage&&<div className='error'>{errorMessage}</div>}
    </>
  )
}

export default SignUp
