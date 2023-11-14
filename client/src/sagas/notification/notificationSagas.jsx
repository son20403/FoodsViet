import { takeEvery, takeLatest } from "redux-saga/effects";
import { addNotificationRequest, deleteAllNotificationRequest, deleteNotificationRequest, deleteNotificationSuccess, getAllNotificationRequest, getNotificationByCustomerRequest, updateAllNotificationRequest, updateNotificationRequest } from "./notificationSlice";
import { handleAddNotification, handleDeleteAllNotificationByCustomer, handleDeleteNotificationByCustomer, handleGetNotificationByCustomer, handleUpdateAllNotificationByCustomer, handleUpdateNotificationByCustomer } from "./handles";
import { getAllNotification } from "./request";


export default function* notificationSagas() {
    yield takeEvery(addNotificationRequest.type, handleAddNotification)
    yield takeLatest(getNotificationByCustomerRequest.type, handleGetNotificationByCustomer)
    yield takeLatest(getAllNotificationRequest.type, getAllNotification)
    yield takeLatest(updateNotificationRequest.type, handleUpdateNotificationByCustomer)
    yield takeLatest(updateAllNotificationRequest.type, handleUpdateAllNotificationByCustomer)
    yield takeLatest(deleteAllNotificationRequest.type, handleDeleteAllNotificationByCustomer)
    yield takeLatest(deleteNotificationRequest.type, handleDeleteNotificationByCustomer)
}