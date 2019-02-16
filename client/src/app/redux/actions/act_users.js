import { GET_THIS_USER, GET_ERRORS, GET_USERS } from './types';
import store from '../store';
import axios from 'axios';


export const fetchUser = ({local}) => dispatch => {
  if(local)
  return dispatch({  type: GET_THIS_USER  })
  axios.get(`/api/users/current`)
    .then(res => {
      return dispatch({
        type: GET_THIS_USER,
        payload: res.data
      })
    })
    .catch(err => dispatch(errorSetup(err.response.data)));
};


export const getUsers = ( ) => dispatch => {
  axios.get(`/api/users/`)
    .then(res => {
      return dispatch({
        type: GET_USERS,
        payload: res.data
      })
    })
    .catch(err => dispatch(errorSetup(err.response ? err.response.data : err)));
};

const errorSetup = (error) => ({
  type: GET_ERRORS,
  payload: error
})
