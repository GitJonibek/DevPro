import axios from 'axios'
import { setAlert } from './alert'
import {
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './types'

// Get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (e) {
    dispatch({ type: POST_ERROR, payload: {msg: e.response.statusText, status: e.response.status} });
  }
}

// Get posts
export const getPost = (postId) => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);
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

// Add a post
export const addPost = (fromData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post('/api/posts/', fromData, config);
    dispatch({ type: ADD_POST, payload: res.data });

    dispatch(setAlert('Post Created!', 'success', 3000));
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

// Add a comment
export const addComment = (postId, fromData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, fromData, config);
    dispatch({ type: ADD_COMMENT, payload: res.data });

    dispatch(setAlert('Your Comment Added!', 'success', 3000));
  } catch (e) {
    dispatch({ type: POST_ERROR, payload: {msg: e.response.statusText, status: e.response.status} });
  }
}

// Delete a comment
export const removeComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({ type: REMOVE_COMMENT, payload: commentId});

    dispatch(setAlert('Comment Removed!', 'success', 3000));
  } catch (e) {
    dispatch({ type: POST_ERROR, payload: {msg: e.response.statusText, status: e.response.status} });
  }
}
