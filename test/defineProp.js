const proxy = {};

function defaineReactive(data, key, value) {
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function defineGet() {
            console.log(`get key: ${key}`);
            return value;
        },
        set: function defineSet(newValue) {
            console.log(`set key: ${key}`);
            value = newValue;
        }
    });
}

function observe(data) {
    Object.keys(data).forEach(key => {
        defaineReactive(data, key, data[key]);
    });
}

let arr = { let: 123, var: 789, const: 7852 };

observe(arr);