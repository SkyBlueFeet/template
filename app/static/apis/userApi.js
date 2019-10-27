import axios from './axios';


export default {
    queryUser: data => {
        return axios({
            url: '/auth/selectUser',
            method: 'post',
            data
        });
    },

    createUser: data => {
        return axios({
            url: '/auth/createUser',
            method: 'post',
            data
        });
    },

    editUser: data => {
        return axios({
            url: '/auth/editUser',
            method: 'post',
            data
        });
    },

    deleteUser: data => {
        return axios({
            url: '/auth/deleteUser',
            method: 'post',
            data
        });
    },

    login: data => {
        return axios({
            url: '/app/loginValidate',
            method: 'post',
            data
        });
    },

    token: data => {
        return axios({
            url: '/token',
            method: 'get',
            data
        });
    }
};