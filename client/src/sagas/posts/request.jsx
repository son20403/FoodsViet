import axios from "../../axios-interceptor/api";
const COLLECTION_NAME = 'post'
export function getAllPost() {
    return axios.get(`/${COLLECTION_NAME}/getAll`)
}
export function getDetailPost(slug) {
    return axios.get(`/${COLLECTION_NAME}/detail?slug=${slug}`)
}
export function createPost(entity) {
    return axios.post(`/${COLLECTION_NAME}/create`, entity, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}
export function getSearchPost(query) {
    return axios.get(`/${COLLECTION_NAME}/search?key=${query}`)
}
export function likePost(id) {
    return axios.put(`/${COLLECTION_NAME}/like?id=${id}`, {})
}
export function updatePost(id, entity) {
    return axios.put(`/${COLLECTION_NAME}/updatePost?id=${id}`, entity, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
}
export function uploadImage(entity, config) {
    return axios.post(`/${COLLECTION_NAME}/uploadImage`, entity, {
        ...config,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}
// "Content-Type": "multipart/form-data",
