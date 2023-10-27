import { call, put } from "redux-saga/effects";
import { createPost, getAllPost, getDetailPost, getSearchPost, likePost, updatePost, uploadImage } from "./request";
import { createPostsSuccess, getDetailPostSuccess, getPostsSuccess, getSearchPostsSuccess, likePostSuccess, postDetailRequest, postsRequest, requestFailure, setLoadingPost, updatePostSuccess } from "./postsSlice";
import { setErrorGlobal, setNotifyGlobal } from "../global/globalSlice";

export function* handleGetAllPosts({ payload }) {
    yield put(setLoadingPost(true))
    try {
        const response = yield call(getAllPost, payload);
        if (response?.data) {
            yield put(getPostsSuccess(response.data?.reverse()))
        } else {
            yield put(getPostsSuccess([]))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
    yield put(setLoadingPost(false))

}
export function* handleGetDetailPosts({ payload }) {
    yield put(setLoadingPost(true))

    try {
        const response = yield call(getDetailPost, payload?.slug);
        if (response?.data) {
            yield put(getDetailPostSuccess(response.data))
        } else {
            yield put(getDetailPostSuccess({}))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
    yield put(setLoadingPost(false))

}
export function* handleGetSearchPosts({ payload }) {
    yield put(setLoadingPost(true))
    try {
        const response = yield call(getSearchPost, payload?.query);
        if (response?.data) {
            yield put(getSearchPostsSuccess(response.data))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
    yield put(setLoadingPost(false))
}
export function* handleCreatePosts({ payload }) {
    yield put(setLoadingPost(true))
    try {
        const response = yield call(createPost, payload?.post);
        if (response?.data) {
            yield put(createPostsSuccess())
        }
        yield put(setNotifyGlobal(response?.data?.message));
    } catch (error) {
        yield handleCommonError(error)
    }
    yield put(setLoadingPost(false))
}
export function* handleLikePost({ payload }) {
    console.log('')
    try {
        const response = yield call(likePost, payload?.id);
        if (response?.data) {
            yield put(likePostSuccess())
            yield put(setNotifyGlobal(response.data?.message));
            yield put(postDetailRequest({ slug: payload?.slug }));
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleUploadImage({ payload }) {
    try {
        const response = yield call(uploadImage, payload?.image);
        if (response?.data) {
            yield put(setNotifyGlobal(response.data?.message));
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleUpdatePost({ payload }) {
    yield put(setLoadingPost(true))
    try {
        const response = yield call(updatePost, payload?.id, payload?.post);
        if (response?.data) {
            yield put(updatePostSuccess());
            yield put(postDetailRequest({ slug: payload?.slug }));
            yield put(setNotifyGlobal(response.data?.message));
        }
    } catch (error) {
        yield handleCommonError(error)
    }
    yield put(setLoadingPost(false))
}
function* handleCommonError(error) {
    console.log("error post:", error)
    if (error?.code === 'ERR_NETWORK') {
        yield put(requestFailure(error));
        yield put(setErrorGlobal(error?.message));
    } else {
        yield put(requestFailure(error?.response?.data));
        yield put(setErrorGlobal(error?.response?.data?.message));
    }
}

// export function* registerCustomer({ payload }) {
//     try {
//         const response = yield call(registerAuth, payload);
//         if (response) {
//             yield put(registerSuccess())
//             toast.success(response.data?.message)
//         }

//     } catch (error) {
//         yield put(requestFailure(error.response.data.message));
//     }
// }