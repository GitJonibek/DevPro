import {
  GET_GL_JOBS,
  JOBS_ERROR,
  GET_CURR_JOB,
  LOADING
} from '../actions/types'

const initialState = {
  gl_jobs: [],
  job: null,
  loading: true
}

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_CURR_JOB:
      return {
        ...state,
        job: payload.type === 'gl' ?
          state.gl_jobs.find(job => job.guid === payload.id) :
          state.lc_jobs.find(job => job.guid === payload.id),
        loading: false,
      };
    case GET_GL_JOBS:
      return {
        ...state,
        gl_jobs: payload,
        loading: false,
      };
    case JOBS_ERROR:
      return {
        ...state,
        gl_jobs: [],
        lc_jobs: [],
        job: null,
        loading: false
      };
    default: return state;
  }
}
