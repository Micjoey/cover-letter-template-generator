import axios from 'axios'

import { authCheckState, logout} from './actions/Auth';

const axiosInstance = axios.create({
    baseURL: '',
    timeout: 3000,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    },

});

axios.interceptors.response.use(response => 
    {
        return response;
    }, error => {
        const originalRequest = error.config;
        if (error !== undefined && error.response.status === 401 && error.response.statusText === "Unauthorized") {
            const refresh_token = localStorage.getItem('refresh_token');
            const access_token = localStorage.getItem('access_token');
            return axiosInstance
                .post('/api/token/refresh/', { refresh: refresh_token, access_token: access_token })
                .then(response => {
                    localStorage.setItem('access_token', response.data.access);
                    axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                    originalRequest.headers['Authorization'] = "Bearer " + response.data.access;
                    return axiosInstance(originalRequest);
                })
                .catch(err => {
                    if (err.response.data.code === "token_not_valid") {
                        logout()
                    }
                    authCheckState()
                });
        }
        authCheckState()
        return Promise.reject(error);
    }, () => {
        authCheckState()
    }
    
);


export default axiosInstance
