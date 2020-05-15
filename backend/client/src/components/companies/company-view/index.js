import React, { Fragment } from 'react'

const CompanyView = ({ history: {location: {state: {company}}}, }) => {

  const company_bk = require('./company_bk.jpg');

  const tags = company.details.technologies
    .split(',')
    .map((tag, index) =><span key={index} className='btn-tags'>{tag.trim()}</span>)

  return (
    <Fragment>
      <div className='company-view-container'>
        <header className='cmp-view-header'>
          <div className='cmp-view-backdrop'/>
          <img src={company_bk} alt=''/>
        </header>
        <main className='cmp-view-main'>
          <div className='cmp-view-main-head'>
            <img src={company_bk} alt='' />
            <h1>{company.name}</h1>
          </div>
          <div className='cmp-view-main-article'>
            <h2 className='article-overview'>Overview</h2>
            <p>{company.headline}</p>
            <div><span><i className="fas fa-yen-sign"></i>{company.salary}</span></div>
            <div><span><i className="fas fa-map-marker-alt"></i>{company.location}</span></div>
            <div><span><i className="fas fa-user"></i>{company.details.employees}</span></div>
            <div><a href={company.website} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-chrome"></i>{company.website.split('https://')}
            </a></div>
            <div className='tags'>{tags}</div>
            <h2 className='details_h2'>Visa Sponsorship</h2>
            <p className='details_p'>{company.details.visa_sponsorship}</p>
            <h2 className='details_h2'>Remote</h2>
            <p className='details_p'>{company.details.remote}</p>
            <h2 className='details_h2'>Benefits</h2>
            <p className='details_p'>{company.details.benefits}</p>
          </div>
        </main>
        <div className='company-view-footer'>
          <div>
            <p>We're still gathering data about {company.name}</p>
            <p>We'd love to hear what you have to say about {company.name}!</p>
          </div>
          <div>
            <input type='button' value='Send feedback' className='btn-send_feedback'/>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default CompanyView;
