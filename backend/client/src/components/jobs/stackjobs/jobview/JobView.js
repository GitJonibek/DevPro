import React, { Fragment } from 'react';
import Moment from 'react-moment';

import JobViewActions from './JobViewActions'

const JobView = (props) => {
  const icon = require('../company-icon.svg');

  const width = !props.location ? props.width : props.location.state.width;
  const mjob = !props.location ? props.job : props.location.state.job;

  const ttl = mjob.title.substring(0, mjob.title.indexOf(' at '));
  const loc = mjob.title.substring(mjob.title.indexOf(' at ') + 3);
  const cats = mjob.categories ? mjob.categories.map(
    cat => <input key={cat} type='button' className='category-span' value={cat}/>
  ) : null;

  // const parser = new DOMParser();
  // const doc = parser.parseFromString(mjob.content, "text/html");

  const clickHandler = () => {
    window.open(mjob.link, "_blank")
  }
  return (
    <Fragment>
      {width <= 902 &&
        <div style={{width: '100%', display: 'inline-block', padding: '10px 5px'}}>
          <input
            onClick={() => props.history.goBack()}
            style={{border: '1px solid #212121'}}
            type='button'
            className='btn btn-round-light'
            value='Go Back' />
        </div>
      }
      <section className="jobs_viewer_item">
        <div className="jobs_viewer_item_header">
          <img className="viewer-img" src={icon} alt="icon"/>
          <h1 className="viewer-title">{ttl}</h1>
          <p className="viewer-location">{loc}</p>
          <div className="jobs_viewer_item_header_actions">
            <JobViewActions clicked={clickHandler}/>
          </div>
        </div>
        <div className="jobs_viewer_item_body">
          <p className="viewer-body-date"><small><Moment format='D MMM YYYY, HH:mm (Z)'>{mjob.pubDate}</Moment>TMZ</small></p>
          <div className="viewer-body-category">{cats}</div>
          <p id='content' className="viewer-body-description">{mjob.contentSnippet}</p>
        </div>
      </section>
    </Fragment>
  )
}

export default (JobView);
