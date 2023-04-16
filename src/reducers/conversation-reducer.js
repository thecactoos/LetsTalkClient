import {
  GET_CONVERSATION_BY_ID_FAIL,
  GET_CONVERSATION_BY_ID_REQUEST,
  GET_CONVERSATION_BY_ID_SUCCESS,
} from '../actions/conversation-action-types';

const initialState = {
  isLoading: true,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CONVERSATION_BY_ID_REQUEST:
      return { ...state, isLoading: true };
    case GET_CONVERSATION_BY_ID_SUCCESS:
      return { ...state, isLoading: false };
    case GET_CONVERSATION_BY_ID_FAIL:
      console.log(payload);
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};
