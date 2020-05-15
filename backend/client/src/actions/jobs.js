import axios from 'axios';
import {
  GET_GL_JOBS,
  JOBS_ERROR,
  GET_CURR_JOB
} from './types'

export const getStackJobs = (search, location, bool) => async dispatch => {
  try {
    const res = await axios.get(`/api/jobs/global?query=${search}&location=${location}`)
    dispatch({ type: GET_GL_JOBS, payload: res.data });
  } catch (e) {
    dispatch({ type: JOBS_ERROR });
  }
}

export const getCurrentStack = (id) => async dispatch => {
  try {
    dispatch({ type: GET_CURR_JOB, payload: { id: id, type: 'gl'} });
  } catch (e) {
    dispatch({ type: JOBS_ERROR });
  }
}
