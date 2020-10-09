import axios from 'axios';
import { setAlert } from './alert';
import {
  PROFILE_ERROR,
  GET_PROFILE,
  GET_PROFILES,
  CLEAR_PROFILE,
  DELETE_ACCOUNT,
} from './types';

// get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get('api/profile/');

    dispatch({
      type: GET_PROFILES,
      payload: res.data.profiles,
    });
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: e.response.data.message, status: e.response.data.status },
    });
  }
};

// get all profile by id
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data.profile,
    });
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: e.response.data.message, status: e.response.data.status },
    });
  }
};

// get current user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data.profile,
    });
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: e.response.data.message, status: e.response.data.status },
    });
  }
};

// create profile
export const createProfile = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Profile Created'));

    history.push('/dashboard');
  } catch (e) {
    const error = e.response.data;
    console.log(e.response);

    if (error) {
      dispatch(setAlert(error, 'danger'));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: e.response.data.message, status: e.response.data.status },
    });
  }
};

// set image to profile
export const updateProfileImage = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const res = await axios.post('api/profile/upload-image', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data.profile,
    });
  } catch (e) {
    const error = e.response.data.message;
    console.log(e.response.data.message);

    if (error) {
      dispatch(setAlert(error, 'danger'));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: e.response.data.message, status: e.response.data.status },
    });
  }
};

// update profile
export const updateProfile = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.patch('api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data.profile,
    });

    dispatch(setAlert('Profile Updated'));
  } catch (e) {
    const error = e.response.data;
    console.log(e.response);

    if (error) {
      dispatch(setAlert(error, 'danger'));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: e.response.data.message, status: e.response.data.status },
    });
  }
};

// delete account

export const deleteAccount = () => async (dispatch) => {
  try {
    await axios.delete('api/profile');

    dispatch({
      type: CLEAR_PROFILE,
    });

    dispatch({
      type: DELETE_ACCOUNT,
    });

    dispatch(setAlert('Account has been deleted'));
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: e.response.data.message, status: e.response.data.status },
    });
  }
};
