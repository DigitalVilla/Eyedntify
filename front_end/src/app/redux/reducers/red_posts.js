import { GET_ALL_POSTS, UPLOAD_POST} from '../actions/types';

const initialState = {
  recentPost:{},
  posts:[]
};

export default function(state = initialState, action) {
  switch (action.type) {
    
    case  GET_ALL_POSTS: 
    return {
      ...state,
      posts: action.payload,
      recentPost: {}
    };

    case UPLOAD_POST:
      return {
        ...state,
        posts: action.payload
      };

    
    default:
      return state;
  }
}
