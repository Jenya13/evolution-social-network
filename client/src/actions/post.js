import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
} from './types';

// get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data.posts,
    });
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: e.response.message, status: e.response.status },
    });
  }
};

// add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/posts/like/${id}`);
    console.log(res.data);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data.likes },
    });
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: e.response.message, status: e.response.status },
    });
  }
};

// remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: e.response.message, status: e.response.status },
    });
  }
};

// delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.patch(`/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    dispatch(setAlert('Post removed', 'success'));
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: e.response.message, status: e.response.status },
    });
  }
};

// add post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(`/api/posts`, formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data.post,
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: e.response.message, status: e.response.status },
    });
  }
};
