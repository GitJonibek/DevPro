import React, { useState } from 'react'
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login, withGithub } from "../../actions/auth";
import PropTypes from 'prop-types'

const Login = (props) => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChangeHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    props.login({email, password});
  }

  if(props.isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <div className='form-container'>
      <h1 className="large text-primary">
        Sign In
      </h1>
      <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            onChange={e => onChangeHandler(e)}
            type="email"
            name='email'
            value={ email }
            placeholder="Email Address"
            required />
        </div>
        <div className="form-group">
          <input
            onChange={e => onChangeHandler(e)}
            type="password"
            name="password"
            value={ password }
            placeholder="Password"
            minLength="6" />
        </div>
        <input type="submit" value="Login" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
      <span onClick={props.withGithub} style={{cursor: 'pointer'}}>
        Continue with GitHub{' '}<i className="fab fa-github"></i>
      </span>
    </div>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  withGithub: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStatetoProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStatetoProps, {
  login,
  withGithub
})(Login);
