import React from 'react'
// import PropTypes from 'prop-types'

import './style.css'

const Landing = (props) => {
  return (
    <div className='employers-landing'>
      <div className='background-svg'/>
      <h1 className='large'>Hire talents globally</h1>
      <div className='emp-list-container'>
        <div className='emp-list-items'>
          <span><i className="fas fa-headset"></i></span>
          <h1 className='medium my-1'>24/7 SERVICE</h1>
          <p className=''>Reach out to us anytime everyday, year around.
            <br/>We are always happy to serve you and make
            <br/>your life easy with us.
            <br/>Email us any time for human support in English or Japanese </p>
        </div>
        <div className='emp-list-items'>
          <span><i className="fas fa-hand-holding-usd"></i></span>
          <h1 className='medium my-1'>EFFORDABLE</h1>
          <p className=''>Simple and competitive flat monthly pricing
            <br/> Pay a small fraction of what you would with competing services.
            <br/>Hire as many candidates as you want.
            <br/>No percentages, no paying extra for top-level hires</p>
        </div>
        <div className='emp-list-items'>
          <span><i className="fab fa-simplybuilt"></i></span>
          <h1 className='medium my-1'>SIMPLE INTEGRATION</h1>
          <p className=''>No need to login and monitor candidates.
            <br/>No need to report back or share data with us.
            <br/>Share us the link of the job description and
            <br/>we will take care of everything for you.</p>
        </div>
      </div>
      <div className='emp-footer'>
        <div className='emp-footer-bk'/>

      </div>
    </div>
  )
}

export default Landing;
