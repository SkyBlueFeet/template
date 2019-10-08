const inquirer = require('inquirer');
const fs = require('fs');
const child_process = require('child_process');
const npm = require('npm-spawn');

// try {
//     // 列出项目名称
//     inquirer.prompt([
//     {
//         type: 'message',
//         name: 'project',
//         message: '请选择一个项目',
//         choices: ['123', '456']
//     }]).then(v => {
//         console.log(v);
//         const cmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
//         const args = ['config', 'set', 'test:name', v.project, '&&', 'npm', 'run', v.operate];
//         const opts = {
//             stdio: 'inherit' // 并入父进程
//         };
//         const ls = spawn(cmd, args, opts);
//     });
// } catch (error) {
//     console.error(error);
// }

// const ls = child_process.spawn('webpack', ['', '']);

// ls.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
// });

// ls.stderr.on('data', (data) => {
//     console.log(`stderr: ${data}`);
// });

// ls.on('close', (code) => {
//     console.log(`child process exited with code ${code}`);
// });

// npm(['start'], {
//     cwd: './'
// });
child_process.exec('npx webpack-dev-server --config ./config/webpack.dev ', { cwd: './' }, (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    console.log(error);
});