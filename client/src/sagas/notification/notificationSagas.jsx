import { takeEvery, takeLatest } from "redux-saga/effects";
import { addNotificationRequest, deleteNotificationSuccess, getAllNotificationRequest, getNotificationByCustomerRequest, updateNotificationRequest } from "./notificationSlice";
import { handleAddNotification, handleDeteteNotificationByCustomer, handleGetNotificationByCustomer, handleUpdateAllNotificationByCustomer } from "./handles";
import { getAllNotification } from "./request";


export default function* notificationSagas() {
    yield takeEvery(addNotificationRequest.type, handleAddNotification)
    yield takeLatest(getNotificationByCustomerRequest.type, handleGetNotificationByCustomer)
    yield takeLatest(getAllNotificationRequest.type, getAllNotification)
    yield takeLatest(updateNotificationRequest.type, handleUpdateAllNotificationByCustomer)
    yield takeLatest(deleteNotificationSuccess.type, handleDeteteNotificationByCustomer)
}