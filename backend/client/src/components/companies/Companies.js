import React from 'react'
import PropTypes from 'prop-types'

import './Companies.css'

const Companies = (props) => {

  const wave = require('./wave.svg');

  return (
    <div className='company-container'>
      <div className='company-header'>
        <h1>Tech Companies. <br/>In Japan. <br/> That you'll love.</h1>
        <div className="company-wave">
          <img src={wave} alt=''/>
        </div>
      </div>
      <main className='company-main'>
        <section className='side-section'>
          <p>FILTER BY</p>
          <div className='company-form-group'>
            <input
              type="text"
              name="search"
              value=''
              placeholder='search'/>
          </div>
        </section>
        <section className='main-section'>
          <div className='company-card'>
            <div className='company-card-header'>
              <h3>Company Name</h3>
              <span className='job-number'>2 jobs</span>
              <img src='' alt=''/>
            </div>
            <p>Descriptionloremskldskljlvdklsjkvsdlkvklnsdjkln;vjndsjknvjkdsn;nvkdjsnvjkdnskvnjkdsjvl;djvjidsjdvlslkdvldsvkidvslk</p>
            <div className='company-card-action'>
              <span>Capital</span>
              <span>Location</span>
              <input type='button' value='Details' style={{border: '1px solid #212121'}} className='btn-details'/>
              <input type='button' value='2 Jobs' style={{border: '1px solid #212121'}} className='btn-jobs'/>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Companies
