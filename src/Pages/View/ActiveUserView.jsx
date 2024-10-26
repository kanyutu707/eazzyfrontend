import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const ActiveUserView = () => {
    const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
    const navigate=useNavigate();
    let {id}=useParams();
 
    const [jobs, setJobs] = useState([]);
    useEffect(()=>{
        const fetchData=async ()=>{
          try {
            const response=await fetch(`${BASE_URL}/jobs/getById/${id}`,{
              headers:{
                 'Authorization':`Bearer ${sessionStorage.getItem('token')}`,
                  'Content-Type':'application/json'
              }
            });
            if(!response.ok){
              throw new Error(`Network response was not ok`);
            }
            const data=await response.json();
            setJobs(data);
          } catch (error) {
            throw new Error(`Error encounted, ${error}`)
          }
        };
        fetchData();
      }, []);
      const [formData, setFormData] = useState({
        applicationStatus:"INACTIVE"
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('handleSubmit called');
      try {
          console.log('Sending request to:', `https://eazzybackend-production.up.railway.app/applications/update/${id}`);
          console.log('Request body:', JSON.stringify({
              applicationStatus: "INACTIVE",
              applicationDate: new Date().toISOString(),
          }));
          const response = await fetch(`https://eazzybackend-production.up.railway.app/applications/update/${id}`, {
              method: "PUT",
              headers: {
                  'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  applicationStatus: "INACTIVE",
                  applicationDate: new Date().toISOString(),
              }),
          });
          console.log('Response status:', response.status);
          if (!response.ok) {
              throw new Error(`Network response was not ok, ${response.statusText}`);
          }
          const data = await response.json();
          window.alert("APPLICATION WITHDRAWN SUCCESSFULLY")
          navigate("/client/activebookings")
          console.log("Update successful:", data);
      } catch (error) {
          console.error(`Error encountered: ${error.message}`);
      }
  }
  return (
    <div className='viewcontainer'>
        {
            <section>
            
            <header>{jobs?.title}</header>
            <span className='descriptionsection'>
                <label htmlFor="">DESCRIPTION</label>
               <h4>{`. ${jobs?.description}`}
                </h4>
                
            </span>
            <span className='descriptionsection'>
                <label htmlFor="">REQUIREMENTS</label>
               <h4>{`. ${jobs?.requirements}`}
                </h4>
                
            </span>
            <span className='descriptionsection'>
                <label htmlFor="">QUALIFICATIONS</label>
               <h4>{` . ${jobs?.qualifications}`}
                </h4>
                
            </span>
            <ul>
                <label htmlFor="">INFORMATION</label>
                <li><h3>SALARY</h3> ----  <h4>$ {jobs?.salary}</h4></li>
                <li><h3>POSTING DATE</h3>---- <h4>{jobs?.postingDate}</h4></li>
                <li><h3>CLOSING DATE</h3>----<h4>4</h4>{jobs?.closingDate}</li>
                <li><h3>JOB TYPE</h3> ---- <h4>{jobs?.postType}</h4></li>
            </ul>
       
            <div className='actionbuttons'>
                <button onClick={handleSubmit}>APPLY</button>
            </div>
        </section>
        }
        
    </div>
  )
}

export default ActiveUserView
