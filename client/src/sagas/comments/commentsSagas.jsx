import { takeLatest } from "redux-saga/effects";
import { handleCreateComments, handleDeleteComment, handleGetAllComments, handleGetAllCommentsByPost, handleUpdateComment } from "./handles";
import { commentsRequest, createCommentsRequest, deleteCommentRequest, getcommentsByPostRequest, updateCommentRequest } from "./commentsSlice";

export default function* commetsSagas() {
    yield takeLatest(commentsRequest.type, handleGetAllComments)
    yield takeLatest(createCommentsRequest.type, handleCreateComments)
    yield takeLatest(updateCommentRequest.type, handleUpdateComment)
    yield takeLatest(deleteCommentRequest.type, handleDeleteComment)
    yield takeLatest(getcommentsByPostRequest.type, handleGetAllCommentsByPost)
}