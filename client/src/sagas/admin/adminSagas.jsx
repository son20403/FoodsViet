import { takeLatest } from "redux-saga/effects";
import {
  addAdminRequest,
  addCategoriesAdminRequest,
  addCustomerAdminRequest,
  addPostAdminRequest,
  getAllAdminRequest,
  getCategoriesAdminRequest,
  getCustomersAdminRequest,
  getPostsAdminRequest,
  loginAdminRequest,
  logoutAdmin,
  registerAdminRequest,
  roleAdminRequest,
  searchAdminRequest,
  searchCategoriesRequest,
  searchCustomersRequest,
  searchPostsRequest,
  updateAdminRequest,
  updateCategoriesAdminRequest,
  updateCustomerAdminRequest,
  updatePostAdminRequest,
  updateRoleAdminRequest,
  updateStatusRequest,
} from "./adminSlice";
import {
  handleCreateAdmin,
  handleCreateCustomerAdmin,
  handleCreatePostsAdmin,
  handleGetAllAdmin,
  handleGetAllCustomersByAdmin,
  handleGetAllPostsAdmin,
  handleGetRole,
  handleLoginAdmin,
  handleLogoutAdmin,
  handleRegisterAdmin,
  handleSearchAdmin,
  handleSearchCategories,
  handleSearchCustomer,
  handleSearchPosts,
  handleUpdateAdmin,
  handleUpdateCustomerAdmin,
  handleUpdatePostAdmin,
  handleUpdateRoleAdmin,
  handleUpdateStatus,
} from "./handles";
import {
  handleCreateCategoryAdmin,
  handleGetAllCategoriesAdmin,
  handleUpdateCategoryAdmin,
} from "../categories/handles";

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
  yield takeLatest(updateCustomerAdminRequest.type, handleUpdateCustomerAdmin);
  yield takeLatest(updateAdminRequest.type, handleUpdateAdmin);
  yield takeLatest(getCustomersAdminRequest.type, handleGetAllCustomersByAdmin);
  yield takeLatest(addCustomerAdminRequest.type, handleCreateCustomerAdmin);
  yield takeLatest(addAdminRequest.type, handleCreateAdmin);
  yield takeLatest(roleAdminRequest.type, handleGetRole);
  yield takeLatest(updateRoleAdminRequest.type, handleUpdateRoleAdmin);
  yield takeLatest(searchAdminRequest.type, handleSearchAdmin);
  yield takeLatest(searchCustomersRequest.type, handleSearchCustomer);
  yield takeLatest(searchPostsRequest.type, handleSearchPosts);
  yield takeLatest(searchCategoriesRequest.type, handleSearchCategories);
}
