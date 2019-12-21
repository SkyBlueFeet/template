import $axios from './axios';
import application from '@core/script/application';
import { ucfirst } from '@core/script/utils';
import { Router } from '@core/config';

export { default as module } from './db/module';
export { default as element } from './db/element';
export { default as auth } from './db/auth';
export { default as role } from './db/role';
export { default as user } from './db/user';

/**
 *
 * @param { String } type
 * @param { Array<T> } data
 */
export const params = (type, data) => {
    return {
        type: type,
        data: data
    };
};

export const resLoad = () => {
    return new Promise((resolve, reject) => {
        $axios({
            url: '/app/preLoad',
            method: 'post'
        }).then(res => {
            resolve(res);
        });

    });
};

/**
 *
 * @param { Array<T> } add
 * @param { Array<T> } remove
 */
export const updateResource = (add, remove) => {
    $axios({
        url: '/app/updateResource',
        method: 'post',
        data: {
            addData: add,
            removeData: remove
        }
    }).then(res => {
        if (res.statusKey === 666) {
            application.management['auth'] = res.data;
        }
    });
};

export const loginValidate = async data => {
    return new Promise((resolve, reject) => {
        $axios({
            url: '/app/loginValidate',
            method: 'post',
            data
        }).then(res => {
            if (res.statusKey === 666) {
                application.preRequest('prefetch', res);
                for (let [name, value] of Object.entries(application.$user)) {
                    value = res.user[name];
                }
                application.$user = {
                    ...application.$user,
                    ...res.user
                };
                window.location = Router.defaultPage;
                resolve(res);
            }
        }).catch(error => {
            reject(error);
        });
    });
};

export function mod(name, type, Res) {
    $axios({
        url: `/app/mod${ ucfirst(name) }`,
        method: 'post',
        data: params(type, Res)
    }).then(res => {
        if (res.statusKey === 666) {
            application.management[name] = res.data;
        }
    });
}