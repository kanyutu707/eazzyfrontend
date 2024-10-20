import React, { useEffect, useState } from 'react'
import './View.css'
import house from '../../assets/house.jpg'
import { MdEmail } from 'react-icons/md'
import { FaBookmark, FaEdit } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'

const View = () => {
    const navigate=useNavigate();
    let {id}=useParams();
    const moveToApply=(id)=>{
        navigate(`/client/apply/${id}`)
    }
    const [jobs, setJobs] = useState([]);
    useEffect(()=>{
        const fetchData=async ()=>{
          try {
            const response=await fetch(`http://localhost:8080/jobs/getById/${id}`,{
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
       
  return (
    <div className='viewcontainer'>
        {
            <section>
            
            <header>{jobs.title}</header>
            <span className='descriptionsection'>
                <label htmlFor="">DESCRIPTION</label>
               <h4>{`. ${jobs.description}`}
                </h4>
                
            </span>
            <span className='descriptionsection'>
                <label htmlFor="">REQUIREMENTS</label>
               <h4>{`. ${jobs.requirements}`}
                </h4>
                
            </span>
            <span className='descriptionsection'>
                <label htmlFor="">QUALIFICATIONS</label>
               <h4>{` . ${jobs.qualifications}`}
                </h4>
                
            </span>
            <ul>
                <label htmlFor="">INFORMATION</label>
                <li><h3>SALARY</h3> ----  <h4>$ {jobs.salary}</h4></li>
                <li><h3>POSTING DATE</h3>---- <h4>{jobs?.postingDate}</h4></li>
                <li><h3>CLOSING DATE</h3>----<h4>4</h4>{jobs?.closingDate}</li>
                <li><h3>JOB TYPE</h3> ---- <h4>{jobs.postType}</h4></li>
            </ul>
       
            <div className='actionbuttons'>
                <button onClick={() => moveToApply(id)}>APPLY</button>
            </div>
        </section>
        }
        
    </div>
  )
}

export default View