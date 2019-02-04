import {setAxiosToken} from '../utils/authorize';
import { Route, Redirect } from 'react-router-dom';
import {persistLS, deleteLS, getLS} from '../utils/persistance';
import React from 'react';
import { isEmpty } from '../utils/utils';
import {validate} from '../utils/validate';
import jwt_decode from 'jwt-decode';
import  store  from '../store';
import axios from 'axios';

import { VALID_REGISTRATION, SET_CURRENT_USER, GET_ERRORS } from './types';

// Register User
export const validateUser = (newUser, login) => dispatch => {
  const errors = validate(newUser); //local validation
  if (!isEmpty(errors)) return dispatch(errorSetup(errors))
  //Fetch Server
  axios.post(`/api/users/${login ? "login" : "register"}`, newUser)
    .then(res => {
      if (login) return dispatch(userSetup(res.data.token)) 
      return dispatch({ type: VALID_REGISTRATION, payload: res.data })
    })
    .catch(err => dispatch(errorSetup(err.response.data)));
};

export const userSetup = (token, persist = true) => {
  if (persist) persistLS("jwtToken", token);
  setAxiosToken(token);
  const decoded = jwt_decode(token)
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  deleteLS('jwtToken');
  // Remove auth header for future requests
  setAxiosToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch({type: SET_CURRENT_USER, payload: {} });
};

const errorSetup = (error) => ({type: GET_ERRORS, payload: error })


export const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render = { (props) => (
   getLS("jwtToken") ? <Component {...props} /> : <Redirect to='/' />
  )}/>
);

export const validToken = () => {
  const token = getLS("jwtToken");
  if (token) store.dispatch(userSetup(token, false))
}

export const getUser = (callback) => {
  const decoded = jwt_decode(getLS("jwtToken"));
  return new Promise((res, rej) => res(decoded))
}