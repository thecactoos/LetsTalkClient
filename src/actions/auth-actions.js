import axios from 'axios';

import {
  SET_SIGN_LOADING,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_IN_FAIL,
  AUTH_SUCCESS,
  AUTH_ERROR,
  REMOVE_ERRORS,
  LOGOUT,
} from './auth-action-types';

import { SOCKET_INIT } from './chats-action-types';

export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/auth', {
      withCredentials: true,
    });
    dispatch({
      type: SOCKET_INIT,
    });

    dispatch({
      type: AUTH_SUCCESS,
      payload: res.data.user,
    });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Sign up

export const signUp = (username, email, password) => async (dispatch) => {
  dispatch({
    type: SET_SIGN_LOADING,
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };

  const body = JSON.stringify({ username, email, password });

  try {
    const res = await axios.post('/api/users', body, config);
    await dispatch({
      type: SIGN_UP_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    if (error.response.status === 500 || error.response.status === 504) {
      dispatch({
        type: SIGN_UP_FAIL,
        payload: {
          errors: [
            {
              msg: 'Server Error, Please try again later',
            },
          ],
        },
      });
    } else {
      dispatch({
        type: SIGN_UP_FAIL,
        payload: error.response.data,
      });
    }
  }
};

// Sign In

export const signIn = (email, password) => async (dispatch) => {
  dispatch({
    type: SET_SIGN_LOADING,
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };

  const body = JSON.stringify({ email, password });

  try {
    await axios.post('/api/auth', body, config);
    dispatch(loadUser());
  } catch (error) {
    if (error.response.status === 500 || error.response.status === 504) {
      dispatch({
        type: SIGN_IN_FAIL,
        payload: {
          errors: [
            {
              msg: 'Server Error, Please try again later',
            },
          ],
        },
      });
    } else {
      dispatch({
        type: SIGN_IN_FAIL,
        payload: error.response.data,
      });
    }
  }
};

// Remove errors

export const removeErrors = () => (dispatch) => {
  dispatch({
    type: REMOVE_ERRORS,
  });
};

// Logout
export const logout = () => async (dispatch) => {
  await axios.put('/api/auth', {
    withCredentials: true,
  });
  dispatch({
    type: LOGOUT,
  });
};
