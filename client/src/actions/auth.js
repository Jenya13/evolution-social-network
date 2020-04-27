import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from './../actions/types';
import { setAlert } from './alert';
import axios from 'axios';
import setAuthToken from './../utils/setAuthToken';

// load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// register user
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users/signup', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (e) {
    // fetching errors
    const errors = e.response.data.error.errors;
    if (errors) {
      const errNames = Object.keys(errors);

      // map throught errors to set alert
      errNames.map((err) => dispatch(setAlert(errors[err].message, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/users/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (e) {
    // fetching error
    const error = e.response.data.message;

    if (error) {
      dispatch(setAlert(error, 'danger'));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
