import React, { useState, useEffect, useLayoutEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../layout/Spinner';
import JobItem from './JobItem'
import JobView from './jobview/JobView'

import { getStackJobs } from '../../../actions/jobs'

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const StackJobs = ({ match, history, getStackJobs, auth, jobs: { jobs, loading } }) => {

  const [query, setQuery] = useState({ search: '', location: '' });
  const [itemId, setItemId] = useState(null);
  const [width, height] = useWindowSize();
  const { search, location } = query;

  const clickHandler = (id) => setItemId(id);
  const onchange = (e) => {setQuery({ ...query, [e.target.name]: e.target.value })}
  const onSubmit = e => {
    e.preventDefault();
    getStackJobs(search, location);
    setQuery({ search: '', location: '' })
  }

  useEffect(() => {
    getStackJobs();
  }, [getStackJobs]);

  const joblist = jobs.map(job => <JobItem key={job.pubDate + Math.random()} job={job} clicked={id => clickHandler(id)}/>);
  let mJob = null;
  if(itemId) {
    mJob = jobs.find(job => job.guid === itemId);
  }
  const itemview = itemId && <JobView key={Math.random()} job={mJob}/>;

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
                <p>Sourse from {' '}<i className="fab fa-stack-overflow"></i>Stack Overflow</p>
              </div>
            </section>
            {itemview}
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
