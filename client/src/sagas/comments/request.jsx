import axios from "../../axios-interceptor/api";
const COLLECTION_NAME = 'comment'
export function getAllComments() {
    return axios.get(`/${COLLECTION_NAME}/get_all_comments`)
}
export function postComments(entity) {
    return axios.post(`/${COLLECTION_NAME}/create`, entity)
}
export function updateComments(id, entity) {
    return axios.put(`/${COLLECTION_NAME}/updateComment?id=${id}`, entity)
}
export function deleteComment(id) {
    return axios.delete(`/${COLLECTION_NAME}/deleteComment?id=${id}`)
}
// "Content-Type": "multipart/form-data",
