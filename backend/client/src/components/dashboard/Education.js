import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from "react-moment";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import {deleteEducation} from "../../actions/profile";

const Education = ({education, deleteEducation}) => {

  const educations = education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{edu.from}</Moment> - {' '}
        {
          edu.to === null ? (' Now') : (<Moment format='YYYY/MM/DD'>{edu.to}</Moment>)
        }
      </td>
      <td>
        <button className='btn btn-danger' onClick={() => deleteEducation(edu._id)}>Delete</button>
      </td>
    </tr>
  ));

  if(!education.length) {
    return (
      <Fragment>
        <p >Add Education to your profile.</p>
        <Link to='/add-education' className='btn btn-primary my-1'>Add Education</Link>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  )
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education);
