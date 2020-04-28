import axios from 'axios';
import {
  GET_GL_JOBS,
  JOBS_ERROR
} from './types'

export const getStackJobs = (search, location) => async dispatch => {
  try {
    const res = await axios.get(`/api/jobs/global?query=${search}&location=${location}`)

    dispatch({ type: GET_GL_JOBS, payload: res.data });
  } catch (e) {
    console.log(e.response.message);
    dispatch({ type: JOBS_ERROR });
  }
}
