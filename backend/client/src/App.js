import React, { Fragment, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import EditProfile from "./components/profile-forms/EditProfile";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import StackJobs from './components/jobs/stackjobs/Jobs';
import LocalJobs from './components/jobs/localjobs/Jobs';
import Jobs from './components/jobs/Jobs';
import JobView from './components/jobs/stackjobs/jobview/JobView';
import PrivateRoute from "./components/routing/PrivateRoute";
import './App.css';
// Redux
import { Provider } from "react-redux";
import { loadUser } from "./actions/auth";
import store from './store'
import setAuthToken from "./utils/setAuthToken";

let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementsByClassName("mNavbar-wrapper")[0].style.top = "0";
  } else {
    document.getElementsByClassName("mNavbar-wrapper")[0].style.top = "-100px";
  }
  prevScrollpos = currentScrollPos;
}

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:id' component={Profile} />
              <Route exact path='/jobs' component={Jobs} />
              <Route exact path='/jobs/gl-stack' component={StackJobs} />
              <Route exact path='/jobs/lc-local' component={LocalJobs} />
              <Route exact path='/job/:id' component={JobView}/>
              <PrivateRoute exact path='/posts' component={Posts} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/create-profile' component={CreateProfile} />
              <PrivateRoute exact path='/edit-profile' component={EditProfile} />
              <PrivateRoute exact path='/add-experience' component={AddExperience} />
              <PrivateRoute exact path='/add-education' component={AddEducation} />
              <PrivateRoute exact path='/posts/:id' component={Post} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
