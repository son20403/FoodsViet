import axios from "../../axios-interceptor/api";
const COLLECTION_NAME = 'category'
export function getAllCaterories() {
    return axios.get(`/${COLLECTION_NAME}/get_all_categories`)
}
// "Content-Type": "multipart/form-data",
