import React from 'react'
import './Hero.css'
import house from '../../assets/hero.jpeg'
import { useNavigate } from 'react-router-dom'


const Hero = () => {
    const navigate=useNavigate();

    const moveToSignIn=()=>{
        navigate('/signin');
    }
  return (
    <div className='heroContainer'>
        <span>
            <h1>EAZZY JOB</h1>
            <h2>
                Find jobs easily via our platform, ranging from permanent positions, contractual positions, internships, remote and onsite. our platform is easy to use and easily available
            </h2>
            <button onClick={moveToSignIn}>SIGN IN</button>
            <h4>
               Availing multiple jobs at your convenience
            </h4>
        </span>
        <img src={house} alt="" />
    </div>
  )
}

export default Hero
