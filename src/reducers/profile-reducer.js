import {
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_FAIL,
  GET_USER_BY_ID_SUCCESS,
  CLEAR_PROFILE,
} from "../actions/profile-action-types";

const initialState = {
  isLoaded: false,
  profile: null,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER_BY_ID_REQUEST:
      return initialState;
    case GET_USER_BY_ID_SUCCESS:
      return { ...state, profile: payload, isLoaded: true };
    case GET_USER_BY_ID_FAIL:
      return { ...state, error: payload, isLoaded: true };
    case CLEAR_PROFILE:
      return initialState;
    default:
      return state;
  }
};
