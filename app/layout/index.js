import _black from './tpl/blank.ejs';
import footer from 'components/footer.ejs';
import ico from 'tpl/favicon.png';
import _withHeader from './tpl/withHeader.ejs';
import breadcrumb from 'components/breadcrumb.ejs';




/**
 *
 * @param  { String } title 页面标题
 * @param  { String } content 页面内容
 */
const initblock = (title, content) => {
    return _black({
        title: title,
        content: content,
        ico: ico
    });
};

/**
 *
 * @param { Object } Object
 */
const initWithHeader = (Object) => {
    return _withHeader({
        ico: Object['ico'] || ico,
        title: Object['title'],
        // header: Object['header'],
        bread: breadcrumb(),
        content: Object['content'],
        footer: footer()
    });
};


export default { initblock, initWithHeader };