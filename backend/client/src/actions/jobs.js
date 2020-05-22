import axios from 'axios';
import {setAlert} from "./alert";
import {
  GET_GL_JOBS,
  JOBS_ERROR,
  CLEAR_PROFILE
} from './types'

export const getJobs = (search, location, bool) => async dispatch => {
  try {

    dispatch({ type: CLEAR_PROFILE });
    await axios.get('/api/jobs')
    .then(res => dispatch({ type: GET_GL_JOBS, payload: res.data }))
    .catch(err => dispatch(setAlert(err.message, 'danger', 5000 )))

  } catch (err) {
    dispatch({ type: JOBS_ERROR });
  }
}
