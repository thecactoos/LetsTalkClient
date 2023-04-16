import axios from 'axios';
import isDev from '../utils/isDev';

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
    const res = await axios.get(
      isDev ? '/api/auth' : `${process.env.REACT_APP_API_PROD_URL}/auth`,
      {
        withCredentials: true,
      },
    );
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
    const res = await axios.post(
      isDev ? '/api/users' : `${process.env.REACT_APP_API_PROD_URL}/users`,
      body,
      config,
    );
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
    await axios.post(
      isDev ? '/api/auth' : `${process.env.REACT_APP_API_PROD_URL}/auth`,
      body,
      config,
    );
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
  try {
    await axios.put(
      isDev ? '/api/auth' : `${process.env.REACT_APP_API_PROD_URL}/auth`,
      {},
      {
        withCredentials: true,
      },
    );
    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    console.log(error);
  }
};
