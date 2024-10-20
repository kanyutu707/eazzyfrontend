import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from '../../Pages/Home/Home'
import ClientNavigation from '../../Components/ClientNavigation/ClientNavigation'
import ActiveBookings from '../../Pages/ActiveBookings/ActiveBookings'
import PastBooking from '../../Pages/PastBookings/PastBooking'
import Account from '../../Pages/Account/Account'
import NewRoom from '../../Pages/NewRoom/NewRoom'
import View from '../../Pages/View/View'
import Application from '../../Pages/Application/Application'
import ActiveUserView from '../../Pages/View/ActiveUserView'
const Client = () => {
  const navigate=useNavigate();
  
  return (
    <>
    {sessionStorage.getItem('role')==='USER'?(
        <div className='clientcontainer'>
        <ClientNavigation/>
      <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/activebookings' element={<ActiveBookings/>}/>
            <Route path='/pastbookings' element={<PastBooking/>}/>
            <Route path='/account/*' element={<Account/>}/>
            <Route path='/addhouse' element={<NewRoom/>}/>
            <Route path='/view/:id' element={<View/>}/>
            <Route path='/activeuserview/:id' element={<ActiveUserView/>}/>
            <Route path='/apply/:id' element={<Application/>}/>
      </Routes>
    </div>
    ):
      window.location.href='/'
    }
  
    </>
  )
}

export default Client
