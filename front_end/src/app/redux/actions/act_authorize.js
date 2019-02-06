import {
  setAxiosToken
} from '../utils/setAxios';
import {
  Route,
  Redirect
} from 'react-router-dom';
import {
  persistLS,
  deleteLS,
  getLS
} from '../utils/persistance';
import React from 'react';
import {
  isEmpty
} from '../utils/utils';
import {
  validate
} from '../utils/validate';
import jwt_decode from 'jwt-decode';
import store from '../store';
import axios from 'axios';

import {
  VALID_REGISTRATION,
  SET_CURRENT_USER,
  GET_ERRORS,
  GET_USER
} from './types';

// Register User
export const validateUser = (newUser, login) => dispatch => {
  const errors = validate(newUser); //local validation
  if (!isEmpty(errors)) return dispatch(errorSetup(errors))
  //Fetch Server
  axios.post(`/api/users/${login ? "login" : "register"}`, newUser)
    .then(res => {
      if (login) return dispatch(userSetup(res.data.token))
      return dispatch({
        type: VALID_REGISTRATION,
        payload: res.data
      })
    })
    .catch(err => dispatch(errorSetup(err.response.data)));
};

let counter = 0;
export const fetchUser = () => dispatch => {
  console.log("fetch", counter++);
  
  axios.get(`/api/users/`)
    .then(res => {
      return dispatch({
        type: GET_USER,
        payload: res.data
      })
    })
    .catch(err => dispatch(errorSetup(err.response.data)));
};

export const logoutUser = () => dispatch => {
  dispatch(deleteToken(null));
};

const errorSetup = (error) => ({
  type: GET_ERRORS,
  payload: error
})

export const userSetup = (token, persist = true) => {
  if (persist) persistLS("jwtToken", token);
  setAxiosToken(token);
  const decoded = jwt_decode(token)
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const deleteToken = () => {
  // Remove token from localStorage
  deleteLS('jwtToken');
  // Remove auth header for future requests
  setAxiosToken(false);
  // Set current user to {} which will set isAuthenticated to false
  return {
    type: SET_CURRENT_USER,
    payload: {}
  }
}

export const validateToken = () => dispatch => {
  const token = getToken();
  if (token.error && token.error === "Expired")
     dispatch(deleteToken)
  if (token.error && token.error === "Not found")
     dispatch(errorSetup(token.error))
  else
   dispatch(userSetup(token, false)) // set up user
}

export const getToken = () => {
  const token = getLS("jwtToken")
  if (!token)
    return { error: "Not found" }
  if (jwt_decode(token).exp < Date.now().valueOf() / 1000) /* dead  */
    return {
      error: "Expired"
    }
  else
    return token;
}

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest } render = { (props) => (
      getLS("jwtToken") ? < Component {...props }/>
      : <Redirect to='/' />
  )} />
);

export const validateTokenAsynch = () => {
  const token = getToken();

  if (token.error && token.error === "Expired")
     store.dispatch(deleteToken)
  if (token.error && token.error === "Not found")
     store.dispatch(errorSetup(token.error))
  else
   store.dispatch(userSetup(token, false)) // set up user
}