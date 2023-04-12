import {
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_FAIL,
  CLEAR_PROFILE,
} from './profile-action-types';

export const getProfileRequest = (payload) => ({
  type: GET_USER_BY_ID_REQUEST,
  payload,
});

export const getProfileSuccess = (payload) => ({
  type: GET_USER_BY_ID_SUCCESS,
  payload,
});

export const getProfileFail = (payload) => ({
  type: GET_USER_BY_ID_FAIL,
  payload,
});

export const clearProfile = () => ({
  type: CLEAR_PROFILE,
});
