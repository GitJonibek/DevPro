import React, {Fragment} from 'react'
import Moment from 'react-moment';

import JobViewActions from './JobViewActions'

const JobView = ({ job: { title, link, pubDate, content, contentSnippet, categories }}) => {

  const ttl = title.substring(0, title.indexOf(' at '));
  const loc = title.substring(title.indexOf(' at ') + 3);
  const cats = categories ? categories.map(cat => <input key={cat} type='button' className='category-span' value={cat}/>) : null;

  const icon = require('../company-icon.svg');

  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");

  return (
    <Fragment>
      <div className="jobs_viewer_item_header">
        <img className="viewer-img" src={icon} alt="icon"/>
        <h1 className="viewer-title">{ttl}</h1>
        <p className="viewer-location">{loc}</p>
        <div className="jobs_viewer_item_header_actions">
          <JobViewActions />
        </div>
      </div>
      <div className="jobs_viewer_item_body">
        <p className="viewer-body-date"><small><Moment format='D MMM YYYY, HH:mm (Z)'>{pubDate}</Moment>TMZ</small></p>
        <div className="viewer-body-category">{cats}</div>
        <p id='content' className="viewer-body-description">{content}</p>
      </div>
    </Fragment>
  )
}

export default JobView;
