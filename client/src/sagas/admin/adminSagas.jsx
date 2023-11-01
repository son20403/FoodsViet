import { takeLatest } from "redux-saga/effects";
import { getPostsAdminRequest, loginAdminRequest, logoutAdmin, registerAdminRequest, updatePostAdminRequest, updateStatusRequest } from "./adminSlice";
import { handleGetAllPostsAdmin, handleLoginAdmin, handleLogoutAdmin, handleRegisterAdmin, handleUpdatePostAdmin, handleUpdateStatus } from "./handles";

export default function* adminSagas() {
    yield takeLatest(loginAdminRequest.type, handleLoginAdmin)
    yield takeLatest(registerAdminRequest.type, handleRegisterAdmin)
    yield takeLatest(logoutAdmin.type, handleLogoutAdmin)
    yield takeLatest(getPostsAdminRequest.type, handleGetAllPostsAdmin)
    yield takeLatest(updateStatusRequest.type, handleUpdateStatus)
    yield takeLatest(updatePostAdminRequest.type, handleUpdatePostAdmin)
}