import {
  SOCKET_INIT_SUCCESS,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  GET_ALL_CHATS_REQUEST,
  GET_ALL_CHATS_SUCCESS,
  GET_ALL_CHATS_FAIL,
  RECEIVE_MESSAGE,
  RECEIVE_NEW_CONVERSATION,
} from "../actions/chats-action-types";
import {
  CREATE_NEW_CONVERSATION_GROUP_SUCCESS,
  CREATE_NEW_CONVERSATION_REQUEST,
  CREATE_NEW_CONVERSATION_SUCCESS,
} from "../actions/newconversation-action-types";
import { GET_CONVERSATION_BY_ID_SUCCESS } from "../actions/conversation-action-types";

import { LOGOUT } from "../actions/auth-action-types";

const initialState = {
  isConnected: false,
  isLoaded: false,
  chats: [],
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SOCKET_INIT_SUCCESS:
      return {
        ...state,
        isConnected: true,
      };
    case CREATE_NEW_CONVERSATION_REQUEST: {
      const {
        receivers,
        messageContent,
        senderId,
        date,
        tempMessageId,
        tempConversationId,
        user,
      } = payload;
      return {
        ...state,
        chats: [
          {
            tempId: tempConversationId,
            members: [...receivers, user],
            messages: [
              {
                date,
                tempId: tempMessageId,
                sender: senderId,
                content: messageContent,
                isSending: true,
              },
            ],
          },
          ...state.chats,
        ],
      };
    }
    case CREATE_NEW_CONVERSATION_SUCCESS: {
      const {
        tempConversationId,
        tempMessageId,
        messageId,
        conversationId,
      } = payload;
      const updatedChats = [...state.chats];
      const chatIndex = updatedChats.findIndex(
        (chat) => chat.tempId === tempConversationId
      );
      const messageIndex = updatedChats[chatIndex].messages.findIndex(
        (message) => message.tempId === tempMessageId
      );
      updatedChats[chatIndex]._id = conversationId;
      updatedChats[chatIndex].messages[messageIndex].isSending = false;
      updatedChats[chatIndex].messages[messageIndex]._id = messageId;
      return {
        ...state,
        chats: updatedChats,
      };
    }
    case CREATE_NEW_CONVERSATION_GROUP_SUCCESS: {
      return {
        ...state,
        chats: [payload, ...state.chats],
      };
    }
    case SEND_MESSAGE_REQUEST: {
      const { messageContent, userId, tempMessageId, conversationId } = payload;
      const chatIndex = state.chats.findIndex(
        (chat) => chat._id === conversationId
      );
      const updatedChat = JSON.parse(JSON.stringify(state.chats[chatIndex]));
      const newMessage = {
        content: messageContent,
        tempId: tempMessageId,
        sender: userId,
        date: new Date().toISOString(),
        isSending: true,
      };
      updatedChat.messages.push(newMessage);
      updatedChat.lastMessageDate = new Date().toISOString();
      const updatedChats = [...state.chats];
      updatedChats[chatIndex] = updatedChat;
      return {
        ...state,
        chats: updatedChats,
      };
    }
    case SEND_MESSAGE_SUCCESS: {
      const { conversationId, tempMessageId, messageId } = payload;
      const updatedChats = [...state.chats];
      const chatIndex = updatedChats.findIndex(
        (chat) => chat._id === conversationId
      );
      const messageIndex = updatedChats[chatIndex].messages.findIndex(
        (message) => message.tempId === tempMessageId
      );

      const updatedChat = JSON.parse(JSON.stringify(updatedChats[chatIndex]));
      updatedChat.messages[messageIndex].isSending = false;
      updatedChat.messages[messageIndex]._id = messageId;

      updatedChats[chatIndex] = updatedChat;
      return {
        ...state,
        chats: updatedChats,
      };
    }
    case GET_ALL_CHATS_REQUEST:
      return { ...state };
    case GET_ALL_CHATS_SUCCESS:
      return { ...state, chats: [...state.chats, ...payload], isLoaded: true };
    case GET_ALL_CHATS_FAIL:
      return { ...state, error: payload, isLoaded: true };
    case RECEIVE_NEW_CONVERSATION:
      return {
        ...state,
        chats: [payload, ...state.chats],
      };
    case GET_CONVERSATION_BY_ID_SUCCESS:
      return {
        ...state,
        chats: [payload, ...state.chats],
      };
    case RECEIVE_MESSAGE: {
      const { conversationId, newMessage } = payload;
      const conversationIndex = state.chats.findIndex(
        (chat) => chat._id === conversationId
      );

      const newChats = [...state.chats];
      const newConversation = JSON.parse(
        JSON.stringify(state.chats[conversationIndex])
      );
      newConversation.messages.push(newMessage);
      newConversation.lastMessageDate = newMessage.date;
      newChats[conversationIndex] = newConversation;
      return {
        ...state,
        chats: newChats,
      };
    }
    case LOGOUT:
      return {
        ...initialState,
        isLoadingInit: false,
      };
    default:
      return state;
  }
};
