import axios from "../../axios-interceptor/admin";
const COLLECTION_NAME = 'admin'
export function loginAdmin(entity) {
    return axios.post(`/${COLLECTION_NAME}/login`, entity)
}
export function registerAdmin(entity) {
    return axios.post(`/${COLLECTION_NAME}/register`, entity)
}
export function logoutAdmin() {
    return axios.post(`/${COLLECTION_NAME}/logout`,)
}
export function getAllPostAdmin() {
    return axios.get(`/${COLLECTION_NAME}/getAllPostByAdmin`,)
}
export function updateStatus(id, model, entity) {
    return axios.put(`/${COLLECTION_NAME}/updateStatus?id=${id}&model=${model}`,
        entity
    );
}
export function updatePostAdmin(id, entity) {
    return axios.put(`/${COLLECTION_NAME}/updatePost?id=${id}`, entity, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
}
// headers: {
//     "Content-Type": "multipart/form-data",
//     token: `Bearer ${token}`,
// },