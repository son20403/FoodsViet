import axios from "../../axios-interceptor/api";
const COLLECTION_NAME = 'customer'
export function getDetailCustomer(slug) {
    return axios.get(`/${COLLECTION_NAME}/detail?slug=${slug}`)
}
export function getAllCustomers() {
    return axios.get(`/${COLLECTION_NAME}/getAll`)
}
export function updateCustomer(entity) {
    return axios.put(`/${COLLECTION_NAME}/updateCustomer`, entity, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

// headers: {
//     "Content-Type": "multipart/form-data",
//     token: `Bearer ${token}`,
// },