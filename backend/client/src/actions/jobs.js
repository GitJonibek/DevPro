import axios from 'axios';
import {
  GET_GL_JOBS,
  JOBS_ERROR,
  CLEAR_PROFILE
} from './types'

export const getStackJobs = (search, location, bool) => async dispatch => {
  try {
    dispatch({ type: CLEAR_PROFILE });
    const res = await axios.get(`/api/jobs/global?query=${search}&location=${location}`)
    dispatch({ type: GET_GL_JOBS, payload: res.data });
  } catch (e) {
    dispatch({ type: JOBS_ERROR });
  }
}
