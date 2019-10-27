import _black from './tpl/blank.ejs';
import footer from 'components/footer.ejs';
import ico from 'tpl/favicon.png';
import _withHeader from './tpl/withHeader.ejs';
import breadcrumb from 'components/breadcrumb.ejs';
import _withsideBar from './tpl/whithSideBar.ejs';
import nav from 'components/nav.ejs';
import auth from 'tpl/abandon/Auth/auth.json';
import sideBar from 'components/sidebar.ejs';




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
 * @param { Object } option
 */
const initWithHeader = (option) => {
    const defaultOption = {
        ico: ico,
        title: '中科建业',
        bread: breadcrumb(),
        footer: footer(),
        content: '请填充内容区!',
    };
    return _withHeader({
        ...defaultOption,
        ...option
    });
};

/**
 *
 * @param { Object } option
 */
const initWithSideBar = (option) => {
    const defaultOption = {
        ico: ico,
        title: '中科建业',
        bread: breadcrumb(),
        footer: footer(),
        content: '请填充内容区!',

    };
    return _withsideBar({
        ...defaultOption,
        ...option
    });
};


export default { initblock, initWithHeader, initWithSideBar };