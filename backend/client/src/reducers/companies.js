import { GET_COMPANY_LIST, COMPANY_ERROR } from '../actions/types'

const initialState = {
  companies: [],
  loading: true
}

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_COMPANY_LIST:
      return {
        ...state,
        loading: false,
        companies: payload
      }
    case COMPANY_ERROR:
      return {
        ...state,
        loading: false,
        companies: []
      }
    default: return state;
  }
}
