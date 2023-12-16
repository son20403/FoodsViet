import { takeLatest } from "redux-saga/effects";
import { handleGetAllCustomers, handleGetDetailCustomer, handleGetInfoAdmin, handleUpdateCustomers } from "./handles";
import { adminInfoRequest, customerDetailRequest, customersRequest, updateCustomerRequest } from "./customersSlice";

export default function* customersSagas() {
    yield takeLatest(customerDetailRequest.type, handleGetDetailCustomer)
    yield takeLatest(adminInfoRequest.type, handleGetInfoAdmin)
    yield takeLatest(customersRequest.type, handleGetAllCustomers)
    yield takeLatest(updateCustomerRequest.type, handleUpdateCustomers)
}