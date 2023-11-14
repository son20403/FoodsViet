import { call, put } from "redux-saga/effects";
import {
  createConversation,
  createMessage,
  getConversation,
  getMessage,
} from "./request";
import {
  conversationsRequest,
  conversationsSuccess,
  currentChatRequest,
  currentChatSuccess,
  messagesRequest,
  messagesSuccess,
  setLoadingMessage,
} from "./messengerSlice";

export function* handleCreateConvesation({ payload }) {
  // console.log("🚀 --> function*handleCreateConvesation --> payload:", payload);
  try {
    const response = yield call(createConversation, payload);
    if (response) {
      // yield put(customerDetailSuccess(response.data))
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
}
export function* handleGetConvesations({ payload }) {
  try {
    const response = yield call(getConversation, payload?.userid);
    if (response) {
      yield put(conversationsSuccess(response.data));
      // console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
}

export function* handleCreateMessage({ payload }) {
  try {
    const response = yield call(createMessage, payload);
    if (response) {
      // yield put(conversationsSuccess(response.data));
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
}
export function* handleGetMessage({ payload }) {
  try {
    const response = yield call(getMessage, payload?.conversationId);
    if (response) {
      yield put(messagesSuccess(response.data));
      // console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
}
