import { IS_LOADING, HAS_LOADED, START_SPINNING, DONE_SPINNING } from '../actions/types';

const initialState = {
  loading: true,
  spinning: false
};

export default function (state = initialState, action) {
  switch (action.type) {

    case IS_LOADING:
      return {
        ...state,
        loading: true
      };

    case HAS_LOADED:
      return {
        ...state,
        loading: false
      };
    case START_SPINNING:
      return {
        ...state,
        spinning: true
      };
    case DONE_SPINNING:
      return {
        ...state,
        spinning: false
      };

    default:
      return state;
  }
}
