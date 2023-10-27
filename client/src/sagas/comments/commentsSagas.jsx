import { takeLatest } from "redux-saga/effects";
import { handleDeleteComment, handleGetAllComments, handlePostComments, handleUpdateComment } from "./handles";
import { commentsRequest, deleteCommentRequest, postCommentsRequest, updateCommentRequest } from "./commentsSlice";

export default function* commetsSagas() {
    yield takeLatest(commentsRequest.type, handleGetAllComments)
    yield takeLatest(postCommentsRequest.type, handlePostComments)
    yield takeLatest(updateCommentRequest.type, handleUpdateComment)
    yield takeLatest(deleteCommentRequest.type, handleDeleteComment)
}