//买笔
function buy() {
    console.log('开始买笔');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('买了笔芯');
            resolve('数学作业');
        }, 1000);
    });
}
//写作业
function work(data) {
    console.log('开始写作业：' + data);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('写完作业');
            resolve('作业本');
        }, 1000);
    });
}

function out(data) {
    console.log('开始上交：' + data);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('上交完毕');
            resolve('得分：A');
        }, 1000);
    });
}
/* 不建议使用这种方式
        buy().then(function(data){
            return work(data);
        }).then(function(data){
            return out(data);
        }).then(function(data){
            console.log(data);
        });*/

//推荐这种简化的写法
buy()
    .then(work)
    .then(out)
    .then(data => console.log(data));
buy().then(data => console.log(data));