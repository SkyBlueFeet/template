import axios from './axios';


export default {

    queryRole: data => {
        return axios({
            url: '/auth/selectRole',
            method: 'post',
            data
        });
    },

    createRole: data => {
        return axios({
            url: '/auth/createRole',
            method: 'post',
            data
        });
    },

    editRole: data => {
        return axios({
            url: '/auth/editRole',
            method: 'post',
            data
        });
    },

    deleteRole: data => {
        return axios({
            url: '/auth/deleteRole',
            method: 'post',
            data
        });
    }
};