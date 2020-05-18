import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {createProfile, getCurrentProfile} from "../../actions/profile";

const EditProfile = ({ profile, history, createProfile, getCurrentProfile }) => {

  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  });
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  }

  useEffect(() => {
    if(!profile.profile) {
      getCurrentProfile();
    }
    setFormData({
      company: profile.loading || !profile.profile.company ? '' : profile.profile.company,
      website: profile.loading || !profile.profile.website ? '' : profile.profile.website,
      location: profile.loading || !profile.profile.location ? '' : profile.profile.location,
      status: profile.loading || !profile.profile.status ? '' : profile.profile.status,
      skills: profile.loading || !profile.profile.skills ? '' : profile.profile.skills,
      githubusername: profile.loading || !profile.profile.githubusername ? '' : profile.profile.githubusername,
      bio: profile.loading || !profile.profile.bio ? '' : profile.profile.bio,
      twitter: profile.loading || !profile.profile.social ? '' : profile.profile.social.twitter,
      facebook: profile.loading || !profile.profile.social ? '' : profile.profile.social.facebook,
      linkedin: profile.loading || !profile.profile.social ? '' : profile.profile.social.linkedin,
      youtube: profile.loading || !profile.profile.social ? '' : profile.profile.social.youtube,
      instagram: profile.loading || !profile.profile.social ? '' : profile.profile.social.instagram,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.loading]);

  return (
    <Fragment>
      <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your profile stand out
      </p>
      <small>* = required fields</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={(e) => onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">Give us an idea of where you are at in your career</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder=" " name="company" value={company} onChange={(e) => onChange(e)} />
          <span className='placeholder-text'>Company</span>
          <small className="form-text">Could be your own company or one you work for</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder=" " name="website" value={website} onChange={(e) => onChange(e)} />
          <span className='placeholder-text'>Website</span>
          <small className="form-text">Could be your own or a company website</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder=" " name="location" value={location} onChange={(e) => onChange(e)} />
          <span className='placeholder-text'>Location</span>
          <small className="form-text">City & state suggested (eg. Boston, MA)</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder=" " name="skills" value={skills} onChange={(e) => onChange(e)} />
          <span className='placeholder-text'> * Skills</span>
          <small className="form-text">Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder=" "
            name="githubusername"
            value={githubusername} onChange={(e) => onChange(e)}
          />
          <span className='placeholder-text'>Github Username</span>
          <small className="form-text">If you want your latest repos and a Github link, include your username</small>
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={(e) => onChange(e)}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialInputs &&
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input type="text" placeholder=" " name="twitter" value={twitter} onChange={(e) => onChange(e)} />
              <span className='placeholder-text' style={{left: '75px'}}>Twitter URL</span>
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input type="text" placeholder=" " name="facebook" value={facebook} onChange={(e) => onChange(e)} />
              <span className='placeholder-text' style={{left: '75px'}}>Facebook URL</span>
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input type="text" placeholder=" " name="youtube" value={youtube} onChange={(e) => onChange(e)} />
              <span className='placeholder-text' style={{left: '75px'}}>YouTube URL</span>
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input type="text" placeholder=" " name="linkedin" value={linkedin} onChange={(e) => onChange(e)} />
              <span className='placeholder-text' style={{left: '75px'}}>Linkedin URL</span>
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input type="text" placeholder=" " name="instagram" value={instagram} onChange={(e) => onChange(e)} />
              <span className='placeholder-text' style={{left: '75px'}}>Instagram URL</span>
            </div>
          </Fragment>
        }
        <input type="submit" className="btn btn-round-dark my-1" />
        <Link className="btn btn-round-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
  )
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
