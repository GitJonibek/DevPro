import axios from 'axios';
import {
  GET_COMPANY_LIST,
  COMPANY_ERROR
} from './types'

export const getCompanyList = () => async dispatch => {
  try {
    await axios.get('/companies/get-companies')
    .then(res => {
      console.log(res);
      dispatch({ type: GET_COMPANY_LIST, payload: res.data });
    })
    .catch(e => {
      console.log(e);
      dispatch({ type: COMPANY_ERROR });
    })
  } catch (e) {
    dispatch({ type: COMPANY_ERROR });
  }
}
