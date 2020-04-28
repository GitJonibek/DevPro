import React, { useState } from 'react'
import { NavLink, Route } from "react-router-dom";
import StackJobs from './stackjobs/Jobs'
import './Jobs.css'

const Jobs = (props) => {

  const [page, setPage] = useState({
    stack: false,
    local: false,
  });

  const onPageChange = (type) => {
    switch (type) {
      case 'stack': setPage({ stack: true, local: false }); break;
      case 'local': setPage({ stack: false, local: true }); break;
      default: break;
    }
  }

  const style = { borderBottom: '2px solid rgba(249,119,0,1)', color: 'rgba(249,119,0,1)' }

  return (
    <div className='jobs'>
      <div>
        <NavLink to={`${props.match.url}/gl-stack`} onClick={() => onPageChange('stack')}>
          <span style={page.stack ? style : null} className='jobs-stack text-primary'>
          Search Stack Jobs</span>
        </NavLink>
        <NavLink to={`${props.match.url}/lc-local`} onClick={() => onPageChange('local')}>
          <span style={page.local ? style : null} className='jobs-local text-primary'>
          Jobs In Japan</span>
        </NavLink>
      </div>
      <Route path={`${props.match.url}/gl-stack`} component={StackJobs}/>
    </div>
  )
}


export default Jobs;
