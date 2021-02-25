import { AUTH_SUCCESS } from "../actions/auth-action-types";
import {
  SET_BIO,
  SET_PROFILE_AVATAR,
  SET_USERNAME,
  UPDATE_AVATAR_FAIL,
  UPDATE_AVATAR_REQUEST,
  UPDATE_AVATAR_SUCCESS,
  UPDATE_BIO_FAIL,
  UPDATE_BIO_REQUEST,
  UPDATE_BIO_SUCCESS,
  UPDATE_USERNAME_FAIL,
  UPDATE_USERNAME_REQUEST,
  UPDATE_USERNAME_SUCCESS,
} from "../actions/profile-form-action-types";

const initialState = {
  username: "",
  bio: "",
  avatar: "",
  isUpdatingUsername: false,
  isUpdatingBio: false,
  isUpdatingAvatar: false,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_SUCCESS: {
      const { username, bio, avatar } = payload;
      return {
        username: username,
        bio: bio,
        avatar: avatar,
      };
    }
    case SET_BIO:
      return {
        ...state,
        bio: payload,
      };
    case SET_USERNAME:
      return {
        ...state,
        username: payload,
      };
    case SET_PROFILE_AVATAR:
      return {
        ...state,
        avatar: payload,
      };
    case UPDATE_USERNAME_REQUEST:
      return {
        ...state,
        isUpdatingUsername: true,
      };
    case UPDATE_USERNAME_SUCCESS:
      return {
        ...state,
        isUpdatingUsername: false,
      };
    case UPDATE_USERNAME_FAIL:
      return {
        ...state,
        isUpdatingUsername: false,
      };
    case UPDATE_AVATAR_REQUEST:
      return {
        ...state,
        isUpdatingAvatar: true,
      };
    case UPDATE_AVATAR_SUCCESS:
      return {
        ...state,
        isUpdatingAvatar: false,
      };
    case UPDATE_AVATAR_FAIL:
      return {
        ...state,
        isUpdatingAvatar: false,
      };
    case UPDATE_BIO_REQUEST:
      return {
        ...state,
        isUpdatingBio: true,
      };
    case UPDATE_BIO_SUCCESS:
      return {
        ...state,
        isUpdatingBio: false,
      };
    case UPDATE_BIO_FAIL:
      return {
        ...state,
        isUpdatingBio: false,
      };
    default:
      return state;
  }
};
