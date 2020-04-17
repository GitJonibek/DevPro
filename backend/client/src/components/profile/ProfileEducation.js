import React, { Fragment } from 'react'
import Moment from "react-moment";
import PropTypes from 'prop-types'

const ProfileEducation = ({ profile }) => {

  const educations = profile.map((edu, index) => (
    <div key={index}>
      <h3>{edu.school}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{edu.from}</Moment> - {' '}
        {
          edu.to === null ? (' Current') : (<Moment format='YYYY/MM/DD'>{edu.to}</Moment>)
        }
      </p>
      <p> <strong>Degree: </strong> {edu.degree} </p>
      <p> <strong>Field of study: </strong> {edu.fieldofstudy} </p>
      <p> <strong>Description: </strong> {edu.description} </p>
    </div>
  ));

  return <Fragment>{educations}</Fragment>;
}

ProfileEducation.propTypes = {
  profile: PropTypes.array.isRequired
}

export default ProfileEducation;
