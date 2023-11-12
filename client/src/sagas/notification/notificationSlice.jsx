import { createSlice } from "@reduxjs/toolkit";
import { getObjectFromLocalStorage, removeObjectFromLocalStorage, saveObjectToLocalStorage } from "../../utils/localstorage";

const initialState = {
    notifications: {},
    loading: false,
    error: ''
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        getNotificationByCustomerRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: ''
            }
        },
        getNotificationByCustomerSuccess: (state, action) => {
            return {
                ...state,
                notifications: action.payload,
                loading: false,
                error: '',
            }
        },
        getAllNotificationRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: ''
            }
        },
        getAllNotificationSuccess: (state, action) => {
            return {
                ...state,
                notifications: action.payload,
                loading: false,
                error: '',
            }
        },
        deleteNotificationRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: ''
            }
        },
        deleteNotificationSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: '',
            }
        },
        deleteAllNotificationRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: ''
            }
        },
        deleteAllNotificationSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: '',
            }
        },
        addNotificationRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: ''
            }
        },
        addNotificationSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: '',
            }
        },
        updateNotificationRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: ''
            }
        },
        updateNotificationSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: '',
            }
        },
        updateAllNotificationRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: ''
            }
        },
        updateAllNotificationSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: '',
            }
        },
        requestFailure: (state, action) => {
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        },
        setNotification: (state) => {
            return {
                ...state,
                notifications: {}
            }
        }
    }
})

export const { addNotificationRequest, addNotificationSuccess, deleteNotificationRequest, deleteNotificationSuccess, getAllNotificationRequest, getAllNotificationSuccess, getNotificationByCustomerRequest, getNotificationByCustomerSuccess, requestFailure, updateAllNotificationRequest, updateAllNotificationSuccess, updateNotificationRequest, updateNotificationSuccess, setNotification, deleteAllNotificationRequest, deleteAllNotificationSuccess } = notificationSlice.actions
export default notificationSlice.reducer