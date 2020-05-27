import React, {useState} from 'react'

import JobView from './jobview/JobView'

const JobItem = ({ job, clicked }) => {

  const [job_item, setItem] = useState(false);

  const skills = job.technologies.split(',').map(tech => <div key={Math.random() + 1} className="job-item skill">{tech}</div>)

  return (
    <div className='mobile-wrapper'>
      { job_item && <JobView clicked={() => setItem(!job_item)} job={job}/> }
      <article className="job-item job-card" onClick={() => setItem(!job_item)}>
        <div className="job-item company-logo-img">
          <img src="https://s3-ap-southeast-1.amazonaws.com/hs.user-files/employer_logo/346/primetech-technology.png"
            alt='something' />
        </div>
        <div className='job-item company-wrapper'>
          <div className="job-item job-title">{job.title}</div>
          <div className="job-item company-name">{job.company.name}</div>
        </div>
        <div className="job-item job-details">{job.description}</div>
        <div className="job-item skills-container">
          {skills}
        </div>
        <div className="btn-container">
          <button className="job-item-btn apply">Apply</button>
          <button className="job-item-btn save">Save Job</button>
        </div>
      </article>
    </div>
  )
}

export default JobItem;
