import React from 'react'
import { Link } from 'react-router-dom'

const Main = ({ company, history, match }) => {

  const location = {
    pathname: `${match.url}/${company.name}`,
    state: {
      company: company
    }
  }

  return (
    <div className='company-card'>
      <div className='company-card-header'>
        <Link to={location}><h3>{company.name}</h3></Link>
        <span className='job-number'>{ company.open_positions.length > 0 && company.open_positions}</span>
        <img src='' alt=''/>
      </div>
      <p onClick={() => history.push(location)}>{company.headline}</p>
      <div className='company-card-action'>
        <span><i className="fas fa-yen-sign"></i>{' ' + company.salary}</span>
        <span><i className="fas fa-map-marker-alt"></i>{' ' + company.location}</span>
        { company.open_positions.length > 0 &&
          <input
            type='button'
            value='2 Jobs'
            style={{border: '1px solid #212121'}}
            className='btn-jobs'/>
        }
        <input
          type='button'
          value='Details'
          style={{border: '1px solid #212121'}}
          onClick={() => history.push(location)}
          className='btn-details'/>
      </div>
    </div>
  )
}

export default Main;
