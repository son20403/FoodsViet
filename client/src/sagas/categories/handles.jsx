import { call, put } from "redux-saga/effects";
import {
  createCategoryAdmin,
  getAllCaterories,
  getAllCateroriesAdmin,
  updateCategoryAdmin,
} from "./request";
import { getCategoriesSuccess, requestFailure } from "./categoriesSlice";
import { setErrorGlobal, setNotifyGlobal } from "../global/globalSlice";
import {
  addCategoriesAdminSuccess,
  getCategoriesAdminRequest,
  getCategoriesAdminSuccess,
} from "../admin/adminSlice";

export function* handleGetAllCategories({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(getAllCaterories, payload);
    if (response) {
      yield put(getCategoriesSuccess(response.data));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}

export function* handleGetAllCategoriesAdmin({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(getAllCateroriesAdmin, payload);
    if (response) {
      yield put(getCategoriesAdminSuccess(response.data.reverse()));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleCreateCategoryAdmin({ payload }) {
  const { category, reset } = payload
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(createCategoryAdmin, category);
    if (response) {
      yield put(addCategoriesAdminSuccess());
      yield put(getCategoriesAdminRequest());
      yield put(setNotifyGlobal(response?.data?.message));
      yield reset();
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}

export function* handleUpdateCategoryAdmin({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(
      updateCategoryAdmin,
      payload?.id,
      payload?.category
    );
    if (response) {
      yield put(addCategoriesAdminSuccess());
      yield put(getCategoriesAdminRequest());
      yield put(setNotifyGlobal(response?.data?.message));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}

function* handleCommonError(error) {
  console.log("error:", error);
  if (error?.code === "ERR_NETWORK") {
    yield put(requestFailure(error));
    yield put(setErrorGlobal(error?.message));
  } else {
    yield put(setNotifyGlobal(""));
    yield put(requestFailure(error?.response?.data));
    yield put(setErrorGlobal(error?.response?.data?.message));
  }
}

// export function* registerCustomer({ payload }) {
//     try {
//         const response = yield call(registerAuth, payload);
//         if (response) {
//             yield put(registerSuccess())
//             toast.success(response.data?.message)
//         }

//     } catch (error) {
//         yield put(requestFailure(error.response.data.message));
//     }
// }
