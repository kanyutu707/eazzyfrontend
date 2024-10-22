import React, { useEffect, useState } from 'react'
import './PastClients.css'
import { MdArrowBack, MdArrowForward, MdArrowLeft, MdArrowRight } from 'react-icons/md'
import Application from '../Application/Application';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';


const PastClients = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading]=useState(false);
  const [errorMessage, setErrorMessage]=useState("");
  useEffect(()=>{
    const fetchData=async ()=>{
      setIsLoading(true);
      try {
        const response=await fetch("https://eazzybackend-production.up.railway.app/applications/getAll",{
          headers:{
             'Authorization':`Bearer ${sessionStorage.getItem('token')}`,
              'Content-Type':'application/json'
          }
        });
        if(!response.ok){
          throw new Error(`Network response was not ok`);
        }
        const data=await response.json();
        setIsLoading(false);
        console.log(data)
        const loggedIn=parseInt(sessionStorage.getItem('id'))
        const filteredData=data.filter(userapplication=>(userapplication.posting.owner.id===loggedIn && userapplication.posting.postingStatus==="ACTIVE" && userapplication.applicationStatus==="INACTIVE"))
        setApplications(filteredData);
      } catch (error) {
        setErrorMessage("Unable to fetch data")
        throw new Error(`Error encounted, ${error}`)
      }
    };
    fetchData();
   
  }, []);
  const tableData=(
   <>
    {applications.map((application)=>(
      <tr key={application.id}>
      <td>{application.id}</td>
      <td>{application.applicant?.firstName}</td> 
      <td>{application.applicant?.lastName}</td> 
      <td>{application.applicant?.email}</td>
      <td>{application.applicationDate}</td>
      <td>{application.posting?.title}</td>
      
    </tr>  
   ))}
   </>
  )
  return (
    <div className='pastclientscontainer'>
    <header>PAST CLIENTS</header>
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
     
      {isLoading?<LoadingSpinner/>:tableData}
      {errorMessage&&<div className='error'>errorMessage</div>}
      </tbody>
    </table>
  </div>
  )
}

export default PastClients
