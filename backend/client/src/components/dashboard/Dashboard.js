import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import Spinner from '../layout/Spinner'
import DashboardActions from './DashboardActions'
import {getCurrentProfile} from "../../actions/profile";

const Dashboard = ({getCurrentProfile, auth, profile}) => {

  useEffect(() => {
    getCurrentProfile();
  }, []);

  return profile.loading && profile.profile === null ? <Spinner /> : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {auth.user && auth.user.name}
      </p>
      { profile.profile !== null ? (
        <Fragment>
          <DashboardActions />
        </Fragment>
      ) : (
        <Fragment>
          <p >Please, complete your profile</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>Create Profile</Link>
        </Fragment>
      )
      }
    </Fragment>
  )
}

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
