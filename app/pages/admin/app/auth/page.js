import content from './content.ejs';
import layout from 'app/layout';
import header from 'components/navbar.ejs';
import auth from 'tpl/abandon/Auth/auth.json';


export default layout.initWithHeader({ title: 'bootstrap', header: header(auth), content: content({ table: '123' }) });