import React from 'react'
import { NavLink } from "react-router-dom";
import './Jobs.css'

const Jobs = (props) => {

  const global = require('../../img/global.png');
  const japan = require('../../img/japan.png');

  return (
    <div className='jobs'>
      <NavLink to={`${props.match.url}/gl-stack`} className='gl-wrapper'>
        <div className='gl-card'>
          <div className='jobs-backdrop'></div>
          <img src={global} alt='gl'/>
          <span className='text-primary jobs-gl-text center'>
            Search Jobs Globally
          </span>
        </div>
      </NavLink>
      <NavLink to={`${props.match.url}/lc-local`} className='lc-wrapper'>
        <div className='lc-card'>
          <div className='jobs-backdrop'></div>
          <img src={japan} alt='lc'/>
          <span className='text-primary jobs-lc-text center'>
            Jobs In Japan
          </span>
        </div>
      </NavLink>
    </div>
  )
}


export default Jobs;
