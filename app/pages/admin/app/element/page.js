import content from './content.ejs';
import layout from 'app/layout';
import header from 'components/navbar.ejs';
import auth from 'tpl/abandon/Auth/auth.json';
import tableEjs from 'components/table.ejs';
import { table } from 'app/config';

let tableHtml = tableEjs({ config: table.elementTableConfig });

export default layout.initWithHeader({ title: 'bootstrap', header: header(auth), content: content({ table: tableHtml }) });