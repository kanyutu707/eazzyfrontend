import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import AdminNavbar from '../../Components/AdminNavbar/AdminNavbar'
import './Admin.css'
import {Routes, Route} from 'react-router-dom'
import Dashboard from '../../Pages/Dashboard/Dashboard'
import CurrentUser from '../../Pages/CurrentClients/CurrentClients'
import PastClients from '../../Pages/PastClients/PastClients'
import Sale from '../../Pages/Sale/Sale'
import Rentals from '../../Pages/Rentals/Rentals'
import NewRoom from '../../Pages/NewRoom/NewRoom'
import Account from '../../Pages/Account/Account'
import ActiveAdminView from '../../Pages/View/ActiveAdminView'

const Admin = () => {
  return (
    <>
    {
      sessionStorage.getItem('role')==='ADMIN'?(
        <div className='admincontainer'>
        <Sidebar/>
        <section>
          <AdminNavbar/>
          <div className='content'>
            <Routes>
              <Route path='/' element={<Dashboard/>}/>
              <Route path='/currentclients' element={<CurrentUser/>}/>
              <Route path='/pastclients' element={<PastClients/>}/>
              <Route path='/rentals' element={<Rentals/>}/>
              <Route path='/forsale' element={<Sale/>}/>
              <Route path='/newjob' element={<NewRoom/>}/>
              <Route path='/account' element={<Account/>}/>
              <Route path='/activeadminview/:id' element={<ActiveAdminView/>}/>
            </Routes>
          </div>
        </section>
      </div>
      ):
      window.location.href='/'
    }
   
    </>
  )
}

export default Admin
