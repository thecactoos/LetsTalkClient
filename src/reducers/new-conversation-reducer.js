import {
  ADD_RECEIVER,
  REMOVE_RECEIVER,
  SEARCH_RECEIVER_REQUEST,
  SEARCH_RECEIVER_SUCCESS,
  SEARCH_RECEIVER_FAIL,
  CREATE_NEW_CONVERSATION_REQUEST,
  CREATE_NEW_CONVERSATION_SUCCESS,
  CREATE_NEW_CONVERSATION_FAIL,
  CREATE_NEW_CONVERSATION_GROUP_REQUEST,
  CREATE_NEW_CONVERSATION_GROUP_SUCCESS,
  CREATE_NEW_CONVERSATION_GROUP_FAIL,
  CLEAR_NEW_CONVERSATION,
  SET_AVATAR,
  SET_CHATNAME,
  SET_RECEIVER_DM,
  REMOVE_ALL_RECEIVERS,
} from '../actions/newconversation-action-types';

const initialState = {
  searchString: '',
  searchReceivers: [],
  isSearching: false,
  receivers: [],
  isCreated: false,
  isCreating: false,
  chatName: '',
  avatarGroup: undefined,
  messages: [],
  conversation: null,
  error: null,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_RECEIVER_REQUEST:
      return {
        ...state,
        searchString: payload,
        isSearching: true,
      };
    case SEARCH_RECEIVER_SUCCESS:
      return {
        ...state,
        searchReceivers: payload,
        isSearching: false,
      };
    case SEARCH_RECEIVER_FAIL:
      return {
        ...state,
        isSearching: false,
        error: payload,
      };
    case ADD_RECEIVER:
      return {
        ...state,
        receivers: [...state.receivers, payload],
      };
    case REMOVE_ALL_RECEIVERS: {
      return {
        ...state,
        receivers: [],
      };
    }
    case REMOVE_RECEIVER:
      return {
        ...state,
        receivers: state.receivers.filter(
          (receiver) => receiver.id !== payload,
        ),
      };
    case SET_RECEIVER_DM:
      return {
        ...state,
        receivers: [payload],
      };
    case CREATE_NEW_CONVERSATION_REQUEST: {
      const { senderId, tempMessageId, date, messageContent } = payload;
      return {
        ...state,
        isCreating: true,
        messages: [
          {
            sender: senderId,
            tempId: tempMessageId,
            date,
            content: messageContent,
            isSending: true,
          },
        ],
      };
    }
    case CREATE_NEW_CONVERSATION_SUCCESS: {
      const { conversation } = payload;
      return {
        ...state,
        isCreating: false,
        conversation,
      };
    }
    case CREATE_NEW_CONVERSATION_FAIL:
      return {
        ...state,
        isCreated: false,
        error: payload,
      };
    case CREATE_NEW_CONVERSATION_GROUP_REQUEST:
      return {
        ...state,
        isCreating: true,
      };
    case CREATE_NEW_CONVERSATION_GROUP_SUCCESS:
      return {
        ...state,
        isCreating: false,
        conversation: payload,
      };
    case CREATE_NEW_CONVERSATION_GROUP_FAIL:
      return {
        ...state,
        isCreating: false,
        error: payload,
      };
    case CLEAR_NEW_CONVERSATION:
      return initialState;
    case SET_AVATAR:
      return {
        ...state,
        avatarGroup: payload,
      };
    case SET_CHATNAME:
      return {
        ...state,
        chatName: payload,
      };
    default:
      return state;
  }
}
