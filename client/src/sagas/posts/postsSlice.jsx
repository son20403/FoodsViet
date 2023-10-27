import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    search_posts: [],
    detail_post: {},
    loading: false,
    error: null,
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postsRequest: (state) => {
            return {
                ...state,
                loading: true,
            }
        },
        getPostsSuccess: (state, action) => {
            return {
                ...state,
                posts: action.payload,
                error: null,
                loading: false
            }
        },
        createPostsRequest: (state) => {
            return {
                ...state,
                loading: true,
            }
        },
        createPostsSuccess: (state) => {
            return {
                ...state,
                error: null,
                loading: false
            }
        },
        uploadImageRequest: (state) => {
            return {
                ...state,
                loading: true
            }
        },
        // uploadImageSuccess: (state) => {
        //     return {
        //         ...state,
        //         error: null,
        //     }
        // },
        searchPostsRequest: (state) => {
            return {
                ...state,
                loading: true
            }
        },
        getSearchPostsSuccess: (state, action) => {
            return {
                ...state,
                search_posts: action.payload,
                error: null,
                loading: false
            }
        },
        postDetailRequest: (state) => {
            return {
                ...state,
                error: null,
                loading: true
            }
        },
        getDetailPostSuccess: (state, action) => {
            return {
                ...state,
                detail_post: action.payload,
                error: null,
                loading: false
            }
        },
        likePostRequest: (state) => {
            return {
                ...state,
                error: null,
                loading: true
            }
        },
        likePostSuccess: (state) => {
            return {
                ...state,
                error: null,
                loading: false
            }
        },
        updatePostRequest: (state) => {
            return {
                ...state,
                error: null,
                loading: true
            }
        },
        updatePostSuccess: (state) => {
            return {
                ...state,
                error: null,
                loading: false
            }
        },
        requestFailure: (state, action) => {
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        },
        setLoadingPost: (state, action) => {
            return {
                ...state,
                loading: action.payload
            }
        }
    }
})

export const { getPostsSuccess, postsRequest, requestFailure, likePostRequest, likePostSuccess, setLoadingPost, getDetailPostSuccess, postDetailRequest, getSearchPostsSuccess, searchPostsRequest, uploadImageRequest, createPostsRequest, createPostsSuccess, updatePostRequest, updatePostSuccess } = postsSlice.actions
export default postsSlice.reducer