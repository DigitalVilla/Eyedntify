import { GET_ALL_POSTS, UPLOAD_POST, GET_ERRORS } from '../actions/types';
import axios from 'axios';
import { resetJSON, PROXY } from '../utils/setAxios';
import { isEmpty } from '../utils/utils'
import { compress } from './act_fileUploader';

export const clearPOSTS = () => dispatch => {

}

export const getAllPosts = () => dispatch => {
  axios.get(`/api/posts/`)
    .then(res => {
      return dispatch({
        type: GET_ALL_POSTS,
        payload: res.data
      })
    })
    .catch(err => dispatch(errorSetup(err.response.data)));
}

export const uploadPost = ({ caption, image }, next) => dispatch => {
  compress(image, { width: 800 }, (resized) => {
    const file = new FormData();
    file.append('file', resized)
    file.append('caption', caption)
    resetJSON();
    axios.post(`/api/files/newpost`, file)
      .then(err => dispatch(getAllPosts({})))
      // .catch(err =>  console.log((err)))
      .catch(err => dispatch(errorSetup(err)))
  })
}

const errorSetup = (error) => ({
  type: GET_ERRORS,
  payload: error
})


export const validPost = (post) => {
  const errors = {};
  if (!post.caption || post.caption.length < 1)
    errors.caption = `Please enter a caption`
  if (!post.image)
    errors.image = `Please upload an image`
  return (!isEmpty(errors)) ? errors : true;
}