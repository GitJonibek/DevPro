import React from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from "react-router-dom";
import {connect} from "react-redux";
require('dotenv').config()

const Landing = (props) => {

  if(props.isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-dark my-1">Sign Up</Link>
            <Link to="/login" className="btn btn-dark my-1">Sign In</Link>
            {/* <a href='https://github.com/login/oauth/authorize?client_id=8f6eb02bfcdaa7b11bed' alt=''>Login with github</a> */}
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
