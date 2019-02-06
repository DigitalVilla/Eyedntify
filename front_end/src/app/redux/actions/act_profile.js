import axios from 'axios';

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_PROFILE,
  GET_ERRORS,
  SET_PROFILE
} from './types';

// Get current profile
export const updateProfile = (profile) => dispatch => {
  // dispatch(setProfileLoading());
  axios.post('/api/profile', profile)
    .then(res =>
      dispatch({
        type: SET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => dispatch(errorSetup(err)));
};
// Get current profile
export const getProfile = (username = '') => dispatch => {
  // dispatch(setProfileLoading());
  axios.get('/api/profile/' + username)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => dispatch(errorSetup(err)));
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearProfile = () => {
  return {
    type: CLEAR_PROFILE,
    payload: {}
  };
};

// eslint-disable-next-line
const errorSetup = (error) => ({
  type: GET_ERRORS,
  payload: error
})