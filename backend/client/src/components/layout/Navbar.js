import React from 'react'
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from 'prop-types'
import { NavLink } from "react-router-dom";

const Navbar = (props) => {

  const authLinks = (
    <ul>
      <li><NavLink to="/developers">Developers</NavLink></li>
      <li><NavLink to="/dashboard">Dashboard</NavLink></li>
      <li>
        <NavLink onClick={props.logout} to="/">
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </NavLink>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li><NavLink to="/developers">Developers</NavLink></li>
      <li><NavLink to="/register">Register</NavLink></li>
      <li><NavLink to="/login">Login</NavLink></li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <NavLink to="/"> <i className="fas fa-code"></i> DevConnector </NavLink>
      </h1>
      {!props.auth.loading && (
        <React.Fragment>
          {props.auth.isAuthenticated ? authLinks : guestLinks}
        </React.Fragment>
      )}
    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStatetoProps = state => ({
  auth: state.auth
})

export default connect(mapStatetoProps, { logout })(Navbar);
