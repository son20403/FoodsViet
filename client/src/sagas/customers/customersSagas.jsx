import { takeLatest } from "redux-saga/effects";
import { handleGetAllCustomers, handleGetDetailCustomer, handleUpdateCustomers } from "./handles";
import { customerDetailRequest, customersRequest, updateCustomerRequest } from "./customersSlice";

export default function* customersSagas() {
    yield takeLatest(customerDetailRequest.type, handleGetDetailCustomer)
    yield takeLatest(customersRequest.type, handleGetAllCustomers)
    yield takeLatest(updateCustomerRequest.type, handleUpdateCustomers)
}