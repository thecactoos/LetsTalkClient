import { take, fork, call, put, takeEvery } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import * as actionTypes from "../actions/chats-action-types";
import * as actions from "../actions/chats-actions";
import * as socketTypes from "../consts/socketTypes";
import createSocketConnection from "../utils/createSocketConnection";

// Sagas
import navigation from "./navigation-saga";
import getProfileSaga from "./profile-saga";
import getChatsSaga from "./get-chats-saga";
import sendMessageFlow from "./send-message-saga";
import newConversationSaga from "./new-conversation-saga";
import getConversationSaga from "./get-conversation-saga";
import profileFormSaga from "./profile-form-saga";
import { AUTH_SUCCESS } from "../actions/auth-action-types";

// Testing purposes
function* watchAll() {
  while (true) {
    const action = yield take("*");
    // eslint-disable-next-line no-console
    console.log("Action from redux-saga", action);
  }
}

function createSocketChannel(socket) {
  return eventChannel((emit) => {
    const errorHandler = (errorEvent) => {
      emit(new Error(errorEvent.reason));
    };

    const receiveMessageHandler = (payload) => {
      console.log(payload);
      emit(actions.receiveMessage(payload));
    };

    const newConversationHandler = (payload) => {
      emit(actions.receiveNewConversation(payload));
    };

    const getAuthenticatedUser = (payload) => {
      emit({
        type: AUTH_SUCCESS,
        payload,
      });
    };

    // Testing
    socket.on("lala", (data) => {
      console.log(data);
    });

    socket.on(socketTypes.GET_AUTHENTICATED_USER, getAuthenticatedUser);
    socket.on(socketTypes.NEW_CONVERSATION, newConversationHandler);
    socket.on(socketTypes.RECEIVE_MESSAGE, receiveMessageHandler);
    socket.on("error", errorHandler);

    const unsubscribe = () => {};

    return unsubscribe;
  });
}

function* dispatchSocketAction(socketChannel) {
  yield takeEvery(socketChannel, function* dispatcher(action) {
    yield put(action);
  });
}

function* watchAllSocketAction() {
  const { payload } = yield take(actionTypes.SOCKET_INIT);
  const socket = yield call(createSocketConnection);
  const socketChannel = yield call(createSocketChannel, socket);
  if (socket && socketChannel) yield put(actions.socketSuccess());
  yield fork(dispatchSocketAction, socketChannel);
  yield fork(getChatsSaga, socket);
  yield fork(navigation, socket);
  yield fork(newConversationSaga, socket);
  yield fork(getProfileSaga, socket);
  yield fork(sendMessageFlow, socket);
  yield fork(getConversationSaga, socket);
  yield fork(profileFormSaga, socket);
}

export default function* rootSaga() {
  // yield fork(watchAll);
  yield fork(watchAllSocketAction);
}
