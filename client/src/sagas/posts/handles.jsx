import { call, put } from "redux-saga/effects";
import { createPost, getAllPost, getAllPostsByCategory, getAllPostsByCustomer, getDetailPost, getSearchPost, likePost, updatePost } from "./request";
import { createPostsSuccess, getDetailPostSuccess, getPostsByCategorySuccess, getPostsByCustomerSuccess, getPostsSuccess, getSearchPostsSuccess, likePostSuccess, postDetailRequest, requestFailure, updatePostSuccess } from "./postsSlice";
import { setErrorGlobal, setNotifyGlobal } from "../global/globalSlice";
import { addNotificationRequest } from "../notification/notificationSlice";

export function* handleGetAllPosts({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(getAllPost, payload);
        if (response?.data) {
            yield put(getPostsSuccess(response.data?.reverse()))
        } else {
            yield put(getPostsSuccess([]))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleGetAllPostsByCategory({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(getAllPostsByCategory, payload?.id_category);
        if (response?.data) {
            yield put(getPostsByCategorySuccess(response.data?.reverse()))
        } else {
            yield put(getPostsByCategorySuccess([]))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleGetAllPostsByCustomer({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(getAllPostsByCustomer, payload?.id_customer);
        if (response?.data) {
            yield put(getPostsByCustomerSuccess(response.data?.reverse()))
        } else {
            yield put(getPostsByCustomerSuccess([]))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleGetDetailPosts({ payload }) {

    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(getDetailPost, payload?.slug);
        if (response?.data) {
            yield put(getDetailPostSuccess(response.data))
        } else {
            yield put(getDetailPostSuccess({}))
        }
    } catch (error) {
        yield handleCommonError(error)
    }


}
export function* handleGetSearchPosts({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(getSearchPost, payload?.query);
        if (response?.data) {
            yield put(getSearchPostsSuccess(response.data))
        }
    } catch (error) {
        yield handleCommonError(error)
    }

}
export function* handleCreatePosts({ payload }) {
    const { post, reset, handleSendNotification } = payload
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(createPost, post);
        if (response?.data) {
            console.log("🚀 ~ file: handles.jsx:86 ~ function*handleCreatePosts ~ response?.data:", response?.data)
            yield put(createPostsSuccess())
            yield put(addNotificationRequest({
                id_post: response.data?.id, id_customer: 'admin',
                typeNotity: 'createPost'
            }))
            yield put(setNotifyGlobal(response?.data?.message));
            yield handleSendNotification()
            yield reset()
        }
    } catch (error) {
        yield handleCommonError(error)
    }

}
export function* handleLikePost({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(likePost, payload?.id);
        if (response?.data) {
            yield put(likePostSuccess())
            yield put(postDetailRequest({ slug: payload?.slug }));
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleUpdatePost({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(updatePost, payload?.id, payload?.post);
        if (response?.data) {
            const { slug } = response.data
            yield put(updatePostSuccess());
            yield put(postDetailRequest({ slug: slug }));
            yield put(setNotifyGlobal(response.data?.message));
            yield payload?.handleSetURL(slug)
        }
    } catch (error) {
        yield handleCommonError(error)
    }

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