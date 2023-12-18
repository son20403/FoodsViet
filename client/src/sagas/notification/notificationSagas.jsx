import { takeEvery, takeLatest } from "redux-saga/effects";
import { addNotificationAdminRequest, addNotificationRequest, deleteAllNotificationRequest, deleteNotificationRequest, deleteNotificationSuccess, getAllNotificationRequest, getNotificationByAdminRequest, getNotificationByCustomerRequest, updateAllNotificationRequest, updateNotificationAdminRequest, updateNotificationRequest } from "./notificationSlice";
import { handleAddNotification, handleAddNotificationAdmin, handleDeleteAllNotificationByCustomer, handleDeleteNotificationByCustomer, handleGetNotificationByAdmin, handleGetNotificationByCustomer, handleUpdateAllNotificationByCustomer, handleUpdateNotificationByAdmin, handleUpdateNotificationByCustomer } from "./handles";
import { getAllNotification } from "./request";


export default function* notificationSagas() {
    yield takeEvery(addNotificationRequest.type, handleAddNotification)
    yield takeEvery(addNotificationAdminRequest.type, handleAddNotificationAdmin)
    yield takeLatest(getNotificationByCustomerRequest.type, handleGetNotificationByCustomer)
    yield takeLatest(getNotificationByAdminRequest.type, handleGetNotificationByAdmin)
    yield takeLatest(getAllNotificationRequest.type, getAllNotification)
    yield takeLatest(updateNotificationRequest.type, handleUpdateNotificationByCustomer)
    yield takeLatest(updateNotificationAdminRequest.type, handleUpdateNotificationByAdmin)
    yield takeLatest(updateAllNotificationRequest.type, handleUpdateAllNotificationByCustomer)
    yield takeLatest(deleteAllNotificationRequest.type, handleDeleteAllNotificationByCustomer)
    yield takeLatest(deleteNotificationRequest.type, handleDeleteNotificationByCustomer)
}