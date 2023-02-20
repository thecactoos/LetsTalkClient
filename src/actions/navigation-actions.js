import {
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAIL,
} from './navigation-action-types';

export const searchUserRequest = (payload) => ({
  type: SEARCH_USER_REQUEST,
  payload,
});

export const searchUserSuccess = (payload) => ({
  type: SEARCH_USER_SUCCESS,
  payload,
});

export const searchUserFail = (payload) => ({
  type: SEARCH_USER_FAIL,
  payload,
});
