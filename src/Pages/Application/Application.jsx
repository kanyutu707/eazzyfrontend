import React, { useState } from 'react'
import './Application.css'
import { useParams } from 'react-router-dom';

const Application = () => {
    const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
    let {id}=useParams();
    const [formData, setformData] = useState({
        
        applicationDate:Date.now(),
        resumeurl:"",
        portfoliourl:"",
        coverLetterurl:"",
        applicant_id: sessionStorage.getItem('id'),
        posting_id:id,
        applicationStatus:"ACTIVE"
    });

 

   
    const handleSubmit=async (e)=>{
        e.preventDefault();  
        try {
            const response=await fetch(`${BASE_URL}/applications/create`, {
                method: "POST",
                headers:{
                    'Authorization': `Bearer ${sessionStorage.getItem(`token`)}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData),
            });
            if(!response.ok){
                throw new Error(`Network response was not ok, ${response}`);
            }
            const data=await response.json();
            if(data){
                window.location.href=window.location.href;
            }
        } catch (error) {
            throw new Error(`Error encounted, ${error}`);
        }
    }
    const handleChange=(e)=>{
        e.preventDefault();
        setformData({...formData, [e.target.name]: e.target.value});
    }
  return (
    <div className='applicationcontainer'>
        <form action="" onSubmit={handleSubmit}>
            <header>APPLICATION FORM</header>
            <span className="text_group">
                <label htmlFor="RESUME">RESUME_URL</label>
                <input type="url" placeholder='ADD YOUR RESUME URL' required  name='resumeurl' onChange={handleChange} value={formData.resumeurl}/>
            </span>
            <span className="text_group">
                <label htmlFor="CoverLetter">COVER LETTER URL</label>
                <input type="url" placeholder='ADD YOUR COVER LETTER URL' required name='coverLetterurl' onChange={handleChange} value={formData.coverLetterurl}/>
            </span>
            <span className="text_group">
                <label htmlFor="CoverLetter">PORTFOLIO URL</label>
                <input type="url" placeholder='ADD YOUR PORTFOLIO URL' required name='portfoliourl' onChange={handleChange} value={formData.portfoliourl}/>
                
            </span>
            <button>SUBMIT</button>
        </form>
    </div>
  )
}

export default Application
