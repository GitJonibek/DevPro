import React from 'react'
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from 'prop-types'
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";

const Navbar = (props) => {

  const authLinks = (
    <ul className='nav-items'>
      <li>
        <NavLink to="/posts" id='posts' activeStyle={{color: "#ff5722"}}>
          <i className='fas fa-blog hide-lg'></i>{' '}
            <span className='hide-sm'>Posts</span>
          </NavLink></li>
      <li>
        <NavLink to="/jobs" id='jobs' activeStyle={{color: "#ff5722"}}>
        <i className="fas fa-search-dollar hide-lg"></i>{' '}
        <span className='hide-sm'>Jobs</span>
      </NavLink></li>
      <li>
        <NavLink to="/companies" id='developers' activeStyle={{color: "#ff5722"}}>
          <i className="far fa-building hide-lg"></i>{' '}
          <span className='hide-sm'>Companies</span>
        </NavLink></li>
      <li>
        <NavLink to="/profiles" id='profiles' activeStyle={{color: "#ff5722"}}>
          <i className='fas fa-code hide-lg'></i>{' '}
          <span className='hide-sm'>Developers</span>
        </NavLink></li>
      <li>
        <NavLink to="/dashboard" id='dashboard' activeStyle={{color: "#ff5722"}}>
          <i className='fas fa-user hide-lg'></i>{' '}
          <span className='hide-sm'>Dashboard</span>
        </NavLink></li>
      <li>
        <NavLink onClick={props.logout} to="/" id='logout' activeStyle={{color: "#ff5722"}}>
          <i className='fas fa-sign-out-alt hide-lg'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </NavLink></li>
    </ul>
  );

  const guestLinks = (
    <ul className='nav-items'>
      <li>
        <NavLink to="/jobs" id='jobs' activeStyle={{color: "#ff5722"}}>
          <i className="fas fa-search-dollar hide-lg"></i>{' '}
          <span className='hide-sm'>Jobs</span>
        </NavLink></li>
      <li>
        <NavLink to="/companies" id='developers' activeStyle={{color: "#ff5722"}}>
          <i className="far fa-building hide-lg"></i>{' '}
          <span className='hide-sm'>Companies</span>
        </NavLink></li>
      <li>
        <NavLink to="/profiles" id='developers' activeStyle={{color: "#ff5722"}}>
          <i className='fas fa-code hide-lg'></i>{' '}
          <span className='hide-sm'>Developers</span>
        </NavLink></li>
      <li>
        <NavLink to="/login" id='signup' activeStyle={{color: "#ff5722"}}>
          <i className="fas fa-user-plus hide-lg"></i>{' '}
          <span className='hide-sm bordered'>Join now</span>
        </NavLink></li>
    </ul>
  );

  return (
    <header className='fixed'>
      <div className='mNavbar-wrapper'>
        <nav className="mNavbar" >
          <h1>
            <NavLink to="/"> <i className="fas fa-sitemap"></i> DevPro </NavLink>
          </h1>
          {!props.auth.loading && (
            <React.Fragment>
              {props.auth.isAuthenticated ? authLinks : guestLinks}
            </React.Fragment>
          )}
        </nav>
      </div>
    </header>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStatetoProps = state => ({
  auth: state.auth
})

export default withRouter(connect(mapStatetoProps, { logout })(Navbar));
