import React, { useEffect, useState } from 'react'
import house from '../../assets/house.jpg'
import './Rentals.css'
import { useNavigate } from 'react-router-dom'
const Rentals = () => {
    const navigate=useNavigate();
    const moveToActiveAdminView=(id)=>{
        navigate(`/admin/activeadminview/${id}`)
    }
    const [jobs, setJobs]=useState([]);
    useEffect(()=>{
        const fetchData=async()=>{
            try {
                const response=await fetch("http://localhost:8080/jobs/getAll", {
                    headers:{
                        'Authorization':`Bearer ${sessionStorage.getItem('token')}`,
                        'Content-Type':'application/json'
                    }
                });
                if(!response.ok){
                    throw new Error(`Network response was not ok, ${response}`);
                }
                const data=await response.json();
                const loggedIn=parseInt(sessionStorage.getItem('id'))
                const filteredData=data.filter(userapplication=>(userapplication.owner.id===loggedIn && userapplication.postingStatus==="ACTIVE"))
                setJobs(filteredData);
            } catch (error) {
                throw new Error(`Error in response, ${error}`)
            }
        };
        fetchData();
    }, [])
  return (
    <div className='rentalContainer'>
    <header>ACTIVE JOBS</header>
    <section>
        {jobs.map((job)=>(
              <span>
              <h3>{job.title}</h3>
              <h3>{job.refNo}</h3>
              <div>
                  <h3>DESCRIPTION</h3>
                  <h4>{job.description}</h4>
              </div>
              <h3>{job.salary}</h3>
              <button onClick={() => moveToActiveAdminView(job.id)}>VIEW DETAILS</button>
          </span>
        ))}
      
      
    </section>
</div>
  )
}

export default Rentals