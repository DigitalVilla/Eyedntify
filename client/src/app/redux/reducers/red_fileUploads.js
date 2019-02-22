import { IMAGE_LOADING, UPLOAD_IMAGE } from '../actions/types';

const initialState = {
  file: '',
  type: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return {
        ...state,
        file: action.payload.file,
        type: action.payload.type,
      };

    case IMAGE_LOADING:
      return {
        ...state
      };
    default:
      return state;
  }
}
