import React, { useEffect, useState } from 'react'
import './Home.css'
import { IoIosArrowDropleftCircle, IoMdArrowDropleft, IoMdArrowDroprightCircle } from "react-icons/io";
import { MdArrowCircleRight } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [jobs, setJobs] = useState([]);
 
  const navigate = useNavigate();

  const moveToView=(id)=>{
      navigate(`/client/view/${id}`)
  }

  useEffect(()=>{
    const fetchData=async ()=>{
      try {
        const response=await fetch("http://localhost:8080/jobs/getAll",{
          headers:{
             'Authorization':`Bearer ${sessionStorage.getItem('token')}`,
              'Content-Type':'application/json'
          }
        });
        if(!response.ok){
          throw new Error(`Network response was not ok`);
        }
        const data=await response.json();
        const filteredData=data.filter(userapplication=>(userapplication.postingStatus==="ACTIVE"))
        setJobs(filteredData);
      } catch (error) {
        throw new Error(`Error encounted, ${error}`)
      }
    };
    fetchData();
  }, []);
   

  return (
    <div className='homecontainer'>
      <header>HOME</header>
      <section className="filtersection">
        <span>
          <label htmlFor="rating">FILTER BY PROFESSION</label>
          <input type="text" placeholder='SEARCH BY PROFESSION' />
        </span>
        <span>
          <label htmlFor="price">FILTER BY SALARY</label>
          <input type="text" placeholder='SEARCH BY SALARY (ABOVE)' />
        </span>
        <span>
          <label htmlFor="rooms">FILTER BY JOB TYPE</label>
          <select name="rooms" id="rooms">
            <option value="----">----</option>
            <option value="1">INTERNSHIP</option>
            <option value="2">CONTRACTUAL</option>
            <option value="4">PERMANENT</option>
          </select>
        </span>
        <span>
          <label htmlFor="location">FILTER BY LOCATION</label>
         <input type="text" placeholder='SEARCH BY LOCATION' />
        </span>
      </section>
      <section className="controls">
        <IoIosArrowDropleftCircle />
        <IoMdArrowDropleft />
        <span>1/25</span>
        <IoMdArrowDroprightCircle />
        <MdArrowCircleRight />
      </section>
      <section className="datasection">
        {jobs.map((job) => (
          <span key={job.id} className='containersection'>
            <h3 className='header'>{job.title}</h3>
            <span className='others'><h3>EMPLOYMENT TYPE: </h3> <h4>{job.postType}</h4></span>
            <span className='others'><h3>SALARY: </h3><h4>{job.salary}</h4></span>
            <span className="detailsection">
              <header>DESCRIPTION</header>
              <h3>{job.description}</h3>
            </span>
           
              <button onClick={() => moveToView(job.id)}>VIEW / APPLY</button>
           
          </span>
        ))}
      </section>
    </div>
  );
};

export default Home;
