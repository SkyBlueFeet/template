import axios from './axios';

/* 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 此处的数据依然来自 Easy Mock
 */

// 单独倒出

const User = {
    queryUser: data => {
        return axios({
            url: '/selectUser',
            method: 'post',
            data
        });
    },

    createUser: data => {
        return axios({
            url: '/createUser',
            method: 'post',
            data
        });
    },

    editUser: data => {
        return axios({
            url: '/editUser',
            method: 'post',
            data
        });
    },

    deleteUser: data => {
        return axios({
            url: '/deleteUser',
            method: 'post',
            data
        });
    }
};





const Auth = {

    queryAuth: data => {
        return axios({
            url: '/selectAuth',
            method: 'post',
            data
        });
    },

    createAuth: data => {
        return axios({
            url: '/createAuth',
            method: 'post',
            data
        });
    },

    editAuth: data => {
        return axios({
            url: '/editAuth',
            method: 'post',
            data
        });
    },

    deleteAuth: data => {
        return axios({
            url: '/deleteAuth',
            method: 'post',
            data
        });
    }
};

const Role = {

    queryRole: data => {
        return axios({
            url: '/selectRole',
            method: 'post',
            data
        });
    },

    createRole: data => {
        return axios({
            url: '/createRole',
            method: 'post',
            data
        });
    },

    editRole: data => {
        return axios({
            url: '/editRole',
            method: 'post',
            data
        });
    },

    deleteRole: data => {
        return axios({
            url: '/deleteRole',
            method: 'post',
            data
        });
    }
};

const Module = {

    queryModule: data => {
        return axios({
            url: '/selectModule',
            method: 'post',
            data
        });
    },

    createModule: data => {
        return axios({
            url: '/createModule',
            method: 'post',
            data
        });
    },

    editModule: data => {
        return axios({
            url: '/editModule',
            method: 'post',
            data
        });
    },

    deleteModule: data => {
        return axios({
            url: '/deleteModule',
            method: 'post',
            data
        });
    }
};

const Element = {

    queryElement: data => {
        return axios({
            url: '/selectElement',
            method: 'post',
            data
        });
    },

    createElement: data => {
        return axios({
            url: '/createElement',
            method: 'post',
            data
        });
    },

    editElement: data => {
        return axios({
            url: '/editElement',
            method: 'post',
            data
        });
    },

    deleteElement: data => {
        return axios({
            url: '/deleteElement',
            method: 'post',
            data
        });
    }
};

export default {
    User,
    Auth,
    Role,
    Module,
    Element
};