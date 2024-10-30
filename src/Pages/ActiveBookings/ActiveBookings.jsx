import React, { useEffect, useState } from 'react'
import house from '../../assets/house.jpg'
import './ActiveBookings.css'
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";
import { MdArrowCircleRight } from "react-icons/md";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';

const ActiveBookings = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
    const navigate=useNavigate();
    const [isLoading, setIsLoading]=useState(false);
    const [errorMessage, setErrorMessage]=useState("");
    const [applications, setApplications] = useState([]);
    const [searchItem, setSearchItem]=useState('');
    const [filteredResults, setFilteredResults]=useState([]);
 
  useEffect(()=>{
    const fetchData=async ()=>{
      setIsLoading(true);
      try {
        const response=await fetch(`${BASE_URL}/applications/getAll`,{
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
        const loggedIn=parseInt(sessionStorage.getItem('id'))
        const filteredData=data.filter(userapplication=>(userapplication.applicant.id===loggedIn && userapplication.applicationStatus==="ACTIVE" && userapplication.posting.postingStatus==="ACTIVE"))
        console.log(filteredData)
        setApplications(filteredData);
       
      } catch (error) {
        setErrorMessage("Unable to fetch data")
        throw new Error(`Error encounted, ${error}`)
      }
    };
    fetchData();
   
  }, []);
  const moveToView=(id)=>{
    navigate(`/client/activeuserview/${id}`);
}

const searchItems = (searchValue) => {

  setSearchItem(searchValue);

 
  const updatedSearchValue = searchValue.toLowerCase();

  if (updatedSearchValue !== '') {
    const searchFilteredData = applications.filter((application) => {
      
      const postingValues = Object.values(application.posting).join('').toLowerCase();

     
      const additionalPostingValues = Object.values(application).join('').toLowerCase(); // Assuming `posting` is available in scope

  
      return postingValues.includes(updatedSearchValue) || additionalPostingValues.includes(updatedSearchValue);
    });

    setFilteredResults(searchFilteredData);
  } else {
    setFilteredResults(applications);
  }
};

const bookingData=(
  <>
    {searchItem.length>1 ?(
       <>
       {filteredResults.map((application)=>(
                   <tr key={application.id}>
                           <td>1</td>
                           <td className='titleStyle'>{application.posting?.title}</td>
                           <td>{application.posting?.postType}</td>
                           <td>{application.posting?.description}</td>
                           <td>{application.posting?.salary}</td>
                           <td>{application.applicationDate}</td>
                           <td></td>
                           <td> <button onClick={() => moveToView(application.id)}>VIEW</button></td>
                   </tr>
               ))}
     </>
    ):(
      <>
      {applications.map((application)=>(
                  <tr key={application.id}>
                          <td>1</td>
                          <td className='titleStyle'>{application.posting?.title}</td>
                          <td>{application.posting?.postType}</td>
                          <td>{application.posting?.description}</td>
                          <td>{application.posting?.salary}</td>
                          <td>{application.applicationDate}</td>
                          <td></td>
                          <td> <button onClick={() => moveToView(application.id)}>VIEW</button></td>
                  </tr>
              ))}
    </>
    )}
  </>
 
)
  return (
    <div className='activebookingscontainer'>
        <header>ACTIVE APPLICATIONS</header>
        <div className="controls">
        <IoIosArrowDropleftCircle />
      <IoMdArrowDropleft />
      <input type="search" placeholder='INPUT SEARCH ITEM' onChange={(e)=>searchItems(e.target.value)}/>
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
                <th>ACTIONS</th>
            </thead>
            <tbody>
              {isLoading?<LoadingSpinner/>:bookingData}
              {errorMessage&&<div className='error'>errorMessage</div>}
            </tbody>
       
        </table>
    </div>
    
  )
}

export default ActiveBookings
