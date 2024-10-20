import React, { useEffect, useState } from 'react'
import { MdArrowBack, MdArrowForward, MdArrowLeft, MdArrowRight } from 'react-icons/md'
import './CurrentClients.css'
import Application from '../Application/Application';
const CurrentClients = () => {
  const [applications, setApplications] = useState([]);
  useEffect(()=>{
    const fetchData=async ()=>{
      try {
        const response=await fetch("http://localhost:8080/applications/getAll",{
          headers:{
             'Authorization':`Bearer ${sessionStorage.getItem('token')}`,
              'Content-Type':'application/json'
          }
        });
        if(!response.ok){
          throw new Error(`Network response was not ok`);
        }
        const data=await response.json();
        console.log(data)
        const loggedIn=parseInt(sessionStorage.getItem('id'))
        const filteredData=data.filter(userapplication=>(userapplication.posting.owner.id===loggedIn && userapplication.posting.postingStatus==="ACTIVE" && userapplication.applicationStatus==="ACTIVE"))
        setApplications(filteredData);
      } catch (error) {
        throw new Error(`Error encounted, ${error}`)
      }
    };
    fetchData();
   
  }, []);
  return (
    <div className='currentclientscontainer'>
    <header>CURRENT APPLICANTS</header>
    <table>
      <caption>
        <span className="controls">
      <MdArrowBack/>
      <MdArrowLeft/>
      <span className="pagenumber">1/25</span>
      <MdArrowRight/>
      <MdArrowForward/>
      </span>
     
      <input type="search"  placeholder='SEARCH DATA...'/>
      </caption>
      <thead>
        <th>#</th>
        <th>FIRST NAME</th>
        <th>LAST NAME</th>
        <th>EMAIL</th>
        <th>APP DATE</th>
        <th>REF NUMBER</th>
        
      </thead>
      <tbody>
        {applications.map((application)=>(
            <tr>
            <td>1C</td>
            <td>{application.applicant?.firstName}</td> 
            <td>{application.applicant?.lastName}</td> 
            <td>{application.applicant?.email}</td>
            <td>{application.applicationDate}</td>
            <td>{application.posting?.title}</td>
            
          </tr> 
        ))}
         
        
  
      </tbody>
    </table>
  </div>
  )
}

export default CurrentClients