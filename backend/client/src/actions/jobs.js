import axios from 'axios';
import {
  GET_GL_JOBS,
  JOBS_ERROR,
  GET_CURR_JOB,
  LOADING
} from './types'

export const getStackJobs = (search, location, bool) => async dispatch => {
  try {
    dispatch({ type: LOADING });
    const res = await axios.get(`/api/jobs/global?query=${search}&location=${location}`)
    dispatch({ type: GET_GL_JOBS, payload: res.data });
  } catch (e) {
    console.log(e.response.message);
    dispatch({ type: JOBS_ERROR });
  }
}

export const getCurrentStack = (id) => async dispatch => {
  try {
    dispatch({ type: GET_CURR_JOB, payload: { id: id, type: 'gl'} });
  } catch (e) {
    console.log(e.response.message);
    dispatch({ type: JOBS_ERROR });
  }
}
