import React from 'react'
import './Sidebar.css'
import { AiFillDashboard } from "react-icons/ai";
import { MdCircleNotifications, MdDateRange, MdFreeCancellation,  MdRoomService, MdSensorOccupied, MdStayCurrentPortrait } from 'react-icons/md';
import { VscThreeBars } from "react-icons/vsc";
import { IoMdLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate=useNavigate();
    const moveToDashboard=()=>{
            navigate('/admin/')
    }
    const moveToCurrentClients=()=>{
        navigate('/admin/currentclients')
    }
    const moveToPastClients=()=>{
        navigate('/admin/pastclients')
    }
    const moveToRentals=()=>{
      navigate('/admin/rentals')
    }
    const moveToForSale=()=>{
      navigate('/admin/forsale')
    }
    const moveToNewJob=()=>{
      navigate('/admin/newjob')
      
    }
  return (
    <div className='sidebarcontainer'>
        <header><span>ADMIN</span> <VscThreeBars /> </header>
        <span className="mainnav" onClick={moveToDashboard}>
           <AiFillDashboard/> DASHBOARD
        </span>
        <span className="mainnav" onClick={moveToCurrentClients}>
           <MdCircleNotifications/> APPLICANTS
        </span>
        <span className="subnav" onClick={moveToCurrentClients}>
           <MdStayCurrentPortrait/>  ACTIVE  
        </span>
        <span className="subnav" onClick={moveToPastClients}>
          <MdDateRange/>  WITHDRAWN
        </span>
        <span className="mainnav" onClick={moveToRentals}>
          <MdRoomService/>  JOBS
        </span>
        <span className="subnav" onClick={moveToRentals}>
           <MdSensorOccupied/> ACTIVE
        </span>
        <span className="subnav" onClick={moveToForSale}>
          <MdFreeCancellation/>  INACTIVE
        </span>
        <span className="subnav" onClick={moveToNewJob}>
            <IoMdLogOut/> CREATE
        </span>
    </div>
  )
}

export default Sidebar