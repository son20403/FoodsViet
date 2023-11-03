import { takeLatest } from "redux-saga/effects";
import { addCategoriesAdminRequest, addPostAdminRequest, getAllAdminRequest, getCategoriesAdminRequest, getPostsAdminRequest, loginAdminRequest, logoutAdmin, registerAdminRequest, updatePostAdminRequest, updateStatusRequest } from "./adminSlice";
import { handleCreatePostsAdmin, handleGetAllAdmin, handleGetAllPostsAdmin, handleLoginAdmin, handleLogoutAdmin, handleRegisterAdmin, handleUpdatePostAdmin, handleUpdateStatus } from "./handles";
import { handleCreateCategories, handleGetAllAdminCategories } from "../categories/handles";

export default function* adminSagas() {
    yield takeLatest(loginAdminRequest.type, handleLoginAdmin)
    yield takeLatest(registerAdminRequest.type, handleRegisterAdmin)
    yield takeLatest(logoutAdmin.type, handleLogoutAdmin)
    yield takeLatest(getPostsAdminRequest.type, handleGetAllPostsAdmin)
    yield takeLatest(updateStatusRequest.type, handleUpdateStatus)
    yield takeLatest(updatePostAdminRequest.type, handleUpdatePostAdmin)
    yield takeLatest(addPostAdminRequest.type, handleCreatePostsAdmin)
    yield takeLatest(getAllAdminRequest.type, handleGetAllAdmin)
    yield takeLatest(getCategoriesAdminRequest.type, handleGetAllAdminCategories)
    yield takeLatest(addCategoriesAdminRequest.type, handleCreateCategories)
}