import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'

import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {addEducation} from "../../actions/profile";

const AddEducation = (props) => {

    const [formData, setFormData] = useState({
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {
      degree,
      school,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
      e.preventDefault();
      props.addEducation(formData, props.history);
    }

    return (
      <Fragment>
        <h1 className="large text-primary">
          Add An Education
        </h1>
        <p className="lead">
          <i className="fas fa-code-branch"></i> Add any education/school that you have had in the past
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input type="text" placeholder="* Degree or Certificate" value={degree} onChange={e => onChange(e)} name="degree" required />
          </div>
          <div className="form-group">
            <input type="text" placeholder="* School or Bootcamp" value={school} onChange={e => onChange(e)} name="school" required />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Field of Study" value={fieldofstudy} onChange={e => onChange(e)} name="fieldofstudy" />
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
                name="current" />{' '}Current School
            </p>
          </div>
          <div className="form-group">
            <textarea
              name="description"
              value={description} onChange={e => onChange(e)}
              cols="30"
              rows="5"
              placeholder="Program Description"
            ></textarea>
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn my-1" to="/dashboard">Go Back</Link>
        </form>
      </Fragment>
    )
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
}

export default connect(null, { addEducation })(withRouter(AddEducation));
