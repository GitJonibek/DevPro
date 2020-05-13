import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../layout/Spinner';
import JobItem from './JobItem'

import { getStackJobs, getCurrentStack } from '../../../actions/jobs';

const StackJobs = React.memo(({
  match,
  history,
  getStackJobs,
  getCurrentStack,
  jobs: { gl_jobs, loading }
}) => {

  const [search, setSearch] = useState('');
  const [itemId, setItemId] = useState(null);

  const onchange = (e) => {setSearch(e.target.value)};
  const clickHandler = (id) => {
    setItemId(id);
    getCurrentStack(id);
  };
  const onSubmit = e => {
    e.preventDefault();
    if (search !== '') {
      getStackJobs(search);
      setSearch('')
    }
  }

  useEffect(() => {
    // if (search === '' && location === '' && !gl_jobs.length) {
    //   getStackJobs();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const joblist = gl_jobs.map(job =>
    <JobItem key={job.pubDate + Math.random()} job={job} clicked={id => clickHandler(id)}/>);
  let mJob = null;
  if(itemId) { mJob = gl_jobs.find(job => job.guid === itemId); }

  const banner = require('../../../img/search_banner.jpg');

  return (
    <div className="jobs">
      <header className="jobs_header">
        <div className="job_header">
          <div className="banner-backdrop"></div>
          <div className='img-banner'>
            <img src={banner} alt=''/>
          </div>
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
        <section className="jobs_list">
          <div className="jobs_list_wrapper">
            {joblist}
            Hello world
          </div>
        </section>
      </main>

    </div>
  )
});

StackJobs.propTypes = {
  getStackJobs: PropTypes.func.isRequired,
  getCurrentStack: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  jobs: state.jobs
});

export default connect(mapStateToProps, { getCurrentStack, getStackJobs })(StackJobs);
