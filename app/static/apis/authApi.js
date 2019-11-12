import axios from './axios';


export default {

    queryAuth: data => {
        return axios({
            url: '/auth/selectAuth',
            method: 'post',
            data
        });
    },

    createAuth: data => {
        return axios({
            url: '/auth/createAuth',
            method: 'post',
            data
        });
    },

    editAuth: data => {
        return axios({
            url: '/auth/editAuth',
            method: 'post',
            data
        });
    },

    deleteAuth: data => {
        return axios({
            url: '/auth/deleteAuth',
            method: 'post',
            data
        });
    },

    assignAuth: data => {
        return axios({
            url: '/auth/assignAuth',
            method: 'post',
            data
        });
    }
};