import React, { Fragment, useState } from 'react'
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import {setAlert} from "../../actions/alert";
import PropTypes from 'prop-types'

const Register = (props) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChangeHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if(password !== password2) {
      props.setAlert('Passwords do not match!', 'danger', 3000);
    }
    else {
      console.log('Success!');
    }
  }

  return (
    <Fragment>
      <h1 className="large text-primary">
        Sign Up
      </h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            onChange={e => onChangeHandler(e)}
            type="text"
            name='name'
            value={name}
            placeholder="Name"
            required />
        </div>
        <div className="form-group">
          <input
            onChange={e => onChangeHandler(e)}
            type="email"
            name='email'
            value={ email }
            placeholder="Email Address"
            required />
          <small className="form-text">
            This site uses Gravatar, so if you want a profile image, use a
            Gravatar email
          </small>
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
        <div className="form-group">
          <input
            onChange={e => onChangeHandler(e)}
            type="password"
            name="password2"
            value={ password2 }
            placeholder="Confirm Password"
            minLength="6" />
        </div>
        <input type="submit" value="Register" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired
}

export default connect(null, {setAlert})(Register);
