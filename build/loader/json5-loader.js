Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _json = _interopRequireDefault(require('json5'));
module.exports = function(source) {
    return `module.exports=${JSON.stringify(_json.default.parse(source))}`;
};