import React, { Fragment } from 'react'
import Moment from "react-moment";
import PropTypes from 'prop-types'

const ProfileExperience = ({profile}) => {

  const experiences = profile.map((exp, index) => (
    <div key={index}>
      <h3>{exp.company}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {' '}
        {
          exp.to === null ? (' Current') : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)
        }
      </p>
      <p> <strong>Position: </strong> {exp.title} </p>
      <p> <strong>Location: </strong> {exp.location} </p>
      <p> <strong>Description: </strong> {exp.description} </p>
    </div>
  ));

  return <Fragment>{experiences}</Fragment>;
}

ProfileExperience.propTypes = {
  profile: PropTypes.array.isRequired
}

export default ProfileExperience;
