import React from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name }
  }
}) => {
  return (
    <div className="profile-about bg-light p-2">
      <h2 className="text-primary">{name + "'"}s Bio</h2>
      <p>{bio}</p>
      <div className="line"></div>
      <h2 className="text-primary">Skills</h2>
      <div className="skills">
      {
        skills.map((skill, index) => (<span className="profile-skill" key={index}>{skill}</span>))
      }
      </div>
    </div>
  )
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileAbout;
