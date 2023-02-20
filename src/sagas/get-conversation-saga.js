import { put, call, take } from 'redux-saga/effects';
import * as socketTypes from '../consts/socketTypes';
import * as actions from '../actions/conversation-actions';

function getConversationById(socket, id) {
  return new Promise((res, rej) => {
    socket.emit(socketTypes.GET_CONVERSATION_BY_ID, id, (data, error) => {
      if (error) rej(error);
      res(data);
    });
  });
}

export default function* getConversationSaga(socket) {
  while (true) {
    const { payload } = yield take(actions.getConversationByIdRequest().type);
    try {
      const conversation = yield call(getConversationById, socket, payload);
      yield put(actions.getConversationByIdSuccess(conversation));
    } catch (error) {
      console.log(error);
      yield put(actions.getConversationByIdFail(error));
    }
  }
}
