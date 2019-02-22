import { combineReducers } from 'redux';
import auth from './red_authorize';
import errors from './red_errors';
import posts from './red_posts';
import profile from './red_profile';
import users from './red_users';
import uploads from './red_fileUploads';
import loader from './red_loader';

export default combineReducers({
  auth,
  errors,
  loader,
  users,
  profile,
  uploads,
  posts
});