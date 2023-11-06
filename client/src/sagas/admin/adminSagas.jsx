import { takeLatest } from "redux-saga/effects";
import {
  addCategoriesAdminRequest,
  addPostAdminRequest,
  getAllAdminRequest,
  getCategoriesAdminRequest,
  getCustomersAdminRequest,
  getPostsAdminRequest,
  loginAdminRequest,
  logoutAdmin,
  registerAdminRequest,
  updateCategoriesAdminRequest,
  updatePostAdminRequest,
  updateStatusRequest,
} from "./adminSlice";
import {
  handleCreatePostsAdmin,
  handleGetAllAdmin,
  handleGetAllCustomersByAdmin,
  handleGetAllPostsAdmin,
  handleLoginAdmin,
  handleLogoutAdmin,
  handleRegisterAdmin,
  handleUpdatePostAdmin,
  handleUpdateStatus,
} from "./handles";
import { handleCreateCategoryAdmin, handleGetAllCategoriesAdmin, handleUpdateCategoryAdmin } from "../categories/handles";


export default function* adminSagas() {
  yield takeLatest(loginAdminRequest.type, handleLoginAdmin);
  yield takeLatest(registerAdminRequest.type, handleRegisterAdmin);
  yield takeLatest(logoutAdmin.type, handleLogoutAdmin);
  yield takeLatest(getPostsAdminRequest.type, handleGetAllPostsAdmin);
  yield takeLatest(updatePostAdminRequest.type, handleUpdatePostAdmin);
  yield takeLatest(addPostAdminRequest.type, handleCreatePostsAdmin);
  yield takeLatest(getAllAdminRequest.type, handleGetAllAdmin);
  yield takeLatest(getCategoriesAdminRequest.type, handleGetAllCategoriesAdmin);
  yield takeLatest(addCategoriesAdminRequest.type, handleCreateCategoryAdmin);
  yield takeLatest(updateStatusRequest.type, handleUpdateStatus);
  yield takeLatest(updateCategoriesAdminRequest.type, handleUpdateCategoryAdmin);
  yield takeLatest(getCustomersAdminRequest.type, handleGetAllCustomersByAdmin);
}
