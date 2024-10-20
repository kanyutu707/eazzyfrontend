import React, { useState } from 'react'
import './Application.css'
import { useParams } from 'react-router-dom';

const Application = () => {
    let {id}=useParams();
    const [formData, setFormData] = useState({
        
        applicationDate:Date.now(),
        resume:"",
        coverLetter:"",
        applicant_id: sessionStorage.getItem('id'),
        posting_id:id,
        applicationStatus:"ACTIVE"
    });

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            const response=await fetch("http://localhost:8080/applications/create", {
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
        setFormData({...formData, [e.target.name]: e.target.value});
    }
  return (
    <div className='applicationcontainer'>
        <form action="" onSubmit={handleSubmit}>
            <header>APPLICATION FORM</header>
            <span className="text_group">
                <label htmlFor="RESUME">RESUME</label>
                <textarea name="resume" id="resume" rows={12} placeholder='PLEASE FILL IN YOUR RESUME DETAILS' onChange={handleChange} value={formData.resume} ></textarea>
            </span>
            <span className="text_group">
                <label htmlFor="CoverLetter">COVER LETTER</label>
                <textarea name="coverLetter" id="coverLetter" rows={12} onChange={handleChange} value={formData.coverLetter}></textarea>
            </span>
            <button>SUBMIT</button>
        </form>
    </div>
  )
}

export default Application