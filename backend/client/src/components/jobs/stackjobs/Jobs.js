import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../layout/Spinner';
import JobItem from './JobItem'
import JobView from './jobview/JobView'

import { getStackJobs } from '../../../actions/jobs'

const StackJobs = ({ getStackJobs, auth, jobs: { jobs, loading } }) => {

  const [query, setQuery] = useState({ search: '', location: '' });
  const onchange = (e) => {setQuery({ ...query, [e.target.name]: e.target.value })}

  const { search, location } = query;

  const onSubmit = e => {
    e.preventDefault();
    getStackJobs(search, location);
  }

  useEffect(() => {
    getStackJobs(search, location);
  }, [search, location]);

  const joblist = jobs.map(job => <JobItem key={job.pubDate + Math.random()} job={job}/>);

  return (
    <div className="gl_jobs_container">
      <header className="jobs_header">
        <form className='form form-flex' onSubmit={e=>onSubmit(e)}>
          <div className='form-group'>
            <input
              type="text"
              name="search"
              value={search}
              placeholder='Search all jobs'
              onChange={e => onchange(e)}/>
          </div>
          <div className='form-group'>
            <input
              type="text"
              name="location"
              value={location}
              placeholder='Location anywhere'
              onChange={e => onchange(e)}/>
          </div>
          <input
            type="submit"
            value="Search"
            className="btn btn-custom-primary btn-full" />
        </form>
      </header>
      <main className="jobs_main">
        {loading ? <Spinner /> : (
          <Fragment>
            <section className="jobs_list">
              <div className="jobs_list_wrapper">
                {joblist}
              </div>
            </section>
            <section className="jobs_viewer_item">
              <JobView />
            </section>
          </Fragment>
        )}
      </main>
    </div>
  )
}

StackJobs.propTypes = {
  getStackJobs: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  jobs: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  jobs: state.jobs
});

export default connect(mapStateToProps, { getStackJobs })(StackJobs);
