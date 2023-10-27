import { call, put } from "redux-saga/effects";
import { getAllCaterories } from "./request";
import { getCategoriesSuccess, requestFailure } from "./categoriesSlice";
import { setErrorGlobal, setNotifyGlobal } from "../global/globalSlice";

export function* handleGetAllCategories({ payload }) {
    try {
        const response = yield call(getAllCaterories, payload);
        if (response) {
            yield put(getCategoriesSuccess(response.data))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
function* handleCommonError(error) {
    console.log("error:", error)
    if (error?.code === 'ERR_NETWORK') {
        yield put(requestFailure(error));
        yield put(setErrorGlobal(error?.message));
    } else {
        yield put(setNotifyGlobal(''))
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