import React from 'react'
import './Stats.css'
import { MdDataExploration, MdFreeCancellation, MdSensorOccupied, MdStayCurrentPortrait } from 'react-icons/md'

const Stats = () => {
  return (
    <div className='statscontainer'>
        <section>
            <span>
                <h2>0</h2>
                <MdStayCurrentPortrait/>
            </span>
            <h4>ACTIVE JOBS</h4>
        </section>
        <section>
            <span>
                <h2>0</h2>
                <MdDataExploration/>
            </span>
            <h4>INACTIVE JOBS</h4>
        </section>
        <section>
            <span>
                <h2>0</h2>
                <MdSensorOccupied/>
            </span>
            <h4>CURRENT APPLICATIONS</h4>
        </section>
        <section>
            <span>
                <h2>0</h2>
                <MdFreeCancellation/>
            </span>
            <h4>REJECTED APPLICATIONS</h4>
        </section>
    </div>
  )
}

export default Stats