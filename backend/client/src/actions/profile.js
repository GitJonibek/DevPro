import axios from "axios";
import {setAlert} from './alert'

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  GET_REPOS,
  ACCOUNT_DELETED
} from './types'

// Get current user profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (e) {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: PROFILE_ERROR, payload: {msg: e.response.statusText, status: e.response.status} });
  }
}

// Get All Profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get('/api/profile');
    dispatch({ type: GET_PROFILES, payload: res.data });
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: e.response.statusText, status: e.response.status}
    });
  }
}

// Get Profile by Id
export const getProfileById = user_id => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${user_id}`);
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (e) {
    dispatch({ type: PROFILE_ERROR, payload: {msg: e.response.statusText, status: e.response.status} });
  }
}

// Get GitHub Repos
export const getGithubRepos = username => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({ type: GET_REPOS, payload: res.data });
  } catch (e) {
    dispatch({ type: PROFILE_ERROR, payload: {msg: e.response.statusText, status: e.response.status} });
  }
}

// Create or Update Profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/profile', formData, config);

    dispatch({ type: GET_PROFILE, payload: res.data });

    dispatch(setAlert(edit ? 'Profile Updated!' : 'Prfile Created!', 'success', 2000));
    if(!edit) {
      history.push('/dashboard');
    }
  } catch (e) {
    const errors = e.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 3000)));
    }
    dispatch({ type: PROFILE_ERROR, payload: {msg: e.response.statusText, status: e.response.status} });
  }
}

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put('/api/profile/experience', formData, config);

    dispatch({ type: UPDATE_PROFILE, payload: res.data });

    dispatch(setAlert('Experience Added!', 'success', 2000));

    history.push('/dashboard');

  } catch (e) {
    const errors = e.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 3000)));
    }
    dispatch({ type: PROFILE_ERROR, payload: {msg: e.response.statusText, status: e.response.status} });
  }
}

// Add Education
export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put('/api/profile/education', formData, config);

    dispatch({ type: UPDATE_PROFILE, payload: res.data });

    dispatch(setAlert('Education Added!', 'success', 2000));

    history.push('/dashboard');

  } catch (e) {
    const errors = e.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 3000)));
    }
    dispatch({ type: PROFILE_ERROR, payload: {msg: e.response.statusText, status: e.response.status} });
  }
}

// Delete Experience
export const deleteExperience = id => async dispatch => {
  if(window.confirm('Are you sure? This action cannot be undone.')) {
    try {
      const res = await axios.delete(`/api/profile/experience/${id}`);

      dispatch({ type: UPDATE_PROFILE, payload: res.data });

      dispatch(setAlert('Experience Deleted!', 'success', 2000));
    } catch (e) {
      dispatch({ type: PROFILE_ERROR, payload: {msg: e.response.statusText, status: e.response.status} });
    }
  }
}

// Delete Education
export const deleteEducation = id => async dispatch => {
  if(window.confirm('Are you sure? This action cannot be undone.')) {
    try {
      const res = await axios.delete(`/api/profile/education/${id}`);

      dispatch({ type: UPDATE_PROFILE, payload: res.data });

      dispatch(setAlert('Education Deleted!', 'success', 2000));
    } catch (e) {
      dispatch({ type: PROFILE_ERROR, payload: {msg: e.response.statusText, status: e.response.status} });
    }
  }
}

// Delete Account & Profile
export const deleteAccount = () => async dispatch => {
  if(window.confirm('Are you sure? This action cannot be undone.')) {
    try {
      await axios.delete('/api/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Account Deleted!', 'success', 2000));
    } catch (e) {
      dispatch({ type: PROFILE_ERROR, payload: {msg: e.response.statusText, status: e.response.status} });
    }
  }
}
