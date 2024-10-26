import React, { useEffect, useState } from 'react'
import house from '../../assets/house.jpg'
import './Rentals.css'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner'
const Rentals = () => {
    const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
    const navigate=useNavigate();
    const [isLoading, setIsLoading]=useState(false);
    const [errorMessage, setErrorMessage]=useState("");
    const moveToActiveAdminView=(id)=>{
        navigate(`/admin/activeadminview/${id}`)
    }
    const [jobs, setJobs]=useState([]);
    useEffect(()=>{
        setIsLoading(true);
        const fetchData=async()=>{
            try {
                const response=await fetch(`${BASE_URL}/jobs/getAll`, {
                    headers:{
                        'Authorization':`Bearer ${sessionStorage.getItem('token')}`,
                        'Content-Type':'application/json'
                    }
                });
                if(!response.ok){
                    throw new Error(`Network response was not ok, ${response}`);
                }
                const data=await response.json();
                setIsLoading(false);
                const loggedIn=parseInt(sessionStorage.getItem('id'))
                const filteredData=data.filter(userapplication=>(userapplication.owner.id===loggedIn && userapplication.postingStatus==="ACTIVE"))
                setJobs(filteredData);
            } catch (error) {
                setErrorMessage("Unable to fetch data")
                throw new Error(`Error in response, ${error}`)
            }
        };
        fetchData();
    }, [])
    const myjobs=(
        <>
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
        </>
    )
  return (
    <div className='rentalContainer'>
    <header>ACTIVE JOBS</header>
    <section>
        {isLoading?<LoadingSpinner/>:myjobs}
        {errorMessage&&<div className='error'>errorMessage</div>}  
    </section>
</div>
  )
}

export default Rentals
