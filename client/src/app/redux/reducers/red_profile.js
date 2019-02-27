import { GET_PROFILE, GET_THIS_PROFILE, CLEAR_PROFILE, PROFILE_LOADING, SET_PROFILE } from '../actions/types';

const initialState = {
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };

    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload
      };

    case CLEAR_PROFILE:
      return action.payload;

    case PROFILE_LOADING:
      return {
        ...state,
      };

    case GET_THIS_PROFILE:
      return {
        ...state,
        profile: state.profile
      };
    default:
      return state;
  }
}
