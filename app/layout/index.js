import _black from 'layout/tpl/blank.ejs';
import footer from 'layout/components/_footer.ejs';
import _withHeader from 'layout/tpl/withHeader.ejs';
import _withsideBar from 'layout/tpl/whithSideBar.ejs';
import _argon from 'layout/tpl/argon.ejs';
import nav from 'layout/components/_nav.ejs';
import _modal from 'layout/components/_modal.ejs';




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
        modal: _modal(option.modal),
    });
};


export default { initblock, initArgon };