import { combineReducers } from 'redux';
import auth from './red_authorize';
import errors from './red_errors';
import posts from './red_posts';
import profile from './red_profile';
import uploads from './red_fileUploads';

export default combineReducers({
  auth, errors, profile, uploads, posts
});
