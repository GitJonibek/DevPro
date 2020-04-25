import React, { useState } from 'react'
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import {setAlert} from "../../actions/alert";
import {register} from "../../actions/auth";
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'


const passRegEx = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;

const Register = (props) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const [validator, setValidator] = useState({
    password: false,
    password2: false
  });

  const { name, email, password, password2 } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    switch(e.target.name){
      case 'password':
        setValidator({ ...validator, [e.target.name]: (passRegEx.test(password) && password.length > 0) });
        break;
      case 'password2':
        setValidator({ ...validator, [e.target.name]: passRegEx.test(password2) && (e.target.value === password) });
        break;
      default: break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if(validator.password && validator.password2) {
      props.register({name, email, password});
      setFormData({
        name: '',
        email: '',
        password: '',
        password2: ''
      });
    }
    else {
      props.setAlert('Passwords do not match!', 'danger', 3000);
    }
  }

  const style1 = (validator.password && (password.length > 0)) ? {border: '2px solid #101D30'} : {border: '2px solid #FF5D73'};
  const style2 = (validator.password2&& (password2.length> 0)) ? {border: '2px solid #101D30'} : {border: '2px solid #FF5D73'};

  return props.loading ? <Spinner /> : (
    <div className='form-container'>
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
            style={style1}
            onChange={e => onChangeHandler(e)}
            type="password"
            name="password"
            value={ password }
            placeholder="Password"
            minLength="7" />
        </div>
        <div className="form-group">
          <input
            style={style2}
            onChange={e => onChangeHandler(e)}
            type="password"
            name="password2"
            value={ password2 }
            placeholder="Confirm Password"
            minLength="7" />
        </div>
        <input type="submit" value="Register" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
}

const mapStatetoProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStatetoProps, {setAlert, register})(Register);
