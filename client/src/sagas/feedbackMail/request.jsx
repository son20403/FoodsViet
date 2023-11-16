import axios from "../../axios-interceptor/api";
const COLLECTION_NAME = "send";
export function getAllFeedBack() {
  return axios.get(`/${COLLECTION_NAME}/getAll`);
}
export function createFeedBack(entity) {
  return axios.post(`/${COLLECTION_NAME}/addFeedBack`, entity);
}
export function sendEmail(entity) {
  console.log("🚀 ~ file: request.jsx:10 ~ sendEmail ~ entity:", entity);
  return axios.post(`/${COLLECTION_NAME}/`, entity);
}
