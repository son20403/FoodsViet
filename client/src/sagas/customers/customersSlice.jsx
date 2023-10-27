import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    customers: [],
    customer_detail: {},
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        customersRequest: (state) => {
            return {
                ...state,
                error: null,
            }
        },
        customersSuccess: (state, action) => {
            return {
                ...state,
                customers: action.payload,
                error: null,
            }
        },
        updateCustomerRequest: (state) => {
            return {
                ...state,
                error: null,
            }
        },
        updateCustomerSuccess: (state, action) => {
            return {
                ...state,
                error: null,
            }
        },
        requestFailure: (state, action) => {
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        },
        customerDetailRequest: (state) => {
            return {
                ...state,
                error: null,
            }
        },
        customerDetailSuccess: (state, action) => {
            return {
                ...state,
                customer_detail: action.payload,
                loading: false,
                error: null,
            }
        },
        setLoadingCustomer: (state, action) => {
            return {
                ...state,
                loading: action.payload
            }
        }

    }
})

export const { customersRequest, customersSuccess, requestFailure, customerDetailRequest, customerDetailSuccess, updateCustomerRequest, updateCustomerSuccess, setLoadingCustomer } = authSlice.actions
export default authSlice.reducer