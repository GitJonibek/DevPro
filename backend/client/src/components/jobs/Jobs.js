import React, { useState } from 'react'
import { NavLink, Route, Switch } from "react-router-dom";
import StackJobs from './stackjobs/Jobs'
import LocalJobs from './localjobs/Jobs'
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

  const style = { borderBottom: '2px solid #ccc', color: '#212121', fontWeight: '600' }

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
      <Switch>
        <Route exact path={`${props.match.url}/gl-stack`} component={StackJobs}/>
        <Route exact path={`${props.match.url}/lc-local`} component={LocalJobs}/>
      </Switch>
    </div>
  )
}


export default Jobs;
