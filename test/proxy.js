/**
 * ES6 Proxy
 * 参考:http: //es6.ruanyifeng.com/#docs/proxy
 */

const obj = new Proxy({}, {
    get: function(target, key, receiver) {
        console.log(`getting ${key}!`);
        return Reflect.get(target, key, receiver);
    },
    set: function(target, key, value, receiver) {
        console.log(`setting ${key}!`);
        return Reflect.set(target, key, value, receiver);
    }
});

obj.count = 1;

obj.count++;

//在 Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理

const target = new Date('2015-01-01');
const handler = {
    get(target, prop) {
        if (prop === 'getDate') {
            return target.getDate.bind(target);
        }
        return Reflect.get(target, prop);
    }
};
const proxy = new Proxy(target, handler);

proxy.getDate() // 1

//通过this绑定原始对象，就可以解决这个问题