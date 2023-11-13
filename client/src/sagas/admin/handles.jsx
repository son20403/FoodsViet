import { call, put } from "redux-saga/effects";
import {
  createPostAdmin,
  getAllPostAdmin,
  getListAdmin,
  loginAdmin,
  logoutAdmin,
  registerAdmin,
  updateCustomerAdmin,
  updatePostAdmin,
  updateStatus,
} from "./request";
import { setErrorGlobal, setNotifyGlobal } from "../global/globalSlice";
import {
  addCategoriesAdminSuccess,
  addCustomerAdminSuccess,
  addPostAdminSuccess,
  getAllAdminRequest,
  getAllAdminSuccess,
  getCategoriesAdminRequest,
  getCustomersAdminRequest,
  getCustomersAdminSuccess,
  getPostsAdminRequest,
  getPostsAdminSuccess,
  loginAdminSuccess,
  registerAdminSuccess,
  requestAdminFailure,
  setInfoAdmin,
  updateCustomerAdminSuccess,
  updatePostAdminSuccess,
  updateStatusSuccess,
} from "./adminSlice";
import { createCustomerAdmin, getAllCustomersByAdmin } from "../customers/request";

export function* handleLoginAdmin({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(loginAdmin, payload);
    if (response) {
      const { message, accessToken, ...info } = response.data;
      yield put(setNotifyGlobal(message));
      yield put(loginAdminSuccess(accessToken));
      yield put(setInfoAdmin(info));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}

export function* handleRegisterAdmin({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(registerAdmin, payload);
    if (response) {
      yield put(registerAdminSuccess());
      yield put(setNotifyGlobal(response.data?.message));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleLogoutAdmin({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(logoutAdmin, payload);
    if (response) {
      yield put(setErrorGlobal(""));
      yield put(setNotifyGlobal(response.data?.message));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}

export function* handleGetAllPostsAdmin({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(getAllPostAdmin, payload);
    if (response?.data) {
      yield put(getPostsAdminSuccess(response.data?.reverse()));
    } else {
      yield put(getPostsAdminSuccess([]));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleGetAllAdmin({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(getListAdmin, payload);
    if (response?.data) {
      yield put(getAllAdminSuccess(response.data?.reverse()));
    } else {
      yield put(getAllAdminSuccess([]));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleGetAllCustomersByAdmin({ payload }) {
  try {
    yield put(setNotifyGlobal(''))
    yield put(setErrorGlobal(''))
    const response = yield call(getAllCustomersByAdmin, payload);
    if (response) {
      yield put(getCustomersAdminSuccess(response.data?.reverse()))
    }
  } catch (error) {
    yield handleCommonError(error)
  }
}
export function* handleUpdateStatus({ payload }) {
  const { id, model, status } = payload;
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(updateStatus, id, model, { status });
    if (response?.data) {
      yield put(updateStatusSuccess());
      switch (model) {
        case 'post':
          yield put(getPostsAdminRequest());
          break;
        case 'category':
          yield put(getCategoriesAdminRequest());
          break;
        case 'customer':
          yield put(getCustomersAdminRequest());
          break;
        case 'comment':
          yield put(getCategoriesAdminRequest());
          break;
        case 'admin':
          yield put(getAllAdminRequest());
          break;
        default:
          put(setErrorGlobal("Có lỗi xảy ra khi thay đổi trạng thái!"))
          break;
      }
      yield put(setNotifyGlobal("Cập nhật trạng thái thành công"));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleUpdatePostAdmin({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(updatePostAdmin, payload?.id, payload?.post);
    if (response?.data) {
      yield put(updatePostAdminSuccess());
      // yield put(postDetailRequest({ slug: payload?.slug }));
      yield put(getPostsAdminRequest());
      yield put(setNotifyGlobal(response.data?.message));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleUpdateCustomerAdmin({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(updateCustomerAdmin, payload?.id, payload?.customer);
    if (response?.data) {
      yield put(updateCustomerAdminSuccess());
      // yield put(postDetailRequest({ slug: payload?.slug }));
      yield put(getCustomersAdminRequest());
      yield put(setNotifyGlobal(response.data?.message));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleCreatePostsAdmin({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(createPostAdmin, payload?.post);
    if (response?.data) {
      yield put(addPostAdminSuccess());
      yield put(getPostsAdminRequest());
    }
    yield put(setNotifyGlobal(response?.data?.message));
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleCreateCustomerAdmin({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(createCustomerAdmin, payload);
    if (response?.data) {
      yield put(addCustomerAdminSuccess());
      yield put(getCustomersAdminRequest());
    }
    yield put(setNotifyGlobal(response?.data?.message));
  } catch (error) {
    yield handleCommonError(error);
  }
}

function* handleCommonError(error) {
  console.log("error:", error);
  if (error?.code === "ERR_NETWORK") {
    yield put(requestAdminFailure(error));
    yield put(setErrorGlobal(error?.message));
  } else {
    yield put(setNotifyGlobal(""));
    yield put(requestAdminFailure(error?.response?.data));
    yield put(setErrorGlobal(error?.response?.data?.message));
  }
}
