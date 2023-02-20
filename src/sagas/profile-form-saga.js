import axios from 'axios';
import { put, call, take, fork } from 'redux-saga/effects';
import * as socketTypes from '../consts/socketTypes';
import * as actions from '../actions/profile-form-actions';

function updateUsername(socket, username) {
  return new Promise((res, rej) => {
    socket.emit(socketTypes.UPDATE_USERNAME, username, (data, error) => {
      if (error) rej(error);
      res(data);
    });
  });
}
function updateBio(socket, bio) {
  return new Promise((res, rej) => {
    socket.emit(socketTypes.UPDATE_BIO, bio, (data, error) => {
      if (error) rej(error);
      res(data);
    });
  });
}

function* updateUsernameSaga(socket) {
  while (true) {
    const { payload } = yield take(actions.updateUsernameRequest().type);
    try {
      const profile = yield call(updateUsername, socket, payload);
      yield put(actions.updateUsernameSuccess(profile));
    } catch (error) {
      yield put(actions.updateUsernameFail(error));
    }
  }
}

function* updateBioSaga(socket) {
  while (true) {
    const { payload } = yield take(actions.updateBioRequest().type);
    try {
      const profile = yield call(updateBio, socket, payload);
      yield put(actions.updateBioSuccess(profile));
    } catch (error) {
      yield put(actions.updateBioFail(error));
    }
  }
}

function* createNewConversationGroupSaga() {
  while (true) {
    const { payload } = yield take(actions.updateAvatarRequest().type);

    const config = {
      withCredentials: true,
    };

    const formData = new FormData();
    formData.append('file', payload);

    try {
      const { data } = yield call(axios.put, '/api/profile', formData, config);

      yield put(actions.updateAvatarSuccess(data));
    } catch (error) {
      // console.log(error.message);
      yield put(actions.updateAvatarFail(error));
    }
  }
}

export default function* profileFormSaga(socket) {
  yield fork(createNewConversationGroupSaga);
  yield fork(updateUsernameSaga, socket);
  yield fork(updateBioSaga, socket);
}
