import axios from "axios";
import {setAlert} from "./alert";
import setAuthToken from "../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from "./types";

// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth/me');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (e) {
    dispatch({
      type: AUTH_ERROR
    });
  }
}

// Register user
export const register = ({name, email, password}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({name, email, password});

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (e) {
    const errors = e.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
}

// Login user
export const login = ({email, password}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({email, password});

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (e) {
    const errors = e.response.data.erros;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
}

// Auth with gitHub
export const withGithub = () => async dispatch => {
  try {
    await axios({
      url: 'https://github.com/login/oauth/authorize?client_id=8f6eb02bfcdaa7b11bed',
      method: 'get',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      console.log(res.data);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      dispatch(loadUser());
    })
    .catch(err => {
      console.log(err.message);
    });

  } catch (e) {
    const errors = e.response.data.erros;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
}

//Logout
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
}
