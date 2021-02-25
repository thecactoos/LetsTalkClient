import {
  SET_SIGN_LOADING,
  SIGN_IN_FAIL,
  SIGN_IN_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_UP_SUCCESS,
  AUTH_SUCCESS,
  AUTH_ERROR,
  REMOVE_ERRORS,
  LOGOUT,
} from "../actions/auth-action-types";

const initialState = {
  isLoadingSign: false,
  isAuthenticated: false,
  user: null,
  isLoadingInit: true,
  errors: [],
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_SIGN_LOADING:
      return {
        ...state,
        isLoadingSign: !state.isLoadingSign,
      };
    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
      return {
        ...state,
      };
    case SIGN_IN_FAIL:
    case SIGN_UP_FAIL:
      return {
        ...state,
        errors: payload.errors,
        isLoadingSign: false,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoadingSign: false,
        user: payload,
        isLoadingInit: false,
      };
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        isLoadingInit: false,
      };
    case REMOVE_ERRORS:
      return {
        ...state,
        errors: [],
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...initialState,
        isLoadingInit: false,
      };
    default:
      return state;
  }
}
