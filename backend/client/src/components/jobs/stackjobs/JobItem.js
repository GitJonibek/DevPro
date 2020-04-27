import React, {Fragment} from 'react'

const JobItem = (props) => {
  return (
    <Fragment>
      <div className="jobs_item">
        <img className="item_img" src="" alt="icon"/>
        <h1 className="item_title">Title</h1>
        <p className="item_location">location</p>
        <div className="item_category">Django,PHP,Laravel,C++</div>
        <p className="item_datetime">Date & time</p>
      </div>
      <div className="jobs_item">
        <img className="item_img" src="" alt="icon"/>
        <h1 className="item_title">Title</h1>
        <p className="item_location">location</p>
        <div className="item_category">Django,PHP,Laravel,C++</div>
        <p className="item_datetime">Date & time</p>
      </div>
      <div className="jobs_item">
        <img className="item_img" src="" alt="icon"/>
        <h1 className="item_title">Title</h1>
        <p className="item_location">location</p>
        <div className="item_category">Django,PHP,Laravel,C++</div>
        <p className="item_datetime">Date & time</p>
      </div>
    </Fragment>
  )
}

export default JobItem;
