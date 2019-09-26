import _black from './tpl/blank.ejs';
import _withHeader from './tpl/withHeader.ejs';
import header from 'app/components/newHeader.ejs';
import headerData from 'root/Auth/auth.json';
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


const initWithHeader = (title, content) => {
    return _withHeader({
        title: title,
        header: header({ headerData: headerData }),
        content: content()
    });
};


export default { initblock, initWithHeader };