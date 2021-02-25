import { call, put } from "redux-saga/effects";
import * as actions from "../actions/chats-actions";
import * as socketTypes from "../consts/socketTypes";

function getChats(socket) {
  return new Promise((res, rej) => {
    socket.emit(
      socketTypes.GET_ALL_CONVERSATIONS_REQUEST,
      null,
      (data, error) => {
        if (error) rej(error);
        res(data);
      }
    );
  });
}

export default function* getChatsSaga(socket) {
  yield put(actions.getChatsRequest());
  try {
    const chats = yield call(getChats, socket);
    yield put(actions.getChatsSuccess(chats));
  } catch (error) {
    yield put(actions.getChatsFail(error));
  }
}
