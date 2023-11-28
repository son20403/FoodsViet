import axios from "../../axios-interceptor/api";
import admin from "../../axios-interceptor/admin";
const COLLECTION_NAME = "send";
export function getAllFeedBack() {
  return admin.get(`/${COLLECTION_NAME}/getAll`);
}
export function createFeedBack(entity) {
  return axios.post(`/${COLLECTION_NAME}/addFeedBack`, entity);
}
export function sendPassword(entity) {
  return axios.post(`/${COLLECTION_NAME}/forgot-password`, entity);
}
export function resetPassword(token, entity) {
  return axios.post(
    `/${COLLECTION_NAME}/reset-password?token=${token}`,
    entity
  );
}
export function sendEmail(entity) {
  return axios.post(`/${COLLECTION_NAME}/`, entity);
}
