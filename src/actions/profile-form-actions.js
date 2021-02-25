import {
  UPDATE_USERNAME_REQUEST,
  UPDATE_USERNAME_SUCCESS,
  UPDATE_USERNAME_FAIL,
  UPDATE_BIO_REQUEST,
  UPDATE_BIO_SUCCESS,
  UPDATE_BIO_FAIL,
  UPDATE_AVATAR_REQUEST,
  UPDATE_AVATAR_SUCCESS,
  UPDATE_AVATAR_FAIL,
  SET_PROFILE_AVATAR,
  SET_USERNAME,
  SET_BIO,
} from "./profile-form-action-types";

export const updateUsernameRequest = (payload) => ({
  type: UPDATE_USERNAME_REQUEST,
  payload,
});
export const updateUsernameSuccess = (payload) => ({
  type: UPDATE_USERNAME_SUCCESS,
  payload,
});
export const updateUsernameFail = (payload) => ({
  type: UPDATE_USERNAME_FAIL,
  payload,
});

export const updateBioRequest = (payload) => ({
  type: UPDATE_BIO_REQUEST,
  payload,
});
export const updateBioSuccess = (payload) => ({
  type: UPDATE_BIO_SUCCESS,
  payload,
});
export const updateBioFail = (payload) => ({
  type: UPDATE_BIO_FAIL,
  payload,
});
export const updateAvatarRequest = (payload) => ({
  type: UPDATE_AVATAR_REQUEST,
  payload,
});
export const updateAvatarSuccess = (payload) => ({
  type: UPDATE_AVATAR_SUCCESS,
  payload,
});
export const updateAvatarFail = (payload) => ({
  type: UPDATE_AVATAR_FAIL,
  payload,
});

export const setUsername = (payload) => ({
  type: SET_USERNAME,
  payload,
});

export const setBio = (payload) => ({
  type: SET_BIO,
  payload,
});

export const setAvatarProfile = (payload) => ({
  type: SET_PROFILE_AVATAR,
  payload,
});

export const setProfileAvatar = (payload) => ({
  type: SET_PROFILE_AVATAR,
  payload,
});
