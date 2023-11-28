import { takeLatest } from "redux-saga/effects";
import {
  handleCreateFeedback,
  handleGetAllFeedBack,
  handleResetPassword,
  handleSendFeedback,
  handleSendPassword,
} from "./handles";
import {
  FeedbackRequest,
  createFeedbacksRequest,
  forgetPasswordRequest,
  resetPasswordRequest,
  sendFeedbacksRequest,
} from "./feedbacksSlice";

export default function* feedSagas() {
  yield takeLatest(FeedbackRequest.type, handleGetAllFeedBack);
  yield takeLatest(createFeedbacksRequest.type, handleCreateFeedback);
  yield takeLatest(sendFeedbacksRequest.type, handleSendFeedback);
  yield takeLatest(forgetPasswordRequest.type, handleSendPassword);
  yield takeLatest(resetPasswordRequest.type, handleResetPassword);
}
