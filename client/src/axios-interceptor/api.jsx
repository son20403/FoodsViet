// api.js
import axios from 'axios';
import BASE_URL from '../connect';
import store from '../sagas/configureStore';
import { logout, refreshAccessTokenSuccess } from '../sagas/auth/authSlice';
import { setErrorGlobal } from '../sagas/global/globalSlice';
import { getObjectFromLocalStorage } from '../utils/localstorage';

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use(config => {
    config.withCredentials = true;
    config.headers['token'] = `Bearer ${getObjectFromLocalStorage('authToken')}`
    return config;
}, error => {
    console.log("🚀 ~ file: api.jsx:18 ~ error:", error)
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    const newAccessToken = response.headers['new-token'];
    if (newAccessToken) {
        api.defaults.headers['Authentication'] = `Bearer ${newAccessToken}`;  // Cập nhật headers
        store.dispatch(refreshAccessTokenSuccess(newAccessToken));
    }
    return response;
}, (error) => {
    if (error.response && error.response.data.status === 'notAuth') {
        store.dispatch(logout());
        store.dispatch(setErrorGlobal('Phiên bản đăng nhập đã hết hạn!'))
    }
    return Promise.reject(error);
});

export default api;