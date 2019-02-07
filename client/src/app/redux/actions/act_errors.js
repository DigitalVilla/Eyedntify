import { CLEAR_ERRORS } from '../actions/types';
import store from '../store';
// Clear profile
export const clearErrors = () => dispatch => {
      dispatch({
        type: CLEAR_ERRORS,
        payload: {}
      })
};
export const clearErrorsAsynch = ()  => {
      store.dispatch({
        type: CLEAR_ERRORS,
        payload: {}
      })
};