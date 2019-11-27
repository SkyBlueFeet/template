const _ = require('lodash'),
    babel = require('@babel/core'),
    func = require('../utils/func'),
    path = require('path');
const option = {
    'plugins': ['syntax-dynamic-import'],
    'presets': [
        [
            '@babel/env',
            {
                'modules': false,
                'targets': {
                    'browsers': [
                        'Android 4.1',
                        'iOS 7.1',
                        'Chrome > 31',
                        'ff > 31',
                        'ie >= 9',
                        '>0.5%'
                    ]
                }
            }
        ]
    ]
};
/**
 *
 * @param { String } string
 */
function replaceString(string) {
    let $string = string.split('       '),
        result = '';
    result = $string.join('');
    return result;
}
module.exports = function(source) {
    let template = _.template(source, { variable: 'data' });
    template = babel.transform('module.exports = ' + template, option).code;
    return replaceString(template);
};