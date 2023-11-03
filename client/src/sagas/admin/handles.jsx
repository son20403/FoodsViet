import { call, put } from "redux-saga/effects";
import {
  createCategoryAdmin,
  createPostAdmin,
  getAllCategoryAdmin,
  getAllPostAdmin,
  getListAdmin,
  loginAdmin,
  logoutAdmin,
  registerAdmin,
  updatePostAdmin,
  updateStatus,
} from "./request";
import { setErrorGlobal, setNotifyGlobal } from "../global/globalSlice";
import {
  addCategoriesAdminSuccess,
  getAllAdminSuccess,
  getCategoriesAdminRequest,
  getCategoriesAdminSuccess,
  getPostsAdminRequest,
  getPostsAdminSuccess,
  loginAdminSuccess,
  registerAdminSuccess,
  requestAdminFailure,
  setInfoAdmin,
  updatePostAdminSuccess,
  updateStatusSuccess,
} from "./adminSlice";

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
export function* handleGetAllAdminCategories({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(getAllCategoryAdmin, payload);
    if (response) {
      yield put(getCategoriesAdminSuccess(response.data.reverse()));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleCreateAdminCategories({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(createCategoryAdmin, payload?.category);
    if (response) {
      yield put(addCategoriesAdminSuccess());
      yield put(getCategoriesAdminRequest());
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
export function* handleUpdateStatus({ payload }) {
  const { id, model, status } = payload;
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(updateStatus, id, model, { status });
    if (response?.data) {
      yield put(updateStatusSuccess());
      yield put(getPostsAdminRequest());
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
export function* handleCreatePostsAdmin({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(createPostAdmin, payload?.post);
    if (response?.data) {
      yield put(addCategoriesAdminSuccess());
      yield put(getPostsAdminRequest());
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
