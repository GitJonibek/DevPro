import React, {Fragment} from 'react'

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
}

const JobItem = React.memo(({ clicked, job: { guid, title, link, pubDate, content, categories }}) => {

  const ttl = title.substring(0, title.indexOf(' at '));
  const loc = title.substring(title.indexOf(' at ') + 3);
  const cats = categories ? categories.map(cat => <input type='button' key={Math.random()} className='category-span' value={cat}/>) : null;

  const num = getRandomInt(7);

  return (
    <Fragment>
      <div className="jobs_item" style={borderRainbow[num]}>
        <div className='item_img_wrap'>
          <img className="item_img" src='' alt="icon"/>
        </div>
        <div className='item_title_wrap'>
          <h1 className="item_title" onClick={() => clicked(guid)}>{ttl}</h1>
          <p className="item_location">{loc}</p>
        </div>
        <div className='item_details'>
          <div className="item_category">{cats}</div>
          <small className="item_datetime">{pubDate}</small>
        </div>
      </div>
    </Fragment>
  )
}, (prev, next) => {
  return prev.job !== next.job;
});

const borderRainbow = [
  {borderLeft: '5px solid #FF5252'},
  {borderLeft: '5px solid #212121'},
  {borderLeft: '5px solid #3F51B5'},
  {borderLeft: '5px solid #8BC34A'},
  {borderLeft: '5px solid #5D4037'},
  {borderLeft: '5px solid #607D8B'},
  {borderLeft: '5px solid #FFCA28'},
]

export default JobItem;
