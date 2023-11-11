import authSagas from "./auth/authSagas";
import postsSagas from "./posts/postsSagas";
import { all, fork } from "redux-saga/effects";
import commetsSagas from "./comments/commentsSagas";
import customersSagas from "./customers/customersSagas";
import categoriesSagas from "./categories/categoriesSagas";
import adminSagas from "./admin/adminSagas";
import notificationSagas from "./notification/notificationSagas";


export default function* rootSaga() {
    yield all([
        fork(authSagas),
        fork(postsSagas),
        fork(commetsSagas),
        fork(customersSagas),
        fork(categoriesSagas),
        fork(adminSagas),
        fork(notificationSagas)
    ])
}