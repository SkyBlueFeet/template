import content from '../tpl.ejs';
import layout from 'app/layout';

import _table from 'layout/snippets/_table.ejs';
import _nav from 'layout/components/_nav.ejs';
import _modal from 'layout/snippets/_modal.ejs';
import { authFormConfig, authTableConfig } from 'app/config';

let tableHtml = _table({ config: authTableConfig });
export default layout.initArgon({ main: content({ table: tableHtml }), modal: _modal({ config: authFormConfig({}, []) }) });