import React from 'react'
import './Account.css'
import {Route, Routes, useNavigate} from 'react-router-dom'
import Postings from '../Postings/Postings'
import Payments from '../Payments/Payments'

const Account = () => {
    const navigate=useNavigate();
    const moveToPostings=()=>{
        navigate('/client/account/')
    }
    const moveToPayments=()=>{
        navigate('/client/account/payments')
    }
    const addRoom=()=>{
        navigate('/client/addhouse')
    }
  return (
    <div className='accountcontainer'>
        <form className='accounts'>
            
            <header>ACCOUNT</header>
            <span className="input_group">
                <label htmlFor="">FIRST NAME</label>
                <input type="text" placeholder={sessionStorage.getItem('firstName')} />
            </span>
            <span className="input_group">
                <label htmlFor="">LAST NAME</label>
                <input type="text" placeholder={sessionStorage.getItem('lastName')}/>
            </span>
            <span className="input_group">
                <label htmlFor="">EMAIL</label>
                <input type="email" placeholder={sessionStorage.getItem('email')} />
            </span>
            <button>EDIT</button>
          
        </form>
        
       
    </div>
  )
}

export default Account