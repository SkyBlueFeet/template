import axios from './axios';

export default {

    queryModule: data => {
        return axios({
            url: '/auth/selectModule',
            method: 'post',
            data
        });
    },

    createModule: data => {
        return axios({
            url: '/auth/createModule',
            method: 'post',
            data
        });
    },

    editModule: data => {
        return axios({
            url: '/auth/editModule',
            method: 'post',
            data
        });
    },

    deleteModule: data => {
        return axios({
            url: '/auth/deleteModule',
            method: 'post',
            data
        });
    }
};