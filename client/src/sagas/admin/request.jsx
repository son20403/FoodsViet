import axios from "../../axios-interceptor/admin";
const COLLECTION_NAME = "admin";
export function loginAdmin(entity) {
  return axios.post(`/${COLLECTION_NAME}/login`, entity);
}
export function registerAdmin(entity) {
  return axios.post(`/${COLLECTION_NAME}/register`, entity);
}
export function logoutAdmin(id) {
  return axios.post(`/${COLLECTION_NAME}/logoutAdmin?id=${id}`);
}
export function getAllPostAdmin() {
  return axios.get(`/${COLLECTION_NAME}/getAllPostByAdmin`);
}
export function getListAdmin() {
  return axios.get(`/${COLLECTION_NAME}/getListAdmin`);
}
export function getSearchAdmin(model, key) {
  return axios.get(`/${COLLECTION_NAME}/searchAdmin?model=${model}&key=${key}`);
}
export function updateStatus(id, model, entity) {
  return axios.put(
    `/${COLLECTION_NAME}/updateStatus?id=${id}&model=${model}`,
    entity
  );
}
export function updateRole(id, entity) {
  return axios.put(`/${COLLECTION_NAME}/updateRoleAdmin?id=${id}`, entity);
}
export function updatePostAdmin(id, entity) {
  return axios.put(`/${COLLECTION_NAME}/updatePost?id=${id}`, entity, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
export function getRole() {
  return axios.get(`/${COLLECTION_NAME}/getRole`);
}
export function updateCustomerAdmin(id, entity) {
  return axios.put(`/${COLLECTION_NAME}/updateCustomer?id=${id}`, entity, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
export function updateAdmin(id, entity) {
  return axios.put(`/${COLLECTION_NAME}/updateAdmin?id=${id}`, entity, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function createPostAdmin(entity) {
  return axios.post(`/${COLLECTION_NAME}/createPost`, entity, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
export function createCustomerAdmin(entity) {
  return axios.post(`/${COLLECTION_NAME}/createCustomer`, entity, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
export function createAdmin(entity) {
  return axios.post(`/${COLLECTION_NAME}/createAdmin`, entity, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
// headers: {
//     "Content-Type": "multipart/form-data",
//     token: `Bearer ${token}`,
// },
