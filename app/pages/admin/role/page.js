import content from '../tpl.ejs';
import layout from 'app/layout';
import _table from 'layout/snippets/_table.ejs';
import _nav from 'layout/components/_nav.ejs';
import _modal from 'layout/components/_modal.ejs';
import _assignModal from 'layout/components/_assign-modal.ejs';
import { roleTableConfig, roleFormConfig } from 'app/config';

let tableHtml = _table({ config: roleTableConfig });
export default layout.initArgon({ main: content({ table: tableHtml }), modal: _modal({ config: roleFormConfig({}, []) }) + _assignModal('') });