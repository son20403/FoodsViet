import { call, put } from "redux-saga/effects";
import { createComments, deleteComment, getAllComments, getAllCommentsByPost, updateComments } from "./request";
import { commentsRequest, createCommentsSuccess, deleteCommentSuccess, getCommentsSuccess, getcommentsByPostRequest, getcommentsByPostSuccess, requestFailure, updateCommentSuccess } from "./commentsSlice";
import { setErrorGlobal, setNotifyGlobal } from "../global/globalSlice";

export function* handleGetAllComments({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(getAllComments, payload);
        if (response) {
            yield put(getCommentsSuccess(response.data))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}

export function* handleGetAllCommentsByPost({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(getAllCommentsByPost, payload?.id_post);
        if (response) {
            yield put(getcommentsByPostSuccess(response.data?.reverse()))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleCreateComments({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(createComments, payload?.comment);
        if (response) {
            yield put(createCommentsSuccess(response.data.message))
            yield put(getcommentsByPostRequest({ id_post: payload?.id_post }))
            yield put(commentsRequest())
            yield put(setNotifyGlobal(response.data?.message))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}

export function* handleUpdateComment({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(updateComments, payload?.id, payload?.comment);
        if (response) {
            yield put(updateCommentSuccess())
            yield put(getcommentsByPostRequest({ id_post: payload?.id_post }))
            yield put(commentsRequest())
            yield put(setNotifyGlobal(response.data?.message))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleDeleteComment({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(deleteComment, payload?.id);
        if (response) {
            yield put(deleteCommentSuccess())
            yield put(commentsRequest())
            yield put(getcommentsByPostRequest({ id_post: payload?.id_post }))
            yield put(setNotifyGlobal(response.data?.message))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}

function* handleCommonError(error) {
    console.log("error comment:", error)
    if (error?.code === 'ERR_NETWORK') {
        yield put(requestFailure(error));
        yield put(setErrorGlobal(error?.message));
    } else {
        yield put(setNotifyGlobal(''))
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