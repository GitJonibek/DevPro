import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import {Redirect} from 'react-router-dom'
// import Spinner from '../../layout/Spinner';

import {} from '../../../actions/jobs';

const LocalJobs = ({ history, auth, jobs: { lc_jobs, loading }}) => {
  return (
    <div>
      <input type='button' className='btn btn-round-dark' value='Go Back' onClick={() => history.goBack()} />
      No Jobs found
    </div>
  )
}

LocalJobs.propTypes = {
  auth: PropTypes.object.isRequired,
  jobs: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  jobs: state.jobs
});


export default connect(mapStateToProps, { })(LocalJobs);
