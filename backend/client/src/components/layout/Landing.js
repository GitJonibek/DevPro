import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from "react-router-dom";
import {connect} from "react-redux";
require('dotenv').config()

const Landing = (props) => {

  if(props.isAuthenticated) {
    return <Redirect to='/posts' />
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Professional</h1>
          <p className="lead">
            Create a profile/portfolio, share posts, engage, find a job and get help from
            other developers.
          </p>
          <div className="buttons">
            <button onClick={() => props.history.push('/register')} type="button" name="button" className="btn-join-now">
              Join our community
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing)
