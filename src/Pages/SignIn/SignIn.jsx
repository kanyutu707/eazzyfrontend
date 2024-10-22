import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './SignIn.css'
import { VscLoading } from 'react-icons/vsc';

const SignIn = () => {
    const navigation=useNavigate();
    const [isLoading, setIsLoading]=useState(false);
    const [errorMessage, setErrorMessage]=useState("");
    const [formData, setFormData]=useState({
        "email":"",
        "password":""
    });

    const handleChange=(e)=>{
        e.preventDefault();
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit=async(e)=>{
        setIsLoading(true);
        e.preventDefault();
        try {
            const response=await fetch("https://eazzybackend-production.up.railway.app/authenticate/login", {
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData),
            });
            if(!response.ok){
                throw new Error(`Network response was not ok, ${response}`);
            }
            setIsLoading(false);
            const data=await response.json();
            const jwtToken=data.token;
            const parts=jwtToken.split('.');
            const payload=JSON.parse(atob(parts[1]));
            sessionStorage.setItem("email", payload.sub);
            sessionStorage.setItem('token', jwtToken);
            sessionStorage.setItem('role', payload.role);
            sessionStorage.setItem('id', payload.id);
            sessionStorage.setItem('firstName', payload.firstName);
            sessionStorage.setItem('lastName', payload.lastName);
            if(jwtToken){

                if(payload.role==="ADMIN"){
                    navigation('../ADMIN/')
                }
                else if(payload.role==="USER"){
                    navigation('../CLIENT/')
                }
             
            }
            else{
                window.alert("USER CREDENTIALS DO NOT EXIST");
            }
            
        } catch (error) {
            setErrorMessage("Unable to login")
            throw new Error(`There was a problem with your fetch operation, ${error}`);
        }
    }

    const signin=(
        <div className='signinform'>
    <form onSubmit={handleSubmit}>
        <header>SIGN IN FORM</header>
        <span className="input_group">
            <label htmlFor="">EMAIL</label>
            <input type="email" placeholder='EMAIL' onChange={handleChange} name='email' value={formData.email} />
        </span>
        <span className="input_group">
            <label htmlFor="">PASSWORD</label>
            <input type="password" placeholder='PASSWORD' onChange={handleChange} name='password' value={formData.password}/>
        </span>
        <button>SIGN IN</button>
        <span>DO NOT HAVE AN ACCOUNT <Link to='../signup'>SIGN UP</Link></span>
    </form>
    </div>
    )
   
  return (
    <>
        {isLoading?<VscLoading/>:signin}
        {errorMessage&&<div className='error'>{errorMessage}</div>}
    </>
  )
}

export default SignIn
