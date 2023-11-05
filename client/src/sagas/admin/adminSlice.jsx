import { createSlice } from "@reduxjs/toolkit";
import { getObjectFromLocalStorage, removeObjectFromLocalStorage, saveObjectToLocalStorage } from "../../utils/localstorage";

const initialState = {
    tokenAdmin: getObjectFromLocalStorage('adminToken') || null,
    infoAdmin: getObjectFromLocalStorage('infoAdmin') || null,
    isAuthenticatedAdmin: !!localStorage.getItem('adminToken'),
    admin: [],
    adminDetail: {},
    customers: [],
    customerDetail: {},
    categories: [],
    categoryDetail: {},
    comments: [],
    posts: [],
    postDetail: {},
    staffs: [],
    staffDetail: {},
    loading: false,
    error: null,
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        //login
        loginAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        loginAdminSuccess: (state, action) => {
            saveObjectToLocalStorage('adminToken', action.payload)
            return {
                ...state,
                tokenAdmin: action.payload,
                isAuthenticatedAdmin: true,
                loading: false,
                error: null,
            }
        },
        //logout
        logoutAdmin: (state) => {
            removeObjectFromLocalStorage('adminToken');
            removeObjectFromLocalStorage('infoAdmin');
            return {
                ...state,
                isAuthenticatedAdmin: false,
                tokenAdmin: null,
                infoAdmin: null
            }
        },
        //register
        registerAdminRequest: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        registerAdminSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: null,
            }
        },
        //req false
        requestAdminFailure: (state, action) => {
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        },
        //update status
        updateStatusRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        updateStatusSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: null,
            }
        },
        //refresh token
        refreshAccessTokenAdminRequest: (state) => {
            return {
                ...state,
                loading: true
            }
        },
        refreshAccessTokenAdminSuccess: (state, action) => {
            saveObjectToLocalStorage('adminToken', action.payload)
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true,
                loading: false,
                error: null,
            }
        },
        //setInfo
        setInfoAdmin: (state, action) => {
            saveObjectToLocalStorage('infoAdmin', action.payload)
            return {
                ...state,
                infoAdmin: action.payload
            }
        },
        //category
        getCategoriesAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        getCategoriesAdminSuccess: (state, action) => {
            return {
                ...state,
                categories: action.payload,
                loading: false,
                error: null,
            }
        },
        addCategoriesAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        addCategoriesAdminSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: null,
            }
        },
        updateCategoriesAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        updateCategoriesAdminSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: null,
            }
        },
        deteteCategoriesAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        deteteCategoriesAdminSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: null,
            }
        },
        //comment
        getCommentsAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        getCommentsAdminSuccess: (state, action) => {
            return {
                ...state,
                comments: action.payload,
                loading: false,
                error: null,
            }
        },
        deleteCommentAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        deleteCommentAdminSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: null,
            }
        },
        //customer
        getCustomersAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        getCustomersAdminSuccess: (state, action) => {
            return {
                ...state,
                customers: action.payload,
                loading: false,
                error: null,
            }
        },
        addCustomerAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        addCustomerAdminSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: null,
            }
        },
        updateCustomerAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        updateCustomerAdminSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                error: null,
            }
        },
        customerDetailAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        customerDetailAdminSuccess: (state, action) => {
            return {
                ...state,
                customerDetail: action.payload,
                loading: false,
                error: null,
            }
        },
        deteteCustomerAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        deteteCustomerAdminSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: null,
            }
        },
        //post
        getPostsAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        getPostsAdminSuccess: (state, action) => {
            return {
                ...state,
                posts: action.payload,
                loading: false,
                error: null,
            }
        },
        addPostAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        addPostAdminSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: null,
            }
        },
        updatePostAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        updatePostAdminSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: null,
            }
        },
        detetePostAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        detetePostAdminSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: null,
            }
        },
        postDetailAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        postDetailAdminSuccess: (state, action) => {
            return {
                ...state,
                postDetail: action.payload,
                loading: false,
                error: null,
            }
        },
        //Admin
        getAllAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        getAllAdminSuccess: (state, action) => {
            return {
                ...state,
                admin: action.payload,
                loading: false,
                error: null,
            }
        },
        addAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        addAdminSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: null,
            }
        },
        updateAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        updateAdminSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: null,
            }
        },
        deteteAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        deteteAdminSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: null,
            }
        },
        detailAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        detailAdminSuccess: (state, action) => {
            return {
                ...state,
                adminDetail: action.payload,
                loading: false,
                error: null,
            }
        },
    }
})

export const { loginAdminRequest, addCategoriesAdminRequest, addCategoriesAdminSuccess, addPostAdminRequest, addPostAdminSuccess, customerDetailAdminRequest, customerDetailAdminSuccess, deleteCommentAdminRequest, deleteCommentAdminSuccess, deteteCategoriesAdminRequest, deteteCategoriesAdminSuccess, deteteCustomerAdminRequest, deteteCustomerAdminSuccess, detetePostAdminRequest, detetePostAdminSuccess, getCategoriesAdminRequest, getCategoriesAdminSuccess, getCommentsAdminRequest, getCommentsAdminSuccess, getCustomersAdminRequest, getCustomersAdminSuccess, loginAdminSuccess, logoutAdmin, postDetailAdminRequest, postDetailAdminSuccess, refreshAccessTokenAdminRequest, refreshAccessTokenAdminSuccess, registerAdminRequest, registerAdminSuccess, requestAdminFailure, setInfoAdmin, updateCategoriesAdminRequest, updateCategoriesAdminSuccess, updateCustomerAdminRequest, updateCustomerAdminSuccess, updatePostAdminRequest, updatePostAdminSuccess, addCustomerAdminRequest, addCustomerAdminSuccess, getPostsAdminRequest, getPostsAdminSuccess, updateStatusRequest, updateStatusSuccess, addAdminRequest, addAdminSuccess, detailAdminRequest, detailAdminSuccess, deteteAdminRequest, deteteAdminSuccess, getAllAdminRequest, getAllAdminSuccess, updateAdminRequest, updateAdminSuccess } = adminSlice.actions
export default adminSlice.reducer