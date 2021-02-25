import { put, call, takeLatest } from "redux-saga/effects";
import * as socketTypes from "../consts/socketTypes";
import * as actions from "../actions/navigation-actions";
import { SEARCH_USER_REQUEST } from "../actions/navigation-action-types";

function searchUserByUsername(socket, payload) {
  return new Promise((res, rej) => {
    socket.emit(socketTypes.SEARCH_USER_BY_USERNAME, payload, (data, error) => {
      if (error) rej(error);
      res(data);
    });
  });
}

function* searchUsernameSaga(socket, actionRequest) {
  const { payload } = yield actionRequest;
  try {
    const res = yield call(searchUserByUsername, socket, payload);
    yield put(actions.searchUserSuccess(res));
  } catch (error) {
    yield put(actions.searchUserFail(error));
  }
}

export default function* searchUsernameFlow(socket) {
  yield takeLatest(SEARCH_USER_REQUEST, searchUsernameSaga, socket);
}
