import React from 'react'
import PropTypes from 'prop-types'

const JobView = ({ job, clicked }) => {

  const skills = job.technologies.split(',').map(
    tech => <div key={Math.random() + 1} className="job-item skill">{tech}</div>
  );
  const reqired_q = job.qualifications.required.map(skill => <li key={Math.random()}>{skill.required_skill}</li>)
  const preffered_q = job.qualifications.preffered.map(skill => <li key={Math.random()}>{skill.preffered_skill}</li>)

  return (
    <div className='jobview-container'>
      <div className='job-backdrop' onClick={clicked}/>
      <div className='job-main-container'>
        <div className='job-header'>
          <img src='https://s3-ap-southeast-1.amazonaws.com/hs.user-files/employer_logo/346/primetech-technology.png' alt='hell'/>
          <span className='job-company-name'>{job.company.name}</span>
          <span className='job-company-location'><small>{job.location}</small></span>
          <button type='button' className='btn btn-primary'>APPLY NOW</button>
        </div>
        <div className='job-main'>
          <h1 className='large my-2'>{job.title}</h1>
          <div className="job-item skills-container my-1"> {skills} </div>
          <div className='job-basic-details'>
            <span><i className="fas fa-map-marker-alt"></i>{' '}{job.location}</span>
            <span><i className="far fa-clock"></i>{job.job_type}</span>
            <span><i className="fas fa-yen-sign"></i>{' '}Salary</span>
          </div>
          <h3>Job Description</h3>
          <p>{job.description}</p>
          <div className='job-qualifications'>
            <h3>Your Qualifications</h3>

            <span>Required</span>
            <ul> {reqired_q} </ul>

            <span>Preffered</span>
            <ul> {preffered_q} </ul>

            <span>Working hours</span>
            <p>core hours 11:00~16:00, Flex-time</p>
          </div>
          <div className='job-company-details'>
            <h3>Overview</h3>

            <span>Remote</span>
            <p>{job.company.details.remote}</p>

            <span>Benefits</span>
            <p>{job.company.details.benefits}</p>

            <span>Visa sponsorship</span>
            <p>{job.company.details.visa_sponsorship}</p>
          </div>
        </div>
      </div>
      <div className='btn-job-bottom'>APPLY NOW</div>
    </div>
  )
}

export default JobView;
