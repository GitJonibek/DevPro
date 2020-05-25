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
        <button className='btn btn-round-danger' onClick={() => deleteEducation(edu._id)}>
          <i className="fas fa-trash-alt"></i>{' '}
        </button>
      </td>
      <td>
        <Link to={{
              pathname: '/add-education',
              state: {
                education: edu
              }
            }}><button className='btn btn-round-primary'>
            <i className="fas fa-pencil-alt"></i>{' '}
          </button>
        </Link>
      </td>
    </tr>
  ));

  if(!education.length) {
    return (
      <Fragment>
        <p >Add Education to your profile.</p>
        <Link to='/add-education' className='btn btn-round-primary my-1'>Add Education</Link>
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
