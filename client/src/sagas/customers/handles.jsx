import { call, put } from "redux-saga/effects";
import { getAllCustomers, getDetailCustomer, updateCustomer } from "./request";
import { customerDetailRequest, customerDetailSuccess, customersRequest, customersSuccess, requestFailure, updateCustomerSuccess } from "./customersSlice";
import { setErrorGlobal, setNotifyGlobal } from "../global/globalSlice";
import { setInfoAuth } from "../auth/authSlice";

export function* handleGetDetailCustomer({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(getDetailCustomer, payload?.slug);
        if (response) {
            yield put(customerDetailSuccess(response.data))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}

export function* handleGetAllCustomers({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(getAllCustomers, payload);
        if (response) {
            yield put(customersSuccess(response.data))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}


export function* handleUpdateCustomers({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(updateCustomer, payload?.id, payload?.info)
        if (response?.data) {
            const { message, ...info } = response.data
            yield put(updateCustomerSuccess())
            yield put(customersRequest());
            yield put(customerDetailRequest({ slug: info?.slug }))
            yield put(setInfoAuth(info))
            yield put(setNotifyGlobal(message));
            yield payload?.handleSetURL(info?.slug)
        } else {
            yield put(requestFailure('Có lỗi xảy ra!'));
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
        yield put(requestFailure(error?.response?.data));
        yield put(setErrorGlobal(error?.response?.data?.message));
    }
}
