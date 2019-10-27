import axios from './axios';


export default {

    queryElement: data => {
        return axios({
            url: '/auth/selectElement',
            method: 'post',
            data
        });
    },

    createElement: data => {
        return axios({
            url: '/auth/createElement',
            method: 'post',
            data
        });
    },

    editElement: data => {
        return axios({
            url: '/auth/editElement',
            method: 'post',
            data
        });
    },

    deleteElement: data => {
        return axios({
            url: '/auth/deleteElement',
            method: 'post',
            data
        });
    }
};