import { takeLatest } from "redux-saga/effects";
import { handleGetAllCategories } from "./handles";
import { categoriesRequest } from "./categoriesSlice";

export default function* categoriesSagas() {
    yield takeLatest(categoriesRequest.type, handleGetAllCategories)
}