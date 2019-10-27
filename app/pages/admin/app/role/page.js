import content from 'app/pages/tpl/content.ejs';
import layout from 'app/layout';
import header from 'components/navbar.ejs';
import tableEjs from 'components/table.ejs';
import { table } from 'app/config';
import auth from 'tpl/abandon/Auth/auth.json';
import nav from 'components/nav.ejs';
import sideBar from 'components/sidebar.ejs';

let tableHtml = tableEjs({ config: table.roleTableConfig });


export default layout.initWithSideBar({
    content: content({ table: tableHtml, type: 'rolePage' }),
    nav: nav(),
});