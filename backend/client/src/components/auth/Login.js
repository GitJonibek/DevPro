import React, { Fragment, useState } from 'react'
import { Link } from "react-router-dom";

const Login = (props) => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChangeHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

  }

  return (
    <Fragment>
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
    </Fragment>
  )
}

export default Login
