import { v4 as uuidv4 } from "uuid";
import * as actionTypes from "./chats-action-types";

// Socket actions
export const socketInit = () => ({
  type: actionTypes.SOCKET_INIT,
});

export const socketSuccess = () => ({
  type: actionTypes.SOCKET_INIT_SUCCESS,
});

// Get all chats

export const getChatsSuccess = (payload) => ({
  type: actionTypes.GET_ALL_CHATS_SUCCESS,
  payload,
});

export const getChatsFail = (payload) => ({
  type: actionTypes.GET_ALL_CHATS_FAIL,
  payload,
});

export const getChatsRequest = () => ({
  type: actionTypes.GET_ALL_CHATS_REQUEST,
});

// Send Message
export const sendMessageRequest = (payload) => {
  return {
    type: actionTypes.SEND_MESSAGE_REQUEST,
    payload: {
      ...payload,
      tempMessageId: uuidv4(),
    },
  };
};

export const sendMessageSuccess = (payload) => ({
  type: actionTypes.SEND_MESSAGE_SUCCESS,
  payload,
});

export const sendMessageFail = (payload) => ({
  type: actionTypes.SEND_MESSAGE_FAIL,
  payload,
});

// Receive Message

export const receiveMessage = (payload) => ({
  type: actionTypes.RECEIVE_MESSAGE,
  payload,
});

// New Conversation
export const receiveNewConversation = (payload) => ({
  type: actionTypes.RECEIVE_NEW_CONVERSATION,
  payload,
});
