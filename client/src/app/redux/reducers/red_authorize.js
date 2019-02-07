import {
  isEmpty
} from '../utils/utils';

import {
  GET_USER,
  GET_THIS_USER,
  SET_CURRENT_USER,
  VALID_REGISTRATION
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case VALID_REGISTRATION:
      return {
        ...state,
        user: action.payload
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };

    case GET_USER:
      return {
        ...state,
        user: action.payload
      };


    case GET_THIS_USER:
    return {
      ...state,
      user: state.user
    };



    default:
      return state;
  }
}