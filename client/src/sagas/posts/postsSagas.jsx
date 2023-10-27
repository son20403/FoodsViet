import { takeLatest } from "redux-saga/effects";
import { handleCreatePosts, handleGetAllPosts, handleGetDetailPosts, handleGetSearchPosts, handleLikePost, handleUpdatePost, handleUploadImage } from "./handles";
import { createPostsRequest, likePostRequest, postDetailRequest, postsRequest, searchPostsRequest, updatePostRequest, uploadImageRequest } from "./postsSlice";

export default function* postsSagas() {
    yield takeLatest(postsRequest.type, handleGetAllPosts)
    yield takeLatest(likePostRequest.type, handleLikePost)
    yield takeLatest(postDetailRequest.type, handleGetDetailPosts)
    yield takeLatest(searchPostsRequest.type, handleGetSearchPosts)
    yield takeLatest(uploadImageRequest.type, handleUploadImage)
    yield takeLatest(createPostsRequest.type, handleCreatePosts)
    yield takeLatest(updatePostRequest.type, handleUpdatePost)
}