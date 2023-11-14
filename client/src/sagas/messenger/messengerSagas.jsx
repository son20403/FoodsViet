import { takeLatest } from "redux-saga/effects";
import {
  handleCreateConvesation,
  handleGetConvesations,
  handleCreateMessage,
  handleGetMessage,
} from "./handles";
import {
  conversationsRequest,
  currentChatRequest,
  messagesRequest,
  createMessagesRequest,
  createConversationsRequest,
} from "./messengerSlice";

export default function* messengerSagas() {
  yield takeLatest(createConversationsRequest.type, handleCreateConvesation);
  yield takeLatest(conversationsRequest.type, handleGetConvesations);
  yield takeLatest(createMessagesRequest.type, handleCreateMessage);
  yield takeLatest(messagesRequest.type, handleGetMessage);
  //   yield takeLatest(updateCustomerRequest.type, handleUpdateCustomers)
}
