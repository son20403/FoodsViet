import { call, put } from "redux-saga/effects";
import { loginAuth, logoutAuth, registerAuth } from "./request";
import { requestFailure, loginSuccess, registerSuccess, setInfoAuth } from "./authSlice";
import { setErrorGlobal, setNotifyGlobal } from "../global/globalSlice";

export function* authenticateCustomer({ payload }) {
    try {
        yield put(setErrorGlobal(''));
        const response = yield call(loginAuth, payload);
        if (response) {
            const { message, accessToken, ...info } = response.data
            console.log("🚀 ~ file: handles.jsx:12 ~ function*authenticateCustomer ~ accessToken:", accessToken)
            yield put(setNotifyGlobal(message))
            yield put(loginSuccess(accessToken))
            yield put(setInfoAuth(info))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}

export function* registerCustomer({ payload }) {
    try {
        yield put(setErrorGlobal(''));
        const response = yield call(registerAuth, payload);
        if (response) {
            yield put(registerSuccess())
            yield put(setNotifyGlobal(response.data?.message))
        }

    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* logoutCustomer({ payload }) {
    try {
        const response = yield call(logoutAuth, payload);
        if (response) {
            yield put(setErrorGlobal(''));
            yield put(setNotifyGlobal(response.data?.message))
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