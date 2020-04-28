import React, {Fragment} from 'react'

const JobItem = ({ clicked, job: { guid, title, link, pubDate, content, contentSnippet, categories }}) => {

  const ttl = title.substring(0, title.indexOf(' at '));
  const loc = title.substring(title.indexOf(' at ') + 3);
  const cats = categories ? categories.map(cat => <input type='button' key={Math.random()} className='category-span' value={cat}/>) : null;

    const icon = require('./company-icon.svg');

  return (
    <Fragment>
      <div className="jobs_item">
        <div>
          <img className="item_img" src={icon} alt="icon"/>
        </div>
        <div>
          <h1 className="item_title" onClick={() => clicked(guid)}>{ttl}</h1>
          <p className="item_location">{loc}</p>
          <div className="item_category">{cats}</div>
          <small className="item_datetime">{pubDate}</small>
        </div>
      </div>
    </Fragment>
  )
}

export default JobItem;
