import React, { useState } from 'react'
import './ClientNavigation.css'
import { useNavigate } from 'react-router-dom'
import { VscThreeBars } from 'react-icons/vsc';
import { CgClose } from 'react-icons/cg';
const ClientNavigation = () => {
  const navigate=useNavigate();
  const moveToHome=()=>{
      navigate('/client/')
  }
  const moveToActiveBookings=()=>{
    navigate('/client/activebookings/');
  }
  const moveToPastBookings=()=>{
    navigate('/client/pastbookings/');
  }
  const moveToAccount=()=>{
    navigate('/client/account')
  }
  const logout=()=>{
    navigate('/')
    sessionStorage.clear()
    window.alert("LOGOUT SUCCESSFUL")

  }
  const [isOpened, setIsOpened]=useState(false);
  const [styles, setStyles]=useState('navs')
  return (
    <div className='clientnavigationcontainer'>
        <section className="logo">
            JOB LISTING SYSTEM
        </section>
        <section className={styles}>
          <CgClose/>
            <span onClick={moveToHome}>HOME</span>
            <span onClick={moveToActiveBookings}>ACTIVE APPLICATIONS</span>
            <span onClick={moveToPastBookings}>CLOSED APPLICATIONS</span>
            <span onClick={moveToAccount}>ACCOUNT</span>
            <span onClick={logout}>LOGOUT</span>
        </section>
        <VscThreeBars className='openaction'/>
    </div>
  )
}

export default ClientNavigation