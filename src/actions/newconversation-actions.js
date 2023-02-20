import { v4 as uuidv4 } from 'uuid';

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
} from './newconversation-action-types';

export const addReceiver = (id, username, avatar) => {
  return {
    type: ADD_RECEIVER,
    payload: {
      id,
      username,
      avatar50x50: avatar,
    },
  };
};

export const setReceiverDm = (id, username, avatar) => ({
  type: SET_RECEIVER_DM,
  payload: {
    id,
    username,
    avatar50x50: avatar,
  },
});

export const removeReceiver = (id) => {
  return {
    type: REMOVE_RECEIVER,
    payload: id,
  };
};

export const removeAllReceivers = () => {
  return {
    type: REMOVE_ALL_RECEIVERS,
  };
};

export const createNewConversation = (receivers, messageContent, user) => ({
  type: CREATE_NEW_CONVERSATION_REQUEST,
  payload: {
    user,
    receivers,
    messageContent,
    senderId: user._id,
    tempConversationId: uuidv4(),
    tempMessageId: uuidv4(),
    date: Date.now(),
  },
});

export const createNewConversationSuccess = (
  conversation,
  tempConversationId,
  tempMessageId,
) => ({
  type: CREATE_NEW_CONVERSATION_SUCCESS,
  payload: {
    conversationId: conversation._id,
    messageId: conversation.messages[0]._id,
    conversation,
    tempMessageId,
    tempConversationId,
  },
});

export const createNewConversationFail = (error) => ({
  type: CREATE_NEW_CONVERSATION_FAIL,
  payload: error,
});

export const searchReceiverRequest = (payload) => ({
  type: SEARCH_RECEIVER_REQUEST,
  payload,
});

export const searchReceiverSuccess = (payload) => ({
  type: SEARCH_RECEIVER_SUCCESS,
  payload,
});

export const searchReceiverFail = (payload) => ({
  type: SEARCH_RECEIVER_FAIL,
  payload,
});

export const createNewGroupConversation = (payload) => ({
  type: CREATE_NEW_CONVERSATION_GROUP_REQUEST,
  payload,
});

export const createNewGroupConversationSuccess = (payload) => ({
  type: CREATE_NEW_CONVERSATION_GROUP_SUCCESS,
  payload,
});

export const createNewGroupConversationFail = (payload) => ({
  type: CREATE_NEW_CONVERSATION_GROUP_FAIL,
  payload,
});

export const clearNewConversation = () => ({
  type: CLEAR_NEW_CONVERSATION,
});

export const setAvatar = (payload) => ({
  type: SET_AVATAR,
  payload,
});

export const setChatName = (payload) => ({
  type: SET_CHATNAME,
  payload,
});
