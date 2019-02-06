import { GET_PROFILE, CLEAR_PROFILE, PROFILE_LOADING, SET_PROFILE } from '../actions/types';

const initialState = {
};

export default function(state = initialState, action) {
  switch (action.type) {
    case  GET_PROFILE: 
    return {
      ...state,
      profile: action.payload,
      loading: false
    };

    case SET_PROFILE:
      return {
        ...state,
        loading: true
      };
   
      case CLEAR_PROFILE:
      return action.payload;
    
      case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
