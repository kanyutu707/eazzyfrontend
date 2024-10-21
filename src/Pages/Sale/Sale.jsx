import React, { useEffect, useState } from 'react'
import './Sale.css'




const Sale = () => {
    const [jobs, setJobs]=useState([]);
    useEffect(()=>{
        const fetchData=async()=>{
            try {
                const response=await fetch("https://eazzybackend-production.up.railway.app/jobs/getAll", {
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
                const filteredData=data.filter(userapplication=>(userapplication.owner.id===loggedIn  && userapplication.postingStatus==="INACTIVE"))
                setJobs(filteredData);
            } catch (error) {
                throw new Error(`Error in response, ${error}`)
            }
        };
        fetchData();
    }, [])
  return (
    <div className='saleContainer'>
    <header>INACTIVE JOBS</header>
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
              <button>VIEW DETAILS</button>
          </span>
        ))}
      
      
    </section>
</div>
  )
}

export default Sale
