import axios from "../../axios-interceptor/api";
import admin from "../../axios-interceptor/admin";
const COLLECTION_NAME = 'customer'
export function getDetailCustomer(slug) {
    return axios.get(`/${COLLECTION_NAME}/detailBySlug?slug=${slug}`)
}
export function getAllCustomers() {
    return axios.get(`/${COLLECTION_NAME}/getAll`)
}
export function getAllCustomersByAdmin() {
    return admin.get(`/${COLLECTION_NAME}/getAllByAdmin`)
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