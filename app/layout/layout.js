import _black from './tpl/blank.ejs';
import _withHeader from './tpl/withHeader.ejs';
import header from 'app/components/header.ejs';
/**
 *
 * @param  {} title
 * @param  {} body
 */
const initblock = (title, body) => {
    return _black({
        title: title,
        body: body
    });
};

const initWithHeader = (title = '我的世界', content = '') => {
    return _withHeader({
        title: title,
        header: header(),
        content: content()
    });
};


export default { initblock, initWithHeader };