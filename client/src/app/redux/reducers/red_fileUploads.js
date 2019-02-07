import { IMAGE_LOADING, UPLOAD_IMAGE } from '../actions/types';

const initialState = {
file:'',
type:'',
loading:false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case  UPLOAD_IMAGE: 
    return {
      ...state,
      file: action.payload.file,
      type: action.payload.type,
      loading:false
    };

    case IMAGE_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
