import React from 'react'
import {Link} from "react-router-dom";

const DashboardActions = (props) => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-round-primary">
        <i className="fas fa-user-circle"></i> Edit Profile
      </Link>
      { props.exp ?
        <Link to="/add-experience" className="btn btn-round-primary">
          <i className="fab fa-black-tie"></i> Add Experience
        </Link> : null
      }
      { props.edu ?
        <Link to="/add-education" className="btn btn-round-primary">
          <i className="fas fa-graduation-cap"></i> Add Education
        </Link> : null
      }
      <Link to={`/profile/${props.id}`} className="btn btn-round-primary">
        <i className="fas fa-id-badge"></i> Go To Profile
      </Link>
    </div>
  )
}

export default DashboardActions;
