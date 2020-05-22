import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCompanyList } from '../../actions/companies'

import Header from './header';
import Main from './main';
import './Companies.css'

const Companies = ({ companies: { loading, companies }, getCompanyList, history, match }) => {

  useEffect(() => {
    if(!companies.length) { getCompanyList(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCompanyList])

  return (
    <div className='company-container'>
      <div className='company-header'>
        <h1>Tech Companies. <br/>In Japan. <br/> That you'll love.</h1>
        <div className="company-backdrop"/>
        <div className="company-img"/>
      </div>
      <main className='company-main'>
        <section className='side-section'>
          <Header />
        </section>
        <section className='main-section'>
          {companies.map((company, index) =>
            <Main key={index + Math.random()} history={history} match={match} company={company} />
          )}
        </section>
      </main>
    </div>
  )
}

Companies.propTypes = {
  companies: PropTypes.object.isRequired,
  getCompanyList: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  companies: state.companies
})

export default connect(mapStateToProps, { getCompanyList })(Companies);
