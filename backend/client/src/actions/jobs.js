import axios from 'axios';
import {
  GET_GL_JOBS,
  JOBS_ERROR
} from './types'

export const getStackJobs = (search, location) => async dispatch => {
  try {
    await axios.get(`/api/jobs/global?query=${search}&location=${location}`)
    .then(res => {
      dispatch({ type: GET_GL_JOBS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: JOBS_ERROR });
    })
  } catch (e) {
    console.log(e.response.message);
    dispatch({ type: JOBS_ERROR });
  }
}
