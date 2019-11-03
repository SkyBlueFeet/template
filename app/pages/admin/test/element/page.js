import content from '../tpl.ejs';
import layout from 'app/layout';
import argon from 'layout/tpl/argon.ejs';
import _table from 'layout/snippets/_table.ejs';
import _nav from 'layout/components/_nav.ejs';
import _modal from 'layout/components/_modal.ejs';
import { moduleTableConfig, moduleFormConfig } from 'app/config';
// modal: tModal({ title: '新增', config: moduleFormConfig({}, []) })
let tableHtml = _table({ config: moduleTableConfig });
export default layout.initArgon({ main: content({ table: tableHtml }), modal: _modal({ config: moduleFormConfig({}, []) }) });