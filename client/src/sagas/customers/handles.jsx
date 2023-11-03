import { call, delay, put, race } from "redux-saga/effects";
import { getAllCustomers, getDetailCustomer, updateCustomer } from "./request";
import { customerDetailSuccess, customersRequest, customersSuccess, requestFailure, setLoadingCustomer, updateCustomerSuccess } from "./customersSlice";
import { setErrorGlobal, setNotifyGlobal } from "../global/globalSlice";

export function* handleGetDetailCustomer({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(getDetailCustomer, payload.slug);
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
        const response = yield call(updateCustomer, payload?.info)
        if (response?.data) {
            yield put(customersRequest());
            yield put(updateCustomerSuccess())
            yield put(setNotifyGlobal(response.data?.message));
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
