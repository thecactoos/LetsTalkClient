import { take, fork, call, put, takeEvery, race } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import * as actionTypes from '../actions/chats-action-types';
import * as actions from '../actions/chats-actions';
import * as socketTypes from '../consts/socketTypes';

import createSocketConnection from '../utils/createSocketConnection';

// Sagas
import navigation from './navigation-saga';
import getProfileSaga from './profile-saga';
import getChatsSaga from './get-chats-saga';
import sendMessageFlow from './send-message-saga';
import newConversationSaga from './new-conversation-saga';
import getConversationSaga from './get-conversation-saga';
import profileFormSaga from './profile-form-saga';
import { LOGOUT } from '../actions/auth-action-types';

function createSocketChannel(socket) {
  return eventChannel((emit) => {
    const receiveMessageHandler = (payload) => {
      emit(actions.receiveMessage(payload));
    };

    const newConversationHandler = (payload) => {
      emit(actions.receiveNewConversation(payload));
    };

    socket.on(socketTypes.NEW_CONVERSATION, newConversationHandler);
    socket.on(socketTypes.RECEIVE_MESSAGE, receiveMessageHandler);

    const unsubscribe = () => {
      socket.off(socketTypes.NEW_CONVERSATION, newConversationHandler);
      socket.off(socketTypes.RECEIVE_MESSAGE, receiveMessageHandler);
    };

    return unsubscribe;
  });
}

function* dispatchSocketAction(socketChannel) {
  yield takeEvery(socketChannel, function* dispatcher(action) {
    yield put(action);
  });
}

function* socketSetup() {
  try {
    const socket = yield call(createSocketConnection);
    const socketChannel = yield call(createSocketChannel, socket);
    yield put(actions.socketSuccess());
    return {
      socket,
      socketChannel,
    };
  } catch (error) {
    console.log(error);
  }
  return false;
}

function* allActions(socket, socketChannel) {
  yield fork(dispatchSocketAction, socketChannel);
  yield fork(getChatsSaga, socket);
  yield fork(navigation, socket);
  yield fork(newConversationSaga, socket);
  yield fork(getProfileSaga, socket);
  yield fork(sendMessageFlow, socket);
  yield fork(getConversationSaga, socket);
  yield fork(profileFormSaga, socket);
}

function* watchAllActions() {
  while (true) {
    yield take(actionTypes.SOCKET_INIT);
    const { socketConnection } = yield race({
      socketConnection: call(socketSetup),
      logout: take(LOGOUT),
    });

    if (socketConnection) {
      const { socket, socketChannel } = socketConnection;
      yield fork(allActions, socket, socketChannel);
      yield take(LOGOUT);
      socketChannel.close();
      socket.disconnect();
    }
  }
}

export default function* rootSaga() {
  yield fork(watchAllActions);
}
