import React, { useEffect, useState } from 'react'
import './PastBookings.css'
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";
import { MdArrowCircleRight } from "react-icons/md";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import house from '../../assets/house.jpg'
import { useNavigate } from 'react-router-dom';

const PastBooking = () => {
    const navigate=useNavigate();
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
          const filteredData=data.filter(userapplication=>(userapplication.applicant.id===loggedIn && userapplication.applicationStatus==="INACTIVE"))
          setApplications(filteredData);
        } catch (error) {
          throw new Error(`Error encounted, ${error}`)
        }
      };
      fetchData();
     
    }, []);

  return (
    <div className='pastbookingscontainer'>
    <header>PAST APPLICATION</header>
  
    <div className="controls">
    <IoIosArrowDropleftCircle />
  <IoMdArrowDropleft />
  <input type="search" placeholder='INPUT SEARCH ITEM'/>
  <span>1/25</span>
  <IoMdArrowDroprightCircle />

  <MdArrowCircleRight />
    </div>
    <table>
            <thead>
                <th>ID</th>
                <th>POSITION</th>
                <th>JOB TYPE</th>
                <th>DESCRIPTION</th>
                <th>SALARY</th>
                <th>APPLICATION DATE</th>
                <th></th>
                <th></th>
            </thead>
            <tbody>
            {applications.map((application)=>(
                <tr key={application.id}>
                        <td>1</td>
                        <td>{application.posting?.title}</td>
                        <td>{application.posting?.postType}</td>
                        <td>{application.posting?.description}</td>
                        <td>{application.posting?.salary}</td>
                        <td>{application.applicationDate}</td>
                        <td></td>
                        <td> </td>
                </tr>
            ))}
            </tbody>
       
        </table>
</div>
  )
}

export default PastBooking