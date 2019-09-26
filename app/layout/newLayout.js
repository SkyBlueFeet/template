import _black from './tpl/blank.ejs';
import _withHeader from './tpl/withHeader.ejs';
import header from 'app/components/newHeader.ejs';
/**
 *
 * @param  {} title
 * @param  {} body
 */
const initblock = (title, body) => _black({
    title: title,
    body: body
});

const initWithHeader = (title = '我的世界', headerParams, content) => _withHeader({
    title: title,
    header: header(headerParams),
    content: content
});

export default { initblock, initWithHeader };