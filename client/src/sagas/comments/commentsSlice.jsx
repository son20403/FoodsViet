import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments: [],
    loading: false,
    error: null,
    notify: '',
}

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        commentsRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        postCommentsRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        getCommentsSuccess: (state, action) => {
            return {
                ...state,
                comments: action.payload,
                loading: false,
                error: null,
            }
        },
        postCommentsSuccess: (state, action) => {
            return {
                ...state,
                notify: action.payload,
                loading: false,
                error: null,
            }
        },
        updateCommentRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        updateCommentSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: null,
            }
        },
        deleteCommentRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        deleteCommentSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: null,
            }
        },
        setNotify: (state) => {
            return {
                ...state,
                notify: '',
            }
        },
        requestFailure: (state, action) => {
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        },
    }
})

export const { getCommentsSuccess, commentsRequest, requestFailure, postCommentsRequest, postCommentsSuccess, setNotify, updateCommentRequest, updateCommentSuccess, deleteCommentRequest, deleteCommentSuccess } = commentsSlice.actions
export default commentsSlice.reducer