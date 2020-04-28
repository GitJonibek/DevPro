import React, {Fragment} from 'react'

const JobItem = ({ job: { title, link, pubDate, content, contentSnippet, categories }}) => {
  const ttl = title.substring(0, title.indexOf(' at '));
  const loc = title.substring(title.indexOf(' at ') + 3);
  const cats = categories ? categories.map(cat => <span key={Math.random()} className='category-span'>{cat}</span>) : null;

  return (
    <Fragment>
      <div className="jobs_item">
        <div>
          <img className="item_img" src="" alt="icon"/>
        </div>
        <div>
          <h1 className="item_title">{ttl}</h1>
          <p className="item_location">{loc}</p>
          <div className="item_category">{cats}</div>
          <small className="item_datetime">{pubDate}</small>
        </div>
      </div>
    </Fragment>
  )
}

export default JobItem;
