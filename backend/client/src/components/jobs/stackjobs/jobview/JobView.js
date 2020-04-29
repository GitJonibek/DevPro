import React, {Fragment} from 'react'
import Moment from 'react-moment';

import JobViewActions from './JobViewActions'

const JobView = (props) => {

  //history.push(`/job/${itemId}`)
  let ttl = '', loc = '', cats = null;
  if(props.job){
    ttl = props.job.title.substring(0, props.job.title.indexOf(' at '));
    loc = props.job.title.substring(props.job.title.indexOf(' at ') + 3);
    cats = props.job.categories ? props.job.categories.map(
      cat => <input key={cat} type='button' className='category-span' value={cat}/>
    ) : null;
  }
  else if (props.params.id) {

    ttl = props.job.title.substring(0, props.job.title.indexOf(' at '));
    loc = props.job.title.substring(props.job.title.indexOf(' at ') + 3);
    cats = props.job.categories ? props.job.categories.map(
      cat => <input key={cat} type='button' className='category-span' value={cat}/>
    ) : null;
  }


  const icon = require('../company-icon.svg');

  const parser = new DOMParser();
  const doc = parser.parseFromString(props.job.content, "text/html");

  return (
    <section className="jobs_viewer_item">
      <div className="jobs_viewer_item_header">
        <img className="viewer-img" src={icon} alt="icon"/>
        <h1 className="viewer-title">{ttl}</h1>
        <p className="viewer-location">{loc}</p>
        <div className="jobs_viewer_item_header_actions">
          <JobViewActions />
        </div>
      </div>
      <div className="jobs_viewer_item_body">
        <p className="viewer-body-date"><small><Moment format='D MMM YYYY, HH:mm (Z)'>{props.job.pubDate}</Moment>TMZ</small></p>
        <div className="viewer-body-category">{cats}</div>
        <p id='content' className="viewer-body-description">{props.job.content}</p>
      </div>
    </section>
  )
}

export default JobView;
