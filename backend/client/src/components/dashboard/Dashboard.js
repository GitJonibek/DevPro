import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import Spinner from '../layout/Spinner'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
import {getCurrentProfile, deleteAccount} from "../../actions/profile";

const Dashboard = ({ getCurrentProfile, auth, profile, deleteAccount }) => {

  useEffect(() => {
    if(!profile.profile) {
      getCurrentProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return profile.profile === null ? <Spinner /> : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {auth.user && auth.user.name}
      </p>
      { profile.profile !== null ? (
        <Fragment>
          <DashboardActions
            id={profile.profile.user._id}
            exp={profile.profile.experience.length}
            edu={profile.profile.education.length}
            />
          <Experience experience={profile.profile.experience} />
          <Education education={profile.profile.education} />

          <div className='my-2'>
            <button className='btn btn-round-danger del-account' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus'></i>{' '}Delete Account
            </button>
          </div>

        </Fragment>
      ) : (
        <Fragment>
          <p >Please, complete your profile</p>
          <Link to='/create-profile' className='btn btn-round-dark my-1'>Create Profile</Link>
        </Fragment>
      )
      }
    </Fragment>
  )
}

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
