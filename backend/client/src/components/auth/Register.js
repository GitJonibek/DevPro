import React, { useState } from 'react'
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import {setAlert} from "../../actions/alert";
import {register} from "../../actions/auth";
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'


const passRegEx = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&.*])[\w!@#$.%^&*]{7,}$/;

const Register = (props) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    checkbox: false
  });
  const [validator, setValidator] = useState({
    password: false,
    password2: false
  });

  const { name, email, password, password2, checkbox } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    switch(e.target.name){
      case 'checkbox':
        setFormData({ ...formData, [e.target.name]: !checkbox });
        break;
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
    if(password === password2 && validator.password && validator.password2) {
      props.register({name, email, password, checkbox});
      setFormData({
        name: '',
        email: '',
        password: '',
        password2: '',
        checkbox: false
      });
    }
    else {
      props.setAlert('Passwords do not match!', 'danger', 3000);
    }
  }

  const style1 = (validator.password) ? {border: '1px solid #101D30'} : {border: '1px solid #FF5D73'};
  const style2 = (validator.password2) ? {border: '1px solid #101D30'} : {border: '1px solid #FF5D73'};
  const styleS1 = (validator.password) ? { display: 'none' } : {color: '#FF5D73'};
  const styleS2 = (validator.password2) ? { display: 'none' } : {color: '#FF5D73'};

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
            placeholder="full name"
            required />
        </div>
        <div className="form-group">
          <input
            onChange={e => onChangeHandler(e)}
            type="email"
            name='email'
            value={ email }
            placeholder="email"
            required />
          <small className="form-text">
            This site uses Gravatar, so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            style={(password.length > 0) ? style1 : null}
            onChange={e => onChangeHandler(e)}
            type="password"
            name="password"
            value={ password }
            placeholder="password"
            minLength="7" />
          <small className="form-text" style={(password.length > 0) ? styleS1 : {display: 'none'}}>
            Password must contain at least one Capital character, small character,
            one digit, one symbol, and must be more than 7 characters.
          </small>
        </div>
        <div className="form-group">
          <input
            style={(password2.length > 0) ? style2 : null}
            onChange={e => onChangeHandler(e)}
            type="password"
            name="password2"
            value={ password2 }
            placeholder="confirm password"
            minLength="7" />
          <small className="form-text" style={(password2.length > 0) ? styleS2 : {display: 'none'}}>
            Passwords must be match to each other.
          </small>
        </div>
        <div className="form-group">
          <input
            id='SUBSCRIBTION'
            onChange={e => onChangeHandler(e)}
            type="checkbox"
            name="checkbox"
            value={checkbox}/>
          <label forhtml="SUBSCRIBTION"><small>{' '}Do you agree to receive notifications and important announcements?</small></label>
        </div>
        <input type="submit" value="Register" className="btn btn-round-dark btn-full" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login" style={{textDecoration: 'underline'}}>Sign In</Link>
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
