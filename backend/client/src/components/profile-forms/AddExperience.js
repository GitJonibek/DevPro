import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'

import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {addExperience} from "../../actions/profile";

const AddExperience = (props) => {

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault();
    props.addExperience(formData, props.history);
  }

  return (
    <Fragment>
      <h1 className="large text-primary">
        Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder=" " value={title} onChange={e => onChange(e)} name="title" required />
          <span className='placeholder-text'>* Job Title</span>
        </div>
        <div className="form-group">
          <input type="text" placeholder=" " value={company} onChange={e => onChange(e)} name="company" required />
          <span className='placeholder-text'>* Company</span>
        </div>
        <div className="form-group">
          <input type="text" placeholder=" " value={location} onChange={e => onChange(e)} name="location" />
          <span className='placeholder-text'>Location</span>
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" value={from} onChange={e => onChange(e)} name="from" />
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" value={to} onChange={e => onChange(e)} name="to" disabled={toDateDisabled && 'disabled'} />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              value={current}
              checked={current}
              onChange={() => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
              name="current" />{' '}Current Job
          </p>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            value={description} onChange={e => onChange(e)}
            cols="30"
            rows="5"
            placeholder="Job Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-round-dark my-1" />
        <Link className="btn btn-round-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
  )
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
}

export default connect(null, { addExperience })(withRouter(AddExperience));
