import { v4 as uuidv4 } from 'uuid';

import {
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
  GET_CONVERSATION_BY_ID_REQUEST,
  GET_CONVERSATION_BY_ID_SUCCESS,
  GET_CONVERSATION_BY_ID_FAIL,
} from './conversation-action-types';

export const sendMessageRequest = (messageContent, conversationId) => ({
  type: SEND_MESSAGE_REQUEST,
  payload: {
    messageContent,
    conversationId,
    tempMessageId: uuidv4(),
  },
});

export const sendMessageFail = (payload) => ({
  type: SEND_MESSAGE_FAIL,
  payload,
});

export const sendMessageSuccess = (payload) => ({
  type: SEND_MESSAGE_SUCCESS,
  payload,
});

export const getConversationByIdRequest = (payload) => ({
  type: GET_CONVERSATION_BY_ID_REQUEST,
  payload: {
    conversationId: payload,
  },
});

export const getConversationByIdSuccess = (payload) => ({
  type: GET_CONVERSATION_BY_ID_SUCCESS,
  payload,
});

export const getConversationByIdFail = (payload) => ({
  type: GET_CONVERSATION_BY_ID_FAIL,
  payload,
});
