import jQuery from 'jQuery';

function* helloWorldGenerator() {
    yield 'Hello';
    yield 'world';
    return 'ending';
}
const myIterable = {};
const hw = helloWorldGenerator;
console.log(hw().next());
console.log(hw().next());
console.log(hw().next());
let hwFunc = hw();
console.log(hwFunc.next());
console.log(hwFunc.next());
console.log(hwFunc.next());
myIterable[Symbol.iterator] = hw;
console.log(...myIterable);

var arr = {};
arr[Symbol.iterator] = function*() {
    yield 1;
    yield 2;
    yield 3;
};

console.log(...arr);


function* dataConsumer() {
    console.log('Started');
    console.log(`1. ${yield}`);
    console.log(`2. ${yield}`);
    return 'result';
}
//传参
let genObj = dataConsumer();
console.log(genObj.next());
console.log(genObj.next('a'));
console.log(genObj.next('b'));




// for of 遍历
function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
}

for (let v of foo()) {
    console.log(v);
}


function* main() {
    var result = yield request('http://skybluefeet.cn');
    var resp = JSON.parse(result);
    console.log(resp.value);
}

function request(url) {
    jQuery.get(url, (data) => {
        return data;
    });
    // $.ajax(url, function(response) {
    //     it.next(response);
    // });
}

let it = main();
it.next();

//引用参考:generator函数解析: http://es6.ruanyifeng.com/#docs/generator