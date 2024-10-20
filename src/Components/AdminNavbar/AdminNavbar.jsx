import React from 'react'
import './AdminNavbar.css'
import { useNavigate } from 'react-router-dom'

const AdminNavbar = () => {
  const navigate=useNavigate();
  const moveToAccount=()=>{
      navigate('/admin/account')
  }
  const moveToLogout=()=>{
    navigate('/')
    sessionStorage.clear();
    window.alert("LOGOUT SUCCESSFUL")

  }
  return (
    <div className='adminnavbarcontainer'>
      <span onClick={moveToAccount}>ACCOUNT</span>
      <span onClick={moveToLogout}>LOGOUT</span>
    </div>
  )
}

export default AdminNavbar