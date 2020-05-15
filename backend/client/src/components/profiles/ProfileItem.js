import React from 'react'
import { Link } from 'react-router-dom'

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  }
}) => {

  const mSkills = skills.map((skill, index) => (
    <span className='profile-skill' key={index}>
      {skill}
    </span>
  ));

  return (
    <div className='profile'>
      <div className='profile-img'>
        <img src={avatar} alt=''/>
      </div>

      <div className='profile-context'>
        <h2>{name}</h2>
        <p>{status} {company && <span> at {company}</span>}</p>
      </div>
      <div className='profile-actions'>
        <Link to={`/profile/${_id}`} className='btn-profile-view' >View Profile</Link>
      </div>
      <div className='profile-skillset'>{mSkills}</div>
    </div>
  )
}

export default ProfileItem;
