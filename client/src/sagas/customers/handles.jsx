import { call, delay, put, race } from "redux-saga/effects";
import { getAllCustomers, getDetailCustomer, updateCustomer } from "./request";
import { customerDetailSuccess, customersRequest, customersSuccess, requestFailure, setLoadingCustomer, updateCustomerSuccess } from "./customersSlice";
import { setErrorGlobal, setNotifyGlobal } from "../global/globalSlice";

export function* handleGetDetailCustomer({ payload }) {
    try {
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
        yield put(setLoadingCustomer(true))

        const { response, timeout } = yield race({
            response: call(updateCustomer, payload?.info),
            timeout: delay(15000), // Chờ 5 giây, bạn có thể thay đổi thời gian tùy ý
        });

        if (timeout) {
            yield put(setErrorGlobal('Quá thời gian'));
            yield put(setLoadingCustomer(false))
            return;
        }

        if (response) {
            try {
                yield put(customersRequest());
            } catch (error) {
                handleCommonError(error)
            }

            try {
                yield put(setNotifyGlobal(response.data?.message));
            } catch (error) {
                handleCommonError(error)
            }
            yield put(setLoadingCustomer(false))
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
