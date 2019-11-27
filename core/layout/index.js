import _black from './tpl/blank.ejs';
import _withHeader from './tpl/withHeader.ejs';
import _withsideBar from './tpl/whithSideBar.ejs';
import _argon from './tpl/argon.ejs';
import nav from './components/_nav.ejs';
import _modal from './components/_modal.ejs';

/**
 *
 * @param  { String } title 页面标题
 * @param  { String } content 页面内容
 */
const initblock = (title, content) => {
    return _black({
        title: title,
        content: content,
    });
};

/**
 *
 * @param { Object } option
 */
const initArgon = option => {
    const defaultOption = {
        title: '中科建业',
        content: '请填充内容区!',
        table: '',
        nav: nav()
    };
    return _argon({
        ...defaultOption,
        ...option,
        modal: option.modal,
    });
};


export default { initblock, initArgon };