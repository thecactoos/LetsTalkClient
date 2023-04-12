import { put, takeEvery, call } from 'redux-saga/effects';
import * as socketTypes from '../consts/socketTypes';
import * as actions from '../actions/chats-actions';
import { SEND_MESSAGE_REQUEST } from '../actions/chats-action-types';

function sendMessage(socket, payload) {
  return new Promise((res, rej) => {
    socket.emit(socketTypes.SEND_MESSAGE, payload, (data, error) => {
      if (error) rej(error);
      res(data);
    });
  });
}

function* sendMessageSaga(socket, actionRequest) {
  const {
    payload: { conversationId, messageContent, tempMessageId },
  } = actionRequest;

  const query = { conversationId, messageContent };
  try {
    const newMessage = yield call(sendMessage, socket, query);
    const { _id: messageId } = newMessage;

    console.log(newMessage);
    yield put(
      actions.sendMessageSuccess({ tempMessageId, conversationId, messageId }),
    );
  } catch (error) {
    yield put(actions.sendMessageFail(error));
  }
}

export default function* sendMessageFlow(socket) {
  yield takeEvery(SEND_MESSAGE_REQUEST, sendMessageSaga, socket);
}
