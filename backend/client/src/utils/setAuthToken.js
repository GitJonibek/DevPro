import axios from "axios";

const setAuthToken = (token) => {
  if(token) {
    axios.defaults.headers.common['x-auth-token'] = token;
    return true;
  }
  else {
    delete axios.defaults.headers.common['x-auth-token'];
    return false;
  }
}

export default setAuthToken;
