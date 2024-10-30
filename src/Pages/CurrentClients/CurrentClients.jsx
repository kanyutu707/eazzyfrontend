import React, { useEffect, useState } from 'react'
import { MdArrowBack, MdArrowForward, MdArrowLeft, MdArrowRight } from 'react-icons/md'
import './CurrentClients.css'
import Application from '../Application/Application';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
const CurrentClients = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading]=useState(false);
  const [errorMessage, setErrorMessage]=useState("");
  const [searchItem, setSearchItem]=useState('');
  const [filteredResults, setFilteredResults]=useState([]);
  useEffect(()=>{
    const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
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
        console.log(data)
        const loggedIn=parseInt(sessionStorage.getItem('id'))
        const filteredData=data.filter(userapplication=>(userapplication.posting.owner.id===loggedIn && userapplication.posting.postingStatus==="ACTIVE" && userapplication.applicationStatus==="ACTIVE"))
        setApplications(filteredData);
      } catch (error) {
        setErrorMessage("Unable to fetch data")
        throw new Error(`Error encounted, ${error}`)
      }
    };
    fetchData();
   
  }, []);

  const searchItems = (searchValue) => {

    setSearchItem(searchValue);
  
   
    const updatedSearchValue = searchValue.toLowerCase();
  
    if (updatedSearchValue !== '') {
      const searchFilteredData = applications.filter((application) => {
        
        const postingValues = Object.values(application.posting).join('').toLowerCase();
        const userValues=Object.values(application.applicant).join('').toLowerCase();
       
        const additionalPostingValues = Object.values(application).join('').toLowerCase(); // Assuming `posting` is available in scope
  
    
        return postingValues.includes(updatedSearchValue) || additionalPostingValues.includes(updatedSearchValue)|| userValues.includes(updatedSearchValue);
      });
  
      setFilteredResults(searchFilteredData);
    } else {
      setFilteredResults(applications);
    }
  };
  const tableData=(
    <>
      {searchItem.length>1?(
         <>

         {filteredResults.map((application)=>(
             <tr>
             <td>{application.id}</td>
             <td>
    <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${application.applicant?.email}`}>EMAIL</a>
</td>
             <td>{application.posting?.title}</td>
             <td><a href={application.portfoliourl}>PORTFOLIO</a></td> 
             <td><a href={application.resumeurl}>RESUME</a></td> 
             <td><a href={application.coverLetterurl}>COVER LETTER</a></td>
             
           </tr> 
         ))}
          
         
     
       </>
      ):(
         <>

         {applications.map((application)=>(
             <tr>
             <td>{application.id}</td>
             <td>
    <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${application.applicant?.email}`}>EMAIL</a>
</td>
             <td>{application.posting?.title}</td>
             <td><a href={application.portfoliourl}>PORTFOLIO</a></td> 
             <td><a href={application.resumeurl}>RESUME</a></td> 
             <td><a href={application.coverLetterurl}>COVER LETTER</a></td>
             
           </tr> 
         ))}
          
         
     
       </>
      )}
    </>
   
  )
  return (
    <div className='currentclientscontainer'>
    <header>CURRENT APPLICANTS</header>
    <table>
      <caption>
        <span className="controls">
      <MdArrowBack/>
      <MdArrowLeft/>
      <span className="pagenumber">1/25</span>
      <MdArrowRight/>
      <MdArrowForward/>
      </span>
     
      <input type="search"  placeholder='SEARCH DATA...' onChange={(e)=>searchItems(e.target.value)}/>
      </caption>
      <thead>
        <th>#</th>
        <th>EMAIL</th>
        <th>TITLE</th>
        <th>PORFOLIO</th>
        <th>COVER LETTER</th>
        <th>RESUME</th>

        
      </thead>
     <tbody>
      {isLoading?<LoadingSpinner/>:tableData}
      {errorMessage&&<div className='error'>errorMessage</div>}
     </tbody>
    </table>
  </div>
  )
}

export default CurrentClients
