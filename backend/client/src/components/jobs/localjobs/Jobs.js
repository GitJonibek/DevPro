import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import {Redirect} from 'react-router-dom'
// import Spinner from '../../layout/Spinner';

import {} from '../../../actions/jobs';

const LocalJobs = ({ history, auth, jobs: { lc_jobs, loading }}) => {
  return ( auth.isAuthenticated ?
    <div>
      No Jobs Found!
    </div> :
    <div style={{ width: '250px', margin: '40px auto'}}>
      <input
        onClick={() => history.push('/login')}
        type='button'
        className='btn btn-round-dark btn-full'
        value='Please Login to Continue!' />
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
