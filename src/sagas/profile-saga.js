import { put, call, take } from 'redux-saga/effects';
import * as socketTypes from '../consts/socketTypes';
import * as actions from '../actions/profile-actions';

function getProfile(socket, id) {
  return new Promise((res, rej) => {
    socket.emit(socketTypes.GET_PROFILE_BY_ID, id, (data, error) => {
      if (error) rej(error);
      res(data);
    });
  });
}

export default function* getProfileSaga(socket) {
  while (true) {
    const { payload } = yield take(actions.getProfileRequest().type);
    try {
      const profile = yield call(getProfile, socket, payload);
      yield put(actions.getProfileSuccess(profile));
    } catch (error) {
      yield put(actions.getProfileFail(error));
    }
  }
}
