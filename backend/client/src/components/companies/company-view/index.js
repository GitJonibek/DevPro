import React, { Fragment } from 'react'
import Spinner from '../../layout/Spinner';

const CompanyView = ({ history: {location}, match }) => {

  const company_bk = require('../res/company_bk.jpg');

  const comp = location.state ? location.state.company : undefined;
  const tags = comp.details.technologies
  .split(',')
  .map((tag, index) =><span key={index} className='btn-tags'>{tag.trim()}</span>)

  return (!comp ? <Spinner /> :
    <Fragment>
      <div className='company-view-container'>
        <header className='cmp-view-header'>
          <div className='cmp-view-backdrop'/>
          <img src={company_bk} alt=''/>
        </header>
        <main className='cmp-view-main'>
          <div className='cmp-view-main-head'>
            <img src={company_bk} alt='' />
            <h1>{comp.name}</h1>
          </div>
          <div className='cmp-view-main-article'>
            <h2 className='article-overview'>Overview</h2>
            <p>{comp.headline}</p>
            <div><span><i className="fas fa-yen-sign"></i>{comp.salary}</span></div>
            <div><span><i className="fas fa-map-marker-alt"></i>{comp.location}</span></div>
            <div><span><i className="fas fa-user"></i>{comp.details.employees}</span></div>
            <div><a href={comp.website} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-chrome"></i>{comp.website.split('https://')}
            </a></div>
            <div className='tags'>{tags}</div>
            <h2 className='details_h2'>Visa Sponsorship</h2>
            <p className='details_p'>{comp.details.visa_sponsorship}</p>
            <h2 className='details_h2'>Remote</h2>
            <p className='details_p'>{comp.details.remote}</p>
            <h2 className='details_h2'>Benefits</h2>
            <p className='details_p'>{comp.details.benefits}</p>
          </div>
        </main>
        <div className='company-view-footer'>
          <div>
            <p>We're still gathering data about {comp.name}</p>
            <p>We'd love to hear what you have to say about {comp.name}!</p>
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
