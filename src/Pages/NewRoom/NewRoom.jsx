import React, { useState } from 'react';
import './NewRoom.css';

const NewRoom = () => {
    const [formData, setFormData] = useState({
        title: "",
        salary: "",
        description: "",
        requirements: "",
        closingDate:Date,
        postingDate:Date.now(),
        postType: "",
        qualifications: "",
        postingStatus:"ACTIVE",
        owner_id: sessionStorage.getItem('id')
    });

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            const response=await fetch("https://eazzybackend-production.up.railway.app/jobs/create", {
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
        <div className='newroomcontainer'>
            <form onSubmit={handleSubmit}>
                <header>JOB POSTING FORM</header>
                <span className="input_group">
                    <label htmlFor="room">JOB TITLE</label>
                    <input 
                        type="text" 
                        id="title" 
                        placeholder='TITLE E.G. ACCOUNTANT, TEACHER' 
                        onChange={handleChange} 
                        value={formData.title} 
                        name='title' 
                        required
                    />
                </span>
                <span className="input_group">
                    <label htmlFor="number_of_rooms">SALARY / MONTH</label>
                    <input 
                        type="number" 
                        id="salary" 
                        placeholder='SALARY PER MONTH' 
                        min={1} 
                        onChange={handleChange} 
                        value={formData.salary} 
                        name='salary' 
                        required
                    />
                </span>
                <span className="input_group">
                    <label htmlFor="price">REQUIREMENTS</label>
                    <input 
                        type="text" 
                        id="requirements" 
                        placeholder='REQUIREMENTS TO BE COMMA SEPARATED' 
                        min={0} 
                        onChange={handleChange} 
                        value={formData.requirements} 
                        name='requirements' 
                        required
                    />
                </span>
                <span className="input_group">
                    <label htmlFor="units">QUALIFICATIONS</label>
                    <input 
                        type="text" 
                        id="qualifications" 
                        placeholder='QUALIFICATIONS TO BE COMMA SEPARATED' 
                        min={1} 
                        onChange={handleChange} 
                        value={formData.qualifications} 
                        name='qualifications' 
                        required
                    />
                </span>
                <span className="input_group">
                    <label htmlFor="closingDate">CLOSING DATE</label>
                    <input type="date" name="closingDate" id="closingDate" onChange={handleChange} value={formData.closingDate} />
                </span>
                <span className="input_group">
                    <label htmlFor="postType">POST TYPE</label>
                    <select 
                        name="postType" 
                        id="postType" 
                        onChange={handleChange} 
                        value={formData.postType} 
                        required
                    >
                        <option value="">---- PLEASE SELECT POST TYPE ----</option>
                        <option value="INTERNSHIP">INTERNSHIP</option>
                        <option value="CONTRACTUAL">CONTRACTUAL</option>
                        <option value="PERMANENT">PERMANENT</option>
                    </select>
                </span>
                <span className="input_group">
                    <label htmlFor="description">JOB DESCRIPTION</label>
                    <textarea 
                        name="description" 
                        id='description' 
                        onChange={handleChange} 
                        value={formData.description} 
                        required
                    ></textarea>
                </span>
               
                <button className='roombutton' type="submit">SUBMIT</button>
            </form>
        </div>
    );
}

export default NewRoom;
