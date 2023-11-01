// api.js
import axios from 'axios';
import BASE_URL from '../connect';
import store from '../sagas/configureStore';
import { setErrorGlobal } from '../sagas/global/globalSlice';
import { getObjectFromLocalStorage } from '../utils/localstorage';
import { logoutAdmin, refreshAccessTokenAdminSuccess } from '../sagas/admin/adminSlice';

const admin = axios.create({
    baseURL: BASE_URL,
});

admin.interceptors.request.use(config => {
    config.withCredentials = true;
    config.headers['token'] = `Bearer ${getObjectFromLocalStorage('adminToken')}`
    config.headers['userType'] = 'admin';
    return config;
}, error => {
    console.log("🚀 ~ file: admin.jsx:18 ~ error:", error)
    return Promise.reject(error);
});

admin.interceptors.response.use((response) => {
    const newAccessToken = response.headers['new-token'];
    if (newAccessToken) {
        admin.defaults.headers['token'] = `Bearer ${newAccessToken}`;  // Cập nhật headers
        store.dispatch(refreshAccessTokenAdminSuccess(newAccessToken));
    }
    return response;
}, (error) => {
    if (error.response && error.response.data.status === 'notAuth') {
        store.dispatch(logoutAdmin());
        store.dispatch(setErrorGlobal('Phiên bản đăng nhập đã hết hạn!'))
    }
    return Promise.reject(error);
});

export default admin;