import authSagas from "./auth/authSagas";
import postsSagas from "./posts/postsSagas";
import { all, fork } from "redux-saga/effects";
import commetsSagas from "./comments/commentsSagas";
import customersSagas from "./customers/customersSagas";
import categoriesSagas from "./categories/categoriesSagas";


export default function* rootSaga() {
    yield all([
        fork(authSagas),
        fork(postsSagas),
        fork(commetsSagas),
        fork(customersSagas),
        fork(categoriesSagas),
    ])
}