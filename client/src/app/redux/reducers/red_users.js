import { GET_USERS, GET_THIS_USER } from '../actions/types';

const initialState = {
  users: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload
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
