import axios from "../../axios-interceptor/api";
const COLLECTION_NAME = 'auth'
export function loginAuth(entity) {
    return axios.post(`/${COLLECTION_NAME}/login`, entity)
}
export function registerAuth(entity) {
    return axios.post(`/${COLLECTION_NAME}/register`, entity)
}
export function logoutAuth() {
    return axios.post(`/${COLLECTION_NAME}/logout`,)
}
// headers: {
//     "Content-Type": "multipart/form-data",
//     token: `Bearer ${token}`,
// },