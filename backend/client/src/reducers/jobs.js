import {
  GET_GL_JOBS,
  JOBS_ERROR
} from '../actions/types'

const initialState = {
  jobs: [],
  job: null,
  loading: true
}

export default function(state = initialState, action) {
  const { type, payload } = state;
  switch (type) {
    case GET_GL_JOBS:
      return {
        ...state,
        jobs: payload,
        loading: false,
      };
    case JOBS_ERROR:
      return {
        ...state,
        jobs: [],
        job: null,
        loading: false
      };
    default: return state;
  }
}
