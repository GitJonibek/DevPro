import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, Route } from "react-router-dom";
import Spinner from '../layout/Spinner';
import StackJobs from './stackjobs/Jobs'
import {connect} from 'react-redux'
import './Jobs.css'

import { getStackJobs } from '../../actions/jobs'

const Jobs = (props) => {

  const [page, setPage] = useState({
    stack: true,
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
        <Link to={`${props.match.url}/gl-stack`}>
          <span style={page.stack ? style : null} className='jobs-stack text-primary' onClick={() => onPageChange('stack')}>
          Search Stack Jobs</span>
        </Link>
        <Link to={`${props.match.url}/lc-local`}>
          <span style={page.local ? style : null} className='jobs-local text-primary' onClick={() => onPageChange('local')}>
          Jobs In Japan</span>
        </Link>
      </div>
      <Fragment>
        <Route path={`${props.match.url}/:page`} component={StackJobs}/>
      </Fragment>
    </div>
  )
}

Jobs.propTypes = {
  getStackJobs: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  jobs: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  jobs: state.jobs
});

export default connect(mapStateToProps, { getStackJobs })(Jobs);
