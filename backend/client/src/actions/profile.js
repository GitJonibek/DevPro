import axios from "axios";
import {setAlert} from './alert'

import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE
} from './types'

// Get current user profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');
    setTimeout(function () {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    }, 1000);
  } catch (e) {
    dispatch(setAlert('Profile Is Emtry! Please Create Your Profile.', 'danger', 3000));
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: e.response.statusText, status: e.response.status}
    });
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

    setTimeout(function () {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    }, 1500);

    dispatch(setAlert(edit ? 'Profile Updated!' : 'Prfile Created!', 'success', 2000));
    if(!edit) {
      history.push('/dashboard');
    }
  } catch (e) {
    const errors = e.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 3000)));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: e.response.statusText, status: e.response.status}
    });
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

    setTimeout(function () {
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
    }, 1500);

    dispatch(setAlert('Experience Added!', 'success', 2000));

    history.push('/dashboard');

  } catch (e) {
    const errors = e.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 3000)));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: e.response.statusText, status: e.response.status}
    });
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

    setTimeout(function () {
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
    }, 1500);

    dispatch(setAlert('Education Added!', 'success', 2000));

    history.push('/dashboard');

  } catch (e) {
    const errors = e.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 3000)));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: e.response.statusText, status: e.response.status}
    });
  }
}
