import React, { useState } from 'react'
import './Sidebar.css'
import { AiFillDashboard } from "react-icons/ai";
import { MdCircleNotifications, MdDateRange, MdFreeCancellation,  MdRoomService, MdSensorOccupied, MdStayCurrentPortrait } from 'react-icons/md';
import { VscThreeBars } from "react-icons/vsc";
import { IoMdLogOut, IoMdClose } from 'react-icons/io';
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
    const [isToggled, setIsToggled]=useState(false);
    const [style, setStyle]=useState("sidebarcontainer")

    const handleToggle=()=>{
      setIsToggled(!isToggled);
      changeStyle();
    }

    const changeStyle=()=>{
      if(style!=="sidebarcontainer") setStyle("sidebarcontainer");
      else setStyle("closedsidebarcontainer")
    }
  return (
    <div className={style}>
        <header><span>ADMIN</span> <button onClick={handleToggle}>{isToggled? <VscThreeBars/>: <IoMdClose />}</button> </header>
        <span className="mainnav" onClick={moveToDashboard}>
           <AiFillDashboard/> <h4>DASHBOARD</h4>
        </span>
        <span className="mainnav" onClick={moveToCurrentClients}>
           <MdCircleNotifications/> <h4>APPLICANTS</h4>
        </span>
        <span className="subnav" onClick={moveToCurrentClients}>
           <MdStayCurrentPortrait/>  <h5>ACTIVE</h5>  
        </span>
        <span className="subnav" onClick={moveToPastClients}>
          <MdDateRange/>  <h5>WITHDRAWN</h5>
        </span>
        <span className="mainnav" onClick={moveToRentals}>
          <MdRoomService/>  <h4>JOBS</h4>
        </span>
        <span className="subnav" onClick={moveToRentals}>
           <MdSensorOccupied/> <h5>ACTIVE</h5>
        </span>
        <span className="subnav" onClick={moveToForSale}>
          <MdFreeCancellation/>  <h5>INACTIVE</h5>
        </span>
        <span className="subnav" onClick={moveToNewJob}>
            <IoMdLogOut/> <h4>CREATE</h4>
        </span>
    </div>
  )
}

export default Sidebar