import React, {Fragment} from 'react'

const JobView = (props) => {
  return (
    <Fragment>
      <div className="jobs_viewer_item_header">
        <img className="viewer-img" src="" alt="icon"/>
        <h1 className="viewer-title">Title</h1>
        <p className="viewer-location">location</p>
        <div className="jobs_viewer_item_header_actions">Actions</div>
      </div>
      <div className="jobs_viewer_item_body">
        <p className="viewer-body-date">Date & time</p>
        <div className="viewer-body-category">Django,PHP,Laravel,C++</div>
        <p className="viewer-body-description">Description</p>
      </div>
    </Fragment>
  )
}

export default JobView;
