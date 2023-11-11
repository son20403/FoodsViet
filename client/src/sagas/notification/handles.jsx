import { call, put } from "redux-saga/effects";
import { setErrorGlobal, setNotifyGlobal } from "../global/globalSlice";
import { addNotification, deleteNotificationByCustomer, getAllNotification, getNotificationByCustomer, updateAllNotificationByCustomer, updateNotificationByCustomer } from "./request";
import { addNotificationSuccess, deleteNotificationSuccess, getAllNotificationSuccess, getNotificationByCustomerSuccess, requestFailure, updateAllNotificationSuccess, updateNotificationSuccess } from "./notificationSlice";


export function* handleAddNotification({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(addNotification, payload);
        if (response) {
            yield put(addNotificationSuccess())
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}

export function* handleGetNotificationByCustomer({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(getNotificationByCustomer, payload);
        if (response) {
            yield put(getNotificationByCustomerSuccess(response.data?.reverse()))
        }

    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleAllGetNotification({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(getAllNotification, payload);
        if (response) {
            yield put(getAllNotificationSuccess(response.data))
        }

    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleUpdateNotificationByCustomer({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(updateNotificationByCustomer, payload);
        if (response) {
            yield put(updateNotificationSuccess())
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleUpdateAllNotificationByCustomer({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(updateAllNotificationByCustomer, payload);
        if (response) {
            yield put(updateAllNotificationSuccess())
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleDeteteNotificationByCustomer({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(deleteNotificationByCustomer, payload?.id);
        if (response) {
            yield put(deleteNotificationSuccess())
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