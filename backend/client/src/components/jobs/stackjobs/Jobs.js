import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import Spinner from '../../layout/Spinner';
import JobItem from './JobItem'

import { getJobs } from '../../../actions/jobs';

const StackJobs = React.memo(({
  match,
  history,
  getJobs,
  jobs: { gl_jobs, loading }
}) => {

  const [search, setSearch] = useState('');
  const [itemId, setItemId] = useState(null);

  const onchange = (e) => {setSearch(e.target.value)};
  const clickHandler = (id) => {
    setItemId(id);
  };
  const onSubmit = e => {
    e.preventDefault();
    if (search !== '') {
      // Search Patterns
      setSearch('')
    }
  }

  useEffect(() => {
    if(!gl_jobs.length) {
      getJobs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const jobs = gl_jobs.map((job, index) => <JobItem key={index} clicked={clickHandler} job={job} />);

  const icon  = require('../res/jobs.jpg');

  return (
    <div className="jobs">
      <header className="jobs_header">
        <div className="job_header">
          <div className="banner-backdrop" />
          <img className='img-banner' src={icon} alt=''/>
          <form className='form-search' onSubmit={e=>onSubmit(e)}>
            <h1>Explore Jobs</h1>
            <p>Find your dream job and get offer from one of our tech giants.</p>
            <div className='job-form-group'>
              <input
                type="text"
                name="search"
                value={search}
                placeholder='search'
                onChange={e => onchange(e)}/>
            </div>
          </form>
        </div>
      </header>
      <main className="jobs_main">
        {jobs}
      </main>

    </div>
  )
});

StackJobs.propTypes = {
  getJobs: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  jobs: state.jobs
});

export default connect(mapStateToProps, { getJobs })(StackJobs);
