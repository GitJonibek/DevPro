import React, { useState, useEffect, useLayoutEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../layout/Spinner';
import JobItem from './JobItem'
import JobView from './jobview/JobView'

import { getStackJobs, getCurrentStack } from '../../../actions/jobs';

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

const StackJobs = React.memo(({
  match,
  history,
  getStackJobs,
  getCurrentStack,
  jobs: { gl_jobs, loading }
}) => {

  const [query, setQuery] = useState({ search: '', location: '' });
  const [itemId, setItemId] = useState(null);
  const [width, height] = useWindowSize();
  const { search, location } = query;

  const onchange = (e) => {setQuery({ ...query, [e.target.name]: e.target.value })}
  const clickHandler = (id) => {
    setItemId(id);
    getCurrentStack(id);
  };
  const onSubmit = e => {
    e.preventDefault();
    if (search !== '' || location !== '') {
      getStackJobs(search, location);
      setQuery({ search: '', location: '' })
    }
  }

  useEffect(() => {
    if (search === '' && location === '' && !gl_jobs.length) {
      getStackJobs();
    }
  }, [getStackJobs]);

  const joblist = gl_jobs.map(job =>
    <JobItem key={job.pubDate + Math.random()} job={job} clicked={id => clickHandler(id)}/>);
  let mJob = null;
  if(itemId) { mJob = gl_jobs.find(job => job.guid === itemId); }

  return (
    <div className="gl_jobs_container">
      <header className="jobs_header">
        <form className='form form-flex' onSubmit={e=>onSubmit(e)}>
          <div className='form-group'>
            <input
              type="text"
              name="search"
              value={search}
              placeholder='search'
              onChange={e => onchange(e)}/>
          </div>
          <div className='form-group'>
            <input
              type="text"
              name="location"
              value={location}
              placeholder='location'
              onChange={e => onchange(e)}/>
          </div>
          <input
            type="submit"
            value="Search"
            style={{border: '1px solid #101D30'}}
            className="btn btn-round-light btn-full" />
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
            {
              itemId && history.push({
                pathname: `/job/${itemId}`,
                search: `?q=${mJob.link}`,
                state: { job: mJob, width: width }
              })
              /*<JobView key={Math.random()} job={mJob} width={width}/>*/
            }
          </Fragment>
        )}
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
