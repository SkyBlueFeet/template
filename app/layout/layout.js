import _black from './tpl/blank.ejs';
import _withHeader from './tpl/withHeader.ejs';
import header from 'components/header.ejs';
import footer from 'components/footer.ejs';
import _mdWithHeader from './tpl/mdWithHeader.ejs';
import headerData from 'root/Auth/auth.json';
import ico from 'root/favicon.png';

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


const initWithHeader = (Object) => {
    return _withHeader({
        ico: Object['ico'] || ico,
        title: Object['title'],
        header: header({ headerData: headerData }),
        content: Object['content'],
        footer: footer()
    });
};


export default { initblock, initWithHeader };