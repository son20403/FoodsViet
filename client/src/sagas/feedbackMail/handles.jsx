import { call, put } from "redux-saga/effects";
import { setErrorGlobal, setNotifyGlobal } from "../global/globalSlice";
import {
  FeedbackRequest,
  createFeedbacksSuccess,
  getFeedbackSuccess,
  requestFailure,
  sendFeedbacksSuccess,
} from "./feedbacksSlice";
import { createFeedBack, getAllFeedBack, sendEmail } from "./request";
import { updateStatusRequest } from "../admin/adminSlice";
export function* handleCreateFeedback({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(createFeedBack, payload?.feedback);
    if (response?.data) {
      yield put(createFeedbacksSuccess());
    }
    yield put(setNotifyGlobal(response?.data?.message));
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleSendFeedback({ payload }) {
  const { id } = payload;
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(sendEmail, payload);
    if (response?.data) {
      yield put(sendFeedbacksSuccess());
      yield put(
        updateStatusRequest({ id, model: "feedback", status: "approved" })
      );
      yield put(setNotifyGlobal(response?.data?.message));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}

export function* handleGetAllFeedBack({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(getAllFeedBack, payload);
    if (response?.data) {
      yield put(getFeedbackSuccess(response.data?.reverse()));
    } else {
      yield put(getFeedbackSuccess([]));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
function* handleCommonError(error) {
  console.log("error post:", error);
  if (error?.code === "ERR_NETWORK") {
    yield put(requestFailure(error));
    yield put(setErrorGlobal(error?.message));
  } else {
    yield put(requestFailure(error?.response?.data));
    yield put(setErrorGlobal(error?.response?.data?.message));
  }
}
