import axios from "axios";
import {
  take,
  call,
  put,
  takeLatest,
  fork,
  select,
  takeEvery,
} from "redux-saga/effects";
import * as actions from "../actions/newconversation-actions";
import * as actionTypes from "../actions/newconversation-action-types";
import * as socketTypes from "../consts/socketTypes";

function createNewConversation(socket, payload) {
  return new Promise((res, rej) => {
    socket.emit(
      socketTypes.CREATE_CONVERSATION_REQUEST,
      payload,
      (data, error) => {
        if (error) rej(error);
        res(data);
      }
    );
  });
}

function searchUserByUsername(socket, payload) {
  return new Promise((res, rej) => {
    socket.emit(socketTypes.SEARCH_USER_BY_USERNAME, payload, (data, error) => {
      if (error) rej(error);
      res(data);
    });
  });
}

function* createConversation(socket) {
  while (true) {
    const {
      payload: { receivers, messageContent, tempConversationId, tempMessageId },
    } = yield take(actionTypes.CREATE_NEW_CONVERSATION_REQUEST);
    const query = {
      receiversIds: receivers.map(({ id }) => id),
      messageContent,
    };
    try {
      const conversation = yield call(createNewConversation, socket, query);
      yield put(
        actions.createNewConversationSuccess(
          conversation,
          tempConversationId,
          tempMessageId
        )
      );
    } catch (error) {
      console.log(error);
      yield put(actions.createNewConversationFail(error));
    }
  }
}

function* searchReceiverSaga(socket, actionRequest) {
  const { payload } = yield actionRequest;
  try {
    const res = yield call(searchUserByUsername, socket, payload);
    yield put(actions.searchReceiverSuccess(res));
  } catch (error) {
    yield put(actions.searchReceiverFail(error));
  }
}

function* searchReceiverFlow(socket) {
  yield takeLatest(
    actionTypes.SEARCH_RECEIVER_REQUEST,
    searchReceiverSaga,
    socket
  );
}

function* createNewConversationGroupSaga(socket, actionRequest) {
  const {
    payload: { chatName, chatAvatarGroup },
  } = yield actionRequest;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    // withCredentials: true,
  };

  const receivers = yield select((state) => state.newconversation.receivers);

  const receiversIds = JSON.stringify(receivers.map((receiver) => receiver.id));

  const formData = new FormData();
  formData.append("receivers", receiversIds);
  formData.append("chatName", chatName);
  formData.append("file", chatAvatarGroup);
  formData.append("socketId", socket.id);

  try {
    const { data: conversation } = yield call(
      axios.post,
      "/api/conversation",
      formData
    );
    yield put(actions.createNewGroupConversationSuccess(conversation));
  } catch (error) {
    // console.log(error.message);
    yield put(actions.createNewGroupConversationFail(error));
  }
}

function* createNewConversationGroupFlow(socketId) {
  yield takeEvery(
    actionTypes.CREATE_NEW_CONVERSATION_GROUP_REQUEST,
    createNewConversationGroupSaga,
    socketId
  );
}

export default function* newConversationSaga(socket) {
  yield fork(searchReceiverFlow, socket);
  yield fork(createConversation, socket);
  yield fork(createNewConversationGroupFlow, socket);
}
