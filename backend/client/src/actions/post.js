import axios from 'axios'
import { setAlert } from './alert'
import {
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
} from './types'

// Get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({ type: GET_POST, payload: res.data });
  } catch (e) {
    dispatch({ type: POST_ERROR, payload: {msg: e.response.statusText, status: e.response.status} });
  }
}

// Like a post
export const addLike = postId => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);
    dispatch({ type: UPDATE_LIKES, payload: {id: postId, likes: res.data }});
  } catch (e) {
    dispatch({ type: POST_ERROR, payload: {msg: e.response.statusText, status: e.response.status} });
  }
}

// UnLike a post
export const removeLike = postId => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);
    dispatch({ type: UPDATE_LIKES, payload: {id: postId, likes: res.data }});
  } catch (e) {
    dispatch({ type: POST_ERROR, payload: {msg: e.response.statusText, status: e.response.status} });
  }
}

// Delete a post
export const deletePost = postId => async dispatch => {
  try {
    await axios.delete(`/api/posts/${postId}`);
    dispatch({ type: DELETE_POST, payload: {id: postId}});

    dispatch(setAlert('Post Removed', 'success', 3000));
  } catch (e) {
    dispatch({ type: POST_ERROR, payload: {msg: e.response.statusText, status: e.response.status} });
  }
}
