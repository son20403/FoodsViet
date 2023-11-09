import axios from "../../axios-interceptor/api";
const COLLECTION_NAME = 'notification'
export function addNotification(entity) {
    return axios.post(`/${COLLECTION_NAME}/addNotification`, entity)
}
export function getAllNotification() {
    return axios.get(`/${COLLECTION_NAME}/getAllNotification`,)
}
export function getNotificationByCustomer() {
    return axios.get(`/${COLLECTION_NAME}/getNotificationByCustomer`,)
}
export function deleteNotificationByCustomer(id) {
    return axios.delete(`/${COLLECTION_NAME}/deleteNotificationByCustomer?id=${id}`,)
}
export function updateAllNotificationByCustomer() {
    return axios.put(`/${COLLECTION_NAME}/updateAllNotificationByCustomer`, {})
}
export function updateNotificationByCustomer(id) {
    return axios.put(`/${COLLECTION_NAME}/updateNotificationByCustomer?id=${id}`,)
}
// headers: {
//     "Content-Type": "multipart/form-data",
//     token: `Bearer ${token}`,
// },