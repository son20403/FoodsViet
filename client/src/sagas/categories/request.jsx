import axios from "../../axios-interceptor/api";
const COLLECTION_NAME = 'category'
export function getAllCaterories() {
    return axios.get(`/${COLLECTION_NAME}/getAllCategories`)
}
export function createCaterories(entity) {
    return axios.post(`/${COLLECTION_NAME}/createCategory`, entity, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}
export function getAllAdminCaterories() {
    return axios.get(`/${COLLECTION_NAME}/getAllCategoriesAdmin`)
}
// "Content-Type": "multipart/form-data",
