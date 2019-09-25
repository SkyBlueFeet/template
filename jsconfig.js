const alias = require('./config/global').alias;
module.exports = {
    'exclude': ['node_modules', '.vscode', '.git'],
    'compilerOptions': {
        'baseUrl': './',
        'paths': alias,
        'checkJs': true
    },
    'typeAcquisition': {
        'include': [
            'sequelize'
        ],
    },

};