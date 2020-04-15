import React from 'react'
import Moment from "react-moment";
import PropTypes from 'prop-types'

const ProfileExperience = ({ profile: { experience } }) => {

  const experiences = experience.map((exp, index) => (
    <div>
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

  return (
    <div className="profile-exp bg-white p-2">
      <h2 className="text-primary">Experiences</h2>
      {experiences}
    </div>
  )
}

ProfileExperience.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileExperience;
