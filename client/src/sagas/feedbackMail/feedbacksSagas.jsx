import { takeLatest } from "redux-saga/effects";
import { handleCreateFeedback, handleGetAllFeedBack, handleSendFeedback } from "./handles";
import { FeedbackRequest, createFeedbacksRequest, sendFeedbacksRequest } from "./feedbacksSlice";

export default function* feedSagas() {
  yield takeLatest(FeedbackRequest.type, handleGetAllFeedBack);
  yield takeLatest(createFeedbacksRequest.type, handleCreateFeedback);
  yield takeLatest(sendFeedbacksRequest.type, handleSendFeedback);
}
