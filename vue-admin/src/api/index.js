import request from '../utils/request';
import store from '../store/index'

export const advisoryData = query => {
    return request({
        url: './base/oad/all',
        method: 'get',
        params: query
    });
};

export const userData = query => {
    return request({
        url: './base/ou/all',
        method: 'get',
        params: query
    });
};

export const userUpdate = query => {
    return request({
        url: './base/ou/up',
        method: 'put',
        params: {
            access_token: store.state.token
        },
        data: JSON.stringify(query),
    });
};

export const accompanyData = query => {
    return request({
        url: './base/oac/all',
        method: 'get',
        params: query
    });
};

export const calloutData = query => {
    return request({
        url: './base/oca/all',
        method: 'get',
        params: query
    });
};
export const expertData = query => {
    return request({
        url: './base/oe/all',
        method: 'get',
        params: query
    });
};

export const familyData = query => {
    return request({
        url: './base/of/all',
        method: 'get',
        params: query
    });
};

export const hospitalData = query => {
    return request({
        url: './base/oh/all',
        method: 'get',
        params: query
    });
};
export const registerData = query => {
    return request({
        url: './base/ore/all',
        method: 'get',
        params: query
    });
};
export const staffData = query => {
    return request({
        url: './base/os/all',
        method: 'get',
        params: query
    });
};

export const login = query => {
    return request({
        url: '/auth/o/pass',
        method: 'get',
        params: query
    });
};
