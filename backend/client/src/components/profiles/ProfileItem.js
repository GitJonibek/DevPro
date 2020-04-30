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
    <li className='text-primary' key={index}>
      <i className='fas fa-check'></i> {skill}
    </li>
  ));

  return (
    <div className='profile bg-light'>
      <div className='img-small'>
        <img src={avatar} alt='' className='round-img img-hovered' />
      </div>

      <div>
        <h2>{name}</h2>
        <p>{status} {company && <span> at {company}</span>}</p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-round-dark' >View Profile</Link>
      </div>

      <ul>{mSkills}</ul>

    </div>
  )
}

export default ProfileItem;
