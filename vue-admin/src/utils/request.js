import axios from 'axios';

const service = axios.create({
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': 'authorization, content-type, Cookie',
        'Content-Type': 'multipart/form-data'
    },
    timeout: 5000,
    baseURL: "/api",
    withCredentials: true,

});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default service;
