import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import post from "./post";
import jobs from "./jobs";
import companies from "./companies";

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  jobs,
  companies
});
