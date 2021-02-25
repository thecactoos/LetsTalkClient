import {
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAIL,
} from "../actions/navigation-action-types";

const initialState = {
  error: null,
  searchUsers: [],
  isSearching: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SEARCH_USER_REQUEST:
      return { ...state, isSearching: true };
    case SEARCH_USER_SUCCESS:
      return { ...state, searchUsers: payload, isSearching: false };
    case SEARCH_USER_FAIL:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
