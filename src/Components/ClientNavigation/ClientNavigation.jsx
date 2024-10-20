import React from 'react'
import './ClientNavigation.css'
import { useNavigate } from 'react-router-dom'
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
  return (
    <div className='clientnavigationcontainer'>
        <section className="logo">
            JOB LISTING SYSTEM
        </section>
        <section className="navs">
            <span onClick={moveToHome}>HOME</span>
            <span onClick={moveToActiveBookings}>ACTIVE APPLICATIONS</span>
            <span onClick={moveToPastBookings}>CLOSED APPLICATIONS</span>
            <span onClick={moveToAccount}>ACCOUNT</span>
            <span onClick={logout}>LOGOUT</span>
        </section>
        
    </div>
  )
}

export default ClientNavigation